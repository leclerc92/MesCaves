import { FC, useRef,useState,useEffect } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { getAuth} from "firebase/auth";
import { initFirebase } from '../firebaseConfig';
import {IoMdAddCircleOutline} from 'react-icons/io'
import {MdFavorite} from 'react-icons/md'
import {AiFillStar} from 'react-icons/ai'
import {BsFillTreeFill,BsWalletFill} from 'react-icons/bs'
import {RiSearch2Line} from 'react-icons/ri'
import {FaWineBottle} from 'react-icons/fa'
import Link from 'next/link';


interface Props {
    search:Function,
    tri:Function
}

const Dialmenu: FC<Props> = ({search,tri}): JSX.Element => {


    //GESTION DE L'AFICHAGE DES OPTIONS 
    const menuRef = useRef<HTMLDivElement>(null)
    const [afficher,setAfficher] = useState(false)

    const afficherMenu =() => {
        if (!menuRef.current) return;
        setAfficher(!afficher);
    }

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
          if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
            setAfficher(false);
          }
        }
      
        document.addEventListener('mousedown', handleClickOutside);
      
        return () => {
          document.removeEventListener('mousedown', handleClickOutside);
        };
      }, [menuRef]);


      //GESTION DU TRI 
    const toggleTri = (type:string) => {
        setAfficher(false)
        tri(type)

    }

    //GECTION DU LOGGIN 
    const app = initFirebase()
    const auth = getAuth()
    const [user] = useAuthState(auth)




  return (

    <div data-dial-init  className="fixed bottom-6 right-6 group">
    <div ref={menuRef} id="speed-dial-menu-dropdown-alternative" className={`flex flex-col justify-end ${!afficher && "hidden"} py-1 mb-4 space-y-2 bg-white border border-gray-100 rounded-lg shadow-sm dark:bg-gray-700 dark:border-gray-600`}>
        <ul className="text-sm text-gray-500 dark:text-gray-300">
            <li>
                <div onClick={()=>toggleTri("all")}  className="flex items-center px-5 py-2 border-b border-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600 hover:text-gray-900 dark:hover:text-white dark:border-gray-600">
                    <BsWalletFill className="w-4 h-4 mr-2"/>
                     <span className="text-sm font-medium">Tout afficher</span>
                </div>
            </li>
            {user &&
            <li>
                <Link href="whiskys/new">
                <div className="flex items-center px-5 py-2 border-b border-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600 hover:text-gray-900 dark:hover:text-white dark:border-gray-600">
                    <IoMdAddCircleOutline className="w-4 h-4 mr-2"/>
                    <span className="text-sm font-medium">Ajouter un item</span>
                </div>
                </Link>
            </li>
            }
            <li>
                <div onClick={()=>toggleTri("favori")}  className="flex items-center px-5 py-2 border-b border-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600 hover:text-gray-900 dark:hover:text-white dark:border-gray-600">
                    <MdFavorite className="w-4 h-4 mr-2"/>
                    <span className="text-sm font-medium">Trier par favori</span>
                </div>
            </li>
            <li>
                <div onClick={()=>toggleTri("note")} className="flex items-center px-5 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 hover:text-gray-900 dark:hover:text-white">
                    <AiFillStar className="w-4 h-4 mr-2"/>
                    <span className="text-sm font-medium">Trier par note </span>
                </div>
            </li>
            <li>
                <div onClick={()=>toggleTri("tourbe")} className="flex items-center px-5 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 hover:text-gray-900 dark:hover:text-white">
                    <BsFillTreeFill className="w-4 h-4 mr-2"/>
                    <span className="text-sm font-medium">Trier par tourbe </span>
                </div>
            </li>
            <li>
                <div onClick={()=>toggleTri("stock")}  className="flex items-center px-5 py-2 border-b border-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600 hover:text-gray-900 dark:hover:text-white dark:border-gray-600">
                    <FaWineBottle className="w-4 h-4 mr-2"/>
                     <span className="text-sm font-medium">Trier par stock</span>
                </div>
            </li>
        
            <li>
                <div  className="flex items-center px-5 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 hover:text-gray-900 dark:hover:text-white">
                    <RiSearch2Line className="w-4 h-4 mr-2"/>
                    <input onChange={(e) => search(e.target.value)} className="text-sm px-1 font-medium bg-slate-200 rounded"/>
                </div>
            </li>
        </ul>
    </div>
    <button onClick={afficherMenu} className="flex items-center justify-center ml-auto text-white bg-blue-700 rounded-full w-14 h-14 hover:bg-blue-800 dark:bg-blue-600 dark:hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 focus:outline-none dark:focus:ring-blue-800">
        <svg aria-hidden="true" className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z"></path></svg>
        <span className="sr-only">Open actions menu</span>
    </button>

</div>
  )
};

export default Dialmenu;