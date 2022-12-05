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
            <button onClick={()=>login(router,dispatch,signin)}>
                <AiFillGoogleCircle size={20}/>
                <span>গুগল একাউন্ট দিয়ে লগইন</span>
            </button>
        </div>
    );
};
