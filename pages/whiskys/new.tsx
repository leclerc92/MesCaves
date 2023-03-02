import { NextPage } from 'next';
import EditWhiskyItem from '../../components/editWhiskyItem';


interface Props {}

const New: NextPage<Props> = () => {

  const item = {
    note:1,
    tourbe:1,
    pays:"Ecosse",
    type:"Single malt",
    commentaire:"",
    like:false,
    stock:false

  }

  return(
    <EditWhiskyItem item={item} mode={"new"}/>
)
};

export default New;