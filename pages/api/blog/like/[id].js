import jwt from "jsonwebtoken"
import verifyToken from "../../../../utils/verifyToken";

async function handler(req,res){
    console.log("api endpoint")
}
export default verifyToken(handler);