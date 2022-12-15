import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import 'react-quill/dist/quill.snow.css';
import { v4 as uuidv4 } from "uuid";
import { updateBlog } from "../../../libs/blogHandler";
import getAllCategory from "../../../libs/getAllCategory";
import handleInput from "../../../libs/handleInput";
import baseUrl from "../../../utils/baseUrl";
import modules from "../../../utils/editorModule";
const ReactQuill = dynamic(import('react-quill'), { ssr: false })

export async function getServerSideProps({query}){
    let  blog
    try {
        const blogRes = await fetch(`${baseUrl}/api/blog/${query.id}`)
        const BlogData = await blogRes.json()
        blog = BlogData.data

    } catch (error) {
        console.log(error);
    }
return{
    props : {blog}
}
}

export default function CreateNew({blog}){
    const router = useRouter()
    const [value,setValue] = useState(blog.details)
    const [categories,setCategories] = useState([])
    const [question,setQuestion] = useState(blog)

    const postData = ({...question, details : value});

    useEffect(()=>{
        getAllCategory(setCategories)
    },[])

    return(
        <div className="create_new">
            <h1>আপনার পোস্ট আপডেট করুন</h1>

            <select  name="catId" onChange={(e)=>handleInput(e,question,setQuestion)}>
                <option value={question.catId}>{question.category}</option>
                {
                    categories.length > 0 && categories.map((category,i)=><option key={i} value={category.id}>{category.name}</option>)
                }
            </select>

            <input type="text" name="title" value={question.title} placeholder="এখানে টাইটেল লিখুন" onChange={(e)=>handleInput(e,question,setQuestion)}/>
            <div className="editor">
                <ReactQuill modules={modules} value={value} onChange={setValue} placeholder="পোস্টের বিস্তারিত লিখুন" style={{height:"400px"}}/>
            </div>

            <button onClick={()=>updateBlog(postData.id,postData,router,toast)}>আপডেট করুন</button>
        </div>
    )
}