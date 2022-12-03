import { useState } from "react";
import {v4 as uuidv4} from "uuid";
import addCategory from "../libs/addCategory";
import handleInput from "../libs/handleInput";


export default function AddCategory(){
    const [category,setCategory] = useState({
        id : uuidv4(),
        name :'',
    })
    console.log(category);
    return(
        <div>
            <input type="text" name="name" placeholder="বিভাগের নাম লিখুন" onChange={(e)=>handleInput(e,category,setCategory)}/>
            <button onClick={()=>addCategory(category)}>যোগ করুন</button>
        </div>
    )
}