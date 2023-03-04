import { NextPage } from 'next';
import Vignette from '../../components/vignette';
import Layout from '../../components/Layout';
import { useState,useEffect, } from 'react';
import { getItems } from '../api/api-firebase';

import Dialmenu from '../../components/dialmenu';
import AnimationLayout from '../../components/animationLayout';
import Head from 'next/head'

interface Props {
  whiskys:{
    id:string,
    data:{
      id:string,
      nom:string,
      image:string,
      note:number,
      tourbe:number,
      pays:string,
      like:boolean,
      stock:boolean
    },
  }[]
}

export const getServerSideProps = async () => {

  const whiskys = await getItems("Whiskys")
  return {
      props: {whiskys:whiskys}
        
}
}

const Whiskys: NextPage<Props> = ({whiskys}) => {

  const [search,setSearch] = useState("")
  const [tri,setTri] = useState("")
  const [whiksysTri,setWhiskysTri] = useState(whiskys)


  useEffect(() => {
    setWhiskysTri(whiskys.filter(w=>w.data.nom.toLowerCase().startsWith(search.toLowerCase())))
  }, [search]);

  useEffect(() => {
    console.log(tri)
     let wt = whiskys;
     if(tri == "tourbe" ){
      wt = whiskys.sort((a,b)=>b.data.tourbe-a.data.tourbe) 
      setTri(" ")
     }else if (tri == "note"){
      wt = whiskys.sort((a,b)=>b.data.note-a.data.note)
      setTri(" ")
      }else if (tri == "favori"){
      wt = whiskys.filter(w=>w.data.like)
     }else if (tri == "stock"){
      wt = whiskys.filter(w=>w.data.stock)
     }else if (tri == "all"){
      wt = whiskys
     }
     setWhiskysTri(wt)

  }, [tri]);

  return (

    <AnimationLayout>


    <Layout>
      <Head>
        <title>Mes whiskys</title>
      </Head>
      <div className='flex w-screen flex-wrap'>

          {
          whiksysTri.map(whisky=>(
            <Vignette key={whisky.id} item={whisky} genre={"Whiskys"}/>
          ))}

      </div>

      <Dialmenu search={setSearch} tri={setTri} genre={"Whiskys"}/>


    </Layout>
    </AnimationLayout>

  )
};

export default Whiskys;