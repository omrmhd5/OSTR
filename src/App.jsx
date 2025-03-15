import Home from "./home";
import ProductPage from "./ProductPage";

function App() {
  const photos = [
    { src: "src/assets/profile.jpg" },
    {
      src: "src/assets/img1.jpg",
    },
  ];
  const colors = [
    { name: "grey", hex: "bg-gray-500", ring: "ring-gray-500" },
    { name: "brown", hex: "bg-[#8b5a2b]", ring: "ring-[#8b5a2b]" },
  ];
  const reviews = [
    {
      id: 1,
      user: {
        name: "John Doe",
        avatar: "https://example.com/avatar1.jpg",
      },
      rating: 5,
      comment: "Amazing product! Highly recommended.",
      date: "2025-03-11",
    },
    {
      id: 2,
      user: {
        name: "Jane Smith",
        avatar: "https://example.com/avatar2.jpg",
      },
      rating: 4,
      comment: "Good quality, but shipping was slow.",
      date: "2025-03-10",
    },
    {
      id: 3,
      user: {
        name: "Ali Ahmed",
        avatar: "https://example.com/avatar3.jpg",
      },
      rating: 3,
      comment: "Decent, but not as expected.",
      date: "2025-03-09",
    },
    {
      id: 4,
      user: {
        name: "Sara Lee",
        avatar: "https://example.com/avatar4.jpg",
      },
      rating: 5,
      comment: "Loved it! Would buy again.",
      date: "2025-03-08",
    },
  ];
  const relatedProducts = [
    { src: "src/assets/profile.jpg" },
    {
      src: "src/assets/img1.jpg",
    },
  ];

  return (
    <>
      {
        <ProductPage
          name="Product"
          photos={photos}
          tagline="Hello"
          rating="4.2"
          reviewCount="210"
          price="110"
          colors={colors}
          description="Lorem, ipsum dolor sit amet consectetur adipisicing elit. Odit fugit
          provident voluptatem fugiat consectetur quas quos cupiditate,
          dignissimos suscipit. Reprehenderit quas corrupti ut aut debitis
          officiis unde laborum! Ea, illo!"
          reviews={reviews}
          relatedProducts={relatedProducts}
        />
      }
    </>
  );
}

export default App;
