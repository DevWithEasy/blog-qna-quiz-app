export default function addAnswer(option,setOption,value,setValue){
    if(!option.answer){
        alert('আপনি উত্তরটি ফাঁকা রেখেছেন। উত্তর লিখুন')
    }else{
        if(value.answers.length < 4){
            const newValue = {...value}
            newValue.answers.push(option)
            setValue(newValue)
            setOption({
                answer: '',
                isCorrect: false
        })
        }else{
            alert('সর্বোচ্চ চারটি উত্তর যোগ করা যাবে। আপনি চারটি যোগ করে ফেলেছেন।')
        }
    }
}