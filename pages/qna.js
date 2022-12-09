import Link from "next/link"
import {BsFillQuestionDiamondFill} from 'react-icons/bs'
import SingleQuestion from "../components/SingleQusetion"

export async function getServerSideProps({query}){
    let data
    try {
        const res = await fetch(`${process.env.VERCEL_URL}/api/qna/all`)
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
    return(
        <div className="qna">
            <div className="title">
                <h1>সাম্প্রতিক প্রশ্ন ও উত্তর সমুহ</h1>
                <Link href="/qna/create_new">
                    <a> 
                        <BsFillQuestionDiamondFill/>
                        <span>প্রশ্ন করুন</span>
                    </a>
                </Link>
            </div>
            {questions && questions.map(question =><SingleQuestion key={question.id} question={question}/>)}
        </div>
    )
}