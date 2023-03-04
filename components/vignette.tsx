import { FC } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { motion } from "framer-motion"

interface Props {
    item:{
        id:string,
        data:{
            id:string,
            nom:string,
            image:string,
            note:number,
            tourbe?:number,
            sucre?:number,
            pays:string,
            like:boolean,
            stock:boolean,
        }
    },
    genre:string
}

const Vignette: FC<Props> = ({item,genre}): JSX.Element => {

    const { pathname } = useRouter();

  return(
    <motion.div 
    initial={{ opacity: 0, scale: 0.5 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.5 }}
    className="w-full md:w-1/3 xl:w-1/4 p-6 flex flex-col ">
    <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
    >
    <Link  href={pathname+"/"+item.id}>
        <img className={`hover:grow hover:shadow-lg h-80  ${item.data.stock ? 'opacity-100' : 'opacity-30'}`} src={item.data.image}/>
        <div className="pt-3 flex items-center justify-between">
            <h1 className="font-semibold">{item.data.nom.toUpperCase()}</h1>
            {item.data.like && <p className="text-2xl h-6 w-6 mr-7">❤️</p>}
        </div>
        <div className='flex item-center space-x-5'>
            <p className=" text-gray-900 font-thin">{item.data.pays}</p>
            <p className='font-bold'>⭐️{item.data.note}</p>
            {genre == "Whiskys" ? <p className='font-bold'>🍁{item.data.tourbe}</p> :
             genre =="tabac" ?<p className='font-bold'>🍪{item.data.sucre}</p> : <></> 
            }
        </div>

    </Link>
    </motion.button>
</motion.div>   
    
    
  )
};

export default Vignette;