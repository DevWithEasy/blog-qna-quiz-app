import Head from 'next/head';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Result from '../components/Result';
import Start from '../components/Start';
import getAllQuestion from '../libs/getAllQuestion';
import submitAnswer from '../libs/submitAnswer';

export default function Quiz() {
  const user = useSelector(state=>state.auth.user)
  const quiz = useSelector(state=>state.quiz)
  const [start,setStart] = useState(false)
  const [result,setResult] = useState(false)
  const [questions,setQuestions] = useState([])
  const [currentQuestion,setCurrentQuestion] = useState(0)
  const [score,setScore] = useState(0)
  useEffect(()=>{
    getAllQuestion(setQuestions)
  },[])
  return (
      <div className='quiz'>
        {/* start quiz component  */}

        {!start && <Start setStart={setStart}/>}

        {/* all question and answer render */}

        {start && !result && <div className="qustion_answer">
          <div className="question">
            <h1>
              <span className='text-2xl pr-4'>Question</span>
              <span className='text-xl'>{currentQuestion + 1}</span>/
              <span>{questions.length}</span>
            </h1>
            <p>{questions[currentQuestion]?.question}</p>
          </div>
          <div className="answer">
            <p className="">আপনার উত্তর টি খুজুনঃ</p>
            {
              questions[currentQuestion].answers.map((answer,i)=><button key={i} onClick={()=>submitAnswer(answer.isCorrect,questions,currentQuestion,setCurrentQuestion,setResult,score,setScore)}>{answer.answer}</button>)
            }
          </div>
        </div>}

        {/* result component render */}

        {
          result && <Result data={{score,setScore,setStart,setResult,setCurrentQuestion}}/>
        }
    </div>
  )
}
