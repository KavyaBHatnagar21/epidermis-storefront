import "./App.css";
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";

import Home from "./pages/Home";
import Shop from "./pages/Shop";
import About from "./pages/About";
import Contact from "./pages/Contact";
import CartPage from "./pages/CartPage";
import Profile from "./pages/Profile";
import CollectionPage from "./pages/CollectionPage";
import NotFound from "./pages/NotFound";
import Header from "./components/Header";
import Footer from "./components/Footer";
import CategoriesPage from "./pages/CategoriesPage.jsx";
import ProductDetailPage from "./pages/ProductDetailPage";
import Auth from "./pages/Auth";
import {UserProvider} from "./context/UserContext.jsx";
import {RegionProvider} from "./context/RegionContext.jsx";
import {CartProvider} from "./context/CartContext.jsx";
import CheckoutAddress from "./pages/CheckoutAddress";
import CreateAddressPage from "./pages/CreateAddressPage";
import CheckoutPayment from "./pages/CheckoutPayment";

function App() {
  return (<Router>
      <UserProvider>
        <RegionProvider>
          <CartProvider>
            <div className="flex min-h-screen flex-col">
              <Header/>
              <main className="flex-grow">
                <Routes>
                  <Route path="/" element={<Home/>}/>
                  <Route path="/shop" element={<Shop/>}/>
                  <Route path="/about" element={<About/>}/>
                  <Route path="/contact" element={<Contact/>}/>
                  <Route path="/cart" element={<CartPage/>}/>
                  <Route path="/profile" element={<Profile/>}/>
                  <Route path="/collection/:id" element={<CollectionPage/>}/>
                  <Route path="*" element={<NotFound/>}/>
                  <Route
                    path="/categories/:categoryId"
                    element={<CategoriesPage/>}
                  />
                  <Route path="/product/:productId" element={<ProductDetailPage/>}/>
                  <Route path="/auth" element={<Auth/>}/>
                  <Route path="/checkout/address" element={<CheckoutAddress/>}/>
                  <Route path="/profile/address/new" element={<CreateAddressPage/>}/>
                  <Route path="/checkout/payment" element={<CheckoutPayment/>}/>
                </Routes>
              </main>
              <Footer/>
            </div>
          </CartProvider>
        </RegionProvider>
      </UserProvider>
    </Router>
  );
}

export default App;
