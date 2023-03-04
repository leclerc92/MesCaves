
import { NextPage } from 'next';
import { GetStaticProps, GetStaticPaths } from 'next';

import { DocumentData } from 'firebase/firestore';
import Layout from '../../components/Layout';
import DetailsItem from '../../components/detailsItem';
import EditItem from '../../components/editItem';
import { useAuthState } from 'react-firebase-hooks/auth';
import { getAuth} from "firebase/auth";
import { initFirebase } from '../../firebaseConfig';
import { getItems } from '../api/api-firebase';
import { getItem } from '../api/api-firebase';
import AnimationLayout from '../../components/animationLayout';
import Head from 'next/head';
interface Props {
  tabac:DocumentData
}

const SinglePage: NextPage<Props> = ({tabac}) => {


  //GESTION DU LOGIN 
  initFirebase()
  const auth = getAuth()
  const [user] = useAuthState(auth)


  return (
    <AnimationLayout>
    <Head>
        <title>{tabac.data.nom}</title>
    </Head>
    <Layout>
      {user ? <EditItem mode={"edit"} item={tabac} genre={"Tabacs"}/> :
        <DetailsItem item={tabac} genre={"Tabacs"}/>
      }
    </Layout>
    </AnimationLayout>
  )
};


export const getStaticProps: GetStaticProps = async (context) =>{

  const {params} = context
  const {tabacSlug} = params as any

  const tabac = await getItem("Tabacs",tabacSlug)

  return {
    props: {
      tabac:{id:tabacSlug,...tabac?.data()}
    } 
  }
}


export const getStaticPaths:GetStaticPaths = async  ()=>{
 
  const tabacs = await getItems("Tabacs")

  const paths = tabacs.map((tabac:DocumentData) => {
    return {params : {tabacSlug: tabac.id}}
  })


  return {
    paths,
    fallback: 'blocking', // can also be true or 'blocking'
  }
}

export default SinglePage;