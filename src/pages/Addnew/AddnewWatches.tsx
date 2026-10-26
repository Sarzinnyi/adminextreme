import {useState,useEffect} from 'react'
import {TiArrowBack} from 'react-icons/ti'
import {useNavigate} from 'react-router-dom'
import CreatableSelect from 'react-select/creatable'
import {addingnewwatchesapi} from './../../api/Products/products.api'
import './../../styles/Addnew/AddnewWatches.css'
import {usingContext} from './../../context/Context'
export default function AddnewWatches(){
		  const [cate,setCate]=useState<string>('watches');
		  const {url}=usingContext();
		  const navigate=useNavigate();
		  const [brand,setBrand]=useState<string | ''>('');
		  const [name,setName]=useState<string>('');
		 
		  const [qty,setQty]=useState<number>(0);
		
		  const [price,setPrice]=useState<string | ''>('');
		  const [color,setColor]=useState<string | ''>('');
		  const [photo,setPhoto]=useState<File>();
		  interface bd{
			  [key: string] : any;
		  }
		  const [brands,setBrands]=useState<bd | null>(null);
		  const [colors,setColors]=useState<bd | null>(null);
		  const [exitnames,setExitnames]=useState<bd | null>(null);
		   const [er,setEr]=useState<boolean>(false);
		   
		  const [preview,setPreview]=useState<string>('');
		  const [uploaded,setUploaded]=useState<boolean>(false);
		  
		  const handlechange=(e:any)=>{
		  const file = e.target.files[0];
		  if(file){
		  setPhoto(file);
		  setPreview(URL.createObjectURL(file));
		  }
		  }
		  
		  const uploaddata=async()=>{
			    if(!cate || !brand || !name || !qty || !price || !color || !photo){
		  return ;
		  }
		  const fd=new FormData();
		  fd.append('category',String(cate));
		  fd.append('brand',String(brand));
		  fd.append('name',name);
		  fd.append('qty',String(qty));
		  fd.append('price',String(price));
		  fd.append('color',color);
		  fd.append('photo',photo);
		  
		
		 
		 const res=await fetch(`${url}/api/products/addnewwatches`,{
			 method:"POST",
			 credentials:"include",
			 body:fd,
		 })
		 const data=await res.json();
		 if(data.success){
			  load();
		     setBrand('');
			 setName('');
			 setQty('');
			 setPrice('');
			 setColor('');
			 setPhoto('');
			 setPreview('');
			 setUploaded(true);
			 setEr(false);
		  }
		  }
		  
		  
		   const load=async()=>{
			   const res=await fetch(`${url}/api/products/brands`);
			  const res1=await fetch(`${url}/api/products/colors`);
			  const res2=await fetch(`${url}/api/products/allnames?category=watches`);
			  const data=await res.json();
			  const data1=await res1.json();
			  const data2=await res2.json();
			  if(data.success){
				  setBrands(data.brands);
			  }
			  if(data1.success){
				  setColors(data1.colors);
			  }
			  if(data2.success){
				  setExitnames(data2.names);
			  }
		  }
		
		  useEffect(()=>{
			  load();
		  },[]);
          return (
		  <div className="addnewwatches">
			 <section>
			 <header style={{display:"flex",alignItems:"center",marginBottom:'2vw',fontWeight:'bold',marginTop:'1vw'}}>
	<TiArrowBack onClick={()=>navigate('/dashboard')} style={{width:'30px',marginRight:'5px',cursor:'pointer'}}/>
	<span className="linknav" >NewProducts</span>{'/'}<span>Watches</span>
	        </header>
			 </section>
			 <div className="addwrap">
			 {
					uploaded && <h3>Uploaded Compelete</h3>
				}
				<section className="colorandbrand">
				<button onClick={()=>navigate('/specification/addcolor')}>add new colors</button> <button onClick={()=>navigate('/specification/addbrand')}>add new brands</button>
				</section>
				
			 <section className="tphoto">
				 <label htmlFor="pt"><img src={preview || "/favicon.svg"} alt="upload" 
				 style ={{width:"150px",height:"150px",objectFit:"cover",borderRadius:"50%",cursor:"pointer",
				 background:"white",border:'1px solid grey'}}/></label>
				 
				 <input type="file" id="pt" accept="image/*"  onChange={handlechange} style={{display:"none"}} />{er && !cate && <span>Fill Here</span>}
				</section>
				
			 <div className="addleft">
			 
				
			
			<section className="tbox">
				 <p>Brand</p>
				 <select value={brand} onChange={(e:any)=>setBrand(e.target.value)} className="selectbox">
				 <option value=''>Select Brand</option>
				 {
					 brands?.map((i:any,k:any)=>(
					 <option key={k} value={i.name}>{i.name}</option>
					 ))
				 }
				 </select>
				 {er && !brand && <span>Fill Here</span>}
				</section>
			 
			 <section className="tbox">
			   <p>Name</p>
			   <CreatableSelect className="selectbox selecttypebox"
  options={exitnames}
  getOptionLabel={(option) => option.name}
  getOptionValue={(option) => option.name}
  value={exitnames?.find(item => item.name === name) || { name }}
  onChange={(option) => setName(option?.name || option?.label || "")}
  placeholder="Select"
/>

			   {er && !name && <span>Fill Here</span>}
			 </section>
			 <section className="tbox">
				 <p>Qty</p><input type="number" value={qty} onChange={(e:any)=>setQty(e.target.value)} className="textinput"/>
				 {er && !qty && <span>Fill Here</span>}
				</section>
			 
			 
			 </div>
			 
			 <div className="addright">
				
				
				<section className="tbox">
				 <p>Price</p><input type="text" value={price} onChange={(e:any)=>setPrice(e.target.value)} className="textinput"/>
				 {er && !price && <span>Fill Here</span>}
				</section>
				
				<section className="tbox">
<p>Color</p><select value={color} onChange={(e:any)=>setColor(e.target.value)} className="selectbox">
				 <option value=''>Select Color</option>
				 {
					 colors?.map((i:any,k:any)=>(
					 <option key={k} value={i.name}>{i.name}</option>
					 ))
				 }
				 </select>
				 {er && !color && <span>Fill Here</span>}
				</section>
				
				
				
				<section className="tboxbutton">
				   <button onClick={()=>{
				   uploaddata();
				    setEr(true);
				   }}>Addnew</button>
				</section>
				
			 </div>
			 
			 </div>
		  </div>
		  )
}