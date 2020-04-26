import React from 'react';
import Slider from 'react-slick';

function PostImageSlider(props){

  // settings for slider
  const imageSettings = {
    dots: true,
    infinite: true,
    fade: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  // ATTENTION - REMOVE "height/width" FOR CSS STYLING LATER
  return (
    <div className="post-img-slideshow-container">
      <Slider {...imageSettings}>
        {props.post.photoURLs.map((photoURL, i) => (
          <div key={`post-${props.post.id}-photo-${i}`}>
            <img
              className="feed-item-img"
              width="400px"
              height="auto"
              src={photoURL}
            ></img>
          </div>
        ))}
      </Slider>
    </div>
  )

}

export default PostImageSlider;
