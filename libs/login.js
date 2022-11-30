import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../utils/firebase";

export default function login(router,dispatch,action){
    signInWithPopup(auth,provider)
    .then(res=>{
        dispatch(action(res.user))
        router.push('/')
    })
    .catch(error=>{
        console.log(error)
    })
}