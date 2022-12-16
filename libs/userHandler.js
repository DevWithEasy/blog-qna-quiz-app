import axios from "axios";

export async function signup(e,data,router,toast){
    e.preventDefault()
    try {
        if(!data.name) return toast.error("আপনার নাম লিখেন নি।")
        if(!data.number) return toast.error("আপনার মোবাইল নাম্বার লিখেন নি।")
        if(!data.email) return toast.error("আপনার ই-মেইল লিখেন নি।")
        if(!data.password) return toast.error("আপনার পাসওয়ার্ড লিখেন নি।")
        const res = await axios.post(`/api/user/signup`,data)
        if(res.data){
            router.push('/user/signin')
            toast.success(res.data.message)
        }
        
    } catch (error) {
        toast.error(error.response.data.message);
    }
}

export async function signin(e,data,router,dispatch,action,toast){
    e.preventDefault()
    try {
        if(!data.email) return toast.error("আপনার ই-মেইল লিখেন নি।")
        if(!data.password) return toast.error("আপনার পাসওয়ার্ড লিখেন নি।")
        const res = await axios.post(`/api/user/signin`,data)
        if(res.data){
            dispatch(action(res.data.data))
            router.push('/')
            localStorage.setItem('access_token',res.data.token)
        }
        
    } catch (error) {
        toast.error(error.response.data.message);
    }
}