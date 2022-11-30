export default function startQuiz(name,setStart){
    if(!name){
      alert('অনুগ্রহপুর্বক আপনার নাম লিখুন !')
    }else{
      setStart(true)
    }
  }