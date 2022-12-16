import React, { useState } from 'react';
import {BsEyeFill,BsEyeSlashFill} from 'react-icons/bs'
import {MdEmail} from 'react-icons/md'
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
import Link from 'next/link';
import handleInput from '../../libs/handleInput';
import { signin } from '../../libs/userHandler';
import { toast } from 'react-hot-toast';
import { signinAccount } from '../../store/slice/authSlice';

export default function Signup() {
    const dispatch= useDispatch()
    const router = useRouter()
    const [type,setType] = useState('password')
    const [visible,setVisible] = useState(false)
    const [value,setValue] = useState({
        email : '',
        password : ''
    })
    function handleVisible(){
        if(type === 'password'){
            setType('text')
            setVisible(!visible)
        }else{
            setType('password')
            setVisible(!visible)
        }

    }
    return (
        <div className='login'>
            <div className="login_area">
                <h3>লগ-ইন</h3>
                <form onSubmit={(e)=>signin(e,value,router,dispatch,signinAccount,toast)}>
                    <div className="">
                        <input type="email" name="email" onChange={(e)=>handleInput(e,value,setValue)} placeholder='ই-মেইল'/>
                        <MdEmail size={20} className='icon'/>
                    </div>
                    <div className="">
                        <input type={type} name="password" onChange={(e)=>handleInput(e,value,setValue)} placeholder='পাসওয়ার্ড'/>
                        {!visible ? <BsEyeFill onClick={()=>handleVisible()} size={20} className='icon'/> : <BsEyeSlashFill onClick={()=>handleVisible()} size={20} className='icon'/>}
                    </div>
                    <input type="submit" value="লগ-ইন করুন" />
                </form>
                <p className='link'>
                    <span>আপনি কি নতুন ?</span>
                    <Link href="/user/signin"><a> একাউন্ট করুন</a></Link>
                </p>
                <p className='warning'>আপনার সঠিক তথ্য দিয়ে একাউন্টে প্রবেশ করুন । লগ-ইন ব্যতিত আপনার কিছু সেবা ব্যবহার করতে পারবেন না ।</p>
            </div>
        </div>
    );
};
