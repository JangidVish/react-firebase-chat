import { useState } from "react"
import "./login.css"
import { toast } from "react-toastify";
import {createUserWithEmailAndPassword, signInWithEmailAndPassword} from "firebase/auth"
import {doc, setDoc} from "firebase/firestore"
import {auth, db} from "../../lib/firebase"
import upload from "../../lib/uploadImage";
const Login = () => {

    const [avatar, setAvatar]= useState({
        file:null,
        Url:""}
    );

    const [loading, setLoading] = useState(false)

    const changeImage = e =>{
        if(e.target.files[0]){
        setAvatar({
            file: e.target.files[0],
            Url: URL.createObjectURL(e.target.files[0])
        })
    }
    }
    
    const handleLogin = async (e) =>{
        e.preventDefault()
        setLoading(true)

        const formData = new FormData(e.target)
        
        const {email, password}= Object.fromEntries(formData)
        // toast.warn("Hello")
        try {
           await signInWithEmailAndPassword(auth, email, password);
           toast.success("User authenticated Successfully")
        } catch (error) {
            console.log(error)
            toast.error("Error Occured: "+error.message)
        }finally{
            setLoading(false)
        }
    }

    const handleSignUp = async (e) =>{
        e.preventDefault()
        setLoading(true)
        const formData = new FormData(e.target)
        
        const {username, email, password}= Object.fromEntries(formData)
    
        try {
          const res = await createUserWithEmailAndPassword(auth, email, password)

          const imgUrl = await upload(avatar.file);

          await setDoc(doc(db, "users", res.user.uid),{
            username: username,
            email: email,
            avatar: imgUrl,
            id: res.user.uid,
            blocked:[]
          })
          
          await setDoc(doc(db, "userchats", res.user.uid),{
                chats: []
          })

            toast.success("Account Created, You can login now")
        } catch (error) {
            console.log(error)
            toast.error("Error Occured: " + error)
        }finally{
            setLoading(false);
        }
    }

  return (
    <div className="login">
        <div className="item">
            <h2>Welcome back,</h2>
            <form action="" onSubmit={handleLogin}>
                <input type="email" name="email" placeholder="Email" id="" />
                <input type="password" name="password" placeholder="Password" id="" />

                <button type="submit" disabled={loading}>{loading? "Loading" : "Sign In"}</button>
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

                <button type="submit" disabled={loading}>{loading? "Loading" : "Sign Up"}</button>
            </form>
        </div>
    </div>
  )
}


export default Login