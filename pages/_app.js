//import '../styles/globals.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import $ from 'jquery';
import Popper from 'popper.js';
import Navigationbar from '../components/navbar/navbar';

function MyApp({ Component, pageProps }) {
  return(
    <>
    <Navigationbar/>
    <Component {...pageProps} />
    </>
  ) 
}

export default MyApp
