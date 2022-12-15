import axios from "axios";
import { doc, getDoc } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { db, storage } from "../database/initDatabase";

export async function uploadFile(file,setUploadStart,setProgress,setUrl,toast){
    if(!file) return toast.error('ছবি আপলোড করুন')
    if(file.size > 1000000) return toast.error('০১ মেগাবাইটের নিচে ছবি আপলোড করুন')

    setUploadStart(true)
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
                setUploadStart(false)
            })
            .catch(error=>{
                console.log(error)
            })
        })
}

export async function postBlog(data,router,toast){
    const {catId,title,details,image} = data
    if(!catId) return toast.error('বিভাগ বাছাই করুন ।')
    if(!title) return toast.error('টাইটেল লিখুন ।')
    if(!image) return toast.error('ছবি আপলোড করেন নি।')
    if(!details) return toast.error('কমপক্ষে ৩০০ অক্ষরের পোস্ট করতে হবে।')
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

export async function deleteBlog(id){
    try {

    }catch (error) {
        console.log(error);
    }
}

export async function updateBlog(id,postData,router,toast){
    try {
        const res = await axios.put(`/api/blog/${id}`,postData)
        if(res.data){
            router.push(`/blog/details/${id}`)
            toast.success(res.data.message)
        }
    }catch (error) {
        console.log(error);
    }
}

export async function likeBlog(id,user,dispatch,action){
    try {
        const res = await axios.post(`/api/blog/like/${id}`,{},{
            headers: {
                "access_token": localStorage.getItem("access_token")
            }})
        if(res.data){
            dispatch(action(user))
        }
    }catch (error) {
        console.log(error);
    }
}

export async function dislikeBlog(id,user,dispatch,action){
    try {
        const res = await axios.post(`/api/blog/dislike/${id}`,{},{
            headers: {
                "access_token": localStorage.getItem("access_token")
            }})
            if(res.data){
                dispatch(action(user))
            }
    }catch (error) {
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

export async function getBlogPostPagination(page,setBlogs){
    try {
        const res = await axios.get(`/api/blog/pagination/${page}`)
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

export async function getCategoryBlogPostPagination(id,no,setBlogs){
    try {
        const res = await axios.post(`/api/blog/search/category/pagination/`,{id,no})
        if(res.data){
            setBlogs(res.data.data)
        }
    } catch (error) {
        console.log(error);
    }
}