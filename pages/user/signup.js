import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { toast } from 'react-hot-toast';
import { AiOutlineMobile } from 'react-icons/ai';
import { BsEyeFill, BsEyeSlashFill } from 'react-icons/bs';
import { MdDriveFileRenameOutline, MdEmail } from 'react-icons/md';
import { v4 as uuidv4 } from "uuid";
import handleInput from '../../libs/handleInput';
import { signup } from '../../libs/userHandler';

export default function Signup() {
    const router = useRouter()
    const [type,setType] = useState('password')
    const [visible,setVisible] = useState(false)
    const [value,setValue] = useState({
        id : uuidv4(),
        name : '',
        number : '',
        email : '',
        password : '',
        image : '',
        createdAt:Date.now(),
        role : 'user',
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
                <h3>নিবন্ধন</h3>
                <form onSubmit={(e)=>signup(e,value,router,toast)}>
                    <div className="">
                        <input type="text" name="name" onChange={(e)=>handleInput(e,value,setValue)} placeholder='নাম'/>
                        <MdDriveFileRenameOutline size={20} className='icon'/>
                    </div>
                    <div className="">
                        <input type="text" name="number" onChange={(e)=>handleInput(e,value,setValue)} placeholder='মোবাইল নম্বর'/>
                        <AiOutlineMobile size={20} className='icon'/>
                    </div>
                    <div className="">
                        <input type="email" name="email" onChange={(e)=>handleInput(e,value,setValue)} placeholder='ই-মেইল'/>
                        <MdEmail size={20} className='icon'/>
                    </div>
                    <div className="">
                        <input type={type} name="password" onChange={(e)=>handleInput(e,value,setValue)} placeholder='পাসওয়ার্ড'/>
                        {!visible ? <BsEyeFill onClick={()=>handleVisible()} size={20} className='icon'/> : <BsEyeSlashFill onClick={()=>handleVisible()} size={20} className='icon'/>}
                    </div>
                    <input type="submit" value="একাউন্ট করুন" />
                </form>
                <p className='link'>
                    <span>ইতোমধ্যেে একাউন্ট করেছেন ?</span>
                    <Link href="/user/signin"><a> লগ-ইন করুন</a></Link>
                </p>
                <p className='warning'>ইসলাম.বিডি আপনার অনুমতি ব্যতিত আপনার কোন ব্যক্তিগত তথ্য সংগ্রহ করেনা।</p>
            </div>
        </div>
    );
};
