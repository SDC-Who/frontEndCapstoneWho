import React from 'react'
import ImageCarousel from './ImageCarousel'
var ImageModal = ({ showExpandedImage, currentImage, currentProductStyle, onClose, handlePrevSlide, handleNextSlide, activeIndex }) => (
  <div>
    {showExpandedImage ? <div
      className='modalImage2'>
       <ImageCarousel
        showExpandedImage = {showExpandedImage}
        currentImage = {currentImage}
        currentProductStyle = {currentProductStyle}
        onClose = {onClose}
        handlePrevSlide = {handlePrevSlide}
        handleNextSlide = {handleNextSlide}
        activeIndex = {activeIndex}
       />

       </div>: null}


  </div>
);




export default ImageModal