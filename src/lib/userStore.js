import { doc, getDoc } from 'firebase/firestore'
import {create} from 'zustand'
import { db } from './firebase'

const useUserStore = create((set)=>({
    currentUser: null,
    isLoading: true,
    fetchUserInfo: async (uid)=>{
        if(!uid){
            return set({currentUser:null, isLoading:false})
        }

        try {
            const docRef = doc(db, "users", uid);
            const docSnap = getDoc(docRef)

            if ((await docSnap).exists) {
                // console.log("Document Data: ",(await docSnap).data())
                set({currentUser:(await docSnap).data(), isLoading:false})
            }else{
                set({currentUser:null, isLoading:false})

            }
        } catch (error) {
            console.log(error)
            return set({currentUser:null, isLoading:false})

        }
    }
}))

export default useUserStore