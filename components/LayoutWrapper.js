import Header from './header';
import Footer from './Footer';

const LayoutWrapper = ({ children }) => {
  return (
    <>
      <div className='flex flex-col justify-between w-full h-screen'>
        <Header />
        <main
          className='
          pt-16
         mb-auto
         '
          //  px-4 sm:px-6 xl:px-8 2xl:mx-32
        >
          {children}
        </main>
        <Footer />
      </div>
    </>
  );
};

export default LayoutWrapper;
