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

  return (
    <div className="p-4 bg-bg_clr text-t_clr font-paragraph [&_h1]:font-header [&_h2]:font-header [&_h3]:font-header [&_h4]:font-header [&_h5]:font-header [&_h6]:font-header ">
      <header className="flex justify-between items-center border-b pb-2 mb-4">
        <h1 className="text-xl font-bold font-header">Shop</h1>
      </header>
      <div className="flex items-center justify-center space-x-2 mb-4">
        <button className="px-4 py-2 bg-bg_clr text-t_clr" onClick={() => setSelectedProducts(productsmen)}>Men</button>
        <button className="px-4 py-2 bg-bg_clr text-t_clr" onClick={() => setSelectedProducts(productswomen)}>Women</button>
        <button className="px-4 py-2 bg-bg_clr text-t_clr" onClick={() => setSelectedProducts(productschildren)}>Kids</button>
        <button className="px-4 py-2 bg-bg_clr text-t_clr" onClick={() => setSelectedProducts(allProducts)}>View All</button>
      </div>
      <div className="grid grid-cols-4 gap-4">
        {selectedProducts.map((product) => (
          <div key={product.id} className="text-center bg-cn_clr p-4 rounded">
            <img src={product.image} alt={product.name} className="w-full h-40 object-cover" />
            <h2 className="text-lg font-semibold mt-2 font-header">{product.name}</h2>
            <p className="text-t_clr">${product.price}</p>
            <button className="mt-2 w-full bg-bg_clr text-white">Add to Cart</button>
          </div>
        ))}
      </div>
    </div>
  );
}
