import React, { useState, useRef, useEffect } from 'react';
import '../assets/styles/SliderCard.css';
// import SFMap from '../assets/img/SFMap.jpg';
import MyMapComponent from './MyMapComponent';

const SliderCard = ({ places, alwaysVisibleContent, expandedContent }) => {
  let [isExpanded, setIsExpanded] = useState(false);
  // let [startY, setStartY] = useState(0);
  const initialHeight = useRef(350); // Initial card height in px
  const [currentHeight, setCurrentHeight] = useState(350);
  // const [isDragging, setIsDragging] = useState(false);
  let cardRef = useRef(null);

  useEffect(() => {
    if (isExpanded) {
      setCurrentHeight(window.innerHeight);
    } else {
      setCurrentHeight(initialHeight.current);
    }
  }, [isExpanded]);

  const toggleCard = () => {
    setIsExpanded(prevState => !prevState);
  };

  // const toggleCard = () => {
  //   setIsExpanded(!isExpanded);
  //   setCurrentHeight(isExpanded ? window.innerHeight : initialHeight.current);
  // };

  // const startDrag = (event) => {
  //   setIsDragging(true);
  //   setStartY(event.touches ? event.touches[0].clientY : event.clientY);
  //   setCurrentHeight(cardRef.current.clientHeight);
  //   document.addEventListener('mousemove', onDrag);
  //   document.addEventListener('touchmove', onDrag);
  //   document.addEventListener('mouseup', endDrag);
  //   document.addEventListener('touchend', endDrag);
  // };

  // const onDrag = (moveEvent) => {
  //   if (!isDragging) return;
  //   const clientY = moveEvent.touches ? moveEvent.touches[0].clientY : moveEvent.clientY;
  //   const deltaY = clientY - startY;

  //   // Update height based on drag direction
  //   const newHeight = Math.max(initialHeight.current, currentHeight - deltaY);
  //   setCurrentHeight(newHeight);

  //   setStartY(clientY);
  //   moveEvent.preventDefault();
  // };

  // const endDrag = () => {
  //   setIsDragging(false);
  //   document.removeEventListener('mousemove', onDrag);
  //   document.removeEventListener('touchmove', onDrag);
  //   document.removeEventListener('mouseup', endDrag);
  //   document.removeEventListener('touchend', endDrag);

  //   const threshold = 0; // You can adjust the threshold
  //   if (currentHeight > window.innerHeight - threshold) {
  //     setIsExpanded(true);
  //     setCurrentHeight(window.innerHeight);
  //   } else {
  //     setIsExpanded(false);
  //     setCurrentHeight(initialHeight.current);
  //   }
  // };

  return (
    <>
      <div className="h-screen w-screen">
        {/* <img src={SFMap} alt="SF Map background" className="h-full w-full object-cover" /> */}
        <MyMapComponent places={places} />
      </div>
      <div className="relative h-screen z-30">
        {isExpanded && <div className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"></div>}
        <div ref={cardRef} className="card fixed bottom-0 left-0 right-0 p-3 bg-white rounded-t-lg shadow-lg transition-transform" style={{ height: `${currentHeight}px` }}>
          <div className="overflow-auto h-full">
            <div className="mb-4">
              <div className="flex w-full place-items-center pb-2">
                <button className="btn w-20 h-0.5 bg-gray-300 rounded-full mx-auto" onClick={toggleCard} onMouseDown={toggleCard} onTouchStart={toggleCard}></button>
              </div>
              {alwaysVisibleContent}
            </div>
            {isExpanded && <div>{expandedContent}</div>}
          </div>
        </div>
      </div>
    </>
  );
};

export default SliderCard;
