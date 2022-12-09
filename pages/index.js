import Head from "next/head"
import Link from "next/link"
import { useEffect, useState } from "react"
import ReactPaginate from "react-paginate"
import { useSelector } from "react-redux"
import Blog from "../components/blog/Blog"
import Categories from "../components/Category/Categories"
import {  getBlogPostPagination } from "../libs/blogHandler"
import baseUrl from "../utils/baseUrl"

export async function getServerSideProps(){
    let blogsData
    let categories
    try {
        //blogs data from server
        const resBlogs = await fetch(`${baseUrl}/api/blog/all`)
        const jsonBlogData = await resBlogs.json()
        blogsData = jsonBlogData

        //categories data from server
        const rescategories = await fetch(`${baseUrl}/api/find/categories`)
        const jsonCategoriesData = await rescategories.json()
        categories = jsonCategoriesData.data
    } catch (error) {
        console.log(error);
    }
    return{
        props :{
            blogsData,categories
        }
    }
}

export default function Home({blogsData,categories}){
    const isAuth = useSelector(state=>state.auth.isAuth)
    const {total} = blogsData
    const [blogs,setBlogs] = useState(blogsData.blogs)
    const [pageNo,setPageNo] = useState(0)
    const perPage = 10
    const totlaPage = Math.ceil(total / perPage)
    const changePage = ({selected})=>{
        setPageNo(selected)
      }

    useEffect(()=>{
        getBlogPostPagination(pageNo,setBlogs)
    },[pageNo])
    console.log(blogsData);
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
                <div className="blog_pagination">
                    <ReactPaginate
                        breakLabel="..."
                        nextLabel=" >"
                        onPageChange={changePage}
                        pageRangeDisplayed={2}
                        pageCount={totlaPage}
                        previousLabel="< "
                        renderOnZeroPageCount={null}
                        containerClassName="paginate"
                        previousClassName = "previousBtn"
                        nextsClassName = "nextBtn"
                        disabledClassName="disabled"
                        activeClassName="active"
                    />
                    {/* <p>Now you are : ({visitedPages+1}-{visitedPages+perPage}) No. post {pageNo+1}/{totlaPage} pages </p> */}
                </div>
            </div>
            <div className="categories_section">
                <h3>বিভাগ সমুহঃ</h3>
                {categories && <Categories categories={categories}/>}
            </div>
            </div>
        </div>
    )
}