import { useEffect, useState } from "react"
import Blog from "../components/blog/Blog"
import Categories from "../components/Category/Categories"
import { getAllBlogPost } from "../libs/blogHandler"
import getAllCategory from "../libs/getAllCategory"

export default function Home(){
    const [blogs,setBlogs] = useState([])
    const [categories,setCategories] = useState([])
    useEffect(()=>{
        getAllBlogPost(setBlogs)
        getAllCategory(setCategories)
    },[])
    return(
        <div className="index">
            <div className="blog">
            <div className="blogs_section">
                <h3>সাম্প্রতিক পোস্ট সমুহঃ</h3>
                {blogs && blogs.map(blog=><Blog key={blog.id} blog={blog}/>)}
            </div>
            <div className="categories_section">
                {categories && <Categories categories={categories}/>}
            </div>
            </div>
        </div>
    )
}