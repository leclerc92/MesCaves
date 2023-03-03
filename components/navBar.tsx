import { FC, useRef } from 'react';
import { useEffect,useState } from 'react';
import { initFirebase } from '../firebaseConfig';
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { useAuthState } from 'react-firebase-hooks/auth';
import {TbUserOff} from 'react-icons/tb'
import {AiOutlineUser} from 'react-icons/ai'
import {useRouter } from 'next/router';
import Link from 'next/link';
interface Props {}

const NavBar: FC<Props> = (props): JSX.Element => {

  //GESTION DE LAFFICHAGE DE LA NAVBAR
    const [show, setShow] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(0); 


    const controlNavbar = () => { 
        if (typeof window !== 'undefined') { 
          if ((window.scrollY > lastScrollY)) { // if scroll down hide the navbar
            setShow(false); 
          } else { // if scroll up show the navbar
            setShow(true);  
          }
    
          // remember current page location to use in the next move
          setLastScrollY(window.scrollY); 
        }
    };




      useEffect(() => {
        if (typeof window !== 'undefined') {
          window.addEventListener('scroll', controlNavbar);
    
          // cleanup function
          return () => {
            window.removeEventListener('scroll', controlNavbar);
          };
        }
      }, [lastScrollY]);


      //GESTION DE LAFFICHAGE DU MENU EN MODE TELEPHONE
      const [showMenu,setShowMenu] = useState(false)
      const afficherMenu = () => {
          setShowMenu(!showMenu)
       
      }


      //GESTION DU LOGGIN UTILISATEUR 
      const router = useRouter()
      initFirebase()
      const provider = new GoogleAuthProvider();
      const auth = getAuth()
 
      const [user] = useAuthState(auth)

      const signIn = async () => {
        try{
        const result = await signInWithPopup(auth, provider);
        }catch(err){
          console.log(err)
        }
      }




  return(
    <nav  id="header" className={`w-full z-30 top-0 py-1 sticky bg-slate-300 bg-opacity-80 transition-all ${show || showMenu ?'opacity-100' : 'opacity-0'}`}>
        <div className="w-full container mx-auto flex flex-wrap items-center justify-between mt-0 px-6 py-3">
            <label onClick={afficherMenu}  className="cursor-pointer md:hidden block">
                <svg className="fill-current text-gray-900" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20">
                    <title>menu</title>
                    <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"></path>
                </svg>
            </label>

            <div className={`${!showMenu && 'hidden'} md:flex md:items-center md:w-auto w-full md:order-1" id="menu"`}>
                <nav>
                    <ul className="md:flex items-center justify-between text-base text-gray-700 pt-4 md:pt-0">
                        <li onClick={()=>setShowMenu(false)}><Link className="inline-block no-underline hover:text-black hover:underline py-2 px-4" href="/whiskys">Whiskys</Link></li>
                        <li onClick={()=>setShowMenu(false)}><Link className="inline-block no-underline hover:text-black hover:underline py-2 px-4" href="/tabacs">Tabacs</Link></li>
                    </ul>
                </nav>
            </div>

            <div className="order-1 md:order-2">
                <Link className="flex items-center tracking-wide no-underline hover:no-underline font-bold text-gray-800 text-xl " href="/whiskys">
                    MA CAVE
                </Link>
            </div>


            <div className="order-2 md:order-3 flex items-center" id="nav-content">

                <Link className="inline-block no-underline hover:text-black" href="#">
                    { user ? <TbUserOff onClick={()=>auth.signOut()}/> : <AiOutlineUser onClick={signIn}/>}
                </Link>
            </div>
        </div>
    </nav>
  )
}

export default NavBar;