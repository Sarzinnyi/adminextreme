import Linechart from './../Charts/Linechart'
import Barchart from './../Charts/Barchart'
import Donutchart from './../Charts/Donutchart'
import Areachart from './../Charts/Areachart'
import './../../styles/Dashboard/Dashboard.css'
import {usingContext} from './../../context/Context'
import {useState,useEffect} from 'react'
export default function Dashboard(){
	interface cc{
		[key:any]:any;
	}
	
	const {url}=usingContext();
	const [rsales,setR]=useState<cc>([]);
	const [tp,setTp]=useState<number>(0);
	const [to,setTo]=useState<number>(0);
	const [cu,setCu]=useState<number>(0);
	const [ts,setTs]=useState<number>(0);
	const load=async()=>{
		const res=await fetch(`${url}/api/chart/recentsales`,{
			credentials:"include",
		});
		const res1=await fetch(`${url}/api/chart/total`,{
			credentials:"include",
		});
		const data=await res.json();
		const data1=await res1.json();
		if(data.success){
			setR(data.recentsales);
		}
		if(data1.success){
			setTp(data1.totalproducts);
			setTo(data1.totalorders);
			setCu(data1.totalcustomers);
			setTs(data1.totalstocks);
		}
	}
	useEffect(()=>{load();},[]);
	return (
	<div className="dashboardmain" style={{textAlign:'center',background:'white'}}>
	<div className="wrapone">
		<section className="onethree">
	<section className="onethreeone">
	<h4>Products</h4>
	<p>{tp}</p>
	</section>
	<section className="onethreeone">
	<h4>Stocks</h4>
	<p>{ts}</p>
	</section>
	
	<section className="onethreeone">
	<h4>Orders</h4>
	<p>{to}</p>
	</section>
	<section className="onethreeone">
	<h4>Customers</h4>
	<p>{cu}</p>
	</section>
	
	</section>
	
	<section className="oneone">
	<Donutchart />
	</section>
	<section className="onetwo">
	<Areachart />
	</section>
	

	
	</div>
	<section className="wraptwo">
	<section className="twoone">
	<h4>Top Sales</h4>
	<Barchart />
	</section>
	<section className="twotwo">
	<h4>Recent Sales</h4>
	<table>
	<thead>
	<tr>
	<th>No</th>
	<th>category</th>
	<th>name</th>
	<th>Order_by</th>
	<th>Size</th>
	<th>Qty</th>
	<th>Date</th>
	</tr>
	</thead>
	<tbody>
	{
		rsales?.map((i:any,k:number)=>{
			return (
			<tr key={k}>
			<td>{k+1}</td>
			<td>{i.category}</td>
			<td>{i.name}</td>
			<td>{i.user_id}</td>
			<td>{i.size}</td>
			<td>{i.qty}</td>
			<td>{i.created_at}</td>
			</tr>
			)
		})
	}
	</tbody>
	</table>
	</section>
	
	</section>
	
	</div>
	)
}

