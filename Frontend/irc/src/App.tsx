import ChatBox from "./components/ChatBox.tsx";
import ChannelsBox from "./components/ChannelsBox.tsx";
import Authentication from "./components/forms/Authentication.tsx";
import {useCookies} from "react-cookie";
import {useEffect, useState} from "react";


function App() {

    const [cookie] = useCookies(['user']);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

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
                <div style={{display: "flex"}}>
                    <ChannelsBox />
                    <ChatBox />
                </div>
            ) : (
                <Authentication/>
            )}
        </>
    )
}
export default App
