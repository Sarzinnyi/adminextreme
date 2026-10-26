import {useState,useEffect} from 'react'
import './Topup.css'
import {usingContext} from './../context/Context'
export default function Topup(){
	interface tt{
		[key:string] : any;
	}
	const {url}=usingContext();
	const [tplist,setTplist]=useState<tt>([]);
	const [remarks,setRemarks]=useState<string>('');
	const [canceltopup,setCanceltopup]=useState<boolean>(false);
	const [er,setEr]=useState<boolean>(false);
	const [cancelid,setCancelid]=useState<number>(null);
	const load=async()=>{
		const res=await fetch(`${url}/api/topup/list`,{credentials:"include"});
		const data=await res.json();
		if(data.success){
			setTplist(data.topuplist);
		}
	}
	useEffect(()=>{load();},[]);
	
	const topupapprove=async(tp_id:any)=>{
		if(!tplist){
			return ;
		}
		const fd=new FormData();
		fd.append('tp_id',String(tp_id));
		const res=await fetch(`${url}/api/coin/topupapprove`,{method:"POST",credentials:"include",body:fd,});
		const data=await res.json();
		if(data.success){
			load();
		}
	}
	
	const handelconfirm=async()=>{
		if(!cancelid || !remarks){
			return ;
		}
		const fd=new FormData();
		fd.append('tp_id',String(cancelid));
		fd.append('remarks',remarks);
		const res=await fetch(`${url}/api/coin/topupcancel`,{method:"POST",credentials:"include",body:fd,});
		const data=await res.json();
		if(data.success){
			
			setCanceltopup(false);
			load();
		}
	}

	return (
	<div className="topup">
	<h4>TopUp</h4>
	{
	canceltopup && <>
	<section className="blackbox" />
	<section className="deletecheckbox">
	<h4>Delete photo</h4>
	<input type="text" placeholder="remarks" onChange={(e:any)=>setRemarks(e.target.value)}/><br />{er && !remarks && <span>Enter remarks</span>}<br/>
	<button onClick={()=>{
		setEr(true);
handelconfirm();
	}}>Confirm</button><button onClick={()=>{setEr(false);setCanceltopup(false);}}> Cancel</button>
	</section>	
	</>	
	}
	<section className="topuptable">
	<table>
	<thead>
	<tr>
	<th>No</th>
	<th>User_Name</th>
	<th>Amount</th>
	<th>Six_Digit</th>
	<th>Voucher_Photo</th>
	<th>Status</th>
	<th>Remarks</th>
	<th>Options</th>
	<th>Date</th>
	</tr>
	</thead>
	<tbody>
	{
		tplist.map((i:any,k:any)=>{
			return (
			<tr key={k}>
			<td>{k+1}</td>
			<td>{i.user_name}</td>
			<td>{i.amount}</td>
			<td>{i.six_digit}</td>
			<td><img src={`http://api.zinnyi.site/photo/${i.voucher_photo}`} /></td>
				<td>{i.status ===  1  &&  'approved'}{i.status ===  0  &&  'pendding'}{i.status ===  2  &&  'canceled'}</td>
				<td>{i.remarks}</td>
				<td>{i.status ===  0 ?  <><button onClick={()=>topupapprove(i.id)}>Approve</button><button onClick={()=>{setCancelid(i.id);setCanceltopup(true);}}>Cancel</button></>  : ''}</td>
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