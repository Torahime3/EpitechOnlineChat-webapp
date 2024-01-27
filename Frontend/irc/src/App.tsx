import ChatBox from "./components/ChatBox.tsx";
import ChannelsBox from "./components/ChannelsBox.tsx";


function App() {

    return (
        <>
            <div style={{display: "flex"}}>
                <ChannelsBox />
                <ChatBox />
            </div>
        </>
    )
}
export default App
