import Link from "next/link";
import { useEffect } from "react";
import { useState } from "react";
import toast from "react-hot-toast";
import {FcMediumPriority} from "react-icons/fc"
import {getSearchAllCategoryBlogCount} from "../../libs/getSearchAllCategory";

export default function Category({category}){
    const [data,setData] = useState(0)
    useEffect(()=>{
        getSearchAllCategoryBlogCount(category.id,setData,toast)
    },[category.id])
    return(
        <div className="category">
            <Link key={category.id} href={`/blog/search/category/${category.id}`}><a>
                <FcMediumPriority/>
                <span>{category.name}</span>
            </a>
            </Link>
            <span>({data})</span>
        </div>
    )
}