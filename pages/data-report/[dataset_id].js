import { useState } from 'react';
import { useRouter } from 'next/router';
import { matchPath } from 'react-router-dom';

import localroutes from '@/data/local-routes';
import LocalComponent from './[...localroute_id]';


import { dataGeo, dataNonGeo} from '@/assets/MockData';
import Link from 'next/link';
import SelectBox from '@/components/SelectBox';
import DefaultTable from '@/components/DefaultTable';


// // migrated from https://github.com/HRL-at-NYUSH/Interactive-Portal
const datasetsSelections = [
  { fieldName: 'Mock Data with Geo', value: 'dataGeo' },
  { fieldName: 'Mock Data without Geo', value: 'dataNonGeo' },
];

const datasets = {
  dataGeo: dataGeo,
  dataNonGeo: dataNonGeo,
};

const DataReport = () => {
  const router = useRouter();
  const { dataset_id } = router.query;
  
  
  console.log(router)

  const [currentDatasetSelection, setCurrentDatasetSelection] = useState(
    datasetsSelections[0].value
  );

  let currentDataset = datasets[currentDatasetSelection];

  return (
    <>
      <section className='relative pt-5 pb-2 md:pt-20'>
        <div className='text-center pb-2 md:pb-10 '>
           <h3
              className='mx-auto  font-extrabold leading-tighter  mb-4'
              data-aos='zoom-y-out'
            >
              About <span className='text-gradient-hrl'> {dataset_id}</span>
            </h3>
        </div>
      </section>

      <div className='m-auto mt-4 w-72'>
        <SelectBox
          data={datasetsSelections}
          onValueChange={setCurrentDatasetSelection}
        ></SelectBox>
      </div>

      <div className='flex flex-col flex-wrap text-center border-2 border-gray-200 border-solid rounded shadow-md p-5 mx-60 my-10'>
       <div className='flex justify-around pb-3 border-b-2 border-gray-200 border-solid'>
          
          {localroutes.map((localroute) => {
            console.log(matchPath(router.asPath, "/data-report/Us%20Census?localroute_id=" + localroute.title));
            return (
            <div className={`text-xl p-4 leading-4
            ${
              !!matchPath(router.asPath, "/data-report/Us%20Census?localroute_id=" + localroute.title)
                ? 'text-gradient-hrl font-bold'
                : 'text-gray-800 font-medium'
            } 
            `}>
              <Link
                href={{
                  query: {"dataset_id": "Us Census", "localroute_id": localroute.title}
                }}
              >
                {localroute.title}
              </Link>
            </div>
            );
          })}    
        </div>
        <LocalComponent />      
      </div>
      
 



      <div className='flex flex-col center text-center border-2 rounded shadow-md p-10 mx-60 my-10'>
         <div className='text-xl m-2'>Variables</div>
         <DefaultTable
          data={Object.keys(currentDataset[0]).map((key) => {
            return {
              Name: key,
              'Data Type': typeof currentDataset[0][key],
              Description: 'Lorem ipsum dolor sit amet.',
            };
          })}
        ></DefaultTable>
      </div>

      <div className='flex flex-col center text-center border-2 rounded shadow-md p-10 mx-60 my-10'>
        <div className='text-xl m-2'>Data Explorer</div>
        <DefaultTable data={currentDataset}></DefaultTable>
      </div>
  



      </>
    
  );
};

export default DataReport;

