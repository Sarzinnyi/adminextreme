import {useParams,useNavigate} from 'react-router-dom';
import {useState,useEffect} from 'react';
import './../../styles/Orders/OrdersDetail.css';
import {TiArrowBack} from 'react-icons/ti';
import {usingContext} from './../../context/Context'
export default function OrdersDetail(){
	const {id}=useParams<{id : string}>();
	const navigate=useNavigate();
		const {url}=usingContext();
	interface dd{
		[key:string] : any;
	}
	const [detail,setDetail]=useState<dd>();
	const [items,setItems]=useState<dd>([]);
	const [pop,setPop]=useState<boolean>(false);
	const load=async()=>{
		if(!id){
			return;
		}
		const fd=new FormData();
		fd.append('o_id',String(id));
		const res=await fetch(`${url}/api/products/admin/ordersdetail`,{
			method:"POST",
			credentials:"include",
			body:fd,
		});
		const data=await res.json();
		if(data.success){
			setDetail(data.ordersdetail);
			setItems(data.ordersitems);
		}
	}
	useEffect(()=>{
		load();
	},[id]);
	
	return (
	<div className="ordersdetail">
	<header style={{display:"flex",alignItems:"center",marginBottom:'2vw',fontWeight:'bold',marginTop:'1vw'}}>
	<TiArrowBack onClick={()=>navigate(-1)} style={{width:'30px',marginRight:'5px',cursor:'pointer'}}/>
	<span className="linknav" onClick={()=>navigate(-1)}>Orders</span>{'/'}<span>Detail</span>
	</header>
		{pop && <>
	<div className="black" onClick={()=>setPop(false)}/>
	<div className="imagezoom" >
	<img src={`http://api.zinnyi.site/photo/${detail?.voucher_photo}`} alt='photo' />
	</div>
		</>}
	<section className="detailbox">
	<section className="textbx">
	<section className="detailtt"><p className="left">Order_id</p><p className='right'>{detail?.id}</p></section>
		<section className="detailtt"><p className="left">User_Name</p><p className='right'>{detail?.user_name}</p></section>
		<section className="detailtt"><p className="left">Phone</p><p className='right'>{detail?.ph_no}</p></section>
		<section className="detailtt"><p className="left">Email</p><p className='right'>{detail?.email}</p></section>	
		<section className="detailtt"><p className="left">Total_Qty</p><p className='right'>{detail?.total_qty}</p></section>
		<section className="detailtt"><p className="left">Total_Price</p><p className='right'>{detail?.total_price}</p></section>
		<section className="detailtt"><p className="left">Date</p><p className='right'>{detail?.created_at}</p></section>
	
	</section>
	
	</section>
	
	<section className="itemsbox">
	<table>
	<thead>
	<tr>
	<th>No</th>
	<th>Category</th>
	<th>Name</th>
	<th>Color</th>
	<th>Size</th>
	<th>Price</th>
	<th>Qty</th>
	<th>Date</th>
	</tr>
	</thead>
	<tbody>
	{
		items.map((i:any,k:number)=>{
			return (
			<tr key={k}>
			<td>{k+1}</td>
			<td>{i.category}</td>
			<td>{i.name}</td>
			<td>{i.color}</td>
			<td>{i.size}</td>
			<td>{i.price}</td>
			<td>{i.qty}</td>
			<td>{i.created_at}</td>
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