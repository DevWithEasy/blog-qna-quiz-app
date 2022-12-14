import Link from "next/link"
import { useSelector } from "react-redux"
import SingleQuestion from "../components/SingleQusetion"
import baseUrl from "../utils/baseUrl"

export async function getServerSideProps(){
    let data
    try {
        const res = await fetch(`${baseUrl}/api/qna/all`)
        const post = await res.json()
        data = post.data
    } catch (error) {
        console.log(error);
    }
    return{
        props :{
            questions : data
        }
    }
}

export default function QNA({questions}){
    const isAuth = useSelector(state=>state.auth.isAuth)
    return(
        <div className="qna">
            <div className="title">
                <h1>সাম্প্রতিক প্রশ্ন ও উত্তর সমুহ</h1>
                {isAuth && <Link href="/qna/create_new">
                    <a> 
                        <span>প্রশ্ন করুন</span>
                    </a>
                </Link>}
            </div>
            {questions && questions.map(question =><SingleQuestion key={question.id} question={question}/>)}
        </div>
    )
}