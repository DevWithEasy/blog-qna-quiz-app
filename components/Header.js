import { useState } from "react";
import Link from "next/link";
import {BiMenu,BiMenuAltLeft} from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { signout } from "../store/slice/authSlice";
import logout from "../libs/logout";
import { useRouter } from "next/router";

export default function Header(){
    const router = useRouter ()
    const user = useSelector(state=>state.auth.user)
    const dispatch = useDispatch ()
    const [menu,setMenu] = useState(false)
    return(
        
        <div className="header">
            <Link href="/"><a>ইসলাম.বিডি</a></Link>
            <div className="header_link">
                <Link href="/"><a>মুলপাতা</a></Link>
                <Link href="/qna"><a>প্রশ্নোত্তর</a></Link>
                <Link href="/quiz"><a>কুইজ</a></Link>
                {user?.type ==='admin' && <Link href="/admin"><a>এডমিন</a></Link>}
                {user.id &&  <Link href={`/user/profile/${user.id}`}><a>একাউন্ট</a></Link>}
                {!user.id && <button className="login" onClick={()=>router.push('/user/login')}>লগ ইন</button>}
                {user.id && <button className="logout" onClick={()=>logout(router,dispatch,signout)}>লগ আউট</button>}
            </div>
            <div className="header_profile_icon">

                {/* menu button */}
                {!menu ? <BiMenu size={25} onClick={()=>setMenu(!menu)}/> : <BiMenuAltLeft size={25} onClick={()=>setMenu(!menu)}/>}
                
                {/* menu option */}
                {menu && <div className="">
                    <Link href="/"><a>মুলপাতা</a></Link>
                    <Link href="/qna"><a>প্রশ্নোত্তর</a></Link>
                    <Link href="/quiz"><a>কুইজ</a></Link>
                    {user?.type ==='admin' && <Link href="/admin"><a>এডমিন</a></Link>}
                    {user.id && <Link href={`/user/profile/${user.id}`}><a>একাউন্ট</a></Link>}
                    {!user.id && <button className="login" onClick={()=>router.push('/user/login')}>লগ ইন</button>}
                    {user.id && <button className="logout" onClick={()=>logout(router,dispatch,signout)}>লগ আউট</button>}
                </div>}
            </div>
        </div>
    )
}
