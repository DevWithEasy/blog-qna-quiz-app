import { collection, doc, getDoc, getDocs, orderBy, query, where} from "firebase/firestore";
import { db } from "../../../../../database/initDatabase";


export default async function handler(req,res){
    try {
        const docRef= doc(db,'users',req.query.id)
        const userData = await getDoc(docRef);
        if(userData.exists()){
            const user = userData.data()
            //FIND ALL BLOG POST
            const blogQuery = query(collection(db,'blog_post'),where("user","==",`${user.id}`),orderBy("createdAt", "desc"));
            const blogData = await getDocs(blogQuery)
            let blogs =[]
            blogData.forEach(doc=> blogs.push(doc.data().id))

            //FIND ALL BLOG POST_COMMENTS
            const blogCommentQuery = query(collection(db,'blog_comments'),where("user","==",`${user.id}`),orderBy("createdAt", "desc"));
            const blogCommentsData = await getDocs(blogCommentQuery)
            let blogComments =[]
            blogCommentsData.forEach(doc=> blogComments.push(doc.data().id))

            //FIND ALL QNA_QUESTIONS
            const qnaQuestionQuery = query(collection(db,'qna_questions'),where("user","==",`${user.id}`),orderBy("createdAt", "desc"));
            const qnaData = await getDocs(qnaQuestionQuery)
            let qnaQuestions =[]
            qnaData.forEach(doc=> qnaQuestions.push(doc.data().id))

            //FIND ALL QNA_ANSWERS
            const qnaAnswersQuery = query(collection(db,'qna_answers'),where("user","==",`${user.id}`),orderBy("createdAt", "desc"));
            const qnaAnswerData = await getDocs(qnaAnswersQuery)
            let qnaAnswers =[]
            qnaAnswerData.forEach(doc=> qnaAnswers.push(doc.data().id))

            //FIND ALL QNA_COMMENTS
            const qnaCommentsQuery = query(collection(db,'qna_comments'),where("user","==",`${user.id}`),orderBy("createdAt", "desc"));
            const qnacommentData = await getDocs(qnaCommentsQuery)
            let qnaComments =[]
            qnacommentData.forEach(doc=> qnaComments.push(doc.data().id))

            res.status(200).json({
                success : true,
                status : 200,
                data : {
                    user : user,
                    blogs : blogs,
                    blogComments : blogComments,
                    qnaQuestions : qnaQuestions,
                    qnaAnswers: qnaAnswers,
                    qnaComments : qnaComments
                },
            })
        }else{
            res.status(404).json({
                success : false,
                status : 404,
                message : "User not found"
            })
        }
        
    } catch (error) {
        res.status(500).json({
            success : false,
            status : 500,
            message : error.message
        })
    }
}