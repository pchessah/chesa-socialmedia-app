import '../styles/globals.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import Navigationbar from '../components/navbar';
import "@fortawesome/fontawesome-svg-core/styles.css"; // import Font Awesome CSS
import { config } from "@fortawesome/fontawesome-svg-core";
config.autoAddCss = false; // Tell Font Awesome to skip adding the CSS 

function MyApp({ Component, pageProps }) {
  return(
    <>
    <Navigationbar/>
    <Component {...pageProps} />
    </>
  ) 
}

export default MyApp
