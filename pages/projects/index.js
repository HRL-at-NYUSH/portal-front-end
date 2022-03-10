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

      <main>
        <h1 className='text-2xl bg-hrl bg-cover'>Projects</h1>
      </main>

      <footer></footer>
    </div>
  );
};

export default Projects;
