import {useState,useEffect} from 'react'
import {useNavigate} from 'react-router-dom'
import './../../styles/Orders/Orders.css'
import {usingContext} from './../../context/Context'
export default function Orders(){
	const navigate=useNavigate();
		const {url}=usingContext();
	interface oo{
		[key:string] : any;
	}
	
	const [orders,setOrders]=useState<oo>([]);
	const [se,setSe]=useState<number>(3);
	const [cancelorder,setCancelorder]=useState<boolean>(false);
	const [remarks,setRemarks]=useState<string | ''>('');
	const [er,setEr]=useState<boolean>(false);
	const [coid,setCoid]=useState<number | null>(null);
	const load=async()=>{
		if(!se){
			return ;
		}
		const fd=new FormData();
		fd.append('status',String(se));
		const res=await fetch(`${url}/api/products/allorders`,{
			method:"POST",
			credentials:"include",
			body:fd,
		});
		const data=await res.json();
		setOrders(data.allorders);
	};
	
	useEffect(()=>{
		load();
	},[se]);
	
	async function handleapprove({o_id:any}){
		if(!o_id){
			return ;
		}
		const fd=new FormData();
		fd.append('o_id',String(o_id));
		const res=await fetch(`${url}/api/products/admin/orderapprove`,{
			method:'POST',
			credentials:"include",
			body:fd,
		});
		const data=await res.json();
		if(data.success){
			load();
		}
	}

         const handlecancel=async()=>{
			 if(!remarks || !coid){
				 setEr(true);
				 return ;
			 }
			 const fd=new FormData();
			 fd.append('o_id',String(coid));
			 fd.append('remarks',remarks);
			 const res=await fetch(`${url}/api/products/admin/ordercancel`,{
				 method:"POST",
				 credentials:"include",
				 body:fd,
			 });
			 const data=await res.json();
			 if(data.success){
				 setCancelorder(false);
				 load();
			 }
		 }
	return (
	<div className="orders">
	{
	cancelorder && <>
	<section className="blackbox" />
	<section className="deletecheckbox">
	<h4>Delete photo</h4>
	<input type="text" placeholder="remarks" onChange={(e:any)=>setRemarks(e.target.value)}/><br />{er && !remarks && <span>Enter remarks</span>}<br/>
	<button onClick={()=>{
	handlecancel();
	}}>Confirm</button><button onClick={()=>{setEr(false);setCancelorder(false);}}> Cancel</button>
	</section>	
	</>	
	}
	
	<h4>Orders</h4>
	
	<section className="orderstable">
	<table>
	<thead>
	<tr>
	<th>Id</th>
	<th>User_id</th>
	<th>Total_Price</th>
	<th>Total_Qty</th>
	<th>Phone</th>
	<th>Date</th>
	</tr>
	</thead>
	<tbody>
	{
		orders?.map((i:any,k:any)=>{
			return (
			<tr key={k}>
			<td  onClick={()=>navigate(`/orders/detail/${i.id}`)}>{i.id}</td>
			<td  onClick={()=>navigate(`/orders/detail/${i.id}`)}>{i.user_id}</td>
			<td  onClick={()=>navigate(`/orders/detail/${i.id}`)}>{i.total_price}</td>
			<td  onClick={()=>navigate(`/orders/detail/${i.id}`)}>{i.total_qty}</td>
			<td  onClick={()=>navigate(`/orders/detail/${i.id}`)}>{i.ph_no}</td>
			<td  onClick={()=>navigate(`/orders/detail/${i.id}`)}>{i.created_at}</td>
			</tr>
			)
		})
	}
	</tbody>
	</table>
	</section>
	</div>
	)
}