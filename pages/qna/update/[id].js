import { useEffect, useState } from "react";
import toast from 'react-hot-toast';
import {v4 as uuidv4} from "uuid";
import 'react-quill/dist/quill.snow.css';
import dynamic from "next/dynamic";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";
import getAllCategory from "../../../libs/getAllCategory";
import handleInput from "../../../libs/handleInput";
import modules from "../../../utils/editorModule";
import { updateQnaQuestion } from "../../../libs/qnaHandler";
import baseUrl from "../../../utils/baseUrl";
const ReactQuill = dynamic(import('react-quill'), { ssr: false })

export async function getServerSideProps({query}){
    let  qna
    try {
        const qnaRes = await fetch(`${baseUrl}/api/qna/question/${query.id}`)
        const qnaData = await qnaRes.json()
        qna = qnaData.data
    } catch (error) {
        console.log(error);
    }
return{
    props : {qna}
}
}

export default function CreateNew({qna}){
    const router = useRouter()
    const [value,setValue] = useState(qna.details)
    const [categories,setCategories] = useState([])
    const [question,setQuestion] = useState(qna)

    const qnaData = ({...question,details : value});

    useEffect(()=>{
        getAllCategory(setCategories)
    },[])
    console.log(qna);
    return(
        <div className="create_new">
            <h1>আপনার প্রশ্ন করুন</h1>

            <select  name="catId" onChange={(e)=>handleInput(e,question,setQuestion)}>
                <option value={question.catId}>{question.category}</option>
                {
                    categories.length > 0 && categories.map((category,i)=><option key={i} value={category.id}>{category.name}</option>)
                }
            </select>

            <input type="text" name="question" value={question.question} placeholder="এখানে প্রশ্নটি লিখুন" onChange={(e)=>handleInput(e,question,setQuestion)}/>

            <div className="editor">
                <ReactQuill modules={modules}
                theme="snow"
                value={value}
                onChange={setValue} placeholder="আপনার প্রশ্নের বিস্তারিত লিখুন (যদি থাকে)" style={{height:"400px"}}/>
            </div>

            <button onClick={()=>updateQnaQuestion(qna.id,qnaData,router,toast)}>সাবমিট করুন</button>
        </div>
    )
}