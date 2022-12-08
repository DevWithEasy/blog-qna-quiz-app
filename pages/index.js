import Head from "next/head"
import Link from "next/link"
import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import Blog from "../components/blog/Blog"
import Categories from "../components/Category/Categories"
import { getAllBlogPost } from "../libs/blogHandler"
import getAllCategory from "../libs/getAllCategory"

export default function Home(){
    const isAuth = useSelector(state=>state.auth.isAuth)
    const [blogs,setBlogs] = useState([])
    const [categories,setCategories] = useState([])
    useEffect(()=>{
        getAllBlogPost(setBlogs)
        getAllCategory(setCategories)
    },[])
    return(
        <div className="index">
            <Head>
                <title>IslamBD is largest Islamic Blog,QNA and Quiz community website</title>
                <meta name="description" content="" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <div className="blog">
            <div className="blogs_section">
                <h3>
                    <span>সাম্প্রতিক পোস্ট সমুহঃ</span>
                    {isAuth && <Link href="/blog/create_new"><a>ব্লগ লিখুন</a></Link>}
                </h3>
                {blogs && blogs.map(blog=><Blog key={blog.id} blog={blog}/>)}
            </div>
            <div className="categories_section">
                {categories && <Categories categories={categories}/>}
            </div>
            </div>
        </div>
    )
}