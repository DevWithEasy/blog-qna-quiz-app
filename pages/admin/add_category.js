import { useState } from "react";
import {v4 as uuidv4} from "uuid";
import toast from 'react-hot-toast';
import { addCategory } from "../../libs/addCategory";
import handleInput from "../../libs/handleInput";

export default function AddCategory(){

    const [category,setCategory] = useState({
        id : uuidv4(),
        name :'',
    })
    return(
        <div className="add_category">
            <div className="new_category">
                <h1>নতুন বিভাগ যোগ করুন</h1>
                <input type="text" name="name" value={category.name} placeholder="বিভাগের নাম লিখুন" onChange={(e)=>handleInput(e,category,setCategory)}/>
                <button onClick={()=>addCategory(category,toast,setCategory)}>যোগ করুন</button>
            </div>
        </div>
    )
}