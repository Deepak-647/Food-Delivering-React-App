import Header from "./components/Header";
import Footer from "./components/Footer";
import { Outlet } from "react-router-dom";
import '../index.css';
import { Provider } from "react-redux";
import store from "./utils/store";
 

const App = () => {
  
  return (
    <Provider store={store}>
    
      <Header />
      <Outlet />
      <Footer />
    </Provider>
  );
};

export default App;
