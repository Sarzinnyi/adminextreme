import {useParams,useNavigate} from 'react-router-dom'
import {useState,useEffect} from 'react'
import {TiArrowBack} from 'react-icons/ti'
import {usingContext} from './../../context/Context'
export default function WatchesDetail(){
	const {data}=useParams<{data : string}>();
	const navigate=useNavigate();
	const {url}=usingContext();
	if (!data) {
  return <div>Invalid URL</div>;
}
	const [rqpid,rqcolor]=data.split('_');
	interface dd{
		[key:string] : any;
	}
	const [detail,setDetail]=useState<dd>();
	const [edit,setEdit]=useState<boolean>(false);
	const [save,setSave]=useState<boolean>(true);
	const [category,setCategory]=useState<string >('');
	const [brand,setBrand]=useState<string>('');
	const [name,setName]=useState<string>('');
	const [price,setPrice]=useState<string>('');
	
	const [color,setColor]=useState<string>('');
	const [qty,setQty]=useState<string>('');
	const [photo,setPhoto]=useState<string>('');
	const [dc,setDc]=useState<boolean>(false);
	const [loading,setLoading]=useState<boolean>(true);
	const [uploadphoto,setUploadphoto]=useState<File>();
	const [preview,setPreview]=useState<string>('');
		const [updateloading,setUpdateloading]=useState<boolean>(false);
		const [pdelete,setPdelete]=useState<boolean>(false);
		const [pupload,setPupload]=useState<boolean>(false);
		
	const load=async()=>{
		try{
			if(!rqpid || !rqcolor){
				return ;
			}
			setLoading(true);
			const fd=new FormData();
		fd.append('pid',rqpid);
		fd.append('color',rqcolor);
		 await new Promise(resolve => setTimeout(resolve, 2000));

		const res=await fetch(`${url}/api/products/watchesdetail`,{
			method:"POST",
			body:fd,
		});
		const data=await res.json();
		setDetail(data.watchesdetail);
		setCategory(data.watchesdetail.category);
		setBrand(data.watchesdetail.brand);
		
		setName(data.watchesdetail.name);
		setPrice(data.watchesdetail.price);
		setColor(data.watchesdetail.color);
		setQty(data.watchesdetail.qty);
		setPhoto(data.watchesdetail.photo);
		}catch(err){
			console.log(err);
		}finally{
			setLoading(false);
		}
		
	}
	useEffect(()=>{
		load();
	},[]);
	
	if(loading){
		return(
		<Skeleton />
		)
	}
	
	const updating=async()=>{
	try{
		if(!detail || !brand || !name || !price || !color){
			return ;
		}
		setUpdateloading(true);
		const fd=new FormData();
		fd.append('p_id',detail?.p_id);
		fd.append('brand',brand);
		fd.append('name',name);
		fd.append('price',String(price));
		fd.append('color',detail?.color);
		fd.append('newcolor',color);
		const res=await fetch(`${url}/api/products/watchesdetailupdate`,{
			method:'POST',
			credentials:"include",
			body:fd,
		});
		const data=await res.json();
		if(data.success){
			load();
		}
	}catch(err){
		console.log(err);
	}finally{
		setUpdateloading(false);
	}	
	}
	
	
	const photodelete=async()=>{
		try{
			if(!detail || !photo){
				return ;
			}
			setPdelete(true);
			const fd=new FormData();
		fd.append('p_id',detail?.p_id);
		fd.append('color',detail?.color);
		fd.append('originphoto',photo);
		fd.append('task','delete');
		const res=await fetch(`${url}/api/products/watchesphotoupdate`,{
			method:'POST',
			credentials:"include",
			body:fd,
		});
		const data=await res.json();
		if(data.success){
			load();
		}
		}catch(err){
			console.log(err);
		}finally{
			setPdelete(false);
		}
	
	}
	
	
	const photoupload=async()=>{
		try{
			if(!detail || !uploadphoto){
				return;
			}
			setPupload(true);
			const fd=new FormData();
		fd.append('p_id',detail?.p_id);
		fd.append('color',detail?.color);
		fd.append('photo',uploadphoto);
		fd.append('task','update');
		const res=await fetch(`${url}api/products/watchesphotoupdate`,{
			method:'POST',
			credentials:"include",
			body:fd,
		});
		const data=await res.json();
		if(data.success){
			load();
		}
		}catch(err){
			console.log(err);
		}finally{
			setPupload(false);
		}
	
	}
	
	const imgget=(e:any)=>{
	const file=e.target.files[0];
    if(file){
		setUploadphoto(file);
		setPreview(URL.createObjectURL(file));
	}	
	}
	if(pupload || updateloading || pdelete){
		return( <h3>loading</h3>)
	}
	return (
	<div className="clothesdetail">
	<header style={{display:"flex",alignItems:"center",marginBottom:'2vw',fontWeight:'bold',marginTop:'1vw'}}>
	<TiArrowBack onClick={()=>navigate(-1)} style={{width:'30px',marginRight:'5px',cursor:'pointer'}}/>
	<span className="linknav" onClick={()=>navigate(-1)}>Stock</span>{'/'}<span>Watches</span>{'/'}<span>Detail</span>
	</header>
	{dc &&
	<>
	<section className="blackbox" />
	<section className="deletecheckbox">
	<h4>Delete photo</h4><button onClick={()=>{
	setDc(false);
	photodelete();
	}}>Confirm</button><button onClick={()=>setDc(false)}> Cancel</button>
	</section>	
	</>
	}
	
	
	<h4>Clothes Detail {save ? <button style={{marginLeft:'15%'}} onClick={()=>{
		setEdit(true);
		setSave(false);
	}}>Edit</button> : <button style={{marginLeft:'15%'}} onClick={()=>{
		setEdit(false);
		setSave(true);
		updating();
	}}>Save</button>}</h4>
	<section className="detailwrap">
	<section className="detailimg">
	{
		detail?.photo ? <section className="detailimg">
	<button className='imgdelete' onClick={()=>setDc(true)}>X</button>
	<img src={`http://api.zinnyi.site/photo/${detail?.photo}`} alt='Photo' style={{width:'30vw',height:'40vh'}}/>
	</section> : <section className="uploadimg">
	<label htmlFor='upload'><img src={preview || "/favicon.svg"} alt="upload" style={{width:'150px',height:'150px',objectFit:'cover',borderRadius:'10%',
	border:'1px solid grey',background:'white'}} />
	</label>
	<input type="file" accept="image/*" style={{display:'none'}} id='upload' onChange={imgget}/><br/>
	<button onClick={()=>photoupload()}>Upload</button>
	</section>
	}
	</section>
	{edit ?
	<section className="detailtextinput">
	<section className="textbox"><p className="leftside">Category</p>{category}</section>
	<section className="textbox"><p className="leftside">Brand</p><input type="text" value={brand} onChange={(e:any)=>setBrand(e.target.value)}/></section>
	<section className="textbox"><p className="leftside">Name</p><input type='text' value={name} onChange={(e:any)=>setName(e.target.value)}/></section>
	<section className="textbox"><p className="leftside">Price</p><input type='text' value={price} onChange={(e:any)=>setPrice(e.target.value)}/></section>
	<section className="textbox"><p className="leftside">Color</p><input type='text' value={color} onChange={(e:any)=>setColor(e.target.value)}/></section>
	<section className="textbox"><p className="leftside">Qty</p><p>{detail?.qty}</p></section>
	
	</section>
	:
	<section className="detailtext">
	<section className="textbox"><p className="leftside">Category</p><p>-{category}</p></section>
	<section className="textbox"><p className="leftside">Brand</p><p>-{brand}</p></section>
	<section className="textbox"><p className="leftside">Name</p><p>-{name}</p></section>
	<section className="textbox"><p className="leftside">Price</p><p>-{price}</p></section>
	<section className="textbox"><p className="leftside">Color</p><p>-{color}</p></section>
	<section className="textbox"><p className="leftside">Qty</p><p>-{qty}</p></section>
	
	</section>
	
	}
	
	</section>
	</div>
	)
}


function Skeleton(){
	return (
	<div className="skeletonclothesdetail">
	<h4>Clothes Detail</h4>
	<div className="sclothesdetailwrap">
	<div className="skeletonclothesdetailimg"></div>
	<div className="skeletonclothesdetailtextbox">
	<section className="stextbox"><p className="sleftside"></p><p className="srightside"></p></section>
	<section className="stextbox"><p className="sleftside"></p><p className="srightside"></p></section>
	<section className="stextbox"><p className="sleftside"></p><p className="srightside"></p></section>
	<section className="stextbox"><p className="sleftside"></p><p className="srightside"></p></section>
	<section className="stextbox"><p className="sleftside"></p><p className="srightside"></p></section>
	<section className="stextbox"><p className="sleftside"></p><p className="srightside"></p></section>
	<section className="stextbox"><p className="sleftside"></p><p className="srightside"></p></section>
	
	</div>
	</div>
	</div>
	)
}