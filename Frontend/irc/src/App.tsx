import ChatBox from "./components/ChatBox.tsx";
import MembersBox from "./components/MembersBox.tsx";


function App() {

    return (
        <>
            <div style={{display: "flex"}}>
                <MembersBox />
                <ChatBox />
            </div>
        </>
    )
}
export default App
