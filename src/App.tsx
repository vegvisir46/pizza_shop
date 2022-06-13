import {Route, Routes} from "react-router-dom";

import './scss/app.scss';
import Header from './Components/Header';
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import Cart from "./pages/Cart";
import PizzaPage from "./pages/PizzaPage";

// import {AnimatePresence} from "framer-motion";


function App() {

  return (
    // <AnimatePresence exitBeforeEnter>
      <div className="wrapper">
        <Header/>
        <div className="content">
          <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/cart" element={<Cart/>}/>
            <Route path="/pizza/:id" element={<PizzaPage/>}/>
            <Route path="*" element={<NotFound/>}/>
          </Routes>
        </div>
      </div>
    // </AnimatePresence>
  );
}

export default App;
