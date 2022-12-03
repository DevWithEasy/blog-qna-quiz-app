import '../styles/globals.css';
import {Provider} from  'react-redux';
import  store,{persistor}  from '../store/store';
import {PersistGate} from "redux-persist/integration/react";
import Header from '../components/Header';
import { Toaster } from 'react-hot-toast';

function MyApp({ Component, pageProps }) {
  return <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <div className="app">
        <Header/>
        <Component {...pageProps} />
        <Toaster/>
      </div>
    </PersistGate>
  </Provider>
}
export default MyApp
