import AppRouter from "./router/AppRouter"
import { Toaster } from "./components/common/Notification"
import SunnyWidget from './components/ai/SunnyWidget';
import ExamplePagination from "../examplepagination"

function App() {
  return (
    <>
      <Toaster />
      <AppRouter/>
      <SunnyWidget />
    </>
  )
}

export default App