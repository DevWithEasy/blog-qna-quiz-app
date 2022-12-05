import axios from "axios";

export default async function getCategoryAllData(id,dispatch,action,toast){
    try{
        const res = await axios.get(`/api/quiz/category_all_data/${id}`)
        if(res.data){
            dispatch(action(res.data.data))
            toast.success("ক্যাটাগরীর ডাটা লোড হয়েছে")
        }
    }catch(error){
        toast.error(error.response.data.message);
    }
}