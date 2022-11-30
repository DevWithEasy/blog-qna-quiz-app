export default function removeAnswer(i,question,setQuestion){
    const newQuestion = {...question}
    const newAnswers= question.answers
    newAnswers.splice(i,1)
    newQuestion['answers'] = newAnswers
    setQuestion(newQuestion)
}