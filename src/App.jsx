import "./App.css";
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";

import Home from "./pages/Home";
import Shop from "./pages/Shop";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Cart from "./pages/Cart";
import Profile from "./pages/Profile";
import CollectionPage from "./pages/CollectionPage";
import NotFound from "./pages/NotFound";
import Header from "./components/Header";
import Footer from "./components/Footer";
import CategoriesPage from "./pages/CategoriesPage.jsx";
import ProductDetailPage from "./pages/ProductDetailPage";
import Auth from "./pages/Auth";
import {AuthProvider} from "./context/AuthContext";

function App() {
  return (<Router>
      <AuthProvider>
        <div className="flex min-h-screen flex-col">
          <Header/>
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Home/>}/>
              <Route path="/shop" element={<Shop/>}/>
              <Route path="/about" element={<About/>}/>
              <Route path="/contact" element={<Contact/>}/>
              <Route path="/cart" element={<Cart/>}/>
              <Route path="/profile" element={<Profile/>}/>
              <Route path="/collection/:id" element={<CollectionPage/>}/>
              <Route path="*" element={<NotFound/>}/>

              <Route
                path="/categories/:categoryId"
                element={<CategoriesPage/>}
              />
              <Route path="/product/:productId" element={<ProductDetailPage/>}/>
              <Route path="/auth" element={<Auth/>}/>
            </Routes>
          </main>
          <Footer/>
        </div>
      </AuthProvider>
    </Router>
  );
}

export default App;
