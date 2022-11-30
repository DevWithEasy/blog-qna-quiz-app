import axios from "axios";

export default async function addSubject(name){
    try {
        const res = await axios.post('/api/add/subject', {
            subjects : 'Hello',
            question: 'অজু ভঙ্গের কারণ কয়টি ?',
            answers : [
                {answer: '৫ টি',isCorrect: false},
                {answer: '৭ টি',isCorrect: true},
                {answer: '১৪ টি',isCorrect: false},
                {answer: '১৩ টি',isCorrect: false},
            ]
        })
        console.log(res.data)
    } catch (error) {
        console.log(error)
    }
}