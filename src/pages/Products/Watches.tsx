import {useState,useEffect} from 'react'
import {useNavigate} from 'react-router-dom'
import {TiArrowBack} from 'react-icons/ti'
import {usingContext} from './../../context/Context'
export default function Watches(){
	interface cc{
		[key:string] : any;
	}
	const {url}=usingContext();
	const [c,sc]=useState<cc>();
	const [filter,setFilter]=useState<string>('');
	const [sort,setSort]=useState<string>('1');

	
	const [page,setPage]=useState<number>(1);
	const [allpagecount,setAllpagecount]=useState<number >(0);
	const [pagearray,setPagearray]=useState<number[]>([]);
	const [allwatchescount,setAllwatchescount]=useState<number>(0);
	const [brands,setBrands]=useState<cc>();
	
	const navigate=useNavigate();
	const load=async()=>{
	
		const fd=new FormData();
		fd.append('filter',filter);
		fd.append('sort',sort);
		fd.append('page',String(page));
		
		const res=await fetch(`${url}/api/products/allwatches`,{
			method:"POST",
			body:fd,
		});
		const res1=await fetch(`${url}/api/products/categorybrands?category=watches`);
		const data=await res.json();
		const data1=await res1.json();
		setBrands(data1.brands);
		setAllwatchescount(data.allwatchescount.count);
		sc(data.allwatches);
	}
	useEffect(()=>{
		load();
	},[filter,sort,page]);
	
	const navcount=()=>{
		const result=allwatchescount/8;
		const remain=allwatchescount% 8;
		const int=Math.floor(result);
	
		if(!remain && int>=1){
			const rang : number=int;
			let arr : number[]=[];
			for(let i=1;i<=rang;i++){
				arr=[...arr,i];
				if(i == 5) break;
			}
			setPagearray(arr);
			setAllpagecount(rang);
		}
		if(remain && int>=1){
			const rang : number=int+1;
			let arr : number[]=[];
			for(let i=1;i<=rang;i++){
				arr=[...arr,i];
				if(i == 5) break;
			}
			setPagearray(arr);
			setAllpagecount(rang);
		}
		if(remain && int<1){
			const rang : number=1;
			let arr : number[]=[1];
			setPagearray(arr);
			setAllpagecount(rang);
		}
	}
	useEffect(()=>{
		navcount();
	},[allwatchescount]);
	
	const hdnext=()=>{
		if(pagearray?.includes(allpagecount)){
			return ;
		}else{
			setPagearray(pagearray?.map(p => p+1));
		}
	};
	
	const hdback=()=>{
		if(pagearray?.includes(1)){
			return ;
		}else{
			setPagearray(pagearray?.map(p => p-1));
		}
	}
	useEffect(()=>{
		setPage(1);
	},[filter])
	
	return (
	<div className="stock">
     <header style={{display:"flex",alignItems:"center",marginBottom:'2vw',fontWeight:'bold',marginTop:'1vw'}}>
	<TiArrowBack onClick={()=>navigate('/dashboard')} style={{width:'30px',marginRight:'5px',cursor:'pointer'}}/>
	<span className="linknav" >Stock</span>{'/'}<span>Watches</span>
	</header>
	<section className="filterandsort">
	<span>Filter By</span>
	<select className="filter" onChange={(e:any)=>setFilter(e.target.value)}>
	<option default value=''>All</option>
	{
		brands?.map((i:any,k:any)=>{
			return (<option key={k} value={i.name} >{i.name}</option>)
		})
	}
	</select>
	<span>Sort By</span>
	<select className="sort" onChange={(e:any)=>setSort(e.target.value)}>
	<option value="1">Default</option>
	<option value="2">last date</option>
	<option value="3">old date</option>
	<option value="4">name a-z</option>
	<option value="5">name z-a</option>
	<option value="6">brand a-z</option>
	<option value="7">brand z-a</option>
	</select>
	
	<span>Page-{page}</span>
	</section>
	
	<section className="datatable" style={{minHeight:'80vh'}}>
	<table >
	<thead>
	<tr>
    <th>No</th>
	<th>Brand</th>
	<th>Name</th>
	<th>Price</th>
	<th>Color</th>
	<th>Qty</th>
	<th>Photo</th>
	<th>Option</th>
	<th>Date</th>
	</tr>
	</thead>
	<tbody>
	
	{
		c?.map((i:any,k:any)=>(
		<tr key={k} className={k} >
		
		<td onClick={()=>navigate(`/watchesdetail/${i.p_id}_${i.color}`)}>{((page-1)*8)+k+1}</td>
		<td onClick={()=>navigate(`/watchesdetail/${i.p_id}_${i.color}`)}>{i.brand}</td>
		<td onClick={()=>navigate(`/watchesdetail/${i.p_id}_${i.color}`)}>{i.name}</td>
		<td onClick={()=>navigate(`/watchesdetail/${i.p_id}_${i.color}`)}>{i.price}</td>
		<td onClick={()=>navigate(`/watchesdetail/${i.p_id}_${i.color}`)}>{i.color}</td>
		<td onClick={()=>navigate(`/watchesdetail/${i.p_id}_${i.color}`)}>{i.qty}</td>
		<td onClick={()=>navigate(`/watchesdetail/${i.p_id}_${i.color}`)}><img src={`http://api.zinnyi.site/photo/${i.photo}`} alt={i.photo} /></td>
		<td><button onClick={()=>navigate(`/addinstockwatches/${i.p_id},${i.color}`)}>In<span>Stock</span></button><br /><button onClick={()=>navigate(`/addoutstockwatches/${i.p_id},${i.color}`)}>Out<span>Stock</span></button></td>
	
		<td onClick={()=>navigate(`/watchesdetail/${i.p_id}_${i.color}`)}>{i.created_at}</td>
		</tr>
		
	
		))
	}
	
	</tbody>
	</table>
	</section>
	<section className="countpagenav" style={{display:'flex',justifyContent:'center'}}>
	<button onClick={hdback}>back</button>
	{
		pagearray?.map((i:any,k:any)=>(
		<button  key={k} onClick={()=>setPage(i)}>{i}</button>
		))
	}
	<button onClick={hdnext}>next</button>
	</section>
	</div>
	)
}