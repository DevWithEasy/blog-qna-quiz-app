import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import 'react-quill/dist/quill.snow.css';
import { useSelector } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import { postBlog, uploadFile } from "../../libs/blogHandler";
import getAllCategory from "../../libs/getAllCategory";
import handleInput from "../../libs/handleInput";
import modules from "../../utils/editorModule";
const ReactQuill = dynamic(import('react-quill'), { ssr: false })


export default function CreateNew(){
    const router = useRouter()
    const user = useSelector(state=>state.auth.user)
    const [value,setValue] = useState()
    const [categories,setCategories] = useState([])
    const [file,setFile] = useState({})
    const [url,setUrl] = useState('')
    const [progress,setProgress] = useState(0)
    const [question,setQuestion] = useState({
        id : uuidv4(),
        user : user.id,
        category : '',
        title: '',
        createdAt:Date.now(),
        likes : [],
        dislikes :[],
        views : 0,
    })

    const postData = ({...question, image : url, details : value});

    useEffect(()=>{
        getAllCategory(setCategories)
    },[])

    return(
        <div className="create_new">
            <h1>আপনার পোস্ট করুন</h1>

            <select  name="category" value={question.category} onChange={(e)=>handleInput(e,question,setQuestion)}>
                <option value="">বিভাগ বাছাই করুন</option>
                {
                    categories.length > 0 && categories.map((category,i)=><option key={i} value={category.name}>{category.name}</option>)
                }
            </select>

            <input type="text" name="title" value={question.question} placeholder="এখানে টাইটেল লিখুন" onChange={(e)=>handleInput(e,question,setQuestion)}/>

            <div className="">
                <input type="file" name="" onChange={(e)=>setFile(e.target.files[0])}/>
                {file.name && <button onClick={()=>uploadFile(file,setProgress,setUrl,toast)}>আপলোড করুন</button>}
                {/* {progress < 0 ? `` : progress > 0 ? `uploading`:`complete`} */}
                {progress == 100 && <span>আপলোড সফল হয়েছে</span>}
            </div>

            <div className="editor">
                <ReactQuill modules={modules} value={value} onChange={setValue} placeholder="পোস্টের বিস্তারিত লিখুন" style={{height:"400px"}}/>
            </div>

            <button onClick={()=>postBlog(postData,router,toast)}>সাবমিট করুন</button>
        </div>
    )
}