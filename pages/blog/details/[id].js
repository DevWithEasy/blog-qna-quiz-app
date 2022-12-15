import Head from "next/head";
import Link from "next/link";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { AiFillLike, AiOutlineFolderView,AiFillDelete } from "react-icons/ai";
import { BiCalendar } from "react-icons/bi";
import { FaComment,FaEdit } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { format } from "timeago.js";
import Comment from "../../../components/blog/comment/Comment";
import Comments from "../../../components/blog/comment/Comments";
import { dislikeBlog, getAllBlogComment, likeBlog } from "../../../libs/blogHandler";
import findUser from "../../../libs/findUser";
import {getSearchAllCategoryBlog} from "../../../libs/getSearchAllCategory";
import { currentBlog, dislike, like } from "../../../store/slice/blogSlice";
import baseUrl from "../../../utils/baseUrl";

export async function getServerSideProps({query}){
        let  blog
        try {
            const blogRes = await fetch(`${baseUrl}/api/blog/${query.id}`)
            const BlogData = await blogRes.json()
            blog = BlogData.data

        } catch (error) {
            console.log(error);
        }
    return{
        props : {blog}
    }
}

export default function BlogDetails({blog}){
    const dispatch = useDispatch()
    const {id} = useSelector(state => state.auth.user)
    const {likes} = useSelector(state => state.blog.blog)
    const [comment,setComment] = useState(false)
    const [blogs,setBlogs] = useState([])
    const [user,setUser] = useState({})
    const refresh = useSelector(state=>state.qna.refresh)
    const [comments,setComments] = useState([])
    useEffect(()=>{
        dispatch(currentBlog(blog))
        if(blog.user){findUser(blog.user,setUser)}
        if(blog.category){getSearchAllCategoryBlog(blog.catId,setBlogs,toast)}
        if(blog.category){getAllBlogComment(blog.id,setComments)}
    },[blog,dispatch])

    useEffect(()=>{
        if(blog.id){getAllBlogComment(blog.id,setComments)}
    },[blog.id,refresh])
    return(
        <div className="blog_details">
            <Head>
                <title>{blog?.title}</title>
                <meta name="description" content="" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <div className="blog_details_info">
                <div className="blog_details_image">
                    <img src={blog?.image} alt="blog_image" />
                </div>
                <div>
                    <p className="category">{blog.category}</p>
                    <h1>{blog.title}</h1>
                    <div className="user">
                        <p>
                            <img src={user?.image} alt="" />
                            <span>{user?.name}</span>
                        </p>
                    </div>
                    <div className="blog_details_option">
                        <p>
                            <BiCalendar/>
                            <span>{format(blog?.createdAt)}</span>
                        </p>
                        <p>
                            <FaComment/>
                            <span>{comments?.length}</span>
                        </p>
                        <p>
                            <AiOutlineFolderView/>
                            <span>{blog?.views}</span>
                        </p>
                        <p>
                            <AiFillLike/>
                            <span>{blog?.likes?.length}</span>
                        </p>
                    </div>
                </div>
            </div>
            <div className="blog_details_area">
                <div className="blog">
                    <div className="blog_details_details">
                        <p className="details_text" dangerouslySetInnerHTML={{__html: blog.details}}></p>
                        <div className="details_action">
                            {likes && likes.includes(id) ? <button onClick={()=>dislikeBlog(blog.id,id,dispatch,dislike)} className="dislike">
                                <AiFillLike/>
                                <span>আনলাইক</span>
                            </button> : <button onClick={()=>likeBlog(blog.id,id,dispatch,like)} className="like">
                                <AiFillLike/>
                                <span>লাইক</span>
                            </button>}
                            <button className="comment" onClick={()=>setComment(!comment)}>
                                <FaComment/>
                                <span>মন্তব্য</span>  
                            </button>
                        </div>
                    </div>

                    {/* post a comment area */}
                    {comment && <div className="blog_details_comment" id="comment">
                        <Comment blog={blog}/>
                    </div>}
                    
                    {/* all comments area */}
                    <Comments comments={comments}/>

                </div>

                {/* category area */}
                <div className="category">
                    <h3>এই বিভাগের আরো পোস্ট সমুহঃ</h3>
                    <div className="category_blogs">
                        {blogs && blogs.map(blog=><div key={blog.id} className="category_blog">
                            <Link href={`/blog/details/${blog.id}`}>
                                <a>{blog.title}</a>
                            </Link>
                            <p>
                                <span>{format(blog?.createdAt)}</span>
                                <span className="comment">{comments.length} মন্তব্য</span>
                            </p>
                        </div>)}
                    </div>
                </div>
            </div>
        </div>
    )
}