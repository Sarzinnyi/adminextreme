import './../../styles/Addnew/AddnewClothes.css'
import {useState,useEffect} from 'react'
import {addingnewclothesapi} from './../../api/Products/products.api'
import CreatableSelect from 'react-select/creatable'
import {TiArrowBack} from 'react-icons/ti'
import {useNavigate} from 'react-router-dom'
import {usingContext} from './../../context/Context'
export default function AddnewClothes(){
	const {url}=usingContext();
	      const navigate=useNavigate();
		  const [cate,setCate]=useState<string>('clothes');
		  const [brand,setBrand]=useState<string | ''>('');
		  const [name,setName]=useState<string>('');
		  const [sqty,setSqty]=useState<number>(0);
		  const [mqty,setMqty]=useState<number>(0);
		  const [lqty,setLqty]=useState<number>(0);
		  const [price,setPrice]=useState<string >('');
		  const [color,setColor]=useState<string >('');
		  const [photo,setPhoto]=useState();
		  interface bd{
			  [key: string]:any;
		  }
		  const [brands,setBrands]=useState<bd | null>(null);
		  const [colors,setColors]=useState<bd | null>(null);
		  const [exitnames,setExitnames]=useState<bd | null>(null);
		   const [er,setEr]=useState<boolean>(false);
		 
		  const [preview,setPreview]=useState<string>('');
		  const [uploaded,setUploaded]=useState<boolean>(false);
		  const [sqarray,setSqarray]=useState([]);
		    const [sizesletter,setSizesletter]=useState([]);
		   const [sizesnumber,setSizesnumber]=useState([]);
		   const [selectsizes,setSelectsizes]=useState([]);
		   const [selectcompelete,setSelectcompelete]=useState(false);
		   const [choosesizecate,setChoosesizecate]=useState('');
		  const handlechange=(e:any)=>{
		  const file = e.target.files[0];
		  if(file){
		  setPhoto(file);
		  setPreview(URL.createObjectURL(file));
		  }
		  }
		  
		  const uploaddata=async()=>{
			   if(!cate || !brand || !name  || !price || !color || !photo){
		  return ;
		  }
		 
		  const fd=new FormData();
		  fd.append('category',String(cate));
		  fd.append('brand',String(brand));
		  fd.append('name',name);
		 
		  fd.append('price',String(price));
		  fd.append('color',color);
		  fd.append('photo',photo);
		fd.append('sizes_qty',JSON.stringify(sqarray));
		 
		 
		 const res=await fetch(`${url}/api/products/addnewclothes`,{
			 method:"POST",
			 credentials:"include",
			 body:fd,
		 });
		 const data=await res.json();
		  if(data.success){
			   load();
			   setEr(false);
		     setBrand('');
			 setName('');
			
			 setPrice('');
			 setColor('');
			 setPhoto('');
			 setPreview('');
			 setUploaded(true);
			
		  }
		  }
		  
		  const load=async()=>{
			  const res=await fetch(`${url}/api/products/brands`);
			  const res1=await fetch(`${url}/api/products/colors`);
			  const res2=await fetch(`${url}/api/products/sizes`);
			  const res3=await fetch(`${url}/api/products/allnames?category=clothes`);
			  const data=await res.json();
			  const data1=await res1.json();
			  const data2=await res2.json();
			  const data3=await res3.json();
			  if(data.success && data1.success && data2.success){
				  setBrands(data.brands);
				  setColors(data1.colors);
				setSizesletter(data2.sizesletter);
				setSizesnumber(data2.sizesnumber);
				  setExitnames(data3.names);
			  }
		  }
		
		  useEffect(()=>{
			  load();
		  },[]);
		
		const handelsizeqty=(size,qty)=>{
			setSqarray(prev => {
				const index=prev.findIndex(item => item.size == size);
				if(index !== -1){
					const newArray=[...prev];
					newArray[index]={...newArray[index],qty:qty};
						return newArray;
				}
				return [...prev,{size:size,qty:qty}];
			
			});
		}
		
		const checkboxsize=(size)=>{
			if(selectsizes.includes(size)){
				const filter=selectsizes.filter(i => i !== size);
				setSelectsizes(filter);
				return ;
			}
			setSelectsizes([...selectsizes,size]);
			return;
		}
		console.log('sizes',selectsizes);
		console.log('sqa',sqarray);
          return (
		  <div className="addnewclothes">
			 <section>
			 <header style={{display:"flex",alignItems:"center",marginBottom:'2vw',fontWeight:'bold',marginTop:'1vw'}}>
	<TiArrowBack onClick={()=>navigate('/dashboard')} style={{width:'30px',marginRight:'5px',cursor:'pointer'}}/>
	<span className="linknav" >NewProducts</span>{'/'}<span>Clothes</span>
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
			 
			 <section className="tbox nameselect">
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
			 
			 
			 </div>
			 
			 <div className="addright">
			 
				<section className="selectsizescategory">
				<p>Choose size category with letter or number?</p>
				<select onChange={(e)=>{setChoosesizecate(e.target.value);setSelectcompelete(false);setSelectsizes([]);setSqarray([]);}}>
				<option value="">select...</option>
				<option value="letter">letter</option>
				<option value="number">number</option>
				</select>
				</section>
				
				<section className="sizesselectbox">
				
				{choosesizecate == 'letter' &&  !selectcompelete&& <section className="sizebox">
				<section className="sizeboxwrap" style={{display:'flex',flexWrap:'wrap'}}>
				{
					sizesletter?.map((i,k)=>(
					<section className="tbox" key={k}>
			        <input type="checkbox"  className="textinput"  style={{width:'20px'}} onChange={()=>checkboxsize(i.size)}/>	<p>size-{i.size}</p>
				
				</section>
					))
				}
				</section>
					<button onClick={()=>setSelectcompelete(true)}>Compelete</button>
				</section>}
				
				{choosesizecate == 'number' && !selectcompelete && <section className="sizebox" >
				
				<section className="sizeboxwrap" style={{display:'flex',flexWrap:'wrap'}}>
				{
					sizesnumber?.map((i,k)=>(
					<section className="tbox" key={k}>
			        <input type="checkbox"  className="textinput"  style={{width:'20px'}} onChange={()=>checkboxsize(i.size)}/>	<p>size-{i.size}</p>
				
				</section>
					))
				}
				</section>
				<button onClick={()=>setSelectcompelete(true)}>Compelete</button>
				</section>}
				
			
				
				</section>
				
				<section className="tboxcontainer">
				{selectcompelete && <section className="sizebox">
				<button onClick={()=>{setSelectcompelete(false);setSelectsizes([]);setSqarray([]);}}>Reselectsizes</button>
				{
					selectsizes?.map((i,k)=>(
					<section className="tbox" key={k}>
				 <p>size-{i}</p><input type="number"  className="textinput" onChange={(e)=>handelsizeqty(i,e.target.value)}/>
				
				</section>
					))
				}
				</section>}
				
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