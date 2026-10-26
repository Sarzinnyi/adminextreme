import {Link} from 'react-router-dom'
import {useState} from 'react'
import {registering,sentotpapi,verifyotpapi} from './../../api/Auth/auth.api'
import './Register.css'
export default function Register(){
          const [name,setName]=useState<string | ''>('');
		  const [email,setEmail]=useState<string | ''>('');
		  const [password,setPassword]=useState<number | null>(null);
		  const [step,setStep]=useState<number>(1);
		  const [er,setEr]=useState<boolean>(false);
		  const hdstone=()=>{
		  if(!name || !email || !password){
		  return ;
		  }
		  setStep(2);
		  }
		  
		  const hdrg=async()=>{
		  const fd=new FormData();
		  fd.append('name',name);
		  fd.append('email',email);
		  fd.append('password',String(password));
		  const res=await registering(fd);
		  }
		  
          return (
			<>
			  {step==1 && <Otpsent setStep={setStep} name={name} email={email} password={password} setName={setName} setEmail={setEmail} setPassword={setPassword} er={er} setEr={setEr} hdstone={hdstone}/>}
			  {step==2 && <Verifyotp email={email} hdrg={hdrg}/>}
			</>
		  )
}

function Otpsent({setStep,setName,name,email,setEmail,password,setPassword,er,setEr,hdstone}){
            const hdsentotp=async()=>{
			 if(!name || !email || !password){
		  return ;
		  }
			const fd=new FormData();
			fd.append('email',email);
			const res=await sentotpapi(fd);
			if(res.success){
			   hdstone();
			}
			}
           return (
		   <div className="registermain">
		   <header>
		  <p>Welcome to </p>
		  <p className="shopname">EXTREME -MEN</p>
		  </header>
			<section className="boxregister">
			<h3>Register</h3>
			<input type="text" placeholder="name" onChange={(e:any)=>setName(e.target.value)}/>
			{er && !name && <span>Fill here</span>}
			<br />
			<input type="email" placeholder="example@gmail.com" onChange={(e:any)=>setEmail(e.target.value)}/>
			{er && !email && <span>Fill here</span>}
			<br />
			<input type="password" placeholder="password" onChange={(e:any)=>setPassword(e.target.value)}/>
			{er && !password && <span>Fill here</span>}
			<br />
			<button onClick={()=>{
			hdsentotp();
			setEr(true);
			}}>Register</button>
			</section>
			<section className="tologin">
			<p>If you have an account,login to your account...</p>
			<Link to="/login" >Login</Link>
			</section>
		  </div>
		   )
}

function Verifyotp({email,hdrg}){
       const [a,A]=useState<number | null>(null);
	   const [b,B]=useState<number | null>(null);
	   const [c,C]=useState<number | null>(null);
	   const [d,D]=useState<number | null>(null);
	   
	   const verifing=async()=>{
	   if(!a || !b || !c || !d){
	  return ;
	   }
	   const otp=a+b+c+d;
	   const fd=new FormData();
	   fd.append('email',email);
	   fd.append('otp',String(otp));
	   const res=await verifyotpapi(fd);
		if(res.success){
		hdrg();
		}
	   }
           return (
		   <div className="verifyotp">
			  <h3>Verify Otp</h3>
			  <input type="int" style={{width:"10px"}} onChange={(e:any)=>A(e.target.value)}/>
			  <input type="int" style={{width:"10px"}} onChange={(e:any)=>B(e.target.value)}/>
			  <input type="int" style={{width:"10px"}} onChange={(e:any)=>C(e.target.value)}/>
			  <input type="int" style={{width:"10px"}} onChange={(e:any)=>D(e.target.value)}/>
			  <button onClick={()=>verifing()}>Verify Otp</button>
		   </div>
		   )
}