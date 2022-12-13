import axios from "axios";

export async function getSearchAllCategoryBlog(id,setData,toast){
    try{
        const res = await axios.get(`/api/blog/search/category/${id}`)
        if(res.data){
            setData(res.data.data)
        }
    }catch(error){
        // toast.error(error.response.data.message);
        console.log(error);
    }
}

export async function getSearchAllCategoryBlogCount(id,setData,toast){
    try{
        const res = await axios.get(`/api/blog/search/category/count/${id}`)
        if(res.data){
            setData(res.data.total)
        }
    }catch(error){
        // toast.error(error.response.data.message);
        console.log(error);
    }
}