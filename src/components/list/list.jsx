import UserInfo from "./userInfo/userInfo"
import ChatList from "./chatList/chatList"

import "./list.css"
const list = () => {
  return (
    <div className="list">
      <UserInfo />
      <ChatList />
    </div>
  )
}

export default list