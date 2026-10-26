import {useNavigate} from 'react-router-dom'
import {TiArrowBackOutline} from 'react-icons/ti'
import {useState} from 'react'
import './../../styles/Setting/Userprofile.css'
export default function Userprofile(){
	const navigate=useNavigate();
	const [edit,setEdit]=useState(false);
	const [save,setSave]=useState(true);
	const [name,setName]=useState('Zin Nyi Tun');
	const [role,setRole]=useState('Admin');
	const [ph,setPh]=useState('094562135');
	const [address,setAddress]=useState('Sagaing,Kale');
	return (
	<div className="userprofile">
		<header style={{display:"flex",alignItems:"center",marginBottom:'2vw',fontWeight:'bold',marginTop:'1vw',marginBottom:'1vw'}}>
	<TiArrowBackOutline onClick={()=>navigate(-1)} style={{width:'30px',marginRight:'5px',cursor:'pointer'}}/>
	<span className="linknav" onClick={()=>navigate(-1)}>Setting</span>{'/'}<span>UserProfile</span>
	</header>
        <section className="userprofileimgbox">
		<img src="/favicon.svg" style={{width:'100px',height:'100px',borderRadius:'50%',background:'black'}} alt='admin' />
		</section>
		{
		save ?
		<section className="userdetailshow">
		<section className="userdetail"><p className="udleft">Name</p><p>{name}</p></section>
		<section className="userdetail"><p className="udleft">Role</p><p>{role}</p></section>
		<section className="userdetail"><p className="udleft">Phone</p><p>{ph}</p></section>
		<section className="userdetail"><p className="udleft">Address</p><p>{address}</p></section>
		</section>
		:
		<section className="userdetailedit">
		<section className="userdetail"><p className="udleft">Name</p><input type="text" value={name} onChange={(e)=>setName(e.target.value)}/></section>
		<section className="userdetail"><p className="udleft">Role</p><input type="text" value={role} onChange={(e)=>setRole(e.target.value)}/></section>
		<section className="userdetail"><p className="udleft">Phone</p><input type="text" value={ph} onChange={(e)=>setPh(e.target.value)}/></section>
		<section className="userdetail"><p className="udleft">Address</p><input type="text" value={address} onChange={(e)=>setAddress(e.target.value)}/></section>
		</section>
		}
		{
			edit ? <button onClick={()=>{
				setSave(true);
				setEdit(false);
			}}>Save</button> : <button onClick={()=>{
				setSave(false);
				setEdit(true);
			}}>Edit</button> 
		}
		
	</div>
	)
}