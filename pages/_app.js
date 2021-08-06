import '../styles/globals.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import Navigationbar from '../components/navbar';

function MyApp({ Component, pageProps }) {
  return(
    <>
    <Navigationbar/>
    <Component {...pageProps} />
    </>
  ) 
}

export default MyApp
