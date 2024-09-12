import "./chat.css"
import EmojiPicker from "emoji-picker-react"
import { useEffect, useRef, useState } from "react"
import useUserStore from "../../lib/userStore"
import { arrayUnion, doc, getDoc, onSnapshot, updateDoc } from "firebase/firestore"
import { db } from "../../lib/firebase"
import useChatStore from "../../lib/chatStore"
import upload from "../../lib/uploadImage"

const Chat = () => {
  const [chat, setChat] = useState(null)
  const [open, setOpen] = useState(false)
  const [text, setText] = useState("")
  const endRef = useRef(null)
  const { chatId, user,isCurrentUserBlocked,isRecieverBlocked } = useChatStore()
  const [img, setImg] = useState({
    file: null,
    url: ""
  })

  const { currentUser } = useUserStore()

  useEffect(() => {
    // Auto-scroll to the bottom of the chat
    endRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [chat])

  useEffect(() => {
    // Set up Firestore listener for chat messages
    const unSub = onSnapshot(doc(db, "chats", chatId), (res) => {
      setChat(res.data())
    })

    return () => {
      unSub()
    }
  }, [chatId])

  const handleEmoji = (e) => {
    setText((prev) => prev + e.emoji)
  }

  const handleImage = (e) => {
    if (e.target.files[0]) {
      setImg({
        file: e.target.files[0],
        url: URL.createObjectURL(e.target.files[0]) // Ensure 'url' is lowercase
      })
    }
  }

  const handleSend = async () => {
    if (text === "" && !img.file) return

    let imgUrl = null
    try {
      if (img.file) {
        imgUrl = await upload(img.file)
      }

      await updateDoc(doc(db, "chats", chatId), {
        messages: arrayUnion({
          senderId: currentUser.id,
          text,
          createdAt: new Date(),
          ...(imgUrl && { img: imgUrl }) // Add image if it exists
        })
      })

      // Update user chat metadata
      const userIDs = [currentUser.id, user.id]
      for (const id of userIDs) {
        const userChatRef = doc(db, "userchats", id)
        const userChatSnapshot = await getDoc(userChatRef)

        if (userChatSnapshot.exists()) {
          const userChatsData = userChatSnapshot.data()
          const chatIndex = userChatsData.chats.findIndex((c) => c.chatId === chatId)

          if (chatIndex !== -1) {
            userChatsData.chats[chatIndex].lastMessage = text
            userChatsData.chats[chatIndex].isSeen = id === currentUser.id
            userChatsData.chats[chatIndex].updatedAt = Date.now()

            await updateDoc(userChatRef, {
              chats: userChatsData.chats
            })
          } else {
            console.error("Chat not found in userChatsData")
          }
        }
      }
    } catch (error) {
      console.error("Error while sending message: ", error)
    }

    setImg({
      file: null,
      url: ""
    })
    setText("")
  }

  return (
    <div className="chat">
      <div className="top">
        <div className="user">
          <img src={user?.avatar || "./avatar.png"} alt="" />
          <div className="texts">
            <span>{user.username}</span>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
          </div>
        </div>
        <div className="icons">
          <img src="./phone.png" alt="Phone" />
          <img src="./video.png" alt="Video" />
          <img src="./info.png" alt="Info" />
        </div>
      </div>
      <div className="center">
        {chat?.messages?.map((message) => (
          <div className={message.senderId === currentUser?.id ?"message own": "message"} key={message?.createdAt?.seconds}>
            <div className="texts">
              {message.img && <img src={message.img} alt="Sent image" />}
              <p>{message.text}</p>
              <span>{new Date(message?.createdAt?.seconds * 1000).toLocaleString()}</span>
            </div>
          </div>
        ))}
        {img.url && (
          <div className="message own">
            <div className="texts">
              <img src={img.url} alt="Preview" />
            </div>
          </div>
        )}
        <div ref={endRef}></div>
      </div>
      <div className="bottom">
        <div className="icons">
          <label htmlFor="file">
            <img src="./img.png" alt="Attach file" />
          </label>
          <input type="file" name="file" id="file" style={{ display: "none" }} onChange={handleImage} />
          <img src="./camera.png" alt="Camera" />
          <img src="./mic.png" alt="Mic" />
        </div>
        <input
          type="text"
          placeholder={(isCurrentUserBlocked|| isRecieverBlocked)?"You cannot send message":"Type a message..."}
          value={text}
          onChange={(e) => setText(e.target.value)}
          disabled={isCurrentUserBlocked||isRecieverBlocked}
        />
        <div className="emoji">
          <div className="picker">
            <EmojiPicker open={open} onEmojiClick={handleEmoji} />
          </div>
          <img src="./emoji.png" alt="Emoji" onClick={() => setOpen((prev) => !prev)} />
        </div>
        <button className="sendButton" onClick={handleSend} disabled={isCurrentUserBlocked|| isRecieverBlocked}>
          Send
        </button>
      </div>
    </div>
  )
}

export default Chat
