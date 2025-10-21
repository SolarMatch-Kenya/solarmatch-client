import AppRouter from "./router/AppRouter"
import SunnyWidget from "./components/ai/SunnyWidget"
import { Toaster } from "./components/common/Notification"
import ExamplePagination from "../examplepagination"

function App() {
  return (
    <>
      <Toaster />
      <AppRouter/>
      <SunnyWidget/>
    </>
  )
}

export default App