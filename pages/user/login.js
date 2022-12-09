import React from 'react';
import {AiFillGoogleCircle} from 'react-icons/ai'
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
import login from '../../libs/login';
import { signin } from '../../store/slice/authSlice';

export default function Login() {
    const dispatch= useDispatch()
    const router = useRouter()
    return (
        <div className='login'>
            <div className="login_area">
                <h3>লগ-ইন / নিবন্ধন</h3>
                <p>শুধুমাত্র গুগল একাউন্ট দিয়েই লগ-ইন এবং নিবন্ধন করতে পারবেন । আপনার গুগল একাউন্ট দিয়ে লগ ইন করুন।</p>
                <div className="">
                    <button onClick={()=>login(router,dispatch,signin)}>
                        <AiFillGoogleCircle size={20}/>
                        <span>গুগল একাউন্ট দিয়ে লগইন</span>
                    </button>
                </div>
                <p className='warning'>ইসলাম.বিডি আপনার অনুমতি ব্যতিত আপনার কোন ব্যক্তিগত তথ্য সংগ্রহ করেনা।</p>
            </div>
        </div>
    );
};
