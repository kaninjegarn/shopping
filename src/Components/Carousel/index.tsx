import React, { ReactNode, useRef, useState } from 'react';
import styled from 'styled-components';

interface CarouselProps {
  children: ReactNode[];
}

const CarouselContainer = styled.div`
  display: flex;
  overflow-x: hidden;
  position: relative;
  width: 100%;
  max-width: 100vw;
  cursor: grab;
`;

const CarouselWrapper = styled.div`
  display: flex;
  transition: transform 0.5s ease;
`;

// min-width: 100%;
const CarouselItem = styled.div`
  flex: 0 0 auto;
  padding: 5px;
  box-sizing: border-box;
`;

const CarouselButton = styled.button`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  font-size: 2rem;
  cursor: pointer;
  color: #333;
  transition: color 0.3s ease;

  &:hover {
    color: #555;
  }

  &:disabled {
    color: #ccc;
    cursor: not-allowed;
  }
`;

const PrevButton = styled(CarouselButton)`
  left: 10px;
`;

const NextButton = styled(CarouselButton)`
  right: 10px;
`;

const Carousel: React.FC<CarouselProps> = ({ children }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startPosition, setStartPosition] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  const handleMouseDown = (e: React.MouseEvent) => {
    if (containerRef.current) {
      setIsDragging(true);
      setStartPosition(e.pageX - containerRef.current.offsetLeft);
      setScrollLeft(containerRef.current.scrollLeft);
      containerRef.current.style.cursor = 'grabbing';
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !containerRef.current) return;
    const x = e.pageX - containerRef.current.offsetLeft;
    const walk = (x - startPosition) * 1.5; // Adjust scrolling sensitivity
    containerRef.current.scrollLeft = scrollLeft - walk;
  };

  const handleMouseUpOrLeave = () => {
    setIsDragging(false);
    if (containerRef.current) {
      containerRef.current.style.cursor = 'grab';
    }
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    if (containerRef.current) {
      setIsDragging(true);
      setStartPosition(e.touches[0].pageX - containerRef.current.offsetLeft);
      setScrollLeft(containerRef.current.scrollLeft);
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging || !containerRef.current) return;
    const x = e.touches[0].pageX - containerRef.current.offsetLeft;
    const walk = (x - startPosition) * 1.5; // Adjust scrolling sensitivity
    containerRef.current.scrollLeft = scrollLeft - walk;
  };

  return (
    <div style={{ position: 'relative', overflow: 'hidden' }}>
      <CarouselContainer
        ref={containerRef}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUpOrLeave}
        onMouseLeave={handleMouseUpOrLeave}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleMouseUpOrLeave}
      >
        <CarouselWrapper>
          {React.Children.map(children, (child, index) => (
            <CarouselItem key={index}>{child}</CarouselItem>
          ))}
        </CarouselWrapper>
      </CarouselContainer>
      <PrevButton onClick={() => containerRef.current?.scrollBy({ left: -containerRef.current.clientWidth, behavior: 'smooth' })}>‹</PrevButton>
      <NextButton onClick={() => containerRef.current?.scrollBy({ left: containerRef.current.clientWidth, behavior: 'smooth' })}>›</NextButton>
    </div>
  );
};

export default Carousel;
