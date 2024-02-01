import ChatBox from "./components/ChatBox.tsx";
import ChannelsBox from "./components/ChannelsBox.tsx";
import Authentication from "./components/forms/Authentication.tsx";
import {useCookies} from "react-cookie";
import {useEffect, useState} from "react";


function App() {

    const [cookie] = useCookies(['user']);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [selectedChannel, setSelectedChannel] = useState(0);

    useEffect(() => {
        if (cookie.user && cookie.user.token) {
            setIsLoggedIn(true);
        } else {
            setIsLoggedIn(false);
        }
    }, [cookie]);

    return (
        <>
            {!isLoggedIn ? (
                <Authentication/>
            ) : (
                <div className="panel">
                    <ChannelsBox setSelectedChannel={setSelectedChannel} selectedChannel={selectedChannel}/>
                    <ChatBox selectedChannel={selectedChannel}/>
                </div>
            )}
        </>
    )
}

export default App
