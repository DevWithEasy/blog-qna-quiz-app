import { useState } from "react";
import Link from "next/link";

export default function Header(){
    const [menu,setMenu] = useState(false)
    return(
        
        <div className="header">
            <h1>কুইজ  বক্স</h1>
            <div className="header_link">
                <Link href="/home"><a>মুলপাতা</a></Link>
                <Link href="/qna"><a>প্রশ্নোত্তর</a></Link>
                <Link href="/quiz"><a>কুইজ</a></Link>
                <Link href="/admin"><a>এডমিন</a></Link>
                <Link href="/account"><a>একাউন্ট</a></Link>
            </div>
            <div className="header_profile_icon">
                <button onClick={()=>setMenu(!menu)}>+</button>
                {menu && <div className="">
                    <button>Profile</button>
                    <button>logout</button>
                </div>}
            </div>
        </div>
    )
}