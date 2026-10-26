import {useState,useEffect} from 'react'
import {useNavigate} from  'react-router-dom'
import {TiArrowBack} from 'react-icons/ti'
import {usingContext} from './../../../context/Context'
export default function OutStock(){
		const {url}=usingContext();
	interface cc{
		[key : string] : any;
	}
	const [c,setC]=useState<cc>();
	const navigate=useNavigate();
	const load=async()=>{
		const res=await fetch(`${url}/api/products/categories`);
		const data=await res.json();
		setC(data.categories);
	};
	
	useEffect(()=>{
		load();
	},[]);
	return (
	<div className="instockmain">
	<header style={{display:"flex",alignItems:"center",marginBottom:'2vw',fontWeight:'bold'}}>
	<TiArrowBack onClick={()=>navigate('/dashboard')} style={{width:'30px',marginRight:'5px',cursor:'pointer'}}/>
	<span className="linknav" >History</span>{'/'}<span>Outstock  </span>
	</header>
	<div className="wrapinstock">
	<section className="instocknav">
	{
		c?.map((i:any,k:any)=>(
		<section className="navitem" key={k} onClick={()=>navigate(i.name)}>{i.name}</section>
		))
	}
	
	</section>
	</div>
	
	</div>
	)
}