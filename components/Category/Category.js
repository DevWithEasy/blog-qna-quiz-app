import Link from "next/link";
import { useEffect } from "react";
import { useState } from "react";
import toast from "react-hot-toast";
import {FcMediumPriority} from "react-icons/fc"
import getSearchAllCategoryBlog from "../../libs/getSearchAllCategoryBlog";

export default function Category({category}){
    const [data,setData] = useState([])
    useEffect(()=>{
        getSearchAllCategoryBlog(category.name,setData,toast)
    },[category.name])
    return(
        <div className="category">
            <Link key={category.id} href={`/blog/search/category/${category.id}`}><a>
                <FcMediumPriority/>
                <span>{category.name}</span>
            </a>
            </Link>
            <span>{data.length}</span>
        </div>
    )
}