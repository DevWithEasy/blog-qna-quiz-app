import dynamic from "next/dynamic";
import { useState } from "react";
import toast from "react-hot-toast";
import 'react-quill/dist/quill.bubble.css';
import { useDispatch, useSelector } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import { postQnaComment } from "../../../libs/qnaHandler";
import { refresh } from "../../../store/slice/qnaSlice";
const ReactQuill = dynamic(import('react-quill'), { ssr: false })

export default function Comment({ansId,setComment}){
    const dispatch = useDispatch()
    const [value,setValue] = useState('')
    const commentData = {
        id:uuidv4(),
        ansId:ansId,
        comment:value,
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
    console.log(commentData);
    return(
        <div className="editor">
            <ReactQuill modules={modules}
                theme="bubble"
                value={value}
                onChange={setValue} placeholder="আপনার মন্তব্য লিখুন" style={{height:"150px"}}
            />
            <div className="submit">
                <button className="ok" onClick={()=>postQnaComment(commentData,dispatch,refresh,setComment,setValue,toast)}>সাবমিট</button>
                <button className="cancel" onClick={()=>setComment(false)}>বাতিল</button>
            </div>
        </div>
    )
}