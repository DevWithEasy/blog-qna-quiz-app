import axios from "axios"

export async function postQnaQuestion(data,toast){
    try {
        if(!data.question || !data.category){
            toast.error("ক্যাটাগরী অথবা প্রশ্ন লিখেন নি।")
        }else{
            const res = await axios.post('/api/qna/question',data)
            if(res.data){
                toast.success("সফল ভাবে যুক্ত হয়েছে")
            }
        }
    } catch (error) {
        toast.error(error.response.data.message)
    }
}

export default async function getCategoryAllData(dispatch,action,toast){
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