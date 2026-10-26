import {fetchapi} from './../api';
export const registering=(data:any)=>fetchapi('/admin/registering',{
method:"POST",
credentials:"include",
body:data,
});

export const sentotpapi=(data:any)=>fetchapi('/admin/sentotp',{
method:"POST",
credentials:"include",
body:data,
});

export const verifyotpapi=(data:any)=>fetchapi('/admin/verifyotp',{
method:"POST",
credentials:"include",
body:data,
});

export const loginapi=(data:any)=>fetchapi('/admin/check',{
method:"POST",
credentials:"include",
body:data,
});

export const fetchinguserapi=()=>fetchapi('/admin/info',{
method:"GET",
credentials:"include",
});