import axios from "axios";
import { ref, uploadBytesResumable,getDownloadURL  } from "firebase/storage";
import { storage } from "../database/initDatabase";

export async function uploadFile(file,setProgress,setUrl,toast){
    if(!file) return toast.error('ছবি আপলোড করুন')
    if(file.size > 1000000) return toast.error('০১ মেগাবাইটের নিচে ছবি আপলোড করুন')
    // if(file.type === "image/png" || file.type === "image/jpg" || file.type === "image/jepg") {
    //     const storageRef = ref(storage,`islamBD/blog_post/${file.name}`)
    //     const uploadTask = uploadBytesResumable(storageRef, file)
    //     uploadTask.on("state_changed",(snapshot)=>{
    //         const progress = Math.round(snapshot.bytesTransferred/snapshot.totalBytes) * 100
    //         setProgress(progress)
    //     },(error)=>{
    //         console.log(error);
    //     },()=>{
    //         getDownloadURL(uploadTask.snapshot.ref)
    //         .then(url=>{
    //             setUrl(url)
    //         })
    //         .catch(error=>{
    //             console.log(error)
    //         })
    //     })

    // }else{
    //     return toast.error('শুধুমাত্র ছবি আপলোড করতে পারবেন।')
    // }
    const storageRef = ref(storage,`islamBD/blog_post/${file.name}`)
        const uploadTask = uploadBytesResumable(storageRef, file)
        uploadTask.on("state_changed",(snapshot)=>{
            const progress = Math.round(snapshot.bytesTransferred/snapshot.totalBytes) * 100
            setProgress(progress)
        },(error)=>{
            console.log(error);
        },()=>{
            getDownloadURL(uploadTask.snapshot.ref)
            .then(url=>{
                setUrl(url)
            })
            .catch(error=>{
                console.log(error)
            })
        })
}

export async function postBlog(data,router,toast){
    try {
        const res = await axios.post('/api/blog',data)
        if(res.data){
            router.push('/')
            toast.success('সফলভাবে')
        }
    } catch (error) {
        console.log(error);
    }
}

export async function getAllBlogPost(setBlogs){
    try {
        const res = await axios.get('/api/blog/all')
        if(res.data){
            setBlogs(res.data.data)
        }
    } catch (error) {
        console.log(error);
    }
}

export async function getBlogPost(id,setBlog){
    try {
        const res = await axios.get(`/api/blog/${id}`)
        if(res.data){
            setBlog(res.data.data)
        }
    } catch (error) {
        console.log(error);
    }
}

export async function postBlogComment(data,dispatch,action,setValue,toast){
    try {
        const res = await axios.post('/api/blog/comment',data)
        if(res.data){
            dispatch(action(Math.random()))
            setValue("")
            toast.success('সফলভাবে')
        }
    } catch (error) {
        console.log(error);
    }
}

export async function getAllBlogComment(id,setComments){
    try {
        const res = await axios.get(`/api/blog/comment/all/${id}`)
        if(res.data){
            setComments(res.data.data)
        }
    } catch (error) {
        console.log(error);
    }
}