import {Link} from 'react-router-dom'
import {loginapi} from './../../api/Auth/auth.api';
import {useState,useContext} from 'react'
import {Acontext} from './Acontext'
import {usingContext} from './../../context/Context'
import './Login.css'
export default function Login(){
	  const {url}=usingContext();
          const {fetchuser}=useContext(Acontext);
		
          const  [email,setEmail]=useState<string | ''>('');
		  const [password,setPassword]=useState('');
		  const [er,setEr]=useState<boolean>(false);
		  const hdlogin=async()=>{
		  if(!email || !password){
		  return ;
		  }
		  const fd=new FormData();
		  fd.append('email',email);
		  fd.append('password',String(password));
		  
		  const res=await fetch(`${url}/api/admin/check`,{
			  method:"POST",
			  credentials:"include",
			  body:fd,
		  });
		  const data=await res.json();
		  if(data.success){
			   fetchuser();
		  }
		  }
          return (
		  <div className="loginmain">
		  <header>
		  <p>Welcome to </p>
		  <p className="shopname">EXTREME -MEN</p>
		  </header>
			<section className="boxlogin">
			<h3>Login</h3>
			<input type="email" placeholder="example@gmail.com" onChange={(e:any)=>setEmail(e.target.value)}/><br />
			<input type="password" placeholder="password" onChange={(e:any)=>setPassword(e.target.value)}/><br />
			<button onClick={()=>hdlogin()}>Login</button>
			</section>
			<section className="toregister">
			<p>don't  you have account?create new account...</p>
			<Link to="/register" >Register</Link>
			</section>
		  </div>
		  )
}