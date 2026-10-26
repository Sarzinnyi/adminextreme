import {useContext,createContext} from 'react'
export const Context=createContext();
export const ContextProvider=({children})=>{
	const url='http://api.zinnyi.site';
	return (
     <Context.Provider value={{url}}>
	{children}
	</Context.Provider>
	)
}
export const usingContext=()=>{
	const context=useContext(Context);
	return context;
}