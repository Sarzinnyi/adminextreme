import {useParams,useNavigate} from 'react-router-dom'
import {useState,useEffect} from 'react'
import {TiArrowBack} from 'react-icons/ti'
import './../../../styles/Addinstock/AddinstockClothes.css'
import {usingContext} from './../../../context/Context'
export default function AddoutstockClothes(){
		const {url}=usingContext();
	const {id}=useParams<{id : string}>();
	const navigate=useNavigate();
	if (!id) {
  return <div>Invalid URL</div>;
}
	const arr=id.split(',');
	const [pid,color]=arr;
	interface cc{
		[key : string] : any;
	}
	const [c,setC]=useState<cc>();
	const [snewqty,setSnewqty]=useState<string>('0');
	const [mnewqty,setMnewqty]=useState<string>('0');
	const [lnewqty,setLnewqty]=useState<string>('0');

const load=async()=>{
	if(!pid || !color){
		return ;
	}
    const fd=new FormData();
	fd.append('pid',pid);
	fd.append('color',color);
	const res=await fetch(`${url}/api/products/clothesdetailall`,{
		method:"POST",
		body:fd,
	});
	const data=await res.json();
	setC(data.clothesdetail);
}

useEffect(()=>{
	load();
},[]);

const handleaddinginstock=async()=>{
	
	const fd=new FormData();
	fd.append('pid',pid);
	fd.append('color',color);
	fd.append('snewqty',String(snewqty));fd.append('mnewqty',String(mnewqty));fd.append('lnewqty',String(lnewqty));
	fd.append('price',String(c.price));
	fd.append('category',c.category);
	const res=await fetch(`${url}/api/products/addoutstockclothes`,{
		method:"POST",
		credentials:"include",
		body:fd,
	});
	const data=await res.json();
	if(data.success){
		load();
		setSnewqty('0');
		setMnewqty('0');
		setLnewqty('0');
	}
}

	return (
	<div className="addinstockclothes">
	 <header style={{display:"flex",alignItems:"center",marginBottom:'2vw',fontWeight:'bold',marginTop:'1vw'}}>
	<TiArrowBack onClick={()=>navigate(-1)} style={{width:'30px',marginRight:'5px',cursor:'pointer'}}/>
	<span className="linknav" onClick={()=>navigate(-1)}>Stock</span>{'/'}<span>Clothes</span>{'/'}<span>Outstock</span>
	     </header>
	<h3>Add Outstock Clothes</h3>
	
	<div className="addinstockclotheswrap">
	<section className="addinstockphoto">
	
	<img src={`http://api.zinnyi.site/photo/${c?.photo}`} alt='photo'/>
	</section>
	
	<section className="data">
	<section className="dataitem">
	<p className="leftitem">Category::</p><p>{c?.category}</p>
	</section>
	<section className="dataitem">
	<p className="leftitem">Brand::</p><p>{c?.brand}</p>
	</section>
	<section className="dataitem">
	<p className="leftitem">Name::</p><p>{c?.name}</p>
	</section>
	<section className="dataitem">
	<p className="leftitem">Color::</p><p>{c?.color}</p>
	</section>
	<section className="dataitem">
	<p className="leftitem">Price::</p><p>{c?.price}</p>
	</section>
	<section className="dataitem">
	<p className="leftitem">S</p><p>{c?.ssizeqty}</p>
	</section>
	<section className="dataitem">
	<p className="leftitem">M</p><p>{c?.msizeqty}</p>
	</section>
	<section className="dataitem">
	<p className="leftitem">L</p><p>{c?.lsizeqty}</p>
	</section>
	
	</section>
	</div>
	
	<section className="addinstockclothesinput">
	<h4>This is not editing stock qty,Add new  of product only!!</h4>

	<section className="inputtextbox"style={{display:'flex'}}>
	<p className="leftitem">S</p>
	<input type="number" value={snewqty}  onChange={(e:any)=>setSnewqty(e.target.value)}/>
	</section>
	<section className="inputtextbox" style={{display:'flex'}}>
	<p className="leftitem">M</p>
	<input type="number" value={mnewqty}  onChange={(e:any)=>setMnewqty(e.target.value)}/>
	</section>
	<section className="inputtextbox"style={{display:'flex'}}>
	<p className="leftitem">L</p>
	<input type="number" value={lnewqty}  onChange={(e:any)=>setLnewqty(e.target.value)}/>
	</section>
	
	<button onClick={()=>{
		handleaddinginstock();
		
	}}>Add</button>
	</section>
	</div>
	)
}