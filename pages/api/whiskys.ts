import {collection, getDocs} from 'firebase/firestore';
import {db} from '../../firebaseConfig.js'

export const getPosts = async () => {
    let whiskys:any = []
    try{
      const querySnapshot = await getDocs(collection(db, "Whiskys"));
      querySnapshot.forEach((doc) => {
          // doc.data() is never undefined for query doc snapshots
          whiskys.push({id:doc.id,...doc.data()}).sor
          
        });
        return whiskys
  
  }catch(err){
      console.log(err)
  }
}