import { useRouter } from "next/router";
import { useSelector } from "react-redux";

export default function Index() {
    const user = useSelector(state=>state.auth.user)
    const router = useRouter()
    if(!user.id){
        router.push('/user/login')
    }
    if(user.id){
        router.push('/home')
    }
}