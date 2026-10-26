import {useParams,useNavigate} from 'react-router-dom'
import {useState,useEffect} from 'react'
import {TiArrowBack} from 'react-icons/ti'
import './../../../styles/Addinstock/AddinstockClothes.css'
import {usingContext} from './../../../context/Context'
export default function AddoutstockWatches(){
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
	const [qty,setQty]=useState<string>('0');
	
const load=async()=>{
	if(!pid || !color){
		return ;
	}
    const fd=new FormData();
	fd.append('pid',pid);
	fd.append('color',color);
	const res=await fetch(`${url}/api/products/watchesdetailall`,{
		method:"POST",
		body:fd,
	});              
	const data=await res.json();
	setC(data.watchesdetail);
}

useEffect(()=>{
	load();
},[]);

const handleaddinginstock=async()=>{
	
	const fd=new FormData();
	fd.append('pid',pid);
	fd.append('color',color);
	fd.append('qty',String(qty));
	fd.append('price',String(c.price));
	fd.append('category',c.category);
	const res=await fetch(`${url}/api/products/addoutstockwatches`,{
		method:"POST",
		credentials:"include",
		body:fd,
	});
	const data=await res.json();
	if(data.success){
		load();
		setQty('0');
	}
}

	return (
	<div className="addinstockclothes">
	 <header style={{display:"flex",alignItems:"center",marginBottom:'2vw',fontWeight:'bold',marginTop:'1vw'}}>
	<TiArrowBack onClick={()=>navigate(-1)} style={{width:'30px',marginRight:'5px',cursor:'pointer'}}/>
	<span className="linknav" onClick={()=>navigate(-1)}>Stock</span>{'/'}<span>Watches</span>{'/'}<span>Outstock</span>
	     </header>
	<h3>Add Outstock Watches</h3>
	
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
	<p className="leftitem">Qty</p><p>{c?.qty}</p>
	</section>
	
	
	</section>
	</div>
	
	<section className="addinstockclothesinput">
	<h4>This is not editing stock qty,Add new  of product only!!</h4>

	<section className="inputtextbox"style={{display:'flex'}}>
	<p className="leftitem">Qty</p>
	<input type="number" value={qty}  onChange={(e:any)=>setQty(e.target.value)}/>
	</section>
	
	
	<button onClick={()=>{
		handleaddinginstock();
		
	}}>Add</button>
	</section>
	</div>
	)
}