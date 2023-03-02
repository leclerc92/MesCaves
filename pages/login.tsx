import { NextPage } from 'next';
import Link from 'next/link';
import { initFirebase } from '../firebaseConfig';
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { useAuthState } from 'react-firebase-hooks/auth';
import { useRouter } from 'next/router';

interface Props {}

const Login: NextPage<Props> = () => {

  const app = initFirebase()
  const provider = new GoogleAuthProvider();
  const auth = getAuth();
  const [user,loading] = useAuthState(auth)
  const router = useRouter()

  if(loading){
    return <div>...Chargement</div>
  }
  if(user){
    router.push("/whiskys/create")
  }

  const signIn = async () => {
    const result = await signInWithPopup(auth, provider);
    console.log(result.user)
  }


  return (
    <div>
        <div>PLEASE SIGN IN TO CONTINUE</div>
        <button onClick={signIn} className='bg-blue-600 text-white rounded-md p-2 w-48'>Sign IN</button>
        
  </div>
  )
};

export default Login;