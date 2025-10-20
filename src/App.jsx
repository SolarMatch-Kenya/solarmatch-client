import AppRouter from "./router/AppRouter"
import SunnyChatbot from "./components/ai/SunnyChatbot"

function App() {
  return (
    <>
      <h1 className="text-3xl font-bold underline">SolarMatch Web App</h1>
      <AppRouter/>
      <SunnyChatbot/>
    </>
  )
}

export default App
