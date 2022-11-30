import { useState } from "react"
import addCategory from "../libs/addCategory"

export default function AddCategory(){
    const [name,setName] = useState('')
    return(
        <div>
            <input type="text" placeholder="subject name" onChange={(e)=>setName(e.target.value)}/>
            <button onClick={()=>addCategory(name)}>যোগ করুন</button>
        </div>
    )
}