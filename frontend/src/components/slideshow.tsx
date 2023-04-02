import React, { useState } from 'react';

interface Image {
  url: string;
  alt: string;
}

interface SlideshowProps {
  images: Image[];
}

export const Slideshow: React.FC<SlideshowProps> = ({ images }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const previousImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1));
  };

  const nextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));
  };

  return (
    <div className="relative">
      <img src={images[currentImageIndex].url} alt={images[currentImageIndex].alt} className="w-full" />
      <button
        onClick={previousImage}
        className="absolute top-1/2 left-0 transform -translate-y-1/2 hover:text-gray-500"
      >
        Previous
      </button>
      <button
        onClick={nextImage}
        className="absolute top-1/2 right-0 transform -translate-y-1/2 hover:text-gray-500"
      >
        Next
      </button>
    </div>
  );
};

export default Slideshow;
