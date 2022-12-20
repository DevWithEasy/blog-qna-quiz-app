import bcrypt from 'bcrypt';
import { collection, getDocs, query, where } from "firebase/firestore";
import jwt from 'jsonwebtoken';
import { db } from "../../../database/initDatabase";

export default async function handler(req,res){
    try {
        const userRef = collection(db, "users");
        const q = query(userRef, where("email", "==", req.body.email));
        const data = await getDocs(q);
        let users = []
        data.forEach(doc=> users.push(doc.data()))
        const user = users[0];
        if (user) {
            const isMatch = await bcrypt.compare( req.body.password,user.password)
            if (!isMatch) return res.status(404).json({
                success: false,
                status : 403,
                message :'ই-মেইল অথবা পাসওয়ার্ড ভুল দিয়েছেন ।' 
            })
            console.log(process.env.NEXT_PUBLIC_JWT_SECRET);
            const token = await jwt.sign({id : user.id},process.env.NEXT_PUBLIC_JWT_SECRET)
            const {password,...others} = user;
            res.status(200).json({
                success: true,
                status : 200,
                data : others,
                token : token
            })
        } else {
            res.status(404).json({
                success: false,
                status : 404,
                message : 'একাউন্ট খুজে পাওয়া যায়নি ।'
            })
        }
          
    } catch (error) {
        res.status(500).json({
            success: false,
            status : 500,
            message : error.message
        })
    }
}