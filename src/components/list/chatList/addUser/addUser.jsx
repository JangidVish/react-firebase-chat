import React, { useState } from 'react'
import "./addUser.css"
import {arrayUnion, collection,doc,getDoc,getDocs,query,serverTimestamp,setDoc,updateDoc,where} from "firebase/firestore"
import {db} from "../../../../lib/firebase"
import useUserStore from "../../../../lib/userStore"



const AddUser = () => {
  const [user, setUser] = useState(null)
  const [userFound, setUserFound]= useState(false)

  const {currentUser}= useUserStore()

  const handleSearch = async(e) =>{
    e.preventDefault();


    // const formData = new FormData()
    const username = e.target.username.value

    try {
      const userRef = collection(db, "users")

      const q = query(userRef, where("username", "==", username))

      const querySnapShot = await getDocs(q)

      if(!querySnapShot.empty){
        setUserFound(true)
        setUser(querySnapShot.docs[0].data())
      }else{
        setUserFound(false)
      }
    } catch (error) {
      console.log("Error while fetching user: "+error)
    }
  }

  const handleAdd =async() =>{
    const chatRef =  collection(db,"chats") 
    const userChatRef =  collection(db,"userchats") 

    
    
    try {
        const newChatRef= doc(chatRef)

        await setDoc(newChatRef,{
          createdAt: serverTimestamp(),
          messages:[]
        })

        await updateDoc(doc(userChatRef, user.id),{
          chats: arrayUnion({
            chatId: newChatRef.id,
            lastMessage:"",
            recievedId: currentUser.id,
            updatedAt: Date.now()

          })
        })

        await updateDoc(doc(userChatRef, currentUser.id),{
          chats: arrayUnion({
            chatId: newChatRef.id,
            lastMessage:"",
            recievedId: user.id,
            updatedAt: Date.now()

          })
        })

        // console.log(newChatRef.id)
      } catch (error) {
        console.log("Error while adding to list: "+error)
      }
  }
  return  (
    <div className='addUser'>
        <form action="" onSubmit={handleSearch}>
            <input type="search" name="username" placeholder='name' id="" />
            <button>Search</button>
        </form>
        {userFound && <div className="user">
            <div className="detail">
                <img src={user.avatar || "./avatar.png"} alt=""/>
                <span>{user.username}</span>
            </div>
            <button onClick={handleAdd}>Add User</button>
        </div>}
    </div>
  )
}
export default AddUser