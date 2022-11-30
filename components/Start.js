import { useSelector } from "react-redux";
import startQuiz from "../libs/startQuiz";

export default function Start({setStart}){
    const quiz = useSelector(state=>state.quiz)
    return(
        <div className="start">
          <div className="">
                <p>আপনি কুইজের বিষয় পছন্দ করেছেন:</p>
                <p className="subject">{quiz.subject}</p>
            
                <br />
                <button onClick={() => startQuiz(setStart)}>শুরু করুন</button>
          </div>
        </div>
    )
}