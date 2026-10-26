import Chart from "react-apexcharts";
import {useState,useEffect} from 'react'
import {usingContext} from './../../context/Context'
export default function StockChart() {
	 const {url}=usingContext();
	const [date,setDate]=useState();
	const [qty,setQty]=useState();
	
	const load=async()=>{
		const res=await fetch(`${url}api/products/qtybydays`);
		const data=await res.json();
		setDate(Object.keys(data).map(date => date.split('-')[2]));
		setQty(Object.values(data));
	}
	useEffect(()=>{
		load();
	},[]);
  const options = {
    chart: {
      id: "stock-chart",
      toolbar: {
        show: false,
      },
    },
    xaxis: {
      categories: date,
	  title:{
		  text:'Day',
	  }
    },
	yaxis:{
		title:{
			text:'InStock',
		}
	},
    stroke: {
      curve: "smooth",
    },
    colors: ["#008FFB"],
  };

  const series = [
    {
      name: "Instock",
      data: qty,
    },
  ];

  return (
    <Chart
      options={options}
      series={series}
      type="line"
      height={350}
    />
  );
}