import React, { useState } from 'react';

// Array of image sources and alt text
const galleryImages = [
  { src: "/assets/image/Rectangle 65.jpg", alt: "Swamp deer in the tall grass of Dudhwa" },
  { src: "/assets/image/Rectangle 67.jpg", alt: "Dense forest canopy in Dudhwa Tiger Reserve" },
  { src: "/assets/image/Rectangle 68.jpg", alt: "A tiger resting near a water body" },
  { src: "/assets/image/Rectangle 69.jpg", alt: "Morning mist over a river in the park" },
  { src: "/assets/image/Rectangle 70.jpg", alt: "A close-up of a rhinoceros grazing" },
  { src: "/assets/image/Rectangle 71.jpg", alt: "A bird flying over a jungle stream" },
  { src: "/assets/image/Rectangle 72.jpg", alt: "Jeep safari on a dusty track" },
  { src: "/assets/image/Rectangle 66.jpg", alt: "A wide shot of grasslands at sunset" },
];

export default function GallerySection() {
  // State to hold the currently selected image object or null if the modal is closed
  const [selectedImage, setSelectedImage] = useState(null);

  // Function to handle image click and open the modal
  const openModal = (image) => {
    setSelectedImage(image);
  };

  // Function to navigate to the next image
  const goToNext = () => {
    if (!selectedImage) return;
    const currentIndex = galleryImages.findIndex(img => img.src === selectedImage.src);
    const nextIndex = (currentIndex + 1) % galleryImages.length;
    setSelectedImage(galleryImages[nextIndex]);
  };

  // Function to navigate to the previous image
  const goToPrev = () => {
    if (!selectedImage) return;
    const currentIndex = galleryImages.findIndex(img => img.src === selectedImage.src);
    const prevIndex = (currentIndex - 1 + galleryImages.length) % galleryImages.length;
    setSelectedImage(galleryImages[prevIndex]);
  };

  // Component for the full-screen lightbox modal
  const ImageModal = () => {
    if (!selectedImage) return null;

    // We use inline styles for the fixed/full-screen overlay since this style
    // needs to override the surrounding component boundaries.
    return (
      <div 
        className="lightbox-overlay" 
        style={{
          position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.95)', zIndex: 9999, // High zIndex to ensure it's on top
          display: 'flex', justifyContent: 'center', alignItems: 'center',
          flexDirection: 'column', padding: '20px'
        }}
        // Close modal on overlay click (but not on image content)
        onClick={() => setSelectedImage(null)}
      >
        {/* Close Button */}
        <button 
          onClick={(e) => { e.stopPropagation(); setSelectedImage(null); }} 
          className="lightbox-close-btn"
          style={{
            position: 'absolute', top: '20px', right: '30px', 
            fontSize: '40px', color: '#fff', background: 'none', border: 'none', 
            cursor: 'pointer', lineHeight: '1', padding: '10px', fontWeight: '100'
          }}
          aria-label="Close"
        >
          &times;
        </button>

        {/* Prev Button */}
        <button 
          onClick={(e) => { e.stopPropagation(); goToPrev(); }} 
          className="lightbox-nav-btn prev"
          style={{ 
            position: 'absolute', left: '20px', color: '#fff', fontSize: '50px', 
            background: 'none', border: 'none', cursor: 'pointer', padding: '10px', 
            top: '50%', transform: 'translateY(-50%)', opacity: 0.8 
          }}
          aria-label="Previous Image"
        >
          &#10094;
        </button>

        {/* Image Container */}
        <div 
          className="lightbox-content" 
          style={{ maxWidth: '90%', maxHeight: '90%' }}
          onClick={(e) => e.stopPropagation()} // Prevent closing when clicking the image/caption
        >
          <img 
            src={selectedImage.src} 
            alt={selectedImage.alt} 
            style={{ 
              maxWidth: '100%', maxHeight: '80vh', 
              display: 'block', margin: 'auto', 
              borderRadius: '12px', boxShadow: '0 0 40px rgba(0,0,0,0.8)',
              objectFit: 'contain'
            }}
          />
          <p 
            style={{ 
              color: '#fff', textAlign: 'center', marginTop: '15px', 
              fontSize: '18px', padding: '0 20px', maxWidth: '800px', margin: '15px auto 0 auto'
            }}
          >
            {selectedImage.alt}
          </p>
        </div>

        {/* Next Button */}
        <button 
          onClick={(e) => { e.stopPropagation(); goToNext(); }} 
          className="lightbox-nav-btn next"
          style={{ 
            position: 'absolute', right: '20px', color: '#fff', fontSize: '50px', 
            background: 'none', border: 'none', cursor: 'pointer', padding: '10px', 
            top: '50%', transform: 'translateY(-50%)', opacity: 0.8 
          }}
          aria-label="Next Image"
        >
          &#10095;
        </button>
      </div>
    );
  };

  return (
    <section>
      <div className="gallery-block">
        <div className="container">
          <div className="gallery-inner">
            <h1>Glimpses of Dudhwa</h1>

            <div className="gallery">
              {galleryImages.map((image, index) => (
                <img 
                  key={index} 
                  src={image.src} 
                  alt={image.alt} 
                  // Add click handler to open the modal
                  onClick={() => openModal(image)} 
                  // Placeholder for missing images
                  onError={(e) => { e.target.onerror = null; e.target.src = `https://placehold.co/400x300/e6e6e6/333333?text=Photo+${index + 1}`; }} 
                />
              ))}
            </div>
          </div>
        </div>
      </div>
      
      {/* Render the modal if an image is selected */}
      <ImageModal />
    </section>
  );
}
