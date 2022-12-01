import { useState } from "react"

export default function Header(){
    const [menu,setMenu] = useState(false)
    return(
        
        <div className="header">
            <h1>কুইজ  বক্স</h1>
            <div className="">
                <button onClick={()=>setMenu(!menu)}>+</button>
                {menu && <div className="">
                    <button>Profile</button>
                    <button>logout</button>
                </div>}
            </div>
        </div>
    )
}