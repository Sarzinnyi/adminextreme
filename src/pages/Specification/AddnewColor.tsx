import './../../styles/Specification/AddnewCategory.css'
import {useState,useEffect} from 'react'
import {usingContext} from './../../context/Context'
export default function AddnewColor(){
	interface bb{
		[key : string] : any;
	}
	const {url}=usingContext();
	const [b,setB]=useState<bb>();
	const [nb,setNb]=useState<string | ''>('');

    const load=async()=>{
		const res=await fetch(`${url}/api/products/colors`);
		const data=await res.json();
		setB(data.colors);
		
	}
	useEffect(()=>{
		load();
	},[]);
	
	const senddata=async()=>{
		if(!nb){
			return ;
		}
		const fd=new FormData();
		fd.append('color',nb);
		const res=await fetch(`${url}/api/products/addcolor`,{
			method:"POST",
			credentials:"include",
			body:fd,
		});
		const data=await res.json();
		if(data.success){
			load();
			setNb('');
		}
	}

	return (
	<div className="addnewcolor">
	<h3>Add New Color</h3>
	<section className="listbox">
	<ol>
	{
		b?.map((i:any,k:any)=>(
		         
				 <li key={k}>{i.name}</li>
				 
		))
	}
	</ol>
	</section>
	<section className="addbox">
	<input type="text" value={nb} placeholder="newcolorname" onChange={(e:any)=>setNb(e.target.value)}/>
	<button onClick={()=>senddata()}>Add</button>
	</section>
	</div>
	)
}