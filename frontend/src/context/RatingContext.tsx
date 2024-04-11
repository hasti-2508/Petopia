import React, { createContext, useContext, useState } from "react";

// Define a context for managing ratings
const RatingContext = createContext({
    rating: 0,
    updateRating: (newRating: number) => {}
});

// Custom hook to consume the rating context
// export const useRating = () => useContext(RatingContext);

// Provider component to wrap your application
export const RatingProvider = ({ children }) => {
  const [rating, setRating] = useState(0); // Initial rating state

  // Function to update the rating
  const updateRating = (newRating) => {
    setRating(newRating);
  };

  return (
    <RatingContext.Provider value={{ rating, updateRating }}>
      {children}
    </RatingContext.Provider>
  );
};
