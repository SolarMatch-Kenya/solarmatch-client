import AppRouter from "./router/AppRouter"
import SunnyWidget from "./components/ai/SunnyWidget"
import { Toaster } from "./components/common/Notification"
import ExamplePagination from "../examplepagination"

function App() {
  return (
    <>
      <Toaster />
      <h1 className="text-3xl font-bold underline">SolarMatch Web App</h1>
      <AppRouter/>
      <SunnyWidget/>
    </>
  )
}

export default App