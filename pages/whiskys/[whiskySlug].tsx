
import { NextPage } from 'next';
import { GetStaticProps, GetStaticPaths } from 'next';
import { getDocs,doc,getDoc,collection, query, where } from 'firebase/firestore';
import {db} from '../../firebaseConfig.js'
import { DocumentData } from 'firebase/firestore';
import Layout from '../../components/Layout';
import { useState } from 'react';
import DetailsWhiskyItem from '../../components/detailsWhiskyItem';
import EditWhiskyItem from '../../components/editWhiskyItem';
import { useAuthState } from 'react-firebase-hooks/auth';
import { getAuth} from "firebase/auth";
import { initFirebase } from '../../firebaseConfig';

interface Props {
  whisky:DocumentData
}

const SinglePage: NextPage<Props> = ({whisky}) => {

  const [edit,setEdit] = useState(false)

  //GESTION DU LOGIN 
  const app = initFirebase()
  const auth = getAuth()
  const [user] = useAuthState(auth)

  return (

    <Layout>
      {user ? <EditWhiskyItem mode={"edit"} item={whisky} edit={setEdit}/> :
        <DetailsWhiskyItem item={whisky} edit={setEdit}/>
      }
    </Layout>
   
  )
};


export const getStaticProps: GetStaticProps = async (context) =>{

  const {params} = context
  const {whiskySlug} = params as any

  const docRef = doc(db, "Whiskys", whiskySlug);
  const whisky = await getDoc(docRef);
  try {
    const whisky = await getDoc(docRef);
  } catch(error) {
      console.log(error)
  }

  return {
    props: {
      whisky:{id:whiskySlug,...whisky.data()}
    } 
  }
}


export const getStaticPaths:GetStaticPaths = async  ()=>{
  let whiskys:DocumentData = []
  try{
    const querySnapshot = await getDocs(collection(db, "Whiskys"));
    querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        whiskys.push({id:doc.id,...doc.data()}).sor
    });

  }catch(err){
    console.log(err)
  }

  const paths = whiskys.map((whisky:DocumentData) => {
    return {params : {whiskySlug: whisky.id}}
  })


  return {
    paths,
    fallback: 'blocking', // can also be true or 'blocking'
  }
}

export default SinglePage;