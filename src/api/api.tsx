const domain="http://api.zinnyi.site/api";
export const fetchapi=async(path:any,options={})=>{
		const res=await fetch(domain+path,{
		...options,
		});
		const data=await res.json();
		
		return data;
}