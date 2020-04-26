import React from 'react';
import Slider from 'react-slick';

import "./post_image_slider.css"

function PostImageSlider(props){

  // settings for slider
  const imageSettings = {
    dots: true,
    appendDots: dots => (
        <div>
          <ul style={{ margin: "50px" }}> {dots} </ul>
        </div>
      ),
    infinite: true,
    fade: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  // ATTENTION - REMOVE "height/width" FOR CSS STYLING LATER
  // done?
  return (
    <div className="post-img-slideshow-container">
      <Slider {...imageSettings}>
        {props.post.photoURLs.map((photoURL, i) => (
          <div key={`post-${props.post.id}-photo-${i}`}>
            <img
              className="feed-item-img"
              src={photoURL}
            ></img>
          </div>
        ))}
      </Slider>
    </div>
  )

}

export default PostImageSlider;
