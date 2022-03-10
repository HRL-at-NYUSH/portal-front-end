import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';

import datasets from '@/data/data-report';

const DataReport = () => {
  return (
    <div>
      <Head>
        <title>Humanity Research Lab</title>
        <meta name='description' content='Generated by create next app' />
        <meta name='viewport' content='width=device-width, initial-scale=1.0' />

        <link rel='icon' href='/favicon.ico' />
      </Head>

      <section className='relative pt-16 pb-12 md:pt-20 md:pb-20'>
        <div className='text-center pb-12 md:pb-16 '>
          <h1
            className='mx-auto font-extrabold leading-tighter tracking-tighter mb-4'
            data-aos='zoom-y-out'
          >
            Choose a <span className='text-gradient-hrl'>Dataset</span> to learn
            more
          </h1>
        </div>
        <div className='grid justify-around gap-4 md:grid-cols-12 mx-32 text-center pb-12 md:pb-16'>
          {datasets.map((dataset) => (
            <div
              key={dataset.name}
              className='transition duration-300 ease-in-out shadow-none relative w-full h-64 m-auto col-span-6 hover:shadow-xl '
              data-aos='fade-up'
            >
              <Link href={'/data-report/' + dataset.id}>
                <a>
                  <div>
                    <Image
                      src='https://slator.com/assets/2017/12/uscensus.jpg'
                      alt=''
                      layout='fill'
                      className='rounded-lg'
                    ></Image>
                  </div>
                  <h4 className='absolute bottom-0 left-0 w-full text-center bg-white bg-opacity-80 rounded-b-lg p-2'>
                    <span className='text-gradient-hrl'>{dataset.name}</span>
                  </h4>
                </a>
              </Link>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default DataReport;
