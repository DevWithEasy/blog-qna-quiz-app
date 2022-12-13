import Head from "next/head"
import { useEffect } from "react"
import { useState } from "react"
import ReactPaginate from "react-paginate"
import Blog from "../../../../components/blog/Blog"
import Categories from "../../../../components/Category/Categories"
import { getCategoryBlogPostPagination } from "../../../../libs/blogHandler"
import baseUrl from "../../../../utils/baseUrl"

export async function getServerSideProps({query}){
    let category
    let categories
    let total
    let data
    try {
        const catRes = await fetch(`${baseUrl}/api/category/${query.id}`)
        const catResult = await catRes.json()
        category = catResult.data

        const res = await fetch(`${baseUrl}/api/blog/search/category/${query.id}`)
        const result = await res.json()
        data = result.data
        total = result.total

        //categories data from server
        const rescategories = await fetch(`${baseUrl}/api/find/categories`)
        const jsonCategoriesData = await rescategories.json()
        categories = jsonCategoriesData.data
    } catch (error) {
        console.log(error);
    }

    return{
        props:{
            category,
            categories,
            total:total,
            blogs : data
        }
    }
}

export default function SearchCategory(props){
    const {category,categories,total}= props;
    const [blogs,setBlogs] = useState(props.blogs)
    const [pageNo,setPageNo] = useState(0)
    const perPage = 10
    const totlaPage = Math.ceil(total / perPage)
    const changePage = ({selected})=>{
        setPageNo(selected)
      }
    useEffect(()=>{
        getCategoryBlogPostPagination(category.id,pageNo,setBlogs)
    },[category.id,pageNo])
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
                    <span>{category.name} বিভাগের পোস্টসমুহ</span>
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
