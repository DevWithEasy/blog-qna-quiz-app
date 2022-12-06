import { useEffect, useState } from "react"
import toast from "react-hot-toast"
import { useDispatch, useSelector } from "react-redux"
import { getAllComments } from "../../libs/qnaHandler"
import SingleComment from "./SingleComment"


export default function Comments({ansId}){
    const refresh = useSelector((state) => state.qna.refresh)
    const [comments,setComments] = useState([])
    useEffect(()=>{
        getAllComments(ansId,setComments,toast)
    },[ansId,refresh])
    return (
        <div className="qna_comments">
            {comments.length > 0 && <span>এই উত্তরের মন্তব্য সমূহ :-</span>}
            {comments && comments.map(comment=><SingleComment key={comment.id} comment={comment}/>)}
        </div>
    )
}