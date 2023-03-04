
import { NextPage } from 'next';
import { GetStaticProps, GetStaticPaths } from 'next';

import { DocumentData } from 'firebase/firestore';
import Layout from '../../components/Layout';
import { useState } from 'react';
import DetailsItem from '../../components/detailsItem';
import EditItem from '../../components/editItem';
import { useAuthState } from 'react-firebase-hooks/auth';
import { getAuth} from "firebase/auth";
import { initFirebase } from '../../firebaseConfig';
import { getItems } from '../api/api-firebase';
import { getItem } from '../api/api-firebase';

import AnimationLayout from '../../components/animationLayout';
import Head from 'next/head'

interface Props {
  whisky:DocumentData
}

const SinglePage: NextPage<Props> = ({whisky}) => {


  //GESTION DU LOGIN 
  const app = initFirebase()
  const auth = getAuth()
  const [user] = useAuthState(auth)

  return (
    <AnimationLayout>

    <Layout>

    <Head>
        <title>{whisky.data.nom}</title>
    </Head>


      {user ? <EditItem mode={"edit"} item={whisky} genre={"Whiskys"}/> :
        <DetailsItem item={whisky} genre={"Whiskys"}/>
      }
    </Layout>
    </AnimationLayout>

  )
};


export const getStaticProps: GetStaticProps = async (context) =>{

  const {params} = context
  const {whiskySlug} = params as any

  const whisky = await getItem("Whiskys",whiskySlug)

  return {
    props: {
      whisky:{id:whiskySlug,...whisky?.data()}
    } 
  }
}


export const getStaticPaths:GetStaticPaths = async  ()=>{
 
  const whiskys = await getItems("Whiskys")

  const paths = whiskys.map((whisky:DocumentData) => {
    return {params : {whiskySlug: whisky.id}}
  })


  return {
    paths,
    fallback: 'blocking', // can also be true or 'blocking'
  }
}

export default SinglePage;