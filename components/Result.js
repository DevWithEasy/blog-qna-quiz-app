import restartQuiz from "../libs/restartQuiz"

export default function Result({data}){
    const {score,setScore,setStart,setResult,setCurrentQuestion} = data
    return(
        <div className="result">
            <div className="">
                <span>{score > 0 ? 'আলহামদুলিল্লাহ ' : ' আলহামদুলিল্লাহ শুভ কামনা '} </span>
                <br />
                <span> আপনার স্কোর হল :  {score}</span>
                <br />
                {score === 0 && <span>পরবর্তীতে আরো ভাল করবেন ইনশাল্লাহ ।</span>}
                <br />
                <button onClick={()=>restartQuiz(setScore,setStart,setResult,setCurrentQuestion)}>জমা দিন</button>
            </div>
        </div>
    )
}