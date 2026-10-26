import {useNavigate} from "react-router-dom"
import {TiArrowBack} from 'react-icons/ti'
import './../../styles/Setting/Generalsetting.css'
export default function Generalsetting(){
	const navigate=useNavigate();
	return (
	<div className="generalsetting">
	<header style={{display:"flex",alignItems:"center",marginBottom:'2vw',fontWeight:'bold'}}>
	<TiArrowBack onClick={()=>navigate(-1)} style={{width:'30px',marginRight:'5px',cursor:'pointer'}}/>
	<span className="linknav" onClick={()=>navigate(-1)}>Setting  </span>{'/'}<span>  GeneralSetting</span>
	</header>
	<section className="generalsettingbox">
	<section className="generalimgbox">
	<img src="/favicon.svg"alt="Admin" style={{borderRadius:"50%",width:"100px",height:"100px",background:'white'}}/>
	<p style={{fontWeight:'bold',fontStyle:'italic',background:'linear-gardient(to right,red,blue)'}}>Extreme </p>
	</section>
	<section className="gscontent">
	<h4>Content</h4>
	<section className="contentbox"><p className="cbleft">Phone</p><p>094562315</p></section>
	<section className="contentbox"><p className="cbleft">Email</p><p>zin@gmail.com</p></section>
	<section className="contentbox"><p className="cbleft">Address</p><p>Sagaing,Kale,No.101</p></section>
	<section className="timezone">date</section>
	</section>
	</section>
	</div>
	)
}