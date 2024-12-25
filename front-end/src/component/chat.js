import SideHeader from "./SideBar/sideHeader"
import Person from "./SideBar/persons"
import ChatHeader from "./Chatting/chatHeader"
import Body from "./Chatting/body"
import Footer from "./Chatting/footer"
import { useState, useEffect } from "react"

function Chat() {
    const [loggedInUser, setLoggedInUser] = useState(null);    
    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch('http://localhost:5000/data');
            const data = await response.json();
            let user = data.find((element)=>{
                return element.name === JSON.parse(sessionStorage.getItem("userLogged"))
            })
            setLoggedInUser(user);
        };
        fetchData();
    }, [loggedInUser]);
    if (!loggedInUser) {
        return <div>Loading...</div>;
    }
    return (
        <div>
            <div className="flex h-screen overflow-hidden">
                <div className="w-1/4 bg-white border-r border-gray-300">
                    <SideHeader/>
                    <div className="overflow-y-auto p-3 mb-9 bg-[#d1e5a157]" style={{position: "relative", height: "calc(100vh - 80px"}}>
                        {
                            loggedInUser.contact.map((element, index)=>{
                                return <Person key={index} element={element}/>
                            })
                        }
                    </div>
                </div>
                <div className="flex-1">
                    <ChatHeader/>
                    <Body/>
                    <Footer/>
                </div>
            </div>
        </div>
    )
}

export default Chat