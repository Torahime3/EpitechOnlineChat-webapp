import ChatBox from "./components/ChatBox.tsx";
import ChannelsBox from "./components/ChannelsBox.tsx";
import Authentication from "./components/forms/Authentication.tsx";
import {useCookies} from "react-cookie";
import {useEffect, useState} from "react";
import { socket } from "./socket.ts";

function App() {

    const [cookie] = useCookies(['user']);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [selectedChannel, setSelectedChannel] = useState(-1);

    useEffect(() => {
        if (cookie.user && cookie.user.token) {
            setIsLoggedIn(true);
        } else {
            setIsLoggedIn(false);
        }
    }, [cookie]);

    socket.on('message', (message: any) => {
        console.log("message");
    });

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
