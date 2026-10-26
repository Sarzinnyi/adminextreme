import {Link} from 'react-router-dom'
import {useContext} from 'react'
import './../../styles/Setting/Setting.css'
import {Acontext} from './../Auth/Acontext'
export default function Setting(){
	const {logout}=useContext(Acontext);
	return (
	<div className="setting">
	<h4>Setting</h4>
	<section className="settingwrap">
	<Link className="settingnav" to="userprofile">User Profile</Link>
	<Link className="settingnav">Email Setting</Link>
	<Link className="settingnav">Security</Link>
	<Link className="settingnav">Notifications</Link>
	<Link className="settingnav">Backup & Restore</Link>
	<Link className="settingnav">About</Link>
	<Link className="settingnav" onClick={()=>logout()} >Logout</Link>
	</section>
	</div>
	)
}