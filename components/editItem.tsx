import { FC, useState } from 'react';
import { DocumentData } from 'firebase/firestore';
import { db } from '../firebaseConfig';
import { doc,addDoc,collection,deleteDoc } from "firebase/firestore";
import { useRouter } from 'next/router';
import Link from 'next/link';
import { toast, ToastContainer, ToastOptions } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

import { setUpdateItem,setItem,setDeleteItem } from '../pages/api/api-firebase';

interface Props {
    mode:string
    item:DocumentData,
    genre:string
}

//GESTION DES NOTIFICATIONS 
const notifSetting:ToastOptions = {
  
  position: "top-right",
  autoClose: 2000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  theme: "dark",
  
}


const EditItem: FC<Props> = ({mode,item,genre}): JSX.Element => {

  

  //MAJ DE LA BD 
  const [nom,setNom] = useState<string>(item.data.nom)
  const [pays,setPays] = useState<string>(item.data.pays)
  const [type,setType] = useState<string>(item.data.type)
  const [tourbe,setTourbe] = useState<string>(item.data.tourbe)
  const [sucre,setSucre] = useState<string>(item.data.sucre)
  const [note,setNote] = useState<string>(item.data.note)
  const [stock,setStock] = useState<boolean>(item.data.stock)
  const [like,setLike] = useState<boolean>(item.data.like)
  const [image,setImage] = useState<string>(item.data.image)
  const [commentaire,setCommentaire] = useState<string>(item.data.commentaire)

  const router = useRouter()


  const handleCreate = async (e:React.SyntheticEvent) => {
    e.preventDefault()
    
    let data ={}
    genre == "Whiskys" ? 
       data = {
          nom: nom,
          pays:pays,
          type:type,
          note:note,
          stock:stock,
          like:like,
          image:image,
          commentaire: commentaire,
          tourbe:tourbe
      }:
      data = {
        nom: nom,
        pays:pays,
        type:type,
        note:note,
        stock:stock,
        like:like,
        image:image,
        commentaire: commentaire,
        sucre:sucre
    }
    const create = await setItem(genre,data)
    create ? toast.success("item ajouté ! ",notifSetting) : 
              toast.error("Erreur dans creation de l'item",notifSetting)


  }





  const handleUpdate = async (e:React.SyntheticEvent) => {
    e.preventDefault()

    let data ={}
    genre == "Whiskys" ? 
       data = {
          nom: nom,
          pays:pays,
          type:type,
          note:note,
          stock:stock,
          like:like,
          image:image,
          commentaire: commentaire,
          tourbe:tourbe
      }:
      data = {
        nom: nom,
        pays:pays,
        type:type,
        note:note,
        stock:stock,
        like:like,
        image:image,
        commentaire: commentaire,
        sucre:sucre
    }
    
    
    const update = await setUpdateItem(genre,item.id,data) 
    update ? toast.success("Document MAJ",notifSetting):
             toast.error("Erreur dans la MAJ",notifSetting)

  }

  const handleDelete = async (e:React.SyntheticEvent) =>{
    e.preventDefault()
    const deleteItem = await setDeleteItem(genre,item.id)
    deleteItem ? toast.success("Document supprimé",notifSetting) :
                toast.error("Erreur dans la suppression",notifSetting)
    router.replace("/"+genre)
    
  } 



  return (
    <form>
      <ToastContainer />

<div className="flex items-center justify-center p-12">

<div className="mx-auto w-full max-w-[550px] bg-white">
    <div className="-mx-3 flex flex-wrap">
      <div className="w-full px-3 sm:w-1/2">
        <div className="mb-5">
          <label
            htmlFor="nom"
            className="mb-3 block text-base font-medium text-[#07074D]"
          >
            Nom
          </label>
          <input
            required
            onChange={(e)=>setNom(e.target.value)}
            type="text"
            name="nom"
            defaultValue={nom}
            className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
          />
        </div>
      </div>
       <div className="w-full px-3 sm:w-1/2">
        
        <div className="mb-5">
        <label htmlFor="countries" className="mb-3 block text-base font-medium text-[#07074D]">Pays</label>
            <select onChange={(e)=>setPays(e.target.value)} value={pays}  className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md">
            <option value="Ecosse">Ecosse</option>
            <option value="Irlande">Irlande</option>
            <option value="France">France</option>
            <option value="USA">USA</option>
            <option value="Japon">Japon</option>
            </select>
        </div>
      </div>
    </div>
    <div className="mb-5">
      <label
        htmlFor="type"
        className="mb-3 block text-base font-medium text-[#07074D]"
      >
        Type
      </label>
      <div className="flex justify-center">
              <div 
            className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md">
            {genre == "Whiskys" && 
            <select onChange={(e)=>setType(e.target.value)}  value={type}>
                  <option value="Single malt">Single malt</option>
                  <option value="blended">Blended</option>
            </select>
            }
            {genre == "Tabacs" && 
            <select onChange={(e)=>setType(e.target.value)}  value={type} >
                  <option value="Virginia">Virginia</option>
                  <option value="Burley">Burley</option>
                  <option value="Perique">Perique</option>
                  <option value="Cavendish">Cavendish</option>
                  <option value="Latakia">Latakia</option>
                  <option value="Oriental ">Oriental </option>
            </select>
            }
            </div>
            </div>
    </div>

    <div className="-mx-3 flex flex-wrap">
      <div className="w-full px-3 sm:w-1/2">
        <div className="mb-5">
          <label
            htmlFor="tourbe"
            className="mb-3 block text-base font-medium text-[#07074D]"
          >
            {genre == "Whiskys" ? 'Tourbe' : 'Sucre'}
          </label>
          <div className="flex justify-center">
              <div 
            className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md">
            <select onChange={genre=="Whiskys" ? (e)=>setTourbe(e.target.value) : (e)=>setSucre(e.target.value) }  value={genre=="Whiskys" ? tourbe : sucre}>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                </select>
              </div>
            </div>
        </div>
      </div>
      <div className="w-full px-3 sm:w-1/2">
        <div className="mb-5">
          <label
            htmlFor="note"
            className="mb-3 block text-base font-medium text-[#07074D]"
          >
            Note
          </label>
          <div className="flex justify-center">
              <div 
            className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md">
            <select onChange={(e)=>setNote(e.target.value)}  value={note}>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                </select>
              </div>
            </div>
        </div>
      </div>
    </div>

     <div className=" flex item-center mb-5 justify-between">
        <label className="relative inline-flex items-center cursor-pointer">
            <input type="checkbox" onChange={(e)=>setStock(e.target.checked)} checked={stock} className="sr-only peer"/>
             <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
            <span className="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">Stock</span>
        </label>

        <label className="relative inline-flex items-center mr-5 cursor-pointer">
            <input type="checkbox" onChange={(e)=>setLike(e.target.checked)} checked={like} className="sr-only peer"/>
            <div className=" w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-red-300 dark:peer-focus:ring-red-800 dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-red-600"></div>
            <span className="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">Favori</span>
        </label>
    </div> 


        <div className="mb-5">
          <label
            htmlFor="pays"
            className="mb-3 block text-base font-medium text-[#07074D]"
          >
            URL Image
          </label>
          <input
            required
            type="text"
            name="pays"
            defaultValue={image}
            onChange={(e)=>setImage(e.target.value)}
            className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
          />
        </div>

        <div className="mb-5">
      <label
        htmlFor="commentaire"
        className="mb-3 block text-base font-medium text-[#07074D]"
      >
        Commentaire
      </label>
      <textarea
        onChange={(e)=>setCommentaire(e.target.value)}
        defaultValue={commentaire}
        name="commentaire"
        id="commentaire"
        className="w-full appearance-none rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
      />
    </div>
          <Link target='blank' href={`https://www.google.fr/search?tbm=shop&hl=fr&psb=1&ved=2ahUKEwjulISXtr39AhVPKNMKHYyWAPMQu-kFegQIABAP&q=${item.nom}&oq=talisker+10ans&gs_lcp=Cgtwcm9kdWN0cy1jYxADUABYAGAAaABwAHgAgAEAiAEAkgEAmAEA&sclient=products-cc`}>
            <img src={image}/>
          </Link>



    <div className=' flex items-center justify-around flex-wrap '>

      {mode === "edit" && 
      <button
      type='submit'
        onClick={handleUpdate}
        className="mt-3 hover:shadow-form rounded-md bg-[#6A64F1] py-3 px-8 text-center text-base font-semibold text-white outline-none"
      >
        Mettre a jour 
      </button> 
      }
       {mode === "new" && 
      <button
      type='submit'
        onClick={handleCreate}
        className="mt-3 hover:shadow-form rounded-md bg-[#6A64F1] py-3 px-8 text-center text-base font-semibold text-white outline-none"
      >
        Creer
      </button> 
      }     
      
      <button
        type="button"
        onClick={()=>router.back()}
        className=" mt-3 hover:shadow-form rounded-md bg-[#6A64F1] py-3 px-8 text-center text-base font-semibold text-white outline-none"
      >
        Retour
      </button>
    
      <button
      type='submit'
      onClick={handleDelete}
        className=" mt-6 hover:shadow-form rounded-xl bg-red-500 py-3 px-8 text-center text-base font-semibold text-white outline-none"
      >
        Supprimer
      </button>
    </div>

</div>
</div>
</form>
  )
};

export default EditItem;