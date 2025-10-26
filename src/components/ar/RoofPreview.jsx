// src/components/ar/RoofPreview.jsx
import React, { useRef, useEffect, useState, Suspense } from "react";
import { Canvas, useThree } from "@react-three/fiber";
import { OrbitControls, useTexture, useGLTF } from "@react-three/drei";
import API from "../../services/api";

// Panel component is unchanged
function Panel({ position, rotation, active }) {
  return (
    <mesh position={position} rotation={rotation} castShadow receiveShadow>
      <boxGeometry args={[0.9, 0.05, 1.8]} />
      <meshStandardMaterial color={active ? "#0B3D02" : "#2F3A3A"} metalness={0.6} roughness={0.2} />
    </mesh>
  );
}

// --- THIS IS THE NEW SCENE FOR THE 3D MODEL ---
function GLBScene({ modelUrl, panelPositions, setExporterScene }) {
  // Load the 3D model from the URL
  const { scene: roofModel } = useGLTF(modelUrl);
  
  const { scene } = useThree();
  useEffect(() => {
    setExporterScene(scene);
  }, [scene, setExporterScene]);

  return (
    <>
      <ambientLight intensity={0.6} />
      <directionalLight position={[5, 10, 7]} intensity={1.2} castShadow />
      
      {/* Render the loaded roof model */}
      <primitive object={roofModel} receiveShadow castShadow />
      
      {/* Render panels. These will lie flat on the Y=0 plane.
        This assumes your Gemini prompt provides coordinates
        that match the GLB model's coordinate system.
      */}
      {panelPositions.map((p, i) => (
        <Panel key={i} position={[p.x, 0.05, p.z]} rotation={[0, 0, 0]} active={true} />
      ))}
      
      <OrbitControls enablePan enableRotate enableZoom />
    </>
  );
}

// --- THIS IS YOUR OLD SCENE, RENAMED ---
function FlatScene({ photoUrl, panelPositions, setExporterScene }) {
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

        {/* We apply the 90-degree counter-rotation here
          to make the panels lie flat on the rotated plane.
        */}
        {panelPositions.map((p, i) => (
          <Panel key={i} position={[p.x, 0.05, p.z]} rotation={[Math.PI / 2, 0, 0]} active={true} />
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
    // ... This function remains exactly the same ...
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
          <Suspense fallback={null}>
            {/* --- THIS IS THE KEY ---
              If we have a roofModelUrl, use the new 3D scene.
              If not, fall back to the old flat image scene.
            */}
            {roofModelUrl ? (
              <GLBScene 
                modelUrl={roofModelUrl}
                panelPositions={panelPositions}
                setExporterScene={setExporterScene}
              />
            ) : (
              <FlatScene 
                photoUrl={photoUrl}
                panelPositions={panelPositions}
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