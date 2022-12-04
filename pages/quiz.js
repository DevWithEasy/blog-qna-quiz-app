import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import book_icon from ".././public/image/book_icon.png";
import getAllCategory from "../libs/getAllCategory";

export default function Quize(){
    const [categories,setCategories] = useState([])
    useEffect(()=>{
        getAllCategory(setCategories)
    },[])
    console.log(categories);
    return(
        <div className="quize_home">
            {
               categories && categories.map((category) => <Link key={category.id} href={`quiz/${category.id}`}>
                <a >
                    <div className="">
                        <Image src={book_icon} alt="book_icon" height={80} width={80} className=""/>
                        <p>{category.name}</p>
                    </div>
                </a>
                </Link>
               ) 
            }
        </div>
    )
}