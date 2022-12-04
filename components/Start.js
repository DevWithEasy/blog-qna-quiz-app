import { useSelector } from "react-redux";
import startQuiz from "../libs/startQuiz";

export default function Start({setStart}){
    const category = useSelector(state=>state.quiz.category)

    return(
        <div className="start">
          <div className="">
                <p>আপনি কুইজের বিষয় পছন্দ করেছেন:</p>
                <p className="subject">{category.category}</p>
                <p>এই বিভাগে মোট কুইজ আছে {category.totalData} টি।</p>
                <button onClick={() => startQuiz(setStart)}>শুরু করুন</button>
          </div>
        </div>
    )
}