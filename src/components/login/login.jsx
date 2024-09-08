import { useState } from "react"
import "./login.css"
import { toast } from "react-toastify";
const Login = () => {

    const [avatar, setAvatar]= useState({
        file:null,
        Url:""}
    );

    const changeImage = e =>{
        if(e.target.files[0]){
        setAvatar({
            file: e.target.files[0],
            Url: URL.createObjectURL(e.target.files[0])
        })
    }
    }
    
    const handleLogin = (e) =>{
        e.preventDefault()
        toast.warn("Hello")
    }

    const handleSignUp = e =>{
        e.preventDefault()
        toast.success("Signed In Successfully")
    }

  return (
    <div className="login">
        <div className="item">
            <h2>Welcome back,</h2>
            <form action="" onSubmit={handleLogin}>
                <input type="email" name="email" placeholder="Email" id="" />
                <input type="password" name="password" placeholder="Password" id="" />

                <button type="submit">Sign In</button>
            </form>
        </div>
        <div className="seprator"></div>
        <div className="item">
        <h2>Create an Account</h2>
            <form action="" onSubmit={handleSignUp}>
                <label htmlFor="file">
                    <img src={avatar.Url || "./avatar.png"} alt=""  />
                    Upload an Image</label>
                <input type="file" name="" id="file" style={{display: "none"}} onChange={changeImage}/>
                <input type="text" name="username" placeholder="Username" id="" />
                <input type="email" name="email" placeholder="Email" id="" />
                <input type="password" name="password" placeholder="Password" id="" />

                <button type="submit">Sign Up</button>
            </form>
        </div>
    </div>
  )
}


export default Login