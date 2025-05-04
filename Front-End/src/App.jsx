import Home from "./home";
import Profile from "./Profile";
import ShopPage from "./ShopPage";
import ProductPage from "./ProductPage";
import { BrowserRouter, Route, Routes } from "react-router";
import Layout from "./Layout";
import StyleYours from "./StyleYours";
import Login from "./Login";
import NewArrivals from "./NewArrivals";
import Wishlist from "./Wishlist";
import { WishlistProvider } from "./context/WishlistContext";
import { CartProvider } from "./context/CartContext";
import Cart from "./Cart";
import Admin from "./Admin";

function App() {
  return (
    <BrowserRouter>
      <CartProvider>
        <WishlistProvider>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<Layout />}>
              <Route path="/" element={<Home />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/admin" element={<Admin />} />
              <Route path="/shop" element={<ShopPage />} />
              <Route path="/style" element={<StyleYours />} />
              <Route path="/new" element={<NewArrivals />} />
              <Route path="/wishlist" element={<Wishlist />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/product/:id" element={<ProductPage />} />
            </Route>
          </Routes>
        </WishlistProvider>
      </CartProvider>
    </BrowserRouter>
  );
}

export default App;
