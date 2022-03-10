import { useRouter } from 'next/router';

const DataReport = () => {
  const router = useRouter();
  const { dataset_id } = router.query;

  return (
    <div>
      <section className='relative pt-16 pb-12 md:pt-20 md:pb-20'>
        <div className='text-center pb-12 md:pb-16 '>
          <h3
            className='mx-auto  font-extrabold leading-tighter  mb-4'
            data-aos='zoom-y-out'
          >
            About <span className='text-gradient-hrl'> {dataset_id}</span>
          </h3>
        </div>
      </section>
    </div>
  );
};

export default DataReport;
