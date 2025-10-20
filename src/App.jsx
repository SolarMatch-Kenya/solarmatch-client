import AppRouter from "./router/AppRouter"
import SunnyWidget from "./components/ai/SunnyWidget"

function App() {
  return (
    <>
      <h1 className="text-3xl font-bold underline">SolarMatch Web App</h1>
      <AppRouter/>
      <SunnyWidget/>
    </>
  )
}

export default App
