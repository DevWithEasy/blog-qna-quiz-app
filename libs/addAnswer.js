export function addAnswer(option,setOption,value,setValue,toast){
    if(!option.answer){
        toast.error('আপনি উত্তরটি ফাঁকা রেখেছেন। উত্তর লিখুন')
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
            toast.error('সর্বোচ্চ চারটি উত্তর যোগ করা যাবে। আপনি চারটি যোগ করে ফেলেছেন।')
        }
    }
}