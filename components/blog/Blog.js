import { useEffect, useState } from "react"
import toast from "react-hot-toast"
import findUser from "../../libs/findUser"
import {BiCalendar} from "react-icons/bi"
import {FaComment} from "react-icons/fa"
import {GrView} from "react-icons/gr"
import {AiFillLike} from "react-icons/ai"
import { format } from "timeago.js"

export default function Blog({blog}){
    const [comments,setComments] = useState([])
    const [user,setUser] = useState({})
    useEffect(()=>{
        findUser(blog.user,setUser,toast)
    },[blog])
    return(
        <div className="blog">
            <div className="blog_image">
                <img src={blog.image} alt="" />
            </div>
            <div className="blog_details">
                <h3>{blog.title}</h3>
                <div className="blog_details_option">
                    <span>{blog.category}</span>
                    <p>
                        <img src={user?.image} alt="" />
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
                        <GrView/>
                        <span>{blog.views}</span>
                    </p>
                    <p>
                        <AiFillLike/>
                        <span>{blog.likes}</span>
                    </p>
                </div>
            </div>
        </div>
    )
}