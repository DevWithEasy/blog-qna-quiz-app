import SingleComment from "./SingleComment"

export default function Comments({comments}){
    return (
        <div className="qna_comments">
            {comments.length > 0 && <span>এই পোস্টের মন্তব্য সমূহ :-</span>}
            {comments && comments.map(comment=><SingleComment key={comment.id} comment={comment}/>)}
        </div>
    )
}