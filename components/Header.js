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
    function playManu(){
        setMenu(!menu)
    }
    return(
        
        <div className="header">
            <Link href="/"><a>ইসলাম.বিডি</a></Link>
            <div className="header_link">
                <Link href="/"><a >মুলপাতা</a></Link>
                <Link href="/qna"><a>প্রশ্নোত্তর</a></Link>
                <Link href="/quiz"><a>কুইজ</a></Link>
                {user?.type ==='admin' && <Link href="/admin"><a>এডমিন</a></Link>}
                {user.id &&  <Link href={`/user/profile/${user.id}`}><a>একাউন্ট</a></Link>}
                {!user.id && <button className="new_account" onClick={()=>router.push('/user/signup')}>একাউন্ট করুন</button>}
                {!user.id && <button className="login" onClick={()=>router.push('/user/signin')}>লগ ইন</button>}
                {user.id && <button className="logout" onClick={()=>logout(router,dispatch,signout)}>লগ আউট</button>}
            </div>
            <div className="header_profile_icon">

                {/* menu button */}
                {!menu ? <BiMenu size={25} onClick={()=>setMenu(!menu)}/> : <BiMenuAltLeft size={25} onClick={()=>setMenu(!menu)}/>}
                
                {/* menu option */}
                {menu && <div className="">
                    {!user.id && <Link href={`/user/signup`}><a onClick={playManu}>একাউন্ট করুন</a></Link>}
                    <Link href="/"><a onClick={playManu}>মুলপাতা</a></Link>
                    <Link href="/qna"><a onClick={playManu}>প্রশ্নোত্তর</a></Link>
                    <Link href="/quiz"><a onClick={playManu}>কুইজ</a></Link>
                    {user?.role ==='admin' && <Link href="/admin"><a onClick={playManu}>এডমিন</a></Link>}
                    {user.id && <Link href={`/user/profile/${user.id}`}><a onClick={playManu}>একাউন্ট</a></Link>}
                    {!user.id && <button className="login" onClick={()=>{router.push('/user/signin'),playManu()}}>লগ ইন</button>}
                    {user.id && <button className="logout" onClick={()=>{logout(router,dispatch,signout),playManu()}}>লগ আউট</button>}
                </div>}
            </div>
        </div>
    )
}
