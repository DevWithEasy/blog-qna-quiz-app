import { useState } from "react";
import {v4 as uuidv4} from "uuid";
import 'react-quill/dist/quill.bubble.css';
import dynamic from "next/dynamic";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";

import { postQnaAnswer } from "../../../libs/qnaHandler";
import { refresh } from "../../../store/slice/qnaSlice";
const ReactQuill = dynamic(import('react-quill'), { ssr: false })

export default function Answer({qId,setAnswer}){
    const dispatch = useDispatch()
    const user = useSelector(state=>state.auth.user)
    const [value,setValue] = useState('')
    const answerData = {
        id:uuidv4(),
        qId:qId,
        user : user.id,
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
            <div className="submit">
                <button className="ok" onClick={()=>postQnaAnswer(answerData,dispatch,refresh,setAnswer,setValue,toast)}>সাবমিট</button>
                <button className="cancel" onClick={()=>setAnswer(false)}>বাতিল</button>
            </div>
        </div>
    )
}