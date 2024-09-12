import { doc, getDoc } from 'firebase/firestore'
import {create} from 'zustand'
import { db } from './firebase'
import useUserStore from './userStore'

const useChatStore = create((set)=>({
    chatId: null,
    user:null,
    isCurrentUserBlocked:false,
    isRecieverBlocked:false,
    
    changeChat: (chatId,user)=>{
        const currentUser =  useUserStore.getState().currentUser
        // console.log(currentUser)
        // console.log(user)

        //CHECk IF Current user is blocked
            if(user.blocked.includes(currentUser.id)){
                return set({
                    chatId: chatId,
                    user:null,
                    isCurrentUserBlocked:true,
                    isRecieverBlocked:false,
                })
            }

        //CHECk IF Reciever user is blocked
        else if(currentUser.blocked.includes(user.id)){
            return set({
                chatId: chatId,
                user:null,
                isCurrentUserBlocked:false,
                isRecieverBlocked:true,
            })
        }
        
        return set({
            chatId: chatId,
            user,
            isCurrentUserBlocked:false,
            isRecieverBlocked:false,
        })
    
     
    },
    changeBlock: ()=>{
        set(state=>({...state,isRecieverBlocked: !state.isRecieverBlocked}))
    }
}))

export default useChatStore