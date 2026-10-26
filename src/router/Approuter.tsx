import {BrowserRouter,Routes,Route,Navigate} from 'react-router-dom'
import Dashboard from './../pages/Dashboard/Dashboard'
import AddnewClothes from './../pages/Addnew/AddnewClothes'
import AddnewWatches from './../pages/Addnew/AddnewWatches'
import Clothes from './../pages/Products/Clothes'
import Watches from './../pages/Products/Watches'
import Main from './../pages/Main/Main'
import Login from './../pages/Auth/Login'
import Register from './../pages/Auth/Register'
import {useState,useContext} from 'react'
import {Acontext} from './../pages/Auth/Acontext'
import AddnewBrand from './../pages/Specification/AddnewBrand'
import AddnewColor from './../pages/Specification/AddnewColor'
import AddinstockClothes from './../pages/Products/InStock/AddinstockClothes'
import AddinstockWatches from './../pages/Products/InStock/AddinstockWatches'
import AddoutstockClothes from './../pages/Products/OutStock/AddoutstockClothes'
import AddoutstockWatches from './../pages/Products/OutStock/AddoutstockWatches'
import InStock from './../pages/Products/InStock/InStock'
import OutStock from './../pages/Products/OutStock/OutStock'
import ClothesInstockHistory from './../pages/Products/InStock/ClothesInstockHistory'
import ClothesOutstockHistory from './../pages/Products/OutStock/ClothesOutstockHistory'
import WatchesInstockHistory from './../pages/Products/InStock/WatchesInstockHistory'
import WatchesOutstockHistory from './../pages/Products/OutStock/WatchesOutstockHistory'
import Setting from './../pages/Setting/Setting'
import Generalsetting from './../pages/Setting/Generalsetting'
import Userprofile from './../pages/Setting/Userprofile'
import ClothesDetail from './../pages/Products/ClothesDetail'
import WatchesDetail from './../pages/Products/WatchesDetail'
import Orders from './../pages/Orders/Orders'
import OrdersDetail from './../pages/Orders/OrdersDetail'
import Topup from './../payment/Topup'
export default function Approuter(){
        const {auth}:any=useContext(Acontext);
        return (
		<BrowserRouter>
		<Routes>
		  <Route path="/" element={auth?<Main />:<Navigate to="login" />} >
		  <Route path="/" element={<Navigate to="Dashboard" />} />
		  <Route path="dashboard" element={<Dashboard />} />
		   <Route path="addnew/clothes" element={<AddnewClothes />} />
		   <Route path="addnew/watches" element={<AddnewWatches />} />
		   <Route path="addinstockclothes/:id" element={<AddinstockClothes />} />
		   <Route path="addinstockwatches/:id" element={<AddinstockWatches />} />
		   <Route path="addoutstockclothes/:id" element={<AddoutstockClothes />} />
		   <Route path="addoutstockwatches/:id" element={<AddoutstockWatches />} />
 		   <Route path="clothes" element={<Clothes />} />
		   <Route path="watches" element={<Watches />} />
		   <Route path="orders" element={<Orders />} />
		   <Route path="orders/detail/:id" element={<OrdersDetail />} />
		   <Route path="setting" element={<Setting />} />
		   <Route path="setting/generalsetting" element={<Generalsetting />} />
		   <Route path="setting/userprofile" element={<Userprofile />} />
		   <Route path="specification/addbrand" element={<AddnewBrand />} />
		   <Route path="specification/addcolor" element={<AddnewColor />} />
		   <Route path="clothesdetail/:data" element={<ClothesDetail />} />
		   <Route path="watchesdetail/:data" element={<WatchesDetail />} />
 		   <Route path="history/instock" element={<InStock />} />
		   <Route path="history/instock/clothes" element={<ClothesInstockHistory />} />
		   <Route path="history/instock/watches" element={<WatchesInstockHistory />} /> 
		   <Route path="history/outstock" element={<OutStock />} />
		   <Route path="history/outstock/clothes" element={<ClothesOutstockHistory />} />
		   <Route path="history/outstock/watches" element={<WatchesOutstockHistory />} />
		 <Route path="topup" element={<Topup />} />
		  
		  </Route>
		  <Route path="login" element={!auth?<Login />:<Navigate to="/" />} />
		  <Route path="register" element={!auth?<Register />:<Navigate to="/" />} />
		</Routes>
		</BrowserRouter>
		)
}