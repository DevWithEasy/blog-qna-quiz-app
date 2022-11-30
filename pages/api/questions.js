import questions from "../../public/data";

export default async function handler(req,res){
    res.status(200).json(questions)
}