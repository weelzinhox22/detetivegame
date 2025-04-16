
import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, HelpCircle } from "lucide-react";

interface InvestigationPathProps {
  options: {
    id: string;
    title: string;
    description: string;
  }[];
  onSelect: (option: string) => void;
}

export default function InvestigationPath({ options, onSelect }: InvestigationPathProps) {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  
  const handleSelect = (id: string) => {
    setSelectedId(id);
    
    // Add a delay to show the selection before proceeding
    setTimeout(() => {
      onSelect(id);
    }, 800);
  };
  
  return (
    <div className="space-y-4">
      <h3 className="file-subheading">Escolha um caminho para investigar:</h3>
      
      <div className="space-y-3">
        {options.map((option) => (
          <motion.div
            key={option.id}
            className={`paper-bg p-3 rounded border-2 cursor-pointer ${
              selectedId === option.id 
                ? 'border-crime-clue' 
                : selectedId 
                  ? 'border-transparent opacity-50' 
                  : 'border-transparent hover:border-gray-300'
            }`}
            whileHover={!selectedId ? { scale: 1.02 } : {}}
            whileTap={!selectedId ? { scale: 0.98 } : {}}
            onClick={() => !selectedId && handleSelect(option.id)}
          >
            <div className="flex justify-between items-start">
              <div>
                <h4 className="font-detective text-noir-dark">{option.title}</h4>
                <p className="text-sm text-noir-medium mt-1">{option.description}</p>
              </div>
              {selectedId === option.id && (
                <ArrowRight className="text-crime-clue" />
              )}
            </div>
          </motion.div>
        ))}
      </div>
      
      <div className="text-center text-xs text-gray-400 flex items-center justify-center mt-6">
        <HelpCircle size={14} className="mr-1" />
        <span>Sua escolha determinará o rumo da investigação</span>
      </div>
    </div>
  );
}
