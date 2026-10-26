import Chart from 'react-apexcharts'
import {useState,useEffect} from 'react'
import {usingContext} from './../../context/Context'
export default function Donutchart(){
	 const {url}=usingContext();
	const [header,setHeader]=useState('brand');
	const [label,setLabel]=useState();
	const [series,setSeries]=useState();
	const load=async()=>{
		const fd=new FormData();
		fd.append('header',header);
	const res=await fetch(`${url}/api/chart/totalstock`,{
		method:"GET",
	});
	const data=await res.json();
	const array=data.totalstock;
	setLabel(array.map(i => i.category));
	setSeries(array.map(i => parseInt(i.total)));
	
	}
	useEffect(()=>{
		load();
	},[]);
	const options = {
  labels:label,
};



return (
    <>
	
	{
		series && 
		<>
		<h3>Total Stock</h3>
		<Chart
  options={options}
  series={series}
  type="donut"
  
  />
  </>
	}
     
  </>
)

}