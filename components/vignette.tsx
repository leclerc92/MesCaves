import { FC } from 'react';
import { Rating } from 'primereact/rating';
import Link from 'next/link';

interface Props {
    whisky:{
        id:string,
        nom:string,
        image:string,
        note:number,
        tourbe:number,
        pays:string,
        like:boolean,
        stock:boolean
    }
}

const Vignette: FC<Props> = ({whisky}): JSX.Element => {
  return(
    <div className="w-full md:w-1/3 xl:w-1/4 p-6 flex flex-col ">
    <Link  href={"/whiskys/"+whisky.id}>
        <img className={`hover:grow hover:shadow-lg h-80  ${whisky.stock ? 'opacity-100' : 'opacity-30'}`} src={whisky.image}/>
        <div className="pt-3 flex items-center justify-between">
            <h1 className="font-semibold">{whisky.nom.toUpperCase()}</h1>
            {whisky.like && <p className="text-2xl h-6 w-6 mr-7">❤️</p>}
        </div>
        <div className='flex item-center space-x-5'>
            <p className=" text-gray-900 font-thin">{whisky.pays}</p>
            <p className='font-bold'>⭐️{whisky.note}</p>
            <p className='font-bold'>🍁{whisky.tourbe}</p>
        </div>

    </Link>
</div>   
    
    
  )
};

export default Vignette;