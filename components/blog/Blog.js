import { useEffect, useState } from "react"
import toast from "react-hot-toast"
import findUser from "../../libs/findUser"
import {BiCalendar} from "react-icons/bi"
import {FaComment} from "react-icons/fa"
import {AiOutlineFolderView} from "react-icons/ai"
import {AiFillLike} from "react-icons/ai"
import { format } from "timeago.js"
import Link from "next/link"
import { getAllBlogComment } from "../../libs/blogHandler"

export default function Blog({blog}){
    const [comments,setComments] = useState([])
    const [user,setUser] = useState({})
    useEffect(()=>{
        getAllBlogComment(blog.id,setComments)
        findUser(blog.user,setUser,toast)
    },[blog])
    return(
        <div className="blog">
            <div className="blog_image">
                <img src={blog.image} alt="blog_image" />
            </div>
            <div className="blog_details">
                <Link href={`/blog/details/${blog.id}`}><a>{blog.title}</a></Link>
                <p className="details_short" dangerouslySetInnerHTML={{__html: blog.details.slice(0,100)}}></p>
                <p className="md_options_hide">
                    <span>{format(blog.createdAt)}</span>
                    <span className="comments">{comments.length} মন্তব্য</span>
                </p>
                <div className="blog_details_option">
                    <span>{blog.category}</span>
                    <p>
                        <img src={user?.image} alt="user_image" />
                        <span>{user?.name}</span>
                    </p>
                    <p>
                        <BiCalendar/>
                        <span>{format(blog.createdAt)}</span>
                    </p>
                    <p>
                        <FaComment/>
                        <span>{comments.length}</span>
                    </p>
                    <p>
                        <AiOutlineFolderView/>
                        <span>{blog.views}</span>
                    </p>
                    <p>
                        <AiFillLike/>
                        <span>{blog.likes.length}</span>
                    </p>
                </div>
            </div>
        </div>
    )
}