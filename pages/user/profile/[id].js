import { useState } from "react";
import { format } from "timeago.js";
import BlogPost from "../../../components/profile/BlogPoast";
import QnaPost from "../../../components/profile/QnaPost";
import baseUrl from "../../../utils/baseUrl";

export async function getServerSideProps({query}){
    let userData
    try {
        const res = await fetch(`${baseUrl}/api/find/user/profile/${query.id}`)
        const data = await res.json()
        userData = data.data
    } catch (error) {
        console.log(error);
    }
    return{
        props:{
           data : userData
        }
    }
}

export default function Profile({data}){
    const {user,blogs,blogComments,qnaQuestions,qnaAnswers,qnaComments} = data;
    const [render,setRender] = useState(false)
    return (
        <div className="profile">
            <div className="user_info">
                <img src={user?.image} alt="" />
                <div className="">
                    <h3>{user?.name}</h3>
                    <p>ই-মেইলঃ {user?.email}</p>
                    <p>একাউন্টের ধরনঃ {user?.role}</p>

                    <p>মোট অর্জনকৃত পয়েন্টঃ {(blogs.length * 5) + (blogComments.length * 2) + (qnaQuestions.length * 3) + (qnaAnswers.length * 2) + (qnaComments.length * 1)}</p>

                    <p>সদস্য হয়েছেন - {new Date(user.createdAt).toLocaleDateString()} ({format(user.createdAt)})</p>
                </div>
            </div>
            <div className="user_statics">
                <h3>পরিসংখ্যানঃ</h3>
                <div className="">
                    <p>আপনি মোট ব্লগ পোস্ট করেছেনঃ {blogs.length} টি</p>
                    <p>ব্লগে মোট মন্তব্য করেছেনঃ {blogComments.length} টি</p>
                    <p>আপনি মোট প্রশ্ন করেছেনঃ {qnaQuestions.length} টি</p>
                    <p>প্রশ্নের উত্তর দিয়েছেনঃ {qnaAnswers.length} টি</p>
                    <p>প্রশ্নের উত্তরে মন্তব্য করেছেনঃ {blogComments.length} টি</p>
                </div>
            </div>
            <div className="user_data">
                <div className="button">
                    <button onClick={()=>setRender(false)}>ব্লগ</button>
                    <button onClick={()=>setRender(true)}>প্রশ্ন</button>
                </div>
                {!render && <div className="posts">
                    {blogs && blogs.map(blog => <BlogPost key={blog} id={blog}/>)}
                </div>}
                {render && <div className="posts">
                    {qnaQuestions && qnaQuestions.map(question => <QnaPost key={question} id={question}/>)}
                </div>}
            </div>
        </div>
    )
}