
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Maximize2, Minimize2, Download, RotateCw } from "lucide-react";

interface EvidenceDetailProps {
  title: string;
  imageSrc?: string;
  content: React.ReactNode;
  notes?: string;
}

export default function EvidenceDetail({ title, imageSrc, content, notes }: EvidenceDetailProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [rotation, setRotation] = useState(0);
  
  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };
  
  const rotateImage = () => {
    setRotation((prev) => prev + 90);
  };
  
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="file-subheading">{title}</h3>
        {imageSrc && (
          <div className="flex space-x-2">
            <motion.button 
              onClick={toggleExpanded}
              whileTap={{ scale: 0.9 }}
              className="bg-noir-medium p-1 rounded"
            >
              {isExpanded ? <Minimize2 size={16} /> : <Maximize2 size={16} />}
            </motion.button>
            <motion.button 
              onClick={rotateImage}
              whileTap={{ scale: 0.9 }}
              className="bg-noir-medium p-1 rounded"
            >
              <RotateCw size={16} />
            </motion.button>
          </div>
        )}
      </div>
      
      {imageSrc && (
        <motion.div 
          className={`bg-noir-dark rounded overflow-hidden ${isExpanded ? 'fixed inset-4 z-50 flex items-center justify-center' : 'relative'}`}
          layoutId={`evidence-image-${title}`}
        >
          <motion.img 
            src={imageSrc} 
            alt={title}
            className="w-full h-auto"
            style={{ transform: `rotate(${rotation}deg)` }}
            transition={{ duration: 0.3 }}
          />
          {isExpanded && (
            <motion.button
              className="absolute top-2 right-2 bg-noir-medium p-2 rounded-full"
              onClick={toggleExpanded}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <Minimize2 size={20} />
            </motion.button>
          )}
        </motion.div>
      )}
      
      <div className="case-text">
        {content}
      </div>
      
      {notes && (
        <div className="bg-noir-light bg-opacity-10 p-3 rounded border-l-4 border-crime-clue text-sm italic">
          <p className="text-noir-dark">{notes}</p>
        </div>
      )}
    </div>
  );
}
