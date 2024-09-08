import React from 'react'
import "./addUser.css"
const addUser = () => {
  return  (
    <div className='addUser'>
        <form action="">
            <input type="search" name="username" placeholder='name' id="" />
            <button>Search</button>
        </form>
        <div className="user">
            <div className="detail">
                <img src="./avatar.png" alt=""/>
                <span>John Doe</span>
            </div>
            <button>Add User</button>
        </div>
    </div>
  )
}
export default addUser