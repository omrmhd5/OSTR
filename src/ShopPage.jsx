import React, { useState } from 'react'


const productsmen = [
  { id: 1, name: "Backpack", price: 299, image: "src/assets/shirt.jpeg" },
  { id: 2, name: "Watch", price: 299, image: "src/assets/shirt.jpeg" },
  { id: 3, name: "Shirt", price: 299, image: "src/assets/shirt.jpeg" },
  { id: 4, name: "Flip Flop", price: 50, image: "src/assets/shirt.jpeg" },
  { id: 5, name: "Shorts", price: 120, image: "src/assets/shirt.jpeg" },
  { id: 6, name: "Boots", price: 350, image: "src/assets/shirt.jpeg" },
];

const productswomen = [
  { id: 7, name: "Backpack", price: 299, image: "src/assets/img1.jpg" },
  { id: 8, name: "Watch", price: 299, image: "src/assets/img1.jpg" },
  { id: 9, name: "Shirt", price: 299, image: "src/assets/img1.jpg" },
  { id: 10, name: "Flip Flop", price: 50, image: "src/assets/img1.jpg" },
  { id: 11, name: "Shorts", price: 120, image: "src/assets/img1.jpg" },
  { id: 12, name: "Boots", price: 350, image: "src/assets/img1.jpg" },
];

const productschildren = [
  { id: 13, name: "Backpack", price: 299, image: "src/assets/profile.jpg" },
  { id: 14, name: "Watch", price: 299, image: "src/assets/profile.jpg" },
  { id: 15, name: "Shirt", price: 299, image: "src/assets/profile.jpg" },
  { id: 16, name: "Flip Flop", price: 50, image: "src/assets/profile.jpg" },
  
];



const allProducts = [...productsmen, ...productswomen, ...productschildren];

export default function ShopPage() {
  const [selectedProducts, setSelectedProducts] = useState(allProducts);
  const [message, setMessage] = useState("");

  // Function to show a temporary message
  const showMessage = (text) => {
    setMessage(text);
    setTimeout(() => setMessage(""), 2000); // Hide after 2 seconds
  };

  return (
    <div className="p-4 bg-bg_clr text-t_clr font-paragraph">
      <header className="flex justify-between items-center border-b pb-2 mb-4">
        <h1 className="text-xl font-bold font-header">Shop</h1>
      </header>

      <div className="flex items-center justify-center space-x-2 mb-4">
        <button className="px-4 py-2 bg-bg_clr text-t_clr hover:bg-cn_clr" onClick={() => setSelectedProducts(productsmen)}>Men</button>
        <button className="px-4 py-2 bg-bg_clr text-t_clr hover:bg-cn_clr" onClick={() => setSelectedProducts(productswomen)}>Women</button>
        <button className="px-4 py-2 bg-bg_clr text-t_clr hover:bg-cn_clr" onClick={() => setSelectedProducts(productschildren)}>Kids</button>
        <button className="px-4 py-2 bg-bg_clr text-t_clr hover:bg-cn_clr" onClick={() => setSelectedProducts(allProducts)}>View All</button>
      </div>

      {/* Success Message */}
      {message && (
        <div className="fixed top-4 left-1/2 transform -translate-x-1/2 bg-[#976c60] text-white px-4 py-2 rounded shadow-md">
          {message}
        </div>
      )}

      <div className="grid grid-cols-4 gap-4">
        {selectedProducts.map((product) => (
          <div key={product.id} className="text-center bg-cn_clr p-4 rounded">
            <img src={product.image} alt={product.name} className="w-full h-40 object-cover" />
            <h2 className="text-lg font-semibold mt-2 font-header">{product.name}</h2>
            <p className="text-t_clr">${product.price}</p>

            <div className="flex justify-center gap-2 mt-2">
              <button 
                className="w-1/2 bg-bg_clr flex justify-center items-center p-2 hover:bg-cn_clr"
                onClick={() => showMessage("Item added to cart successfully!")}
              >
                <img src="/src/assets/cart.png" alt="Cart" className="w-6 h-6" />
              </button>
              <button 
                className="w-1/2 bg-bg_clr flex justify-center items-center p-2 hover:bg-cn_clr"
                onClick={() => showMessage("Item added to wishlist successfully!")}
              >
                <img src="/src/assets/wishlist.png" alt="wishlist" className="w-6 h-6" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}