import Link from "next/link"
import { useEffect, useState } from "react"
import getAllCategory from "../libs/getAllCategory"

export default function Home(){
    const [categories,setCategories] = useState([])
    useEffect(()=>{
        getAllCategory(setCategories)
    },[])
    console.log(categories);
    return(
        <div className="">
            {
               categories && categories.map((category) =><div key={category.id}>
                <Link href={`quize/${category.id}`}><a >{category.name}</a></Link>
               </div>) 
            }
        </div>
    )
}