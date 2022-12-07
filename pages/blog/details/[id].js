import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { AiFillLike, AiOutlineFolderView } from "react-icons/ai";
import { BiCalendar } from "react-icons/bi";
import { FaComment } from "react-icons/fa";
import { format } from "timeago.js";
import Comment from "../../../components/blog/comment/Comment";
import Comments from "../../../components/blog/comment/Comments";
import { getAllBlogComment, getBlogPost } from "../../../libs/blogHandler";
import findUser from "../../../libs/findUser";
import getSearchAllCategoryBlog from "../../../libs/getSearchAllCategoryBlog";


export default function BlogDetails(){
    const router = useRouter()
    const [blogs,setBlogs] = useState([])
    const [blog,setBlog] = useState({})
    const [user,setUser] = useState({})
    const [comments,setComments] = useState([])
    useEffect(()=>{
        getBlogPost(router.query.id,setBlog)
    },[router.query.id])

    useEffect(()=>{
        if(blog.user){findUser(blog.user,setUser)}
        if(blog.category){getSearchAllCategoryBlog(blog.category,setBlogs,toast)}
        if(blog.category){getAllBlogComment(blog.id,setComments)}
    },[blog])
    console.log(comments);
    return(
        <div className="blog_details">
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
                            {blog.likes && blog.likes.includes(user.id) ? <button className="dislike">
                                <AiFillLike/>
                                <span>আনলাইক</span>
                            </button> : <button className="like">
                                <AiFillLike/>
                                <span>লাইক</span>
                            </button>}
                            <a href="#comment">
                                <FaComment/>
                                <span>মন্তব্য</span>  
                            </a>
                        </div>
                    </div>

                    {/* post a comment area */}
                    <div className="blog_details_comment" id="comment">
                        <Comment blog={blog} user={user}/>
                    </div>
                    
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
                                <span>{comments.length} মন্তব্য</span>
                            </p>
                        </div>)}
                    </div>
                </div>
            </div>
        </div>
    )
}