
import { gsap } from "gsap";
import { useEffect, useRef } from "react";

// Typewriter effect
export const useTypewriterEffect = (text: string, speed: number = 50) => {
  const elementRef = useRef<HTMLDivElement>(null);
  const textRef = useRef("");
  const indexRef = useRef(0);
  
  useEffect(() => {
    if (!elementRef.current) return;
    
    // Reset on text change
    indexRef.current = 0;
    textRef.current = "";
    
    const typeNextChar = () => {
      if (indexRef.current < text.length) {
        textRef.current += text.charAt(indexRef.current);
        if (elementRef.current) {
          elementRef.current.textContent = textRef.current;
        }
        indexRef.current++;
        setTimeout(typeNextChar, speed);
      }
    };
    
    typeNextChar();
  }, [text, speed]);
  
  return elementRef;
};

// Paper animation (old paper effect)
export const usePaperAnimation = () => {
  const elementRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (!elementRef.current) return;
    
    const element = elementRef.current;
    
    const handleMouseMove = (e: MouseEvent) => {
      const rect = element.getBoundingClientRect();
      const x = e.clientX - rect.left; // x position within the element
      const y = e.clientY - rect.top;  // y position within the element
      
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      const rotateX = (y - centerY) / 50;
      const rotateY = (centerX - x) / 50;
      
      gsap.to(element, {
        rotationX: rotateX,
        rotationY: rotateY,
        duration: 0.5,
        ease: "power2.out",
      });
    };
    
    const handleMouseLeave = () => {
      gsap.to(element, {
        rotationX: 0,
        rotationY: 0,
        duration: 0.5,
        ease: "power2.out",
      });
    };
    
    element.addEventListener("mousemove", handleMouseMove);
    element.addEventListener("mouseleave", handleMouseLeave);
    
    return () => {
      element.removeEventListener("mousemove", handleMouseMove);
      element.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);
  
  return elementRef;
};

// Magnifying glass effect
export interface MagnifyingGlassProps {
  children: React.ReactNode;
  zoom?: number;
}

export function MagnifyingGlass({ children, zoom = 1.5 }: MagnifyingGlassProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const glassRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const container = containerRef.current;
    const glass = glassRef.current;
    
    if (!container || !glass) return;
    
    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      // Position the magnifying glass
      gsap.to(glass, {
        left: x,
        top: y,
        duration: 0.1,
        ease: "power1.out",
      });
      
      // Update the background position
      const bgPosX = -x * (zoom - 1);
      const bgPosY = -y * (zoom - 1);
      glass.style.backgroundPosition = `${bgPosX}px ${bgPosY}px`;
    };
    
    const handleMouseEnter = () => {
      glass.style.display = "block";
    };
    
    const handleMouseLeave = () => {
      glass.style.display = "none";
    };
    
    container.addEventListener("mouseenter", handleMouseEnter);
    container.addEventListener("mousemove", handleMouseMove);
    container.addEventListener("mouseleave", handleMouseLeave);
    
    return () => {
      container.removeEventListener("mouseenter", handleMouseEnter);
      container.removeEventListener("mousemove", handleMouseMove);
      container.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [zoom]);
  
  return (
    <div 
      ref={containerRef} 
      className="relative overflow-hidden"
      style={{ cursor: "none" }}
    >
      {children}
      <div
        ref={glassRef}
        className="absolute pointer-events-none hidden w-16 h-16 border-2 border-crime-clue rounded-full"
        style={{
          backgroundImage: `url(${containerRef.current?.firstChild instanceof HTMLImageElement ? containerRef.current.firstChild.src : ''})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: `${zoom * 100}%`,
          transform: "translate(-50%, -50%)",
          boxShadow: "0 0 10px rgba(0, 0, 0, 0.5)",
        }}
      />
    </div>
  );
}
