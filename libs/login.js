import { signInWithPopup } from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { auth, db, provider } from "../utils/firebase";

export default async function login(router,dispatch,action){
    try {
        signInWithPopup(auth,provider)
        .then(async(res)=>{
            const docRef= doc(db,'users',res.user.uid)
            const user = await getDoc(docRef);

            if (user.exists()) {
                dispatch(action(user.data()))
                router.push('/')
            } else {
                await setDoc (doc(db,'users',res.user.uid),{
                    id : res.user.uid,
                    name : res.user.displayName,
                    email : 'hello',
                    image : res.user.photoURL,
                    joinQuizes : [],
                    scores :  [],
                    type : 'user'
                })
                const user = await getDoc(docRef);
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