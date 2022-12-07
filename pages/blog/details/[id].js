import { useRouter } from "next/router"
import { useEffect } from "react";
import { useState } from "react";
import { getBlogPost } from "../../../libs/blogHandler";
import findUser from "../../../libs/findUser";
import {BiCalendar} from "react-icons/bi"
import {FaComment} from "react-icons/fa"
import {AiOutlineFolderView} from "react-icons/ai"
import {AiFillLike} from "react-icons/ai"
import { format } from "timeago.js"

export default function BlogDetails(){
    const router = useRouter()
    const [blog,setBlog] = useState({})
    const [user,setUser] = useState({})
    const [comments,setComments] = useState([])
    useEffect(()=>{
        getBlogPost(router.query.id,setBlog)
    },[router.query.id])

    useEffect(()=>{
        if(blog.user){findUser(blog.user,setUser)}
    },[blog])

    console.log(blog,user);
    return(
        <div className="blog_details">
            <div className="blog_details_title">
                <img src={blog?.image} alt="blog_image" />
                <div>
                    <p className="category">{blog.category}</p>
                    <h1>{blog.title}</h1>
                    <p className="user">
                        <img src={user?.image} alt="" />
                        <span>{user?.name}</span>
                    </p>
                    <div className="blog_details_option">
                        <p>
                            <BiCalendar/>
                            <span>{format(blog?.createdAt)}</span>
                        </p>
                        <p>
                            <FaComment/>
                            <span>{comments?.length}</span>
                        </p>
                        <p>
                            <AiOutlineFolderView/>
                            <span>{blog?.views}</span>
                        </p>
                        <p>
                            <AiFillLike/>
                            <span>{blog?.likes?.length}</span>
                        </p>
                    </div>
                </div>
            </div>
            <div className="blog_details_details">
            <p className="details_short" dangerouslySetInnerHTML={{__html: blog.details}}></p>
            </div>
        </div>
    )
}