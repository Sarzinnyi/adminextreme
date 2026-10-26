import Chart from 'react-apexcharts'
import {useState,useEffect} from 'react'
import {usingContext} from './../../context/Context'
export default function Areachart(){
	
	const [date,setDate]=useState();
	const [qty,setQty]=useState();
	  const {url}=usingContext();
	const load=async()=>{
		const res=await fetch(`${url}/api/products/qtybydays`);
		const data=await res.json();
		setDate(Object.keys(data).map(date => date.split('-')[2]));
		setQty(Object.values(data));
	}
	
	useEffect(()=>{
		load();
	},[]);

	const options = {
  chart: {
    toolbar: {
      show: false,
    },
  },
  xaxis:{
	  categories:date,
	  title:{
		  text:"This Month Day",
	  }
  },
  yaxis:{
	title:{
		text:"Quantity",
	}  
  },
  stroke: {
    curve: "smooth",
  },
  dataLabels: {
    enabled: false,
  },
};

const series = [
  {
    name: "Stock",
    data: qty,
  },
];
return (
    <>
     <h4>Monthly InStock</h4>     
	 <Chart
  options={options}
  series={series}
  type="area"
  
/>

</>
)

}