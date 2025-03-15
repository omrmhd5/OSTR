const StarRating = ({ rating, totalStars = 5, size = "text-xl" }) => {
  return (
    <div className="flex gap-1 text-yellow-400">
      {[...Array(totalStars)].map((_, index) => {
        const starValue = index + 1;
        return (
          <i
            key={index}
            className={`fa-solid ${size} ${
              rating >= starValue
                ? "fa-star"
                : rating >= starValue - 0.5
                ? "fa-star-half-alt"
                : "fa-star text-gray-300"
            }`}></i>
        );
      })}
    </div>
  );
};

export default StarRating;
