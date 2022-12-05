import { useEffect, useState } from "react";
import toast from 'react-hot-toast';
import getAllCategory from "../../libs/getAllCategory";
import {v4 as uuidv4} from "uuid";
import handleInput from "../../libs/handleInput";
import 'react-quill/dist/quill.snow.css';
import dynamic from "next/dynamic";
import { postQnaQuestion } from "../../libs/qnaHandler";
import { useSelector } from "react-redux";
import { serverTimestamp } from "firebase/firestore";
const ReactQuill = dynamic(import('react-quill'), { ssr: false })

export default function CreateNew(){
    const user = useSelector(state=>state.auth.user)
    const [value,setValue] = useState()
    const [categories,setCategories] = useState([])
    const [question,setQuestion] = useState({
        id : uuidv4(),
        user : user.id,
        createdAt: Date.now(),
        category : '',
        question: ''
    })

    const qnaData = ({...question,details : value});

    useEffect(()=>{
        getAllCategory(setCategories)
    },[])

    
    const modules ={
        toolbar: [
        [{ font: [] }],
        [{ header: [1, 2, 3, 4, 5, 6, false] }],
        ["bold", "italic", "underline", "strike"],
        [{ color: [] }, { background: [] }],
        [{ script:  "sub" }, { script:  "super" }],
        ["blockquote", "code-block"],
        [{ list:  "ordered" }, { list:  "bullet" }],
        [{ indent:  "-1" }, { indent:  "+1" }, { align: [] }],
        ["link", "image", "video"],
        ["clean"],
    ],
    }

    return(
        <div className="create_new">
            <h1>আপনার প্রশ্ন করুন</h1>

            <select  name="category" value={question.category} onChange={(e)=>handleInput(e,question,setQuestion)}>
                <option value="">প্রশ্ন বিভাগ বাছাই করুন</option>
                {
                    categories.length > 0 && categories.map((category,i)=><option key={i} value={category.name}>{category.name}</option>)
                }
            </select>

            <input type="text" name="question" value={question.question} placeholder="এখানে প্রশ্নটি লিখুন" onChange={(e)=>handleInput(e,question,setQuestion)}/>

            <div className="editor">
                <ReactQuill modules={modules} onChange={setValue} placeholder="আপনার প্রশ্নের বিস্তারিত লিখুন (যদি থাকে)" style={{height:"400px"}}/>
            </div>

            <button onClick={()=>postQnaQuestion(qnaData,toast)}>সাবমিট করুন</button>
        </div>
    )
}