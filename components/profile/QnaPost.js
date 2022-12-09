import Link from "next/link"
import { useEffect } from "react"
import { useState } from "react"
import { getQnaQuestion } from "../../libs/qnaHandler"


export default function QnaPost({id}){
    const [qna,setQna] = useState({})
    useEffect(()=>{
        getQnaQuestion(id,setQna)
    },[id])
    console.log(qna);
    return(
        <div className="">
            <Link href={`/qna/details/${id}`}><a>{qna.question}</a></Link>
        </div>
    )
}