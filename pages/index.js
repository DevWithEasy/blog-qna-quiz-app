import { useEffect } from "react"
import { useState } from "react"
import Blog from "../components/blog/Blog"
import {getAllBlogPost} from "../libs/blogHandler"

export default function Home(){
    const [blogs,setBlogs] = useState([])
    useEffect(()=>{
        getAllBlogPost(setBlogs)
    },[])
    return(
        <div className="index">
            {blogs && blogs.map(blog=><Blog key={blog.id} blog={blog}/>)}
        </div>
    )
}