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
            Frequently Asked Questions
          </h1>
        </div>
      </section>
    </div>
  );
};

export default DataReport;