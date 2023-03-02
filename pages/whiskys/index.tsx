import { NextPage } from 'next';
import Vignette from '../../components/vignette';
import Layout from '../../components/Layout';
import { useState,useEffect, } from 'react';

import {collection, getDocs} from 'firebase/firestore';
import {db} from '../../firebaseConfig.js'
import Dialmenu from '../../components/dialmenu';


interface Props {
  whiskys:{
    id:string,
    nom:string,
    image:string,
    note:number,
    tourbe:number,
    pays:string,
    like:boolean,
    stock:boolean

  }[]
}

export const getStaticProps = async () => {
  let whiskys:any = []
  try{
    const querySnapshot = await getDocs(collection(db, "Whiskys"));
    querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        whiskys.push({id:doc.id,...doc.data()}).sor
        
      });

}catch(err){
    console.log(err)
}

  return {
      props: {whiskys:whiskys}
        
}
}

const Whiskys: NextPage<Props> = ({whiskys}) => {

  const [search,setSearch] = useState("")
  const [tri,setTri] = useState("")
  const [whiksysTri,setWhiskysTri] = useState(whiskys)


  useEffect(() => {
    setWhiskysTri(whiskys.filter(w=>w.nom.toLowerCase().startsWith(search.toLowerCase())))
  }, [search]);

  useEffect(() => {
    console.log(tri)
     let wt = whiskys;
     if(tri == "tourbe" ){
      wt = whiskys.sort((a,b)=>b.tourbe-a.tourbe) 
      setTri(" ")
     }else if (tri == "note"){
      wt = whiskys.sort((a,b)=>b.note-a.note)
      setTri(" ")
      }else if (tri == "favori"){
      wt = whiskys.filter(w=>w.like)
     }else if (tri == "stock"){
      wt = whiskys.filter(w=>w.stock)
     }else if (tri == "all"){
      wt = whiskys
     }
     setWhiskysTri(wt)

  }, [tri]);

  return (
    <Layout>
      <div className='flex w-screen flex-wrap'>

          {
          whiksysTri.map(whisky=>(
            <Vignette key={whisky.id} whisky={whisky}/>
          ))}

      </div>

      <Dialmenu search={setSearch} tri={setTri}/>


    </Layout>

  )
};

export default Whiskys;