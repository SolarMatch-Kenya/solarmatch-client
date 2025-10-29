// src/components/ar/RoofPreview.jsx
import React, { useRef, useEffect, useState, Suspense } from "react";
import { Canvas, useThree } from "@react-three/fiber";
import { OrbitControls, useTexture, useGLTF } from "@react-three/drei";
import API from "../../services/api";
import * as THREE from 'three';


function Panel({ position, rotation, active }) {
  const eulerRotation = new THREE.Euler(...rotation);

  return (
    <mesh position={position} rotation={eulerRotation} castShadow receiveShadow>
      <boxGeometry args={[0.9, 0.05, 1.8]} /> {/* Standard panel size approx 1m x 2m */}
      <meshStandardMaterial color={active ? "#0B3D02" : "#2F3A3A"} metalness={0.6} roughness={0.2} />
    </mesh>
  );
}


const GLBScene = React.memo(function GLBScene({ modelUrl, panelPositions, setExporterScene }) {
  // Load the 3D model from the URL
  const { scene: roofModel } = useGLTF(modelUrl);
  const { scene } = useThree();

  useEffect(() => {
    setExporterScene(scene);
  }, [scene, setExporterScene]);

  const yOffset = 5.0;
  const xOffset = 6.5;

  return (
    <>
      <ambientLight intensity={0.8} />
      <directionalLight position={[8, 12, 5]} intensity={1.5} castShadow shadow-mapSize-width={2048} shadow-mapSize-height={2048} />
      
      {/* Scale the model if it's too big or small */}
      <primitive object={roofModel} receiveShadow castShadow scale={1.0} />
      
      {/* Render panels using full position and rotation from AI */}
      {/* Ensure panelPositions is an array */}
      {Array.isArray(panelPositions) && panelPositions.map((p, i) => (
         // Validate that p has position and rotation
         (p.position && p.rotation) ? (
            <Panel 
              key={i} 
              position={[p.position[0] + xOffset, p.position[1] + yOffset, p.position[2]]}
              rotation={p.rotation}
              active={true} 
            />
         ) : null // Skip if data is malformed
      ))}
      
      <OrbitControls enablePan enableRotate enableZoom />
    </>
  );
})


function FlatScene({ photoUrl, panelPositions = [], setExporterScene }) {
  const texture = useTexture(photoUrl);
  const planeRef = useRef();

  useEffect(() => {
    if (planeRef.current) {
      planeRef.current.receiveShadow = true;
    }
  }, []);

  const { scene } = useThree();
  useEffect(() => {
    setExporterScene(scene);
  }, [scene, setExporterScene]);

  return (
    <>
      <ambientLight intensity={0.6} />
      <directionalLight position={[5, 10, 7]} intensity={1.2} castShadow shadow-mapSize-width={1024} shadow-mapSize-height={1024} />
      <group rotation={[-Math.PI / 2, 0, 0]}>
        <mesh ref={planeRef} receiveShadow>
          <planeGeometry args={[10, 10]} />
          <meshStandardMaterial map={texture} />
        </mesh>

        {Array.isArray(panelPositions) && panelPositions.map((p, i) => (
           (p.x !== undefined && p.z !== undefined) ? (
             <Panel 
               key={i} 
               position={[p.x, 0.05, p.z]} 
               // For flat plane, only counter-rotate around X
               rotation={[Math.PI / 2, 0, 0]} 
               active={true} 
             />
           ) : null // Skip if data is malformed for flat scene
         ))}
      </group>

      <OrbitControls enablePan enableRotate enableZoom />
    </>
  );
}


// --- THE MAIN COMPONENT ---
export default function RoofPreview({ photoUrl, panelPositions = [], roofModelUrl = null }) {
  const [exporterScene, setExporterScene] = useState(null);
  const [status, setStatus] = useState("");

  const handleExportGLB = async () => {
    if (!exporterScene) return;
    setStatus("Exporting...");
    const { GLTFExporter } = await import("three/examples/jsm/exporters/GLTFExporter.js");
    const exporter = new GLTFExporter();
    exporter.parse(
      exporterScene,
      async (result) => {
        let arrayBuffer;
        if (result instanceof ArrayBuffer) arrayBuffer = result;
        else {
          const str = JSON.stringify(result);
          arrayBuffer = new TextEncoder().encode(str);
        }

        const blob = new Blob([arrayBuffer], { type: "model/gltf-binary" });
        const form = new FormData();
        form.append("model", blob, "roof_preview.glb");
        try {
          const res = await API.post("/upload-model", form, { headers: {"Content-Type": "multipart/form-data"} });
          setStatus("Uploaded: " + res.data.modelUrl);
        } catch (e) {
          console.error(e);
          setStatus("Upload failed");
        }
      },
      { binary: true }
    );
  };

  return (
    <div className="bg-white rounded-lg shadow p-4">
      <div style={{ height: 520 }}>
        <Canvas shadows camera={{ position: [6, 6, 6], fov: 50 }}>
          <Suspense fallback={<group><mesh><boxGeometry/><meshStandardMaterial color="orange"/></mesh></group>}> {/* Basic fallback */}
            {roofModelUrl ? (
              <GLBScene 
                modelUrl={roofModelUrl}
                panelPositions={panelPositions} // Pass the layout data
                setExporterScene={setExporterScene}
              />
            ) : (
              <FlatScene 
                photoUrl={photoUrl}
                panelPositions={panelPositions} // Pass the layout data
                setExporterScene={setExporterScene}
              />
            )}
          </Suspense>
        </Canvas>
      </div>

      <div className="mt-3 flex gap-2">
        <button onClick={handleExportGLB} className="bg-[#f79436] px-4 py-2 rounded text-white">Export & Upload GLB</button>
        <div className="text-sm text-gray-600">{status}</div>
      </div>
    </div>
  );
}