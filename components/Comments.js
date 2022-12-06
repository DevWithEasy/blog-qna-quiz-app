import { useEffect, useState } from "react"
import toast from "react-hot-toast"
import { useDispatch, useSelector } from "react-redux"
import { getAllComments } from "../libs/qnaHandler"
import SingleComment from "./SingleComment"


export default function Comments({ansId}){
    const dispatch = useDispatch()
    // const answers = useSelector(state=>state.qna.answers)
    const [comments,setComments] = useState([])
    useEffect(()=>{
        getAllComments(ansId,setComments,toast)
    },[ansId])
    return (
        <div className="qna_comments">
            {comments && comments.map(comment=><SingleComment key={comment.id} comment={comment}/>)}
        </div>
    )
}