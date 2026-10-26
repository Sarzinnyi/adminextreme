import {fetchapi} from './../api'
export const addingnewclothesapi=(data:any)=>fetchapi('/products/addnewclothes',{
method:"POST",
credentials:"include",
body:data,
});
export const addingnewwatchesapi=(data:any)=>fetchapi('/products/addnewwatches',{
method:"POST",
credentials:"include",
body:data,
});
