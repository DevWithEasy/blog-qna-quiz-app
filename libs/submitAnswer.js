export default function submitAnswer(answer,questions,currentQuestion,setCurrentQuestion,setResult,score,setScore){
    const nextQuestion = currentQuestion + 1
    if(nextQuestion < questions.length){
      setCurrentQuestion(nextQuestion)
    }else{
      setResult(true)
    }
    if(answer){
      setScore(score+1)
    }
}