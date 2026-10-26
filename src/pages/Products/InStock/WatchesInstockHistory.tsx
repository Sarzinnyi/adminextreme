import {useState,useEffect} from 'react'
import {useNavigate} from 'react-router-dom'
import {TiArrowBack} from 'react-icons/ti'
import {usingContext} from './../../../context/Context'
export default function WatchesInstockHistory(){
		const {url}=usingContext();
	interface aa{
		[key : string] : any;
	}
	const [awi,setAwi]=useState<aa>();
	const navigate=useNavigate();
	const [page,setPage]=useState<number>(1);
	const [pagearray,setPagearray]=useState<number[]>([]);
	const [allpagecount,setAllpagecount]=useState<number >(0);
	const limit : number=8;
	
	const [allwatchescount,setAllwatchescount]=useState<number>(0);
	const load=async()=>{
		if(!page || !limit){
			return ;
		}
		const fd=new FormData();
		fd.append('page',String(page));
		fd.append('limit',String(limit));
		const res1=await fetch(`${url}/api/products/allwatchesinstockcount`);
		const data1=await res1.json();
		if(data1.success){
			setAllwatchescount(data1.watchesinstockcount.count);
		}
		const res=await fetch(`${url}/api/products/allwatchesinstock`,{
			method:"POST",
			credentials:"include",
			body:fd,
		});
		const data=await res.json();
		if(data.success){
			setAwi(data.allwatchesinstock);
		}
	}
	
	useEffect(()=>{
		load();
	},[page,limit]);
	
	const navcount=()=>{
		const result=allwatchescount/8;
		const remain=allwatchescount% 8;
		const int=Math.floor(result);
		console.log('int',int);
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
	},[])
	return (
	<div className="watchesinstock">
	<header style={{display:"flex",alignItems:"center",marginBottom:'2vw',fontWeight:'bold'}}>
	<TiArrowBack onClick={()=>navigate(-1)} style={{width:'30px',marginRight:'5px',cursor:'pointer'}}/>
	<span className="linknav" onClick={()=>navigate(-1)}>History</span>{'/'}<span>Instock  </span>{'/'}<span>  Watches</span>
	</header>
	<section className="watchesinstocktable"style={{minHeight:'85vh'}}>
	<table>
	<thead>
	<tr>
	<th>No</th>
	<th>Category</th>
	<th>Brand</th>
	<th>Name</th>
	<th>Price</th>
	<th>Color</th>
	<th>Qty</th>
	<th>Photo</th>
	<th>Date</th>
	</tr>
	</thead>
	<tbody>
	{
		awi?.map((i:any,k:any)=>(
		<tr key={k}>
		<td>{k+1}</td>
		<td>{i.category}</td>
		<td>{i.brand}</td>
		<td>{i.name}</td>
		<td>{i.price}</td>
		<td>{i.color}</td>
		<td>{i.qty}</td>
		<td><img src={`http://api.zinnyi.site/photo/${i.photo}`} alt={i.photo} /></td>
		<td>{i.created_at}</td>
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
		<button key={k} onClick={()=>setPage(i)}>{i}</button>
		))
	}
	<button onClick={hdnext}>next</button>
	</section>
	</div>
	)
}