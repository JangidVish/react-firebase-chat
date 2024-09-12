import "./details.css"
import {auth, db} from "../../lib/firebase"
import useUserStore from "../../lib/userStore"
import useChatStore from "../../lib/chatStore"
import { arrayRemove, arrayUnion, doc, updateDoc } from "firebase/firestore"

const Details = () => {
  const {currentUser}= useUserStore()
  
  const { chatId,user, isCurrentUserBlocked,isRecieverBlocked,changeBlock} = useChatStore();
  const handleBlock =async ()=>{
    if(!user) return;
    const userDocRef = doc(db,"users", currentUser.id)
    try {

      await updateDoc(userDocRef,{
        blocked: isRecieverBlocked ? arrayRemove(user.id): arrayUnion(user.id)

      }
      )
      changeBlock()
    } catch (error) {
      console.log(error)
    }

  }

  return (
    <div className= "details">
      <div className="user">
      <img src={user?.avatar || "./avatar.png"} alt="" />
        <h2>{user.username}</h2>
        <p>Lorem ipsum dolor sit amet.</p>
        <div className="info">
          <div className="option">
            <div className="title">
              <span>Privacy & Help</span>
              <img src="./arrowUp.png" alt=""  />
              </div>
          </div>

          <div className="option">
            <div className="title">
              <span>Shared photos</span>
              <img src="./arrowDown.png" alt=""  />
              </div>
             


              <div className="photos">
                <div className="photoItem">
                  <div className="photoDetail">
                  <img src="https://images.unsplash.com/photo-1725133306731-fd82b613300f?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHw3MHx8fGVufDB8fHx8fA%3D%3D" alt="" />
                  <span>photo_2024_2.png</span>
                  </div>
                <img src="./download.png" alt=""/>

                </div>
              </div>

              <div className="photos">
                <div className="photoItem">
                  <div className="photoDetail">
                  <img src="https://images.unsplash.com/photo-1725133306731-fd82b613300f?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHw3MHx8fGVufDB8fHx8fA%3D%3D" alt="" />
                  <span>photo_2024_2.png</span>
                  </div>
                <img src="./download.png" alt=""/>

                </div>
              </div>

              <div className="photos">
                <div className="photoItem">
                  <div className="photoDetail">
                  <img src="https://images.unsplash.com/photo-1725133306731-fd82b613300f?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHw3MHx8fGVufDB8fHx8fA%3D%3D" alt="" />
                  <span>photo_2024_2.png</span>
                  </div>
                <img src="./download.png" alt=""/>

                </div>
              </div>

          
          </div>

          <div className="option">
            <div className="title">
              <span>Shared Files</span>
              <img src="./arrowUp.png" alt=""  />
              </div>
          </div>

          <button onClick={handleBlock}>
            {isCurrentUserBlocked?"You are Blocked":isRecieverBlocked?"User Blocked":"Block User"}</button>
          <button className="logout" onClick={()=>auth.signOut()}>Logout</button>

        </div>

      </div>
    </div>
  )
}

export default Details