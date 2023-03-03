
import {collection, getDocs,doc,getDoc,updateDoc,addDoc,deleteDoc} from 'firebase/firestore';
import {db} from '../../firebaseConfig.js'

export const getItems = async (collec:string) => {
    let items:any = []
    try{
      const querySnapshot = await getDocs(collection(db, collec));
      querySnapshot.forEach((doc) => {
          // doc.data() is never undefined for query doc snapshots
          items.push({id:doc.id,...doc.data()})
        });
    return items;
    
    }catch(err){
        console.log(err)
    }
}

export const getItem = async (collec:string,id:string) => {
    const docRef = doc(db, collec, id);
    const whisky = await getDoc(docRef);
    try {
      const item = await getDoc(docRef);
      return item
    } catch(error) {
        console.log(error)
    }
}


export const setItem = async (collec:string,data:object) => {
    try {
        const w = await addDoc(collection(db, collec), {
            data
          });
        return true
    } catch (error) {
      console.log(error)
      return false
    }
}
    
    
export const setUpdateItem = async (collec:string,id:string,data:object) => {
    try {
        const itemRef = doc(db, collec, id);
        await updateDoc(itemRef, {
            data
        });
        return true
    }catch(error){
        console.log(error)
        return false
    }
}

export const setDeleteItem = async (collec:string,id:string) => {
    try {
        await deleteDoc(doc(db, collec, id));
        return true
      } catch (error) {
        console.log(error)
        return false
      }
}


