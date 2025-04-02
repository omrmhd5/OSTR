import Home from "./home";
import Profile from "./Profile";
import ShopPage from "./ShopPage";
import ProductPage from "./ProductPage";
import { BrowserRouter, Route, Routes } from "react-router";
import Layout from "./Layout";
import StyleYours from "./StyleYours";

function App() {
  const photos = [
    {
      src: "src/assets/product/blazer1.avif",
    },
    {
      src: "src/assets/product/blazer2.avif",
    },
    {
      src: "src/assets/product/blazer3.avif",
    },
    {
      src: "src/assets/product/blazer4.avif",
    },
    {
      src: "src/assets/product/blazer5.avif",
    },
    {
      src: "src/assets/product/blazer6.avif",
    },
    {
      src: "src/assets/product/blazer7.avif",
    },
  ];
  const colors = [
    { name: "black", hex: "bg-black", ring: "ring-black" },
    { name: "grey", hex: "bg-gray-500", ring: "ring-gray-500" },
  ];
  const reviews = [
    {
      id: 1,
      user: {
        name: "John Doe",
        avatar: "src/assets/review/review1.avif",
      },
      rating: 5,
      comment: "Amazing product! Highly recommended.",
      date: "2025-03-11",
    },
    {
      id: 2,
      user: {
        name: "Jane Smith",
        avatar: "src/assets/review/review2.avif",
      },
      rating: 4,
      comment: "Good quality, but shipping was slow.",
      date: "2025-03-10",
    },
    {
      id: 3,
      user: {
        name: "Ali Ahmed",
        avatar: "src/assets/review/review3.avif",
      },
      rating: 3,
      comment: "Decent, but not as expected.",
      date: "2025-03-09",
    },
  ];

  const relatedProducts = [
    {
      src: "src/assets/relatedProduct/rp1.avif",
      name: "Classic Leather Jacket",
      price: 199,
      rating: 4.5,
    },
    {
      src: "src/assets/relatedProduct/rp2.avif",
      name: "Slim Fit Denim Jacket",
      price: 129,
      rating: 4.2,
    },
    {
      src: "src/assets/relatedProduct/rp3.avif",
      name: "Casual Bomber Jacket",
      price: 149,
      rating: 4.3,
    },
    {
      src: "src/assets/relatedProduct/rp2.avif",
      name: "Slim Fit Denim Jacket",
      price: 129,
      rating: 4.2,
    },
    {
      src: "src/assets/relatedProduct/rp2.avif",
      name: "Slim Fit Denim Jacket",
      price: 129,
      rating: 4.2,
    },
  ];

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/shop" element={<ShopPage />} />
            <Route path="/style" element={<StyleYours />} />

            <Route
              path="/product"
              element={
                <ProductPage
                  name="Modern Fit Blazer Jacket"
                  photos={photos}
                  tagline="Elevate Your Style – The Perfect Blend of Sophistication & Comfort."
                  rating="4.2"
                  reviewCount="210"
                  price="2999"
                  colors={colors}
                  description="The Modern Fit Blazer Jacket combines sleek sophistication with all-day comfort. Designed for a tailored yet flexible fit, this versatile piece effortlessly transitions from business meetings to casual outings. Crafted from premium materials, it offers a refined silhouette, impeccable detailing, and a timeless appeal—making it an essential addition to any wardrobe."
                  reviews={reviews}
                  relatedProducts={relatedProducts}
                />
              }
            />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
