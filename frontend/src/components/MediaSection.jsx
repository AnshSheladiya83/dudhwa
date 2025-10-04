import React from 'react';

const mediaData = [
  { 
    name: "Facebook", 
    image: "../../public/assets/image/Rectangle 77.jpg", 
    colorClass: "facebook", // Simplified to name only
    iconClass: "fa-brands fa-facebook-f",
    isVideo: false
  },
  { 
    name: "Instagram", 
    image: "../../public/assets/image/Rectangle 77-1.jpg", 
    colorClass: "instagram", // Simplified to name only
    iconClass: "fa-brands fa-instagram",
    isVideo: false
  },
  { 
    name: "Youtube", 
    image: "../../public/assets/image/Rectangle 77-2.jpg", 
    colorClass: "youtube", // Simplified to name only
    iconClass: "fa-brands fa-youtube",
    isVideo: true 
  },
];

export default function MediaSection() {
  const placeholderImage = (text) => `https://placehold.co/400x300/4a4e69/ffffff?text=${text}`;

  return (
    <section className="media-section">
      <div className="container">
        <h2 className="heading_bold text-center mb-5">Social Media Gallery</h2>
        <div className="row g-4 justify-content-center">

          {mediaData.map((media, index) => (
            <div className="col-md-4 col-sm-6" key={index}>
              <div className="media-box">
                {/* Dynamically constructing the CSS class: media-facebook, media-instagram, etc. */}
                <h5 className={`media-title media-${media.colorClass}`}>{media.name}</h5>
                
                {media.isVideo ? (
                  <div className="media-video">
                    <img 
                      src={media.image} 
                      alt={media.name} 
                      className="media-image"
                      onError={(e) => { e.target.onerror = null; e.target.src = placeholderImage(media.name); }}
                    />
                    <a href="#" className="media-play" aria-label={`View ${media.name} video`}>
                      {/* Font Awesome icon for play button */}
                      <i className={media.iconClass}></i>
                    </a>
                  </div>
                ) : (
                  <img 
                    src={media.image} 
                    alt={media.name} 
                    className="media-image"
                    onError={(e) => { e.target.onerror = null; e.target.src = placeholderImage(media.name); }}
                  />
                )}
                
              </div>
            </div>
          ))}

        </div>
      </div>
    </section>
  );
}
