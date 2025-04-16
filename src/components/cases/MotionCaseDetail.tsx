
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { gsap } from "gsap";

// This component demonstrates how we can use gsap for more advanced animations
export default function MotionCaseDetail() {
  const [isAnimating, setIsAnimating] = useState(false);
  
  useEffect(() => {
    // Set up a GSAP animation for the crime scene elements
    const timeline = gsap.timeline({ paused: true });
    
    // Animate crime scene elements in sequence
    timeline
      .from(".crime-scene-body", { 
        opacity: 0, 
        y: 20, 
        duration: 1,
        ease: "power2.out" 
      })
      .from(".crime-scene-chair", { 
        opacity: 0, 
        x: -15, 
        duration: 0.7,
        ease: "back.out" 
      }, "-=0.5")
      .from(".crime-scene-desk", { 
        opacity: 0, 
        y: 10, 
        duration: 0.7,
        ease: "power1.out" 
      }, "-=0.3")
      .from(".crime-scene-evidence", { 
        opacity: 0, 
        scale: 0.9, 
        stagger: 0.2,
        duration: 0.5, 
        ease: "power1.out" 
      }, "-=0.2");
    
    // Play the timeline when component mounts
    timeline.play();
    
    return () => {
      // Clean up animation on unmount
      timeline.kill();
    };
  }, []);
  
  const handleSceneClick = () => {
    setIsAnimating(true);
    
    // Create a highlight effect on the evidence
    gsap.to(".crime-scene-evidence", {
      boxShadow: "0 0 15px rgba(212, 160, 23, 0.7)",
      duration: 0.3,
      stagger: 0.1,
      yoyo: true,
      repeat: 1,
      onComplete: () => setIsAnimating(false)
    });
  };
  
  return (
    <div className="space-y-4">
      <h2 className="file-heading">Reconstruction 3D</h2>
      
      <motion.div
        className="evidence-card p-6 cursor-pointer relative min-h-[300px]"
        onClick={handleSceneClick}
        whileHover={{ scale: 1.01 }}
      >
        <div className="crime-scene-container relative">
          {/* Stylized crime scene representation */}
          <div className="crime-scene-desk absolute bottom-10 left-10 right-10 h-20 bg-evidence-folder rounded-sm"></div>
          <div className="crime-scene-chair absolute bottom-5 left-1/4 w-24 h-32 bg-gray-700 rounded-t-md"></div>
          <div className="crime-scene-body absolute bottom-20 left-1/3 w-16 h-28 bg-gray-500 rounded-full"></div>
          
          <div className="crime-scene-evidence absolute top-20 right-20 w-10 h-10 bg-white border border-gray-400 rounded-full"></div>
          <div className="crime-scene-evidence absolute bottom-30 right-30 w-8 h-12 bg-evidence-old border border-gray-400 rounded-sm"></div>
          <div className="crime-scene-evidence absolute top-40 left-20 w-6 h-6 bg-crime-clue opacity-50 rounded-full"></div>
        </div>
        
        <div className="absolute bottom-4 right-4 text-xs font-detective text-gray-600">
          * Clique para revelar evidências
        </div>
      </motion.div>
    </div>
  );
}
