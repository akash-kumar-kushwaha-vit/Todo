
import { Outlet } from 'react-router-dom'
import Navbar from "./componenet/Navbar.jsx";
import Footer from './componenet/Footer.jsx';
import { Provider } from 'react-redux';
import { store } from './app/store.js';

export default function App() {
  return (
    <>
      <Provider store={store}>
        <Navbar />
        <Outlet />
        <Footer />
      </Provider>
    </>
  );
}
