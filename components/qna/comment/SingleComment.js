import Link from "next/link";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { format } from "timeago.js";
import findUser from "../../../libs/findUser";

export default function SingleComment({comment}){
    const [user,setUser] = useState({})
    useEffect(()=>{
        findUser(comment.user,setUser,toast)
    },[comment])
    console.log(user);
    return(
        <div className="qna_comments_details">
            <div className="qna_comment">
                <div className="comment_details">
                    <div className="comment_details_image">
                        <img src={user?.image} alt="" />
                        <div>
                            <p>{format(comment.createdAt)}</p> 
                            <p>
                                <span>মন্তব্য করেছেন</span> 
                                <Link href={`/user/profile/${user.id}`}>
                                    <a >{user.name}</a>
                                </Link>
                            </p>
                        </div>
                    </div>
                    <hr/>
                    <div className="details">
                        <p className="details" dangerouslySetInnerHTML={{__html: comment?.comment}}></p>
                    </div>
                </div>
            </div>

            
        </div>
    )
}