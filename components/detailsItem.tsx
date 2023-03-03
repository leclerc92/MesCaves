import { FC} from 'react';
import { DocumentData } from 'firebase/firestore';
import Link from 'next/link';
import {useRouter } from 'next/router';

interface Props {
    item:DocumentData,
    genre:string
}

const DetailsItem: FC<Props> = ({item,genre}): JSX.Element => {

  const router = useRouter()

  return (


<div className="flex items-center justify-center p-12">

<div className="mx-auto w-full max-w-[550px] bg-white">
  <form action="https://formbold.com/s/FORM_ID" method="POST">
    <div className="-mx-3 flex flex-wrap">
      <div className="w-full px-3 sm:w-1/2">
        <div className="mb-5">
          <label
            htmlFor="nom"
            className="mb-3 block text-base font-medium text-[#07074D]"
          >
            Nom
          </label>
          <h1
            className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
          > {item.data.nom}</h1>
        </div>
      </div>
      <div className="w-full px-3 sm:w-1/2">
        <div className="mb-5">
        <label
            htmlFor="pays"
            className="mb-3 block text-base font-medium text-[#07074D]"
          >
            Pays
          </label>
          <h1
            className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
          > {item.data.pays}</h1>
        </div>
      </div>
    </div>
    <div className="mb-5">
      <label
        className="mb-3 block text-base font-medium text-[#07074D]"
      >
        Type
      </label>
      <h1
        className="w-full appearance-none rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
      >{item.data.type}</h1>
    </div>

    <div className="-mx-3 flex flex-wrap">
      <div className="w-full px-3 sm:w-1/2">
      <div className="mb-5">
        
        <label
            htmlFor="tourbe"
            className="mb-3 block text-base font-medium text-[#07074D]"
          >
            {genre == "whisky" ? 'Tourbe' : 'Sucre'}
          </label>
          <h1
            className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
          > {genre == "Whiskys" ? item.data.tourbe : item.data.sucre}</h1>
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
          <h1
            className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
          > {item.data.note}</h1>
        </div>
      </div>
    </div>

     <div className=" flex item-center mb-5 justify-between">
        <label className="relative inline-flex items-center cursor-pointer">
            <input type="checkbox" readOnly checked={item.data.stock}  className="sr-only peer"/>
             <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
            <span className="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">Stock</span>
        </label>

        <label className="relative inline-flex items-center mr-5 cursor-pointer">
            <input type="checkbox" readOnly checked={item.data.like} className="sr-only peer"/>
            <div className=" w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-red-300 dark:peer-focus:ring-red-800 dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-red-600"></div>
            <span className="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">Favori</span>
        </label>
    </div> 

    <div className="mb-5">
        <label
            htmlFor="commentaire"
            className="mb-3 block text-base font-medium text-[#07074D]"
          >
            Commentaire
          </label>
          <h1
            className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
          > {item.data.commentaire}</h1>
    </div>

        <div className='flex flex-col items-center'>
          <Link target='blank' href={`https://www.google.fr/search?tbm=shop&hl=fr&psb=1&ved=2ahUKEwjulISXtr39AhVPKNMKHYyWAPMQu-kFegQIABAP&q=${item.nom}&oq=talisker+10ans&gs_lcp=Cgtwcm9kdWN0cy1jYxADUABYAGAAaABwAHgAgAEAiAEAkgEAmAEA&sclient=products-cc`}>
            <img src={item.data.image}/>
          </Link>
        </div>
      
        

        <div className=' flex items-center justify-around flex-wrap '>          
            
              <button
                type='button'
                onClick={()=>router.back()}
                className=" mt-3 hover:shadow-form rounded-md bg-[#6A64F1] py-3 px-8 text-center text-base font-semibold text-white outline-none"
              >
                Retour
              </button>
            
          </div>
            </form>
          </div>
        </div>
  )
};

export default DetailsItem;