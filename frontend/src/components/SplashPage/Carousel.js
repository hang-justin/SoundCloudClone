import { useState } from "react";
import { useEffect } from "react";

const Carousel = () => {
  const slideImages = [
    'https://a-v2.sndcdn.com/assets/images/sc_landing_header_web_c-318d7eed.jpg',
    'https://a-v2.sndcdn.com/assets/images/sc_landing_header_web_featured_artists-8081257b.jpg'
  ]

  const slides = slideImages.map((imageLink, index) => {
    // if statement to set data-active on the first element
    if (index === 0)
      return (
        <li key={`slide-image-${index + 1}`} data-active className='slide'>
          <img className='carousel-img' src={imageLink} alt={`Splash Image ${index + 1}`} />
        </li>
      )

    else
      return (
        <li key={`slide-image-${index + 1}`} className='slide'>
          <img className='carousel-img' src={imageLink} alt={`Splash Image ${index + 1}`} />
        </li>
      )
  });

  const setActiveSlide = e => {
    if (e.target.dataset?.active === 'true') return;

    let newSlideIndex = e.target.dataset.slideId;

    let slideElements = document.querySelector('[data-slides]');
    let currentSlide = slideElements.querySelector('[data-active]');
    let slideArray = [...slideElements.children];

    let buttonElements = document.querySelector('.carousel-button-nav')
    let activeButton = buttonElements.querySelector('[data-active]')

    slideArray[newSlideIndex].dataset.active = true;
    delete currentSlide.dataset.active;

    e.target.dataset.active = true;

    if (activeButton?.dataset.active) {
      delete activeButton.dataset.active;
    }
  }
  const slideButtons = slideImages.map((_imageLink, index) => {
    if (index === 0)
      return (
        <button onClick={setActiveSlide} className='slide-button' key={`slide-${index}`} data-active data-slide-id={index}></button>
      )

    else
      return (
        <button onClick={setActiveSlide} className='slide-button' key={`slide-${index}`} data-slide-id={index}></button>
      )
  })

  // useEffect to turn on carousel
  useEffect(() => {
    let slideTimer = setInterval(() => {
      let slideElements = document.querySelector('[data-slides]');
      let slideBtns = document.querySelector('.carousel-button-nav');

      let currentSlide = slideElements.querySelector('[data-active]');

      let slideArray = [...slideElements.children];
      let slideBtnsArray = [...slideBtns.children];

      let currentSlideIndex = slideArray.indexOf(currentSlide);
      let newSlideIndex = currentSlideIndex + 1;

      if (newSlideIndex >= slideArray.length) newSlideIndex = 0;

      slideArray[newSlideIndex].dataset.active = true;
      delete currentSlide.dataset.active;

      slideBtnsArray[newSlideIndex].dataset.active = true;

      if (slideBtnsArray[currentSlideIndex].dataset.active) {
        delete slideBtnsArray[currentSlideIndex].dataset.active;
      };

    }, 4000)

    return (() => clearInterval(slideTimer));
  }, [])

  return (
    <div className='carousel-container flx-col'>

      <div className='carousel flx-row'>
        <ul data-slides>
          {slides}
        </ul>
      </div>

      <div className='carousel-button-nav flx-row'>
        {slideButtons}
      </div>


    </div>
  )
}

export default Carousel;
