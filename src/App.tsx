import ChatView from "./components/ChatView";
import CheckInView from "./components/CheckInView";
import CrisisView from "./components/CrisisView";
import useCheckIn from "./store/useCheckIn";
import useConversation from "./store/useConversation";

function App() {
  const { hasCheckedIn } = useCheckIn();
  const { isCrisis } = useConversation();

  if (isCrisis) {
    return <CrisisView />;
  }

  return hasCheckedIn ? <ChatView /> : <CheckInView />;
}

export default App;
