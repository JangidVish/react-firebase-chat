import { useEffect } from "react"
import Chat from "./components/chat/chat"
import Details from "./components/details/details"
import List from "./components/list/list"
import Login from "./components/login/login"
import Notification from "./components/notification/notification"
import { onAuthStateChanged } from "firebase/auth"
import {auth} from "./lib/firebase"
import useUserStore from "./lib/userStore"


const App = () => {


  const {currentUser, isLoading, fetchUserInfo}= useUserStore()
  useEffect(()=>{
    const unSub = onAuthStateChanged(auth, (user)=>{
      // console.log(user)
      fetchUserInfo(user?.uid)

    })

    return ()=>{
      unSub();
    }
  },[fetchUserInfo])
  console.log(currentUser)
  if (isLoading) {
    return <div className="loading">Loading....</div>
  }
  return (
    <div className='container'>
      {currentUser ? (
        <>
         <List />
         <Chat />
         <Details />
         </>
      ):(<Login />)}
      
     <Notification />
    </div>
  )
}

export default App