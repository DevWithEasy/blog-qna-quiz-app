import axios from "axios"

export async function postQna(data,toast){
    try {
        if(!data.question || !data.category){
            toast.error('something went wrong')
        }else{
            const res = await axios.post('/api/qna',data)
            console.log(res.data)
        }
    } catch (error) {
        console.log(error)
    }
}