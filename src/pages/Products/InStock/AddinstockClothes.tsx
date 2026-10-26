import {useParams,useNavigate} from 'react-router-dom'
import {useState,useEffect} from 'react'
import {TiArrowBack} from 'react-icons/ti'
import './../../../styles/Addinstock/AddinstockClothes.css'
import {usingContext} from './../../../context/Context'
export default function AddinstockClothes(){
	interface cc{
		[key:string] : any;
	}
		const {url}=usingContext();
	const {id}=useParams<{id :string}>();
	const navigate=useNavigate();
	if (!id) {
  return <div>Invalid URL</div>;
}
	const arr=id.split(',');
	const [pid,color]=arr;
	
	const [c,setC]=useState<cc>();
	const [detailsizeandqty,setDetailsizeandqty]=useState([]);
	const [snewqty,setSnewqty]=useState<string>('0');
	const [mnewqty,setMnewqty]=useState<string>('0');
	const [lnewqty,setLnewqty]=useState<string>('0');
	const [sqarray,setSqarray]=useState([]);
	const [sl,setSl]=useState([]);
	const [sn,setSn]=useState([]);
	const [selectsizecate,setSelectsizecate]=useState('');
	const [selectsizes,setSelectsizes]=useState([]);
	const [selectcompelete,setSelectcompelete]=useState(false);

const load=async()=>{
	if(!pid || !color){
		return ;
	}
	
	function getArrayType(arr) {
    if (arr.length === 0) return 'empty';

    if (arr.every(size => !isNaN(Number(size)) && String(size).trim() !== '')) {
        return 'number';
    }

    if (arr.every(size => isNaN(Number(size)))) {
        return 'string';
    }

    return 'mixed';
}

    const fd=new FormData();
	fd.append('pid',pid);
	fd.append('color',color);
	const res=await fetch(`${url}/api/products/clothesdetailall`,{
		method:"POST",
		credentials:"include",
		body:fd,
	});
	const res2=await fetch(`${url}/api/products/sizes`);
	const data=await res.json();
	const data2=await res2.json();
	
	setC(data.clothesdetail);
	setDetailsizeandqty(data.detailsizeandqty);
	setSl(data2.sizesletter);
	setSn(data2.sizesnumber);
	const sizesarray=data.detailsizeandqty.map(i => i.size);
	if(getArrayType(sizesarray) == 'number'){
		setSelectsizecate('number');
	}
	if(getArrayType(sizesarray) == 'string'){
		setSelectsizecate('letter');
	}
}

useEffect(()=>{
	load();
},[]);

const handleaddinginstock=async()=>{
	
	const fd=new FormData();
	fd.append('pid',pid);
	fd.append('color',color);
	fd.append('sizes_qty',JSON.stringify(sqarray));
	const res=await fetch(`${url}/api/products/addinstockclothes`,{
		method:"POST",
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

const handlesizeqtyarray=(size,qty)=>{
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
		
		const handleselectsize=(size)=>{
			if(selectsizes.includes(size)){
				const filter=selectsizes.filter(i => i !== size);
				setSelectsizes(filter);
				return ;
			}
			setSelectsizes([...selectsizes,size]);
			return ;
		}
		
console.log('sq',sqarray);
console.log('ss',selectsizes);
	return (
	<div className="addinstockclothes">
	 <header style={{display:"flex",alignItems:"center",marginBottom:'2vw',fontWeight:'bold',marginTop:'1vw'}}>
	<TiArrowBack onClick={()=>navigate(-1)} style={{width:'30px',marginRight:'5px',cursor:'pointer'}}/>
	<span className="linknav" onClick={()=>navigate(-1)}>Stock</span>{'/'}<span>Clothes</span>{'/'}<span>Instock</span>
	     </header>
	<h3>Add Instock Clothes</h3>
	
	<div className="addinstockclotheswrap">
	<section className="addinstockphoto">
	
	<img src={`http://api.zinnyi.site/photo/${c?.photo}`} alt='photo'/>
	</section>
	
	<section className="data">
	<section className="dataitem">
	<p className="leftitem">Category</p><p>{c?.category}</p>
	</section>
	<section className="dataitem">
	<p className="leftitem">Brand</p><p>-{c?.brand}</p>
	</section>
	<section className="dataitem">
	<p className="leftitem">Name</p><p>-{c?.name}</p>
	</section>
	<section className="dataitem">
	<p className="leftitem">Color</p><p>-{c?.color}</p>
	</section>
	<section className="dataitem">
	<p className="leftitem">Price</p><p>-{c?.price}</p>
	</section>
	{
		   detailsizeandqty?.map((i,k)=>(
		   <section className="dataitem" key={k}>
		   <p className="leftitem">size-{i.size}</p><p>-{i.qty}</p>
		   </section>
		   ))
	   }
	</section>
	</div>
	
	
	<section className="addinstockclothesinput">
	<h4>This is not editing stock qty,Add new  of product only!!</h4>
	<p>Pls select which sizes do u want to instock...</p>
	
	<section className="selectboxes">
	{
		!selectcompelete  && selectsizecate == 'letter' && <section className="checkboxes">
		<section className="checkboxeswrap">
		{
			sl.map((i,k)=>(
			<section className="boxitem" key={k}>
			<input type="checkbox" onChange={()=>handleselectsize(i.size)}/><p>{i.size}</p>
			</section>
			))
		}
		</section>
		<button onClick={()=>setSelectcompelete(true)}>Compelete</button>
		
		</section>
	}
	
	{
		!selectcompelete  && selectsizecate == 'number' && <section className="checkboxes">
		<section className="checkboxeswrap">
		{
			sn.map((i,k)=>(
			<section className="boxitem">
			<input type="checkbox"  onChange={()=>handleselectsize(i.size)}/><p>{i.size}</p>
			</section>
			))
		}
		</section>
		<button onClick={()=>setSelectcompelete(true)}>Compelete</button>
		
		</section>
	}
	
	</section>
	
	{
		selectcompelete && <section className="inputboxes">
		<button onClick={()=>{
			setSelectcompelete(false);
			setSelectsizes([]);
			setSqarray([]);
		}}>Re-Select Size</button>
	{
		selectsizes?.map((i,k)=>(
		<section className="inputtextbox"style={{display:'flex'}}>
	<p className="leftitem">{i}</p>
	<input type="number"  placeholder="new instock qty" onChange={(e:any)=>handlesizeqtyarray(i,e.target.value == '' ? 0 : e.target.value)}/>
	</section>
		))
	}
	</section>
	}
	
	
	
	
	<button onClick={()=>{
		handleaddinginstock();
	
	}}>Add</button>
	</section>
	</div>
	)
}