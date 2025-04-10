import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export default function Cart() {
  const [filter, setFilter] = useState('all');
  const [products, setProducts] = useState([
    {
      id: 1,
      name: 'Denim Jacket',
      price: 59.99,
      quantity: 1,
      image: 'src/assets/product/blazer1.avif',
      stockStatus: 'almost-sold-out',
      flashSale: true,
      selected: true,
      description: 'A timeless piece for any wardrobe, this denim jacket is made with durable cotton fabric and features a classic, versatile design.'
    },
    {
      id: 2,
      name: 'T-Shirt',
      price: 19.99,
      quantity: 3,
      image: 'src/assets/product/blazer1.avif',
      stockStatus: 'normal',
      flashSale: false,
      selected: true,
      description: 'This essential T-shirt is crafted from soft, breathable cotton, offering ultimate comfort and durability for everyday wear.'
    },
    {
      id: 3,
      name: 'Sneakers',
      price: 89.99,
      quantity: 2,
      image: 'src/assets/product/blazer1.avif',
      stockStatus: 'almost-sold-out',
      flashSale: false,
      selected: true,
      description: 'Step up your footwear game with these high-performance sneakers, designed for both comfort and style.'
    }
  ]);

  const updateQuantity = (id, amount) => {
    setProducts(prev =>
      prev.map(product =>
        product.id === id
          ? { ...product, quantity: Math.max(1, product.quantity + amount) }
          : product
      )
    );
  };

  const removeFromCart = (id) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this product?');
    if (confirmDelete) {
      setProducts(prev => prev.filter(product => product.id !== id));
    }
  };

  const addToWishlistAndRemoveFromCart = (id) => {
    setProducts(prev => prev.filter(product => product.id !== id));
    console.log(`Product with id ${id} added to wishlist`);
  };

  const toggleSelectProduct = (id) => {
    setProducts(prev =>
      prev.map(product =>
        product.id === id ? { ...product, selected: !product.selected } : product
      )
    );
  };

  const filteredProducts = products.filter(product => {
    if (filter === 'all') return true;
    if (filter === 'almost') return product.stockStatus === 'almost-sold-out';
    if (filter === 'flash') return product.flashSale;
    return true;
  });

  const totalPrice = products.reduce((acc, product) => {
    return product.selected ? acc + product.price * product.quantity : acc;
  }, 0);

  useEffect(() => {
    // Triggered when the filter changes, you can add any animations or effects you want here.
  }, [filter]);

  return (
    <div className="p-4 bg-bg_clr text-t_clr">
      <h2 className="text-2xl mb-4 font-semibold">Your Cart</h2>

      <div className="mb-6 flex gap-4">
        <button onClick={() => setFilter('all')} className="px-4 py-2 bg-t_clr text-white hover:bg-bg_clr rounded-full">All</button>
        <button onClick={() => setFilter('almost')} className="px-4 py-2 bg-t_clr text-white hover:bg-bg_clr rounded-full">Almost Out of Stock</button>
        <button onClick={() => setFilter('flash')} className="px-4 py-2 bg-t_clr text-white hover:bg-bg_clr rounded-full">Flash Sale</button>
      </div>

      {filteredProducts.length === 0 ? (
        <div className="text-center text-3xl font-medium text-t_clr font-bold py-12">
          Your cart is empty
        </div>
      ) : (
        <div className="space-y-4">
          {filteredProducts.map((product) => (
            <motion.div
              key={product.id}
              className="relative flex items-center bg-cn_clr rounded-xl p-4 shadow"
              initial={{ opacity: 0, y: 100 }} // Start from below the view
              animate={{ opacity: 1, y: 0 }}   // End at normal position
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            >
              <div className="absolute top-4 right-4 flex flex-col items-center space-y-2">
                <button
                  onClick={() => addToWishlistAndRemoveFromCart(product.id)}
                  className="p-2 hover:bg-red-200 rounded-full"
                  title="Add to Wishlist"
                >
                  <img src="src/assets/wishlist.png" alt="wishlist" className="w-6 h-6" />
                </button>
                <button
                  onClick={() => removeFromCart(product.id)}
                  className="p-2 hover:bg-red-200 rounded-full"
                  title="Delete from Cart"
                >
                  <img src="src/assets/delete.png" alt="delete" className="w-6 h-6" />
                </button>
              </div>

              {/* Select checkbox to the left of the image, centered */}
              <input
                type="checkbox"
                checked={product.selected}
                onChange={() => toggleSelectProduct(product.id)}
                className="absolute left-3 top-1/2 transform -translate-y-1/2 p-2 w-5 h-5"
              />

              <img src={product.image} alt={product.name} className="w-24 h-28 ml-15 rounded-xl object-cover mr-4" />
              
              <div className="flex-1">
                <h3 className="text-xl font-semibold">{product.name}</h3>
                {/* Flex container for price and description */}
                <div className="flex items-center justify-between mt-2 mr-70">
                  <p className="text-lg">${product.price.toFixed(2)}</p>
                  <p className="text-md text-t_clr ml-30">{product.description}</p> 
                </div>

                <div className="flex items-center mt-2">
                  <button
                    onClick={() => updateQuantity(product.id, -1)}
                    className="px-3 py-1 text-lg font-bold rounded-full bg-t_clr text-white hover:opacity-80"
                  >
                    -
                  </button>
                  <span className="mx-4 text-lg">{product.quantity}</span>
                  <button
                    onClick={() => updateQuantity(product.id, 1)}
                    className="px-3 py-1 text-lg font-bold rounded-full bg-t_clr text-white hover:opacity-80"
                  >
                    +
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      <div className="mt-6 text-lg font-semibold flex justify-between items-center">
        <p className="text-2xl font-bold">Total Price: ${totalPrice.toFixed(2)}</p>
        <button
          onClick={() => console.log('Proceed to checkout')}
          className="px-6 py-2 text-xl bg-t_clr text-white rounded-full hover:bg-bg_clr"
        >
          Checkout
        </button>
      </div>

    </div>
  );
}
