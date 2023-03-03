import { NextPage } from 'next';
import EditWhiskyItem from '../../components/editItem';
import { useRouter } from 'next/router';
import EditItem from '../../components/editItem';

interface Props {}

const NewItem: NextPage<Props> = () => {

  const dataTabacs = {
    data : {
      note:1,
      sucre:1,
      pays:"France",
      type:"Virginia",
      commentaire:"",
      like:false,
      stock:false
    }
  }
  const dataWhisky = {
    data : {
      note:1,
      tourbe:1,
      pays:"Ecosse",
      type:"Single malt",
      commentaire:"",
      like:false,
      stock:false
    }
  }
  //recuperation du query de l'url pour savoir quel type d'item creer
  const router = useRouter()
  const genre = router.asPath.split('/')[2]



  return(
    <div>

      {genre == "Tabacs" ? <EditItem mode='new' item={dataTabacs} genre={"Tabacs"}/> :
                        <EditItem mode='new' item={dataWhisky} genre={"Whiskys"}/>
      
      }
      
    </div>

)
};

export default NewItem;