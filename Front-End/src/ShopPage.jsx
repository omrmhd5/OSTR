import React, { useState } from "react";
import { useWishlist } from "./context/WishlistContext";
import { LayoutGrid, List } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router";

const productsmen = [
  {
    id: 0,
    name: "Modern Fit Blazer Jacket",
    tagline:
      "Elevate Your Style – The Perfect Blend of Sophistication & Comfort.",
    rating: "4.2",
    reviewCount: "210",
    price: "2,999",
    description:
      "The Modern Fit Blazer Jacket combines sleek sophistication with all-day comfort. Designed for a tailored yet flexible fit, this versatile piece effortlessly transitions from business meetings to casual outings. Crafted from premium materials, it offers a refined silhouette, impeccable detailing, and a timeless appeal—making it an essential addition to any wardrobe.",
    photos: [
      { src: "/assets/Products/Men/blazer1.avif" },
      { src: "/assets/Products/Men/blazer2.avif" },
      { src: "/assets/Products/Men/blazer3.avif" },
      { src: "/assets/Products/Men/blazer4.avif" },
      { src: "/assets/Products/Men/blazer5.avif" },
      { src: "/assets/Products/Men/blazer6.avif" },
      { src: "/assets/Products/Men/blazer7.avif" },
    ],
    colors: [
      { name: "black", hex: "bg-black", ring: "ring-black" },
      { name: "grey", hex: "bg-gray-500", ring: "ring-gray-500" },
    ],
    reviews: [
      {
        id: 1,
        user: {
          name: "John Doe",
          avatar: "/assets/review/review1.avif",
        },
        rating: 5,
        comment: "Amazing product! Highly recommended.",
        date: "2025-03-11",
      },
      {
        id: 2,
        user: {
          name: "Jane Smith",
          avatar: "/assets/review/review2.avif",
        },
        rating: 4,
        comment: "Good quality, but shipping was slow.",
        date: "2025-03-10",
      },
      {
        id: 3,
        user: {
          name: "Ali Ahmed",
          avatar: "/assets/review/review3.avif",
        },
        rating: 3,
        comment: "Decent, but not as expected.",
        date: "2025-03-09",
      },
    ],
  },
  {
    id: 99,
    name: "Denim & Leather Jacket Collection",
    photos: [
      { src: "/assets/Products/Men/rp1.avif" },
      { src: "/assets/Products/Men/rp2.avif" },
      { src: "/assets/Products/Men/rp3.avif" },
    ],
    tagline: "Versatile Jackets – A Perfect Blend of Style and Comfort.",
    rating: 4.3,
    reviewCount: 20, // Assuming an average number of reviews from the three products
    price: 149,
    colors: [
      { name: "Black", hex: "bg-black", ring: "ring-black" },
      { name: "Blue", hex: "bg-blue-500", ring: "ring-blue-500" },
    ],
    description:
      "Explore our versatile jacket collection featuring leather, denim, and bomber jackets. Crafted for comfort and style, these jackets are perfect for all occasions. Mix and match with different outfits for a chic look.",
    reviews: [
      {
        id: 1,
        user: { name: "John Doe", avatar: "/assets/review/review1.avif" },
        rating: 4.5,
        comment: "Perfect jacket for all seasons. Fits well and looks great!",
        date: "2025-03-08",
      },
      {
        id: 2,
        user: { name: "Sarah Ali", avatar: "/assets/review/review2.avif" },
        rating: 4.0,
        comment: "Love the style, but wish the fabric was a little softer.",
        date: "2025-03-09",
      },
      {
        id: 3,
        user: { name: "Ahmed Sherif", avatar: "/assets/review/review3.avif" },
        rating: 4.7,
        comment:
          "Great quality and looks even better in person. Definitely recommended.",
        date: "2025-03-10",
      },
    ],
  },
  {
    id: 1,
    name: "Beige Formal Suit",
    tagline: "Elevate Your Formal Look – Where Classic Meets Modern Elegance.",
    rating: "4.5",
    reviewCount: "150",
    price: "299",
    description:
      "This sleek beige suit is designed for formal occasions. It offers a tailored fit that provides both comfort and style, making it perfect for business meetings, weddings, or upscale events. With its modern appeal, this suit is a timeless wardrobe essential.",
    photos: [
      { src: "/assets/Products/Men/BeigeSuit.jpg" },
      { src: "/assets/Products/Men/beigeSuit2.jpg" },
      { src: "/assets/Products/Men/BeigeSuit3.jpg" },
      { src: "/assets/Products/Men/beigesuit4.jpg" },
    ],
    colors: [
      { name: "beige", hex: "bg-amber-200", ring: "ring-beige" },
      { name: "navy", hex: "bg-blue-500", ring: "ring-navy-500" },
    ],
    reviews: [
      {
        id: 1,
        user: { name: "John Doe", avatar: "/assets/review/review1.avif" },
        rating: 5,
        comment: "Perfect fit, looks amazing at events!",
        date: "2025-03-11",
      },
      {
        id: 2,
        user: { name: "Alice Green", avatar: "/assets/review/review2.avif" },
        rating: 4,
        comment: "Great quality, but I wish it had a more diverse size range.",
        date: "2025-03-10",
      },
      {
        id: 3,
        user: { name: "Michael Lee", avatar: "/assets/review/review3.avif" },
        rating: 4,
        comment: "Good material, comfortable fit, and stylish.",
        date: "2025-03-09",
      },
    ],
  },
  {
    id: 2,
    name: "Minimalist Black Watch",
    tagline: "Timeless Design – Perfect for Every Occasion.",
    rating: "4.6",
    reviewCount: "180",
    price: "299",
    description:
      "This stylish black watch features a minimalist dial design that works seamlessly for everyday wear and special events. Its sleek, modern aesthetic makes it the ideal accessory to elevate any outfit.",
    photos: [
      { src: "/assets/Products/Men/blackWatch1.jpg" },
      { src: "/assets/Products/Men/blackWatch2.jpg" },
      { src: "/assets/Products/Men/blackWatch3.jpg" },
    ],
    colors: [
      { name: "black", hex: "bg-black", ring: "ring-black" },
      { name: "silver", hex: "bg-silver-500", ring: "ring-silver-500" },
    ],
    reviews: [
      {
        id: 1,
        user: { name: "John Doe", avatar: "/assets/review/review1.avif" },
        rating: 5,
        comment: "Sleek design, great for daily wear.",
        date: "2025-03-11",
      },
      {
        id: 2,
        user: { name: "Jane Smith", avatar: "/assets/review/review2.avif" },
        rating: 4,
        comment: "Beautiful watch, but a little heavy for my liking.",
        date: "2025-03-10",
      },
      {
        id: 3,
        user: { name: "Ali Ahmed", avatar: "/assets/review/review3.avif" },
        rating: 4,
        comment: "Nice look and feel, solid build.",
        date: "2025-03-09",
      },
    ],
  },
  {
    id: 3,
    name: "Classic Crew Neck Shirt",
    tagline: "Everyday Comfort – Classic Design for Casual Wear.",
    rating: "4.3",
    reviewCount: "220",
    price: "79",
    description:
      "This casual t-shirt offers breathable fabric and a classic crew neck, making it ideal for daily wear. Its versatile design pairs well with jeans or shorts, ensuring you stay comfortable all day.",
    photos: [
      { src: "/assets/Products/Men/berTshirt1.jpg" },
      { src: "/assets/Products/Men/berTshirt2.jpg" },
    ],
    colors: [
      { name: "white", hex: "bg-white", ring: "ring-white" },
      { name: "black", hex: "bg-black", ring: "ring-black" },
    ],
    reviews: [
      {
        id: 1,
        user: { name: "John Doe", avatar: "/assets/review/review1.avif" },
        rating: 5,
        comment: "Super comfortable, love the fit!",
        date: "2025-03-11",
      },
      {
        id: 2,
        user: { name: "Jane Smith", avatar: "/assets/review/review2.avif" },
        rating: 4,
        comment: "Good quality shirt, great for casual days.",
        date: "2025-03-10",
      },
      {
        id: 3,
        user: { name: "Ali Ahmed", avatar: "/assets/review/review3.avif" },
        rating: 3,
        comment: "Decent, but the fabric is a bit thin.",
        date: "2025-03-09",
      },
    ],
  },
  {
    id: 4,
    name: "Activewear Shorts",
    tagline: "Stay Cool – Perfect for Workouts and Summer Adventures.",
    rating: "4.4",
    reviewCount: "190",
    price: "120",
    description:
      "These lightweight and durable shorts are designed for both summer and workouts. Featuring multiple pockets, they offer ample storage for your essentials while keeping you cool and comfortable.",
    photos: [
      { src: "/assets/Products/Men/shorts1.jpg" },
      { src: "/assets/Products/Men/shorts2.jpg" },
      { src: "/assets/Products/Men/shorts3.jpg" },
    ],
    colors: [
      { name: "grey", hex: "bg-gray-500", ring: "ring-gray-500" },
      { name: "navy", hex: "bg-navy-500", ring: "ring-navy-500" },
    ],
    reviews: [
      {
        id: 1,
        user: { name: "John Doe", avatar: "/assets/review/review1.avif" },
        rating: 5,
        comment: "Perfect for the gym and hot weather.",
        date: "2025-03-11",
      },
      {
        id: 2,
        user: { name: "Jane Smith", avatar: "/assets/review/review2.avif" },
        rating: 4,
        comment: "Comfortable, but wish the fit was a little better.",
        date: "2025-03-10",
      },
      {
        id: 3,
        user: { name: "Ali Ahmed", avatar: "/assets/review/review3.avif" },
        rating: 4,
        comment: "Good shorts for the price, lightweight and breathable.",
        date: "2025-03-09",
      },
    ],
  },
  {
    id: 5,
    name: "Comfort Flip Flops",
    tagline: "Relaxed and Easy – Ideal for Beach Days and Lounging.",
    rating: "4.0",
    reviewCount: "130",
    price: "50",
    description:
      "These comfortable flip flops are perfect for beach days or lounging around the house. Made with soft material for maximum comfort, they will keep your feet relaxed all day long.",
    photos: [
      { src: "/assets/Products/Men/flipflop1.jpg" },
      { src: "/assets/Products/Men/flipflop2.jpg" },
      { src: "/assets/Products/Men/flipflop3.jpg" },
      { src: "/assets/Products/Men/flipflop4.jpg" },
    ],
    colors: [
      { name: "blue", hex: "bg-blue-500", ring: "ring-blue-500" },
      { name: "red", hex: "bg-red-500", ring: "ring-red-500" },
    ],
    reviews: [
      {
        id: 1,
        user: { name: "John Doe", avatar: "/assets/review/review1.avif" },
        rating: 5,
        comment: "Super comfortable, great for relaxing!",
        date: "2025-03-11",
      },
      {
        id: 2,
        user: { name: "Jane Smith", avatar: "/assets/review/review2.avif" },
        rating: 4,
        comment: "Good flip flops, but could use a little more arch support.",
        date: "2025-03-10",
      },
      {
        id: 3,
        user: { name: "Ali Ahmed", avatar: "/assets/review/review3.avif" },
        rating: 4,
        comment: "Comfortable and easy to wear around the house.",
        date: "2025-03-09",
      },
    ],
  },
  {
    id: 6,
    name: "Stretch Comfort Pants",
    tagline: "Daily Comfort – Perfect for Work and Relaxation.",
    rating: "4.6",
    reviewCount: "160",
    price: "350",
    description:
      "These versatile pants are designed for everyday wear, offering a refined look and stretchable fabric for ultimate comfort. Whether for work or casual outings, they will keep you looking sharp and feeling relaxed.",
    photos: [
      { src: "/assets/Products/Men/pants1.jpg" },
      { src: "/assets/Products/Men/pants2.jpg" },
      { src: "/assets/Products/Men/pants3.jpg" },
    ],
    colors: [
      { name: "charcoal", hex: "bg-charcoal-500", ring: "ring-charcoal-500" },
      { name: "olive", hex: "bg-olive-500", ring: "ring-olive-500" },
    ],
    reviews: [
      {
        id: 1,
        user: { name: "John Doe", avatar: "/assets/review/review1.avif" },
        rating: 5,
        comment: "Comfortable for all-day wear, highly recommend!",
        date: "2025-03-11",
      },
      {
        id: 2,
        user: { name: "Jane Smith", avatar: "/assets/review/review2.avif" },
        rating: 4,
        comment: "Good quality, but the fit is a little tight for me.",
        date: "2025-03-10",
      },
      {
        id: 3,
        user: { name: "Ali Ahmed", avatar: "/assets/review/review3.avif" },
        rating: 4,
        comment: "Nice pants, fits great, and stretches well.",
        date: "2025-03-09",
      },
    ],
  },
  {
    id: 7,
    name: "Rugged Hiking Boots",
    tagline: "Explore the Outdoors – Built for Adventure and Durability.",
    rating: "4.8",
    reviewCount: "220",
    price: "350",
    description:
      "These rugged boots are built for durability and comfort, whether you're hiking through the wilderness or navigating urban streets. The sturdy design ensures long-lasting wear for any outdoor adventure.",
    photos: [
      { src: "/assets/Products/Men/boots1.jpg" },
      { src: "/assets/Products/Men/boot2.jpg" },
      { src: "/assets/Products/Men/boots3.jpg" },
    ],
    colors: [
      { name: "brown", hex: "bg-brown-500", ring: "ring-brown-500" },
      { name: "black", hex: "bg-black", ring: "ring-black" },
    ],
    reviews: [
      {
        id: 1,
        user: { name: "John Doe", avatar: "/assets/review/review1.avif" },
        rating: 5,
        comment: "Perfect for my hiking trips, very durable.",
        date: "2025-03-11",
      },
      {
        id: 2,
        user: { name: "Alice Green", avatar: "/assets/review/review2.avif" },
        rating: 5,
        comment: "Comfortable and sturdy, great for long walks.",
        date: "2025-03-10",
      },
      {
        id: 3,
        user: { name: "Ali Ahmed", avatar: "/assets/review/review3.avif" },
        rating: 4,
        comment: "Great boots, but took a few days to break in.",
        date: "2025-03-09",
      },
    ],
  },
  {
    id: 8,
    name: "Classic Black Suit",
    tagline: "Sharp and Stylish – Your Perfect Business Companion.",
    rating: "4.7",
    reviewCount: "140",
    price: "350",
    description:
      "This classic black suit provides a sharp, sophisticated look perfect for business meetings and formal events. Its sleek design offers a flattering silhouette, ensuring you make a lasting impression.",
    photos: [
      { src: "/assets/Products/Men/blacksuit1.jpg" },
      { src: "/assets/Products/Men/blacksuit2.jpg" },
      { src: "/assets/Products/Men/blacksuit3.jpg" },
    ],
    colors: [
      { name: "black", hex: "bg-black", ring: "ring-black" },
      { name: "charcoal", hex: "bg-charcoal-500", ring: "ring-charcoal-500" },
    ],
    reviews: [
      {
        id: 1,
        user: { name: "John Doe", avatar: "/assets/review/review1.avif" },
        rating: 5,
        comment: "Excellent suit, perfect for all formal occasions.",
        date: "2025-03-11",
      },
      {
        id: 2,
        user: { name: "Alice Green", avatar: "/assets/review/review2.avif" },
        rating: 4,
        comment: "Great suit, but the pants could fit better.",
        date: "2025-03-10",
      },
      {
        id: 3,
        user: { name: "Ali Ahmed", avatar: "/assets/review/review3.avif" },
        rating: 4,
        comment: "Very sharp look, good for business meetings.",
        date: "2025-03-09",
      },
    ],
  },
];

const productswomen = [
  {
    id: 9,
    name: "Chic Everyday Bag",
    tagline: "Carry in Style – Perfect for Day or Night.",
    rating: "4.7",
    reviewCount: "185",
    price: 299,
    description:
      "Chic and roomy handbag perfect for daily errands or evenings out. Combines functionality with a touch of sophistication.",
    photos: [
      { src: "/assets/Products/Women/Bag3.jpg" },
      { src: "/assets/Products/Women/Bag2.jpg" },
      { src: "/assets/Products/Women/Bag1.jpg" },
    ],
    colors: [
      { name: "beige", hex: "bg-beige-300", ring: "ring-beige-300" },
      { name: "black", hex: "bg-black", ring: "ring-black" },
    ],
    reviews: [
      {
        id: 1,
        user: { name: "Lina Elham", avatar: "/assets/review/review1.avif" },
        rating: 5,
        comment: "Stylish and fits everything I need!",
        date: "2025-03-08",
      },
      {
        id: 2,
        user: { name: "Huda Salem", avatar: "/assets/review/review2.avif" },
        rating: 4,
        comment: "Very elegant but wish it had a zip pocket inside.",
        date: "2025-03-09",
      },
      {
        id: 3,
        user: { name: "Mira Fawzy", avatar: "/assets/review/review3.avif" },
        rating: 5,
        comment: "Love the size and look. Great for daily use!",
        date: "2025-03-10",
      },
    ],
  },
  {
    id: 10,
    name: "Sleek Women's Watch",
    tagline: "Timeless Design – Elegance That Speaks Volumes.",
    rating: "4.6",
    reviewCount: "170",
    price: 299,
    description:
      "Elegant women's watch with a sleek band and classic face. Designed for sophistication and everyday wear.",
    photos: [
      { src: "/assets/Products/Women/watch3.jpg" },
      { src: "/assets/Products/Women/watch1.jpg" },
      { src: "/assets/Products/Women/watch2.jpg" },
    ],
    colors: [
      { name: "silver", hex: "bg-gray-300", ring: "ring-gray-300" },
      { name: "rose gold", hex: "bg-rose-300", ring: "ring-rose-300" },
    ],
    reviews: [
      {
        id: 1,
        user: { name: "Sara Khaled", avatar: "/assets/review/review1.avif" },
        rating: 5,
        comment: "Beautiful watch, gets compliments every time.",
        date: "2025-03-08",
      },
      {
        id: 2,
        user: { name: "Aya Mansour", avatar: "/assets/review/review2.avif" },
        rating: 4,
        comment: "Elegant design, but the strap is slightly loose.",
        date: "2025-03-09",
      },
      {
        id: 3,
        user: { name: "Nora Saeed", avatar: "/assets/review/review3.avif" },
        rating: 5,
        comment: "Matches my outfits perfectly!",
        date: "2025-03-10",
      },
    ],
  },
  {
    id: 11,
    name: "Soft Fit Shirt",
    tagline: "Effortless Chic – Designed for Comfort and Style.",
    rating: "4.5",
    reviewCount: "145",
    price: 299,
    description:
      "Stylish shirt with soft fabric and a flattering fit. Ideal for casual and semi-formal occasions.",
    photos: [
      { src: "/assets/Products/Women/shirt1.jpg" },
      { src: "/assets/Products/Women/shirt2.jpg" },
      { src: "/assets/Products/Women/shirt3.jpg" },
    ],
    colors: [
      { name: "white", hex: "bg-white", ring: "ring-white" },
      { name: "blue", hex: "bg-blue-200", ring: "ring-blue-200" },
    ],
    reviews: [
      {
        id: 1,
        user: {
          name: "Hana Mostafa",
          avatar: "/assets/review/review1.avif",
        },
        rating: 5,
        comment: "Very soft and fits well!",
        date: "2025-03-08",
      },
      {
        id: 2,
        user: { name: "Salma A.", avatar: "/assets/review/review2.avif" },
        rating: 4,
        comment: "Good shirt, slightly transparent in white.",
        date: "2025-03-09",
      },
      {
        id: 3,
        user: { name: "Noor Hassan", avatar: "/assets/review/review3.avif" },
        rating: 4,
        comment: "Great fit for daily wear.",
        date: "2025-03-10",
      },
    ],
  },
  {
    id: 12,
    name: "Casual Stretch Pants",
    tagline: "Everyday Essential – Move Freely and Look Sharp.",
    rating: "4.4",
    reviewCount: "110",
    price: 50,
    description:
      "Comfort-fit pants ideal for casual or office wear. Soft fabric with just the right amount of stretch.",
    photos: [
      { src: "/assets/Products/Women/pants1.jpg" },
      { src: "/assets/Products/Women/pants2.jpg" },
      { src: "/assets/Products/Women/pants3.jpg" },
    ],
    colors: [
      { name: "gray", hex: "bg-gray-400", ring: "ring-gray-400" },
      { name: "khaki", hex: "bg-yellow-100", ring: "ring-yellow-100" },
    ],
    reviews: [
      {
        id: 1,
        user: {
          name: "Yasmine Adel",
          avatar: "/assets/review/review1.avif",
        },
        rating: 5,
        comment: "Perfect fit for my work days.",
        date: "2025-03-08",
      },
      {
        id: 2,
        user: { name: "Dana Rami", avatar: "/assets/review/review2.avif" },
        rating: 4,
        comment: "Comfortable but runs a bit large.",
        date: "2025-03-09",
      },
      {
        id: 3,
        user: { name: "Sara Magdy", avatar: "/assets/review/review3.avif" },
        rating: 4,
        comment: "Great everyday pants!",
        date: "2025-03-10",
      },
    ],
  },
  {
    id: 13,
    name: "Power Suit",
    tagline: "Confidence in Every Stitch – Tailored for Success.",
    rating: "4.8",
    reviewCount: "190",
    price: 350,
    description:
      "Power suit for the modern woman — tailored and timeless. A bold statement of strength and elegance.",
    photos: [
      { src: "/assets/Products/Women/suit1.jpg" },
      { src: "/assets/Products/Women/suit2.jpg" },
      { src: "/assets/Products/Women/suit3.jpg" },
    ],
    colors: [
      { name: "navy", hex: "bg-blue-800", ring: "ring-blue-800" },
      { name: "black", hex: "bg-black", ring: "ring-black" },
    ],
    reviews: [
      {
        id: 1,
        user: { name: "Mai Hossam", avatar: "/assets/review/review1.avif" },
        rating: 5,
        comment: "Absolutely love how it fits and looks.",
        date: "2025-03-08",
      },
      {
        id: 2,
        user: { name: "Dina G.", avatar: "/assets/review/review2.avif" },
        rating: 4,
        comment: "Stylish and empowering, but a bit pricey.",
        date: "2025-03-09",
      },
      {
        id: 3,
        user: { name: "Layla S.", avatar: "/assets/review/review3.avif" },
        rating: 5,
        comment: "My go-to for interviews and big meetings.",
        date: "2025-03-10",
      },
    ],
  },
  {
    id: 14,
    name: "Summer Cut Shorts",
    tagline: "Cool Comfort – Made for Sunny Days.",
    rating: "4.3",
    reviewCount: "95",
    price: 120,
    description:
      "Breezy summer shorts with a flattering cut and comfy waistband. Perfect for vacations or weekend outings.",
    photos: [
      { src: "/assets/Products/Women/shorts2.jpg" },
      { src: "/assets/Products/Women/shorts1.jpg" },
      { src: "/assets/Products/Women/shorts3.jpg" },
    ],
    colors: [
      { name: "peach", hex: "bg-pink-200", ring: "ring-pink-200" },
      { name: "light blue", hex: "bg-blue-100", ring: "ring-blue-100" },
    ],
    reviews: [
      {
        id: 1,
        user: { name: "Reem Badr", avatar: "/assets/review/review1.avif" },
        rating: 5,
        comment: "Super cute and comfy!",
        date: "2025-03-08",
      },
      {
        id: 2,
        user: {
          name: "Nada Elrefai",
          avatar: "/assets/review/review2.avif",
        },
        rating: 4,
        comment: "Perfect for hot days, nice material.",
        date: "2025-03-09",
      },
      {
        id: 3,
        user: { name: "Sandy R.", avatar: "/assets/review/review3.avif" },
        rating: 4,
        comment: "Wish they came in more colors.",
        date: "2025-03-10",
      },
    ],
  },
  {
    id: 15,
    name: "High-Ankle Boots",
    tagline: "Step Boldly – Sophistication Meets Edge.",
    rating: "4.7",
    reviewCount: "165",
    price: 350,
    description:
      "Elegant high-ankle boots with a bold design for any occasion. Durable, stylish, and versatile.",
    photos: [
      { src: "/assets/Products/Women/boots1.jpg" },
      { src: "/assets/Products/Women/boots2.jpg" },
      { src: "/assets/Products/Women/boots3.jpg" },
    ],
    colors: [
      { name: "brown", hex: "bg-yellow-900", ring: "ring-yellow-900" },
      { name: "black", hex: "bg-black", ring: "ring-black" },
    ],
    reviews: [
      {
        id: 1,
        user: { name: "Laila Nour", avatar: "/assets/review/review1.avif" },
        rating: 5,
        comment: "Stylish and sturdy. Love them!",
        date: "2025-03-08",
      },
      {
        id: 2,
        user: { name: "Farah H.", avatar: "/assets/review/review2.avif" },
        rating: 4,
        comment: "A bit snug at first but super comfy now.",
        date: "2025-03-09",
      },
      {
        id: 3,
        user: { name: "Noha Z.", avatar: "/assets/review/review3.avif" },
        rating: 5,
        comment: "Goes with everything in my wardrobe.",
        date: "2025-03-10",
      },
    ],
  },
  {
    id: 16,
    name: "Stylish Clogs",
    tagline: "Bold Simplicity – All-Day Comfort with a Twist.",
    rating: "4.5",
    reviewCount: "130",
    price: 350,
    description:
      "Trendy clogs with a comfortable footbed and standout look. Designed for casual fashion-forward steps.",
    photos: [
      { src: "/assets/Products/Women/clogs2.jpg" },
      { src: "/assets/Products/Women/clogs1.jpg" },
      { src: "/assets/Products/Women/clogs3.jpg" },
    ],
    colors: [
      { name: "ivory", hex: "bg-gray-100", ring: "ring-gray-100" },
      { name: "tan", hex: "bg-yellow-200", ring: "ring-yellow-200" },
    ],
    reviews: [
      {
        id: 1,
        user: { name: "Nadine F.", avatar: "/assets/review/review1.avif" },
        rating: 5,
        comment: "So comfy and trendy!",
        date: "2025-03-08",
      },
      {
        id: 2,
        user: { name: "Iman W.", avatar: "/assets/review/review2.avif" },
        rating: 4,
        comment: "Took some time to adjust to, but now I love them.",
        date: "2025-03-09",
      },
      {
        id: 3,
        user: { name: "Shaimaa R.", avatar: "/assets/review/review3.avif" },
        rating: 4,
        comment: "Feels light and looks amazing.",
        date: "2025-03-10",
      },
    ],
  },
];

const productschildren = [
  {
    id: 17,
    name: "Playful Summer Dress",
    tagline: "Whimsical Design – Perfect for Sunny Adventures.",
    rating: 4.8,
    reviewCount: 120,
    price: "50",
    description:
      "Adorable kids’ dress featuring a playful print, breathable fabric, and comfy fit. Ideal for birthdays, outings, and warm days.",
    photos: [
      { src: "/assets/Products/Kids/dress1.jpg" },
      { src: "/assets/Products/Kids/dress2.jpg" },
      { src: "/assets/Products/Kids/dress3.jpg" },
    ],
    colors: [
      { name: "Pink", hex: "bg-pink-500", ring: "ring-pink-500" },
      { name: "Blue", hex: "bg-blue-500", ring: "ring-blue-500" },
    ],
    reviews: [
      {
        id: 1,
        user: { name: "Lina Elham", avatar: "/assets/review/review1.avif" },
        rating: 5,
        comment: "Stylish and fits everything I need!",
        date: "2025-03-08",
      },
      {
        id: 2,
        user: { name: "Huda Salem", avatar: "/assets/review/review2.avif" },
        rating: 4,
        comment: "Very elegant but wish it had a zip pocket inside.",
        date: "2025-03-09",
      },
      {
        id: 3,
        user: { name: "Mira Fawzy", avatar: "/assets/review/review3.avif" },
        rating: 5,
        comment: "Love the size and look. Great for daily use!",
        date: "2025-03-10",
      },
    ],
  },
  {
    id: 18,
    name: "Color Splash Backpack",
    tagline: "Bright & Bold – Built for School Fun.",
    rating: 4.3,
    reviewCount: 250,
    price: "299",
    description:
      "Fun and colorful backpack with spacious compartments and durable zippers, perfect for school days or weekend trips.",
    photos: [
      { src: "/assets/Products/Kids/backpack1.jpg" },
      { src: "/assets/Products/Kids/backpack2.jpg" },
      { src: "/assets/Products/Kids/backpack3.jpg" },
      { src: "/assets/Products/Kids/backpack4.jpg" },
    ],
    colors: [
      { name: "Red", hex: "bg-red-500", ring: "ring-red-500" },
      { name: "Yellow", hex: "bg-yellow-500", ring: "ring-yellow-500" },
    ],
    reviews: [
      {
        id: 1,
        user: { name: "John Doe", avatar: "/assets/review/review1.avif" },
        rating: 5,
        comment: "Perfect for my kid! Very spacious and colorful.",
        date: "2025-03-08",
      },
      {
        id: 2,
        user: { name: "Sarah Ali", avatar: "/assets/review/review2.avif" },
        rating: 4,
        comment: "Very practical, but the zippers could be smoother.",
        date: "2025-03-09",
      },
      {
        id: 3,
        user: { name: "Mira Fawzy", avatar: "/assets/review/review3.avif" },
        rating: 5,
        comment: "My son loves it! Durable and fun design.",
        date: "2025-03-10",
      },
    ],
  },
  {
    id: 19,
    name: "Cotton Shirt",
    tagline: "Soft and Stylish – Perfect for Everyday Play.",
    rating: 4.5,
    reviewCount: 180,
    price: "299",
    description:
      "Soft cotton shirt designed for comfort and movement, with a bold print that adds fun to every outfit.",
    photos: [
      { src: "/assets/Products/Kids/shirt1.jpg" },
      { src: "/assets/Products/Kids/shirt3.jpg" },
      { src: "/assets/Products/Kids/shirt4.jpg" },
      { src: "/assets/Products/Kids/shirt2.jpg" },
    ],
    colors: [
      { name: "Green", hex: "bg-green-500", ring: "ring-green-500" },
      { name: "Yellow", hex: "bg-yellow-500", ring: "ring-yellow-500" },
    ],
    reviews: [
      {
        id: 1,
        user: { name: "Ahmed Sherif", avatar: "/assets/review/review1.avif" },
        rating: 5,
        comment: "Very comfortable for my child. He wears it all the time!",
        date: "2025-03-08",
      },
      {
        id: 2,
        user: { name: "Lina Elham", avatar: "/assets/review/review2.avif" },
        rating: 4,
        comment: "Nice quality, but a little too big for my 5-year-old.",
        date: "2025-03-09",
      },
      {
        id: 3,
        user: { name: "Sarah Ali", avatar: "/assets/review/review3.avif" },
        rating: 5,
        comment: "Love the design and fabric. Perfect for active kids!",
        date: "2025-03-10",
      },
    ],
  },
  {
    id: 20,
    name: "Durable Play Pants",
    tagline: "Built for Movement – Designed for Comfort.",
    rating: 4.7,
    reviewCount: 300,
    price: "299",
    description:
      "Resilient and stretchable children’s pants, ideal for rough play and all-day wear. Comes in fun colors and a relaxed fit.",
    photos: [
      { src: "/assets/Products/Kids/pants1.jpg" },
      { src: "/assets/Products/Kids/pants2.jpg" },
      { src: "/assets/Products/Kids/pants3.jpg" },
      { src: "/assets/Products/Kids/pants4.jpg" },
    ],
    colors: [
      { name: "Blue", hex: "bg-blue-500", ring: "ring-blue-500" },
      { name: "Red", hex: "bg-red-500", ring: "ring-red-500" },
    ],
    reviews: [
      {
        id: 1,
        user: { name: "Ali Ahmed", avatar: "/assets/review/review1.avif" },
        rating: 5,
        comment: "Perfect for my son. He loves the fit and comfort.",
        date: "2025-03-08",
      },
      {
        id: 2,
        user: { name: "Mira Fawzy", avatar: "/assets/review/review2.avif" },
        rating: 4,
        comment: "Good pants but could use more size options.",
        date: "2025-03-09",
      },
      {
        id: 3,
        user: { name: "Huda Salem", avatar: "/assets/review/review3.avif" },
        rating: 5,
        comment: "Very durable and stretchy. Great for active kids.",
        date: "2025-03-10",
      },
    ],
  },
  {
    id: 21,
    name: "Comfy Kids Crocs",
    tagline: "Slip On and Go – Fun for Indoors & Outdoors.",
    rating: 4.2,
    reviewCount: 90,
    price: "50",
    description:
      "Lightweight and cushioned crocs made for all-day comfort. Perfect for pool days, playtime, or quick errands.",
    photos: [
      { src: "/assets/Products/Kids/crocs1.jpg" },
      { src: "/assets/Products/Kids/crocs2.jpg" },
      { src: "/assets/Products/Kids/crocs3.jpg" },
    ],
    colors: [
      { name: "Pink", hex: "bg-pink-500", ring: "ring-pink-500" },
      { name: "Blue", hex: "bg-blue-500", ring: "ring-blue-500" },
    ],
    reviews: [
      {
        id: 1,
        user: { name: "Lina Elham", avatar: "/assets/review/review1.avif" },
        rating: 5,
        comment: "Super comfy for my daughter. She loves them!",
        date: "2025-03-08",
      },
      {
        id: 2,
        user: { name: "Huda Salem", avatar: "/assets/review/review2.avif" },
        rating: 4,
        comment: "Nice crocs, but the color was a bit lighter than expected.",
        date: "2025-03-09",
      },
      {
        id: 3,
        user: { name: "Mira Fawzy", avatar: "/assets/review/review3.avif" },
        rating: 5,
        comment: "These crocs are the perfect fit for my son!",
        date: "2025-03-10",
      },
    ],
  },
  {
    id: 22,
    name: "Kids' Cargo Shorts",
    tagline: "Pockets & Play – Classic Summer Staple.",
    rating: 4.4,
    reviewCount: 200,
    price: "50",
    description:
      "Utility-style cargo shorts with multiple pockets and breathable fabric for ultimate freedom of movement.",
    photos: [
      { src: "/assets/Products/Kids/shorts1.jpg" },
      { src: "/assets/Products/Kids/shorts2.jpg" },
    ],
    colors: [
      { name: "Khaki", hex: "bg-green-500", ring: "ring-green-500" },
      { name: "Blue", hex: "bg-blue-500", ring: "ring-blue-500" },
    ],
    reviews: [
      {
        id: 1,
        user: { name: "Ahmed Sherif", avatar: "/assets/review/review1.avif" },
        rating: 5,
        comment: "Comfortable and stylish for my son!",
        date: "2025-03-08",
      },
      {
        id: 2,
        user: { name: "Sarah Ali", avatar: "/assets/review/review2.avif" },
        rating: 4,
        comment: "Great for the summer, but could use more color options.",
        date: "2025-03-09",
      },
      {
        id: 3,
        user: { name: "John Doe", avatar: "/assets/review/review3.avif" },
        rating: 5,
        comment: "Perfect for active kids who need room to move!",
        date: "2025-03-10",
      },
    ],
  },
];

localStorage.setItem("productsmen", JSON.stringify(productsmen));
localStorage.setItem("productswomen", JSON.stringify(productswomen));
localStorage.setItem("productschildren", JSON.stringify(productschildren));

const allProducts = [...productsmen, ...productswomen, ...productschildren];

export default function ShopPage() {
  const [selectedProducts, setSelectedProducts] = useState(allProducts);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("");
  const [message, setMessage] = useState("");
  const [hoveredProduct, setHoveredProduct] = useState(null);
  const [imageIndex, setImageIndex] = useState({});
  const [activeCategory, setActiveCategory] = useState("all");
  const [isGridView, setIsGridView] = useState(true);
  const { wishlist, toggleWishlist } = useWishlist();

  const navigate = useNavigate();

  const showMessage = (text) => {
    setMessage(text);
    setTimeout(() => setMessage(""), 2000);
  };

  const handleSort = (e) => {
    const value = e.target.value;
    setSortBy(value);
    const sorted = [...selectedProducts];

    if (value === "low-to-high") sorted.sort((a, b) => a.price - b.price);
    else if (value === "high-to-low") sorted.sort((a, b) => b.price - a.price);

    setSelectedProducts(sorted);
  };

  const handleCategoryChange = (category) => {
    setActiveCategory(category);
    if (category === "men") setSelectedProducts(productsmen);
    else if (category === "women") setSelectedProducts(productswomen);
    else if (category === "kids") setSelectedProducts(productschildren);
    else setSelectedProducts(allProducts);
  };

  const handleImageChange = (productId, direction) => {
    setImageIndex((prev) => {
      const current = prev[productId] || 0;
      const product = selectedProducts.find((p) => p.id === productId);
      const total = product?.photos.length || 1;
      const newIndex = (current + direction + total) % total;
      return { ...prev, [productId]: newIndex };
    });
  };

  const filteredProducts = selectedProducts.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const categoryList = ["men", "women", "kids", "all"];

  return (
    <div className="w-full min-h-screen bg-bg_clr text-t_clr relative font-paragraph [&_h1]:font-header [&_h2]:font-header [&_h3]:font-header [&_h4]:font-header [&_h5]:font-header [&_h6]:font-header">
      <header className="flex justify-between items-center border-b pb-2 mb-4 p-4">
        <h1 className="text-3xl font-bold font-header">Shop</h1>
      </header>

      {message && (
        <div className="fixed top-[40px] left-1/2 transform -translate-x-1/2 bg-[#976c60] text-white font-semibold px-6 py-3 rounded shadow-lg z-[9999] w-max">
          {message}
        </div>
      )}

      <div className="flex justify-between items-center mb-4 px-4">
        <input
          type="text"
          placeholder="Search products..."
          className="p-2 border rounded w-1/4 text-t_clr bg-white"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <div className="flex space-x-2">
          {categoryList.map((category) => (
            <button
              key={category}
              onClick={() => handleCategoryChange(category)}
              className={`px-4 py-2 font-semibold rounded cursor-pointer ${
                activeCategory === category
                  ? "bg-cn_clr text-white dark:text-gray-400"
                  : "bg-bg_clr text-t_clr hover:bg-cn_clr"
              }`}>
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </button>
          ))}
        </div>

        <div className="flex items-center space-x-2">
          <select
            className="p-2 border rounded text-t_clr bg-white cursor-pointer"
            value={sortBy}
            onChange={handleSort}>
            <option className="bg-bg_clr" value="">
              Sort By
            </option>
            <option className="bg-bg_clr" value="low-to-high">
              Price: Low to High
            </option>
            <option className="bg-bg_clr" value="high-to-low">
              Price: High to Low
            </option>
          </select>

          <button
            className="p-2 border rounded text-t_clr bg-white hover:bg-cn_clr flex items-center space-x-2 cursor-pointer"
            onClick={() => setIsGridView(!isGridView)}>
            {isGridView ? (
              <>
                <List className="w-5 h-5" />
                <span>List View</span>
              </>
            ) : (
              <>
                <LayoutGrid className="w-5 h-5" />
                <span>Grid View</span>
              </>
            )}
          </button>
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={isGridView ? "grid" : "list"}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.4 }}
          className={`${
            isGridView ? "grid grid-cols-4" : "flex flex-col"
          } gap-4 p-4`}>
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <div
                key={product.id}
                className={`cursor-pointer text-center bg-cn_clr p-4 rounded min-h-[400px] transition-transform duration-300 transform hover:scale-105 hover:shadow-lg relative ${
                  isGridView ? "" : "flex items-center gap-4"
                }`}
                onClick={() => {
                  window.scrollTo(0, 100);
                  navigate("/product/" + product.id);
                }}
                onMouseEnter={() => setHoveredProduct(product.id)}
                onMouseLeave={() => setHoveredProduct(null)}>
                <div
                  className={`${
                    isGridView ? "w-full h-64" : "w-64 h-64"
                  } overflow-hidden relative`}>
                  <img
                    src={
                      product.photos[imageIndex[product.id] || 0]?.src ||
                      "default.jpg"
                    }
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                  {hoveredProduct === product.id &&
                    product.photos.length > 1 && (
                      <>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleImageChange(product.id, -1);
                          }}
                          className="cursor-pointer absolute left-2 top-1/2 transform -translate-y-1/2 bg-bg_clr bg-opacity-50 hover:bg-opacity-100 text-[#976c60] dark:text-black p-1 px-3 rounded-full hover:bg-cn_clr">
                          ◀
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleImageChange(product.id, 1);
                          }}
                          className="cursor-pointer absolute right-2 top-1/2 transform -translate-y-1/2 bg-bg_clr bg-opacity-50 hover:bg-opacity-100 text-[#976c60] dark:text-black p-1 px-3 rounded-full hover:bg-cn_clr">
                          ▶
                        </button>
                      </>
                    )}
                </div>

                <div
                  className={`${
                    isGridView ? "" : "flex flex-col items-start"
                  } ml-4`}>
                  <h2 className="text-lg font-semibold mt-2 font-header">
                    {product.name}
                  </h2>
                  <p className="text-t_clr">${product.price}</p>
                  {!isGridView && (
                    <p className="text-xl text-t_clr ml-28 mt-1">
                      {product.description}
                    </p>
                  )}

                  <div className="flex justify-center gap-2 mt-2">
                    <button
                      className="w-1/2 bg-bg_clr flex justify-center items-center p-2 hover:bg-cn_clr cursor-pointer"
                      onClick={(e) => {
                        e.stopPropagation();
                        window.scrollTo(0, 100);
                        navigate("/product/" + product.id);
                      }}>
                      <img
                        src="/src/assets/cart.png"
                        alt="Cart"
                        className="w-6 h-6"
                      />
                    </button>
                    <button
                      className="w-1/2 bg-bg_clr flex justify-center items-center p-2 hover:bg-cn_clr cursor-pointer"
                      onClick={(e) => {
                        e.stopPropagation();
                        const isInWishlist = wishlist.some(
                          (item) => item.id === product.id
                        );
                        toggleWishlist(product);
                        showMessage(
                          isInWishlist
                            ? "Item Removed From Wishlist!"
                            : "Item Added To Wishlist Successfully!"
                        );
                      }}>
                      <img
                        src={
                          wishlist.some((item) => item.id === product.id)
                            ? "/src/assets/RemoveWishlist.png"
                            : "/src/assets/wishlist.png"
                        }
                        alt="wishlist"
                        className="w-6 h-6"
                      />
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center col-span-4 text-t_clr text-2xl font-semibold">
              No products found.
            </p>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
