import "./chatList.css";
import { useEffect, useState } from "react";
import AddUser from "./addUser/addUser";
import useUserStore from "../../../lib/userStore";
import useChatStore from "../../../lib/chatStore";

import { doc, getDoc, onSnapshot, updateDoc } from "firebase/firestore";
import { db } from "../../../lib/firebase";

const ChatList = () => {
  const [addMode, setAddMode] = useState(false);
  const [chats, setChats] = useState([]);
  const [input, setInput] = useState("");

  const { currentUser } = useUserStore();
  const { chatId,changeChat} = useChatStore();



  useEffect(() => {
    if (!currentUser?.id) {
      console.error("Current user ID is missing.");
      return;
    }

    const unSub = onSnapshot(doc(db, "userchats", currentUser.id), async (res) => {
      if (res.exists()) {
        const items = res.data().chats || [];

        const promises = items.map(async (item) => {

            const userDocRef = doc(db, "users", item.recievedId);
            const userDocSnap = await getDoc(userDocRef);

            const user = userDocSnap.exists() ? userDocSnap.data() : null;
            return { ...item, user };
        
        });

        const chatData = await Promise.all(promises);
        setChats(chatData.filter((chat) => chat !== null).sort((a, b) => b.updatedAt - a.updatedAt));
      } else {
        console.log("No chats found for the current user.");
      }
    });


    return () => {
      unSub();
    };
  }, [currentUser?.id]);

  
  const handleSelect = async (chat) =>{
    const userChats = chats.map(item=>{
      const{user, ...rest}= item;
      return rest;
    })

    const chatIndex= userChats.findIndex(
      (item)=>item.chatId === chat.chatId
    )

    userChats[chatIndex].isSeen=true

    const userChatRef= doc(db,"userchats",currentUser.id);

    try {
      await updateDoc(userChatRef,{
        chats: userChats,
        
      })
    changeChat(chat.chatId, chat.user)   

    } catch (error) {
      console.log(error)
    }
  

    // console.log(chat)
  }

  const filteredChats = chats.filter(c=> c.user.username.toLowerCase().includes(input.toLowerCase()))

  return (
    <div className="chatList">
      <div className="search">
        <div className="searchBar">
          <img src="/search.png" alt="" />
          <input type="text" placeholder="Search" onChange={(e)=>setInput(e.target.value)} />
        </div>
        <img
          src={addMode ? "./minus.png" : "/plus.png"}
          alt=""
          className="add"
          onClick={() => setAddMode((prev) => !prev)}
        />
      </div>
      {filteredChats.map((chat) => (
        <div className="item" key={chat.chatId} onClick={()=>handleSelect(chat)} style={{backgroundColor: chat?.isSeen ?"transparent":"#5183fe"}}>
          <img src={chat.user.avatar || "./avatar.png"} alt="" />
          <div className="text">
            <span>{chat.user?.username || "Unknown User"}</span>
            <p>{chat.lastMessage}</p>
          </div>
        </div>
      ))}

      {addMode && <AddUser />}
    </div>
  );
};

export default ChatList;
