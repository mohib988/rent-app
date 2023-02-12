import React from 'react'
import { children } from 'react'
import { createContext } from 'react'
import { useContext ,useState} from 'react'

let Context =createContext()
let Context2 =createContext()
let Product1 =createContext()
let searchproduct =createContext()
let refreshnow =createContext()

export function useContextNow(){
  return useContext(Context)
}
export function useContextNow2(){
  return useContext(Context2)
}
export function useProductNow1(){
  return useContext(Product1)
}
export function useSearchProduct(){
  return useContext(searchproduct)
}
export function RefreshNow(){
  return useContext(refreshnow)
}

export default function Getevery({children}) {
  const [basket1, setBasket1] = useState({});
  const [refresh, setRefresh] = useState(0);
  const [product1, setProduct1] = useState({'':""});
  
  const [producttosearch, setProducttosearch] = useState({});
  

  
  function setnow(a){
    setBasket1(a)
  }

  return (
     <Context.Provider value={basket1} >
     <Context2.Provider value={setnow} >
     <Product1.Provider value={[product1,setProduct1]} >
     <searchproduct.Provider value={[producttosearch,setProducttosearch]} >
     <refreshnow.Provider value={[refresh,setRefresh]} >
     
{children}
      
        </refreshnow.Provider>
        </searchproduct.Provider>
        </Product1.Provider>
        </Context2.Provider>
        </Context.Provider>
  )
}
