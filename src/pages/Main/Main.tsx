import {Link,Outlet,useNavigate} from 'react-router-dom';
import {useState,useEffect} from 'react';
import './../../styles/Main/Main.css';
import {usingContext} from './../../context/Context'
export default function Main(){
	const {url}=usingContext();
	const navigate=useNavigate();
	interface cate{
		[key: string] : any;
	}
	
	const [c,setC]=useState<cate>([]);
	const [active,setActive]=useState<string | ''>('');
	const load=async()=>{
		const res=await fetch(`${url}/api/products/categories`);
		const data=await res.json();
		setC(data.categories);
	}
	useEffect(()=>{
		load();
	},[]);
        return (
		<div className="main">
		   <header>
			   <h4>Admin Extreme Men</h4>
			   <nav>
				  <Link to="dashboard"  className={`mainlink show ${active === 'dashboard' ? 'active' :''}`} onClick={()=>setActive('dashboard')}>Dashboard</Link>
				  
				  <section className={`mainlink dropdownmain  ${active === 'stock' ? 'active'  : ''} `} >
				  <div className="show">Stock</div>
				  <div className="dropdown">
				  {
					c?.map((i:any,k:any)=>(
					<div className="dropdownitem" onClick={()=>{
						navigate(i.name);
					setActive('stock');}} key={k} >{i.name}</div>
					))  
				  }
				  
				  </div>
				  </section>
				  
				  <section className={`mainlink dropdownmain  ${active === 'history' ? 'active' : ''} `} >
				  <div className="show">History</div>
				  <div className="dropdown">
					<div className="dropdownitem" onClick={()=>{navigate('history/instock');setActive('history');}} >InStock</div>
					<div className="dropdownitem" onClick={()=>{navigate('history/outstock');setActive('history');}}>OutStock</div>
				  </div>
				  </section>
				  
				  
				  
				  <section className={`mainlink dropdownmain  ${active === 'specification' ? 'active' : ''} `} >
				  <div className="show">Specification</div>
				  <div className="dropdown">
				 
				  <div className="dropdownitem" onClick={()=>{navigate('/specification/addbrand');setActive('specification');}} >Add Brand</div>
				  <div className="dropdownitem" onClick={()=>{navigate('/specification/addcolor');setActive('specification');}} >Add Color</div>
				  </div>
				  </section>
				  
				  <section className={`mainlink dropdownmain  ${active === 'newproducts' ? 'active' : ''} `} >
				  <div className="show">New Products</div>
				  <div className="dropdown">
				   {
					c?.map((i:any,k:any)=>(
					<div className="dropdownitem" onClick={()=>{navigate(`/addnew/${i.name}`);setActive('newproducts');}} key={k}  >{i.name}</div>
					))  
				  }
				  </div>
				  </section>
				  <Link className={`mainlink show  ${active === 'orders' ? 'active' : ''} `}  to="orders" onClick={()=>setActive('orders')}>Orders</Link>
				  <Link className={`mainlink show  ${active === 'setting' ? 'active' :''} ` }  to="setting"onClick={()=>setActive('setting')}>Setting</Link>
				 <Link className={`mainlink show ${active ==='topup' ?'active':''}`} to="topup" onClick={()=>setActive('topup')}>Topup</Link>
			   </nav>
		   </header>
		   <section className="mainoutlet">
		    
			  <Outlet />
		   </section>
		</div>
		)
}