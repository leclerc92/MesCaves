
import { NextPage } from 'next';
import Vignette from '../../components/vignette';
import Layout from '../../components/Layout';
import { useState,useEffect, } from 'react';
import { getItems } from '../api/api-firebase';
import Dialmenu from '../../components/dialmenu';


interface Props {
  tabacs:{
    id:string,
    data:{
      id:string,
      nom:string,
      image:string,
      note:number,
      sucre:number,
      pays:string,
      like:boolean,
      stock:boolean
    }
  }[]
}

export const getServerSideProps = async () => {

  const tabacs = await getItems("Tabacs")

  return {
      props: {tabacs:tabacs}
        
}
}

const Tabacs: NextPage<Props> = ({tabacs}) => {

  const [tabacsTri,setTabacsTri] = useState(tabacs)
  const [search,setSearch] = useState("")
  const [tri,setTri] = useState("")

 useEffect(() => {
    setTabacsTri(tabacs.filter(w=>w.data.nom.toLowerCase().startsWith(search.toLowerCase())))
  }, [search]);


useEffect(() => {
    console.log(tri)
     let wt = tabacs;
     if(tri == "sucre" ){
      wt = tabacs.sort((a,b)=>b.data.sucre-a.data.sucre) 
      setTri(" ")
     }else if (tri == "note"){
      wt = tabacs.sort((a,b)=>b.data.note-a.data.note)
      setTri(" ")
      }else if (tri == "favori"){
      wt = tabacs.filter(w=>w.data.like)
     }else if (tri == "stock"){
      wt = tabacs.filter(w=>w.data.stock)
     }else if (tri == "all"){
      wt = tabacs
     }
     setTabacsTri(wt)

  }, [tri]);


  return (
    <Layout>
      <div className='flex w-screen flex-wrap'>
          {
          tabacsTri.map(tabac=>(
            <Vignette key={tabac.id} item={tabac} genre={"tabac"}/>
          ))}

      </div>

      <Dialmenu search={setSearch} tri={setTri} genre={"Tabacs"}/>
    </Layout>
  )
};

export default Tabacs;