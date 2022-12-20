import Link from "next/link";
import { useEffect, useState } from "react";
import getAllCategory from "../libs/getAllCategory";

export default function Quize(){
    const [categories,setCategories] = useState([])
    useEffect(()=>{
        getAllCategory(setCategories)
    },[])
    console.log(categories);
    return(
        <div className="quiz_home">
            {
               categories && categories.map((category) => <Link key={category.id} href={`quiz/${category.id}`}>
                <a >
                    <div className="">
                        {/* <Image src={category.img} alt="book_icon" height={80} width={80} className=""/> */}
                        <img src={category.img} alt="" className="ring-2  rounded-full h-20 w-20"/>
                        <p>{category.name}</p>
                    </div>
                </a>
                </Link>
               ) 
            }
        </div>
    )
}