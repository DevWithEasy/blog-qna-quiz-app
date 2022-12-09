import Link from "next/link"
import { useEffect } from "react"
import { useState } from "react"
import { getBlogPost } from "../../libs/blogHandler"

export default function BlogPost({id}){
    const [blog,setBlog] = useState({})
    useEffect(()=>{
        getBlogPost(id,setBlog)
    },[id])
    console.log(blog);
    return(
        <div className="">
            <Link href={`/blog/details/${id}`}><a>{blog.title}</a></Link>
        </div>
    )
}