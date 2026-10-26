import './../../styles/Specification/AddnewCategory.css'
import {useState,useEffect} from 'react'
import {usingContext} from './../../context/Context'
export default function AddnewBrand(){
	interface bb{
		[key : string] : any;
	}
	const {url}=usingContext();
	const [b,setB]=useState<bb>();
	const [nb,setNb]=useState<string | ''>('');

    const load=async()=>{
		const res=await fetch(`${url}/api/products/brands?category=clothes,watches`);
		const data=await res.json();
		if(data.success){
			setB(data.brands);
			}
	}
	useEffect(()=>{
		load();
	},[]);
	
	const senddata=async()=>{
		if(!nb){
			return ;
		}
		const fd=new FormData();
		fd.append('brand',nb);
		const res=await fetch(`${url}/api/products/addbrand`,{
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
	<div className="addnewbrand">
	<h3>Add New Brand</h3>
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
	<input type="text" value={nb} placeholder="newbrandname" onChange={(e:any)=>setNb(e.target.value)}/>
	<button onClick={()=>senddata()}>Add</button>
	</section>
	</div>
	)
}