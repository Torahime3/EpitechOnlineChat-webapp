import ChatBox from "./components/ChatBox.tsx";
import ChannelsBox from "./components/ChannelsBox.tsx";
import Authentication from "./components/forms/Authentication.tsx";
import {useCookies} from "react-cookie";
import {useEffect, useState} from "react";


function App() {

    const [cookie] = useCookies(['user']);
    const [isLoggedIn, setIsLoggedIn] = useState(true);
    const [selectedChannel, setSelectedChannel] = useState(1);

    useEffect(() => {
        if (cookie.user && cookie.user.token) {
            setIsLoggedIn(true);
        } else {
            setIsLoggedIn(false);
        }
    }, [cookie]);

    return (
        <>
            {isLoggedIn ? (
                <div className="panel">
                    <ChannelsBox setSelectedChannel={setSelectedChannel} selectedChannel={selectedChannel} />
                    <ChatBox />
                </div>
            ) : (
                <Authentication/>
            )}
        </>
    )
}
export default App
