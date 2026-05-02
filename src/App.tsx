import ChatView from "./components/ChatView"
import CheckInView from "./components/CheckInView"
import useCheckIn from "./store/useCheckIn"

function App() {
  const { hasCheckedIn } = useCheckIn();

  return hasCheckedIn ? <ChatView /> : <CheckInView />;
}

export default App
