import bcrypt from 'bcrypt';
import { collection, doc, getDocs, query, setDoc, where } from "firebase/firestore";
import { db } from "../../../database/initDatabase";

export default async function handler(req,res){
    try {
        const userRef = collection(db, "users");
        const q = query(userRef, where("email", "==", req.body.email));
        const data = await getDocs(q);
        let users = []
        data.forEach(doc=> users.push(doc.data()))
        const user = users[0];
        if(user) return res.status(500).json({
            success: false,
            status : 500,
            message : 'এই ই-মেইল পুর্বে নিবন্ধিত হয়েছে ।'
        })

        const hashed = await bcrypt.hash(req.body.password,10)

        await setDoc(doc(db, "users", req.body.id),{...req.body,password : hashed});

        res.status(200).json({
            success: true,
            status : 200,
            message : 'সফলভাবে একাউন্ট হয়েছে ।'
        })
          
    } catch (error) {
        res.status(500).json({
            success: false,
            status : 500,
            message : error.message
        })
    }
}