import Chart from 'react-apexcharts'
import {useState,useEffect} from 'react'
import {usingContext} from './../../context/Context'
export default function Barchart(){
	interface tt{
		[key:string] : any;
	}
	
	 const {url}=usingContext();
	const [top,setTop]=useState<tt>([]);
	const [cc,setCc]=useState<string []>([]);
	const [nn,setNn]=useState<number []>([]);
	const load=async()=>{
		const res=await fetch(`${url}/api/chart/topsales`,{credentials:"include"});
		const data=await res.json();
		if(data.success){
			setTop(data.topsales);
			setNn(Object.values(data.topsales).map(k => k.qty));
			setCc(Object.values(data.topsales).map(k => k.category+'-'+ k.name));
		}
	}
	
	useEffect(()=>{
		load();
	},[]);
	const options = {
  xaxis: {
    categories: cc,
  },
};

const series = [
  {
    name: "Orders Qty",
    data: nn,
  },
];
return (
<Chart
  options={options}
  series={series}
  type="bar"
  height={350}
/>
)

}