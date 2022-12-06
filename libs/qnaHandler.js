import axios from "axios"

export async function postQnaQuestion(data,router,toast){
    try {
        if(!data.question || !data.category){
            toast.error("ক্যাটাগরী অথবা প্রশ্ন লিখেন নি।")
        }else{
            const res = await axios.post('/api/qna/question',data)
            if(res.data){
                toast.success("সফল ভাবে যুক্ত হয়েছে")
                router.push("/qna")
            }
        }
    } catch (error) {
        toast.error(error.response.data.message)
    }
}

export async function getAllQnaQuestion(dispatch,action,toast){
    try{
        const res = await axios.get(`/api/qna/all`)
        if(res.data){
            dispatch(action(res.data.data))
            toast.success("ডাটা লোড হয়েছে")
        }
    }catch(error){
        toast.error(error.response.data.message);
    }
}


export async function getQnaQuestion(id,dispatch,action,toast){
    try {
        const res = await axios.get(`/api/qna/question/${id}`)
        if(res.data){
            dispatch(action(res.data.data))
        }
    } catch (error) {
        // toast.error(error.response.data.message)
        console.log(error);
    }
}

export async function postQnaAnswer(data,dispatch,action,setAnswer,setValue,toast){
    try {
        if(!data.user || !data.qId || !data.answer){
            toast.error("সবগুলো তথ্য সঠিকভাবে দিন")
        }else{
            const res = await axios.post('/api/qna/answer',data)
            if(res.data){
                setAnswer(false)
                setValue("")
                dispatch(action(Math.random()))
                toast.success("সফল ভাবে যুক্ত হয়েছে")
            }
        }
    } catch (error) {
        toast.error(error.response.data.message)
    }
}

export async function getAllQnaAnswers(id,setAnswers,toast){
    try{
        const res = await axios.get(`/api/qna/answer/all/${id}`)
        if(res.data){
            setAnswers(res.data.data)
            // toast.success("ডাটা লোড হয়েছে")
            console.log(res.data);
        }
        console.log(res.data);
    }catch(error){
        toast.error(error.response.data.message);
        console.log(error);
    }
}

export async function postQnaComment(data,dispatch,action,setComment,setValue,toast){
    try {
        if(!data.user || !data.ansId || !data.comment){
            toast.error("সবগুলো তথ্য সঠিকভাবে দিন")
        }else{
            const res = await axios.post('/api/qna/comment',data)
            if(res.data){
                setComment(false)
                setValue("")
                dispatch(action(Math.random()))
                toast.success("সফল ভাবে যুক্ত হয়েছে")
            }
        }
    } catch (error) {
        toast.error(error.response.data.message)
    }
}

export async function getAllComments(id,setComments,toast){
    try{
        const res = await axios.get(`/api/qna/comment/all/${id}`)
        if(res.data){
            setComments(res.data.data)
            // dispatch(action(res.data.data))
            // toast.success("ডাটা লোড হয়েছে")
            // console.log(res.data);
        }
        console.log(res.data);
    }catch(error){
        toast.error(error.response.data.message);
        console.log(error);
    }
}