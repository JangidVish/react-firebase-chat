import "./chat.css"
import EmojiPicker from "emoji-picker-react"
import {useEffect, useRef, useState} from "react"

const Chat = () => {
  const [open, setOpen] = useState(false)
  const [text, setText] = useState("")
  const endRef = useRef(null);

  useEffect(()=>{
    endRef.current?.scrollIntoView({behavior: "smooth"})
  })


  const handleEmoji=(e)=>{
    setText((prev)=> prev + e.emoji)
  }
  return (
    <div className="chat">
      <div className="top">
        <div className="user">
          <img src="./avatar.png" alt="" />
          <div className="texts">
            <span>Jane Doe</span>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
          </div>
        </div>
        <div className="icons">
        <img src="./phone.png" alt=""  />
        <img src="./video.png" alt=""  />
        <img src="./info.png" alt="" />

        </div>
      </div>
      <div className="center">
        <div className="message">
          <img src="/avatar.png" alt="" />
          <div className="texts">
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. A, dignissimos quod ad, quas praesentium magnam deserunt qui tempore ex, est laudantium nisi cum repellat. Deserunt, saepe architecto. Dignissimos, porro quis.</p>
            <span>1 min ago</span>
          </div>
        </div>

        <div className="message own">
          <div className="texts">
            <img src="https://images.unsplash.com/photo-1725552397312-3d8ae9177bcf?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHw2fHx8ZW58MHx8fHx8" alt="" />
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. A, dignissimos quod ad, quas praesentium magnam deserunt qui tempore ex, est laudantium nisi cum repellat. Deserunt, saepe architecto. Dignissimos, porro quis.</p>
            <span>1 min ago</span>
          </div>
        </div>

        <div className="message">
          <img src="/avatar.png" alt="" />
          <div className="texts">
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. A, dignissimos quod ad, quas praesentium magnam deserunt qui tempore ex, est laudantium nisi cum repellat. Deserunt, saepe architecto. Dignissimos, porro quis.</p>
            <span>1 min ago</span>
          </div>
        </div>

        <div className="message own">
          <div className="texts">
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. A, dignissimos quod ad, quas praesentium magnam deserunt qui tempore ex, est laudantium nisi cum repellat. Deserunt, saepe architecto. Dignissimos, porro quis.</p>
            <span>1 min ago</span>
          </div>
        </div>
        <div className="" ref={endRef}></div>
      </div>
      <div className="bottom">
        <div className="icons">
          <img src="./img.png" alt=""  />
          <img src="./camera.png" alt=""  />
          <img src="./mic.png" alt="" />
        </div>
        <input type="text" name="" placeholder="Type a message...." id="" value={text} onChange={e=>setText(e.target.value)} />
        <div className="emoji">
          <div className="picker">       <EmojiPicker open={open} onEmojiClick={handleEmoji}/>
          </div>
 

          <img src="./emoji.png" alt="" onClick={()=>setOpen((prev)=>!prev)}/>
        </div>
        <button className="sendButton">Send</button>

      </div>
    </div>
  )
}

export default Chat