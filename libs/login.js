import { signInWithPopup } from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { auth, db, provider } from "../database/initDatabase";
import jwt from "jsonwebtoken"

export default async function login(router,dispatch,action){
    try {
        signInWithPopup(auth,provider)
        .then(async(res)=>{
            const docRef= doc(db,'users',res.user.uid)
            const user = await getDoc(docRef);

            if (user.exists()) {
                // const token = await jwt.sign({id : user.data().id},process.env.NEXT_PUBLIC_JWT_SECRET)
                // localStorage.setItem(token)
                dispatch(action(user.data()))
                router.push('/')
            } else {
                await setDoc (doc(db,'users',res.user.uid),{
                    id : res.user.uid,
                    name : res.user.displayName,
                    email : '',
                    image : res.user.photoURL,
                    joinQuizes : [],
                    role : 'General user',
                    createdAt : Date.now(),
                })
                const user = await getDoc(docRef);
                // const token = await jwt.sign({id : user.data().id},process.env.NEXT_PUBLIC_JWT_SECRET)
                // localStorage.setItem(token)
                dispatch(action(user.data()))
                router.push('/')
            }
        })
        .catch(error=>{
            console.log(error)
        })
    } catch (error) {
        console.log(error)
    }
}