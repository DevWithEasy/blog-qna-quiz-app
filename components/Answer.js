import { useState } from "react";
import {v4 as uuidv4} from "uuid";
import 'react-quill/dist/quill.bubble.css';
import dynamic from "next/dynamic";
import { postQnaAnswer } from "../libs/qnaHandler";
import toast from "react-hot-toast";
const ReactQuill = dynamic(import('react-quill'), { ssr: false })

export default function Answer({user,qId}){
    const [value,setValue] = useState('')
    const answerData = {
        id:uuidv4(),
        qId:qId,
        user,
        answer:value,
        createdAt:Date.now()
    }
    const modules ={
        toolbar: [
            [{ font: [] }],
            [{ header: [1, 2, 3, 4, 5, 6, false] }],
            ["bold", "italic", "underline"],
            [{ color: [] }, { background: [] }],
            [{ list:  "ordered" }, { list:  "bullet" }],
            [{ indent:  "-1" }, { indent:  "+1" }, { align: [] }],
            ["clean"]
        ]
    }
    return(
        <div className="editor">
            <ReactQuill modules={modules}
                theme="bubble"
                value={value}
                onChange={setValue} placeholder="আপনার উত্তরটি লিখুন" style={{height:"150px"}}
            />
            <button onClick={()=>postQnaAnswer(answerData,toast)}>সাবমিট</button>
        </div>
    )
}