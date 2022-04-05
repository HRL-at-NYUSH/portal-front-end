import Head from 'next/head';
import Image from 'next/image';

const Projects = () => {
  return (
    <div>
      <Head>
        <title>Humanity Research Lab</title>
        <meta name='description' content='Projects' />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <section className='relative pt-16 pb-12 md:pt-20 md:pb-20'>
        <div className='text-center pb-12 md:pb-16 '>
          <h1
            className='mx-auto font-extrabold leading-tighter tracking-tighter mb-4'
            data-aos='zoom-y-out'
          >
            Projects
          </h1>
        </div>
      </section>
      <footer></footer>
    </div>
  );
};

export default Projects;
