
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, AlertTriangle } from "lucide-react";

interface Suspect {
  id: string;
  name: string;
  image?: string;
}

interface AccusationFormProps {
  suspects: Suspect[];
  onAccuse: (suspectId: string) => void;
}

export default function AccusationForm({ suspects, onAccuse }: AccusationFormProps) {
  const [selectedSuspect, setSelectedSuspect] = useState<string | null>(null);
  const [isConfirming, setIsConfirming] = useState(false);
  
  const handleSuspectSelect = (id: string) => {
    setSelectedSuspect(id);
  };
  
  const handleConfirm = () => {
    setIsConfirming(true);
  };
  
  const handleAccuse = () => {
    if (selectedSuspect) {
      onAccuse(selectedSuspect);
    }
  };
  
  const handleCancel = () => {
    setIsConfirming(false);
  };
  
  return (
    <div className="space-y-4">
      <h2 className="file-heading">Acusação Final</h2>
      
      <div className="crime-tape paper-bg p-4 rounded-lg mt-6">
        <h3 className="font-detective text-lg text-noir-dark mt-4">Quem é o culpado?</h3>
        <p className="text-sm text-noir-medium mb-4">
          Escolha cuidadosamente o suspeito que você acredita ser o culpado. 
          Esta decisão é final e determinará o resultado da sua investigação.
        </p>
        
        <div className="grid grid-cols-2 gap-3 my-4">
          {suspects.map((suspect) => (
            <motion.div
              key={suspect.id}
              className={`paper-bg rounded-lg overflow-hidden border-2 cursor-pointer ${
                selectedSuspect === suspect.id ? 'border-crime-blood' : 'border-transparent'
              }`}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => handleSuspectSelect(suspect.id)}
            >
              <div className="relative">
                {suspect.image ? (
                  <img src={suspect.image} alt={suspect.name} className="w-full h-24 object-cover" />
                ) : (
                  <div className="w-full h-24 bg-gray-200"></div>
                )}
              </div>
              
              <div className="p-2 text-center">
                <h4 className="font-detective text-noir-dark">{suspect.name}</h4>
              </div>
            </motion.div>
          ))}
        </div>
        
        <motion.button
          className={`w-full py-3 rounded-lg font-detective text-white ${
            selectedSuspect ? 'bg-crime-blood' : 'bg-gray-400 cursor-not-allowed'
          }`}
          whileHover={selectedSuspect ? { scale: 1.02 } : {}}
          whileTap={selectedSuspect ? { scale: 0.98 } : {}}
          onClick={selectedSuspect ? handleConfirm : undefined}
          disabled={!selectedSuspect}
        >
          Acusar Suspeito
        </motion.button>
      </div>
      
      <AnimatePresence>
        {isConfirming && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-80 z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-noir-medium rounded-lg w-full max-w-xs"
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 50, opacity: 0 }}
            >
              <div className="p-4 text-center">
                <div className="bg-crime-blood bg-opacity-20 p-3 rounded-full inline-flex mb-4">
                  <AlertTriangle size={24} className="text-crime-blood" />
                </div>
                
                <h3 className="text-lg font-detective mb-2">Confirmar Acusação</h3>
                <p className="text-sm text-gray-300 mb-4">
                  Você tem certeza de que deseja acusar este suspeito? Esta ação é irreversível.
                </p>
                
                <div className="grid grid-cols-2 gap-3">
                  <motion.button
                    className="bg-gray-700 py-2 rounded-lg text-sm"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleCancel}
                  >
                    Cancelar
                  </motion.button>
                  
                  <motion.button
                    className="bg-crime-blood py-2 rounded-lg text-sm"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleAccuse}
                  >
                    Confirmar
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
