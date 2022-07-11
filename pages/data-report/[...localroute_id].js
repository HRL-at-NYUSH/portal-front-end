import { useRouter } from 'next/router';

import Description from './components/Description';
import DataSources from './components/DataSources';
import DatasetProduction from './components/DatasetProduction';
import Variables from './components/Variables';


const LocalComponent = () => {
  const router = useRouter();
  const { localroute_id } = router.query;

  console.log(router)

  return (
    <>
      <div>
      {(() => {
        switch (localroute_id) {
          case 'DataSources':
            return <DataSources />
          case 'DatasetProduction':
            return <DatasetProduction />
          case 'Variables':
            return <Variables />
          default:
            return <Description />
        }
      })()}
      </div>
      </>   
  );
};

export default LocalComponent;

