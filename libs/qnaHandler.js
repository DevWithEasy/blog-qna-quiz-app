import axios from "axios"

export async function postQnaQuestion(data,router,toast){
    try {
        if(!data.catId) return toast.error("ক্যাটাগরী লিখেন নি।")
        if(!data.question) return toast.error("প্রশ্ন লিখেন নি।")
        const res = await axios.post('/api/qna/question',data,{
            headers: {
                "access_token": localStorage.getItem("access_token")
            }})
        if(res.data){
            toast.success("সফল ভাবে যুক্ত হয়েছে")
            router.push("/qna")
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
        }
    }catch(error){
        toast.error(error.response.data.message);
    }
}


export async function getQnaQuestion(id,setCurrentQna,toast){
    try {
        const res = await axios.get(`/api/qna/question/${id}`)
        if(res.data){
            setCurrentQna(res.data.data)
        }
    } catch (error) {
        // toast.error(error.response.data.message)
        console.log(error);
    }
}

export async function updateQnaQuestion(id,data,router,toast){
    try {
        const res = await axios.put(`/api/qna/question/${id}`,data)
        if(res.data){
            router.push(`/qna/details/${id}`)
            toast.success(res.data.message)
        }
    }catch (error) {
        console.log(error);
    }
}

export async function postQnaAnswer(data,dispatch,action,setAnswer,setValue,toast){
    try {
        if(!data.qId || !data.answer){
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
        }
    }catch(error){
        // toast.error(error.response.data.message);
        console.log(error);
    }
}

export async function postQnaComment(data,dispatch,action,setComment,setValue,toast){
    try {
        if(!data.ansId || !data.comment){
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
        // toast.error(error.response.data.message);
        console.log(error);
    }
}