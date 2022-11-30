import { useState } from "react"
import addSubject from "../libs/addSubject"

export default function AddSubject(){
    const [name,setName] = useState('')
    return(
        <div>
            <input type="text" placeholder="subject name" onChange={(e)=>setName(e.target.value)}/>
            <button onClick={()=>addSubject(name)}>Add</button>
        </div>
    )
}