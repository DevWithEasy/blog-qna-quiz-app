import axios from "axios";

export default async function getSearchAllCategoryBlog(name,setData,toast){
    try{
        const res = await axios.post(`/api/blog/search/category`,{name})
        if(res.data){
            setData(res.data.data)
        }
    }catch(error){
        // toast.error(error.response.data.message);
        console.log(error);
    }
}