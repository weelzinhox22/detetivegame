
import { motion } from "framer-motion";
import { Award, Bookmark, Share } from "lucide-react";

interface CaseConclusionProps {
  caseName: string;
  conclusion: string;
  accuracy: number;
  onRestart?: () => void;
  onShare?: () => void;
}

export default function CaseConclusion({
  caseName,
  conclusion,
  accuracy,
  onRestart,
  onShare
}: CaseConclusionProps) {
  // Calculate status based on accuracy
  const getStatus = () => {
    if (accuracy >= 90) return { label: "Detetive Mestre", color: "text-yellow-400" };
    if (accuracy >= 70) return { label: "Detetive Sênior", color: "text-blue-400" };
    if (accuracy >= 50) return { label: "Detetive Júnior", color: "text-green-400" };
    return { label: "Novato", color: "text-gray-400" };
  };
  
  const status = getStatus();
  
  return (
    <div className="space-y-6">
      <motion.div 
        className="border-b border-gray-700 pb-4"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h2 className="text-xl font-detective text-white">Caso Concluído</h2>
        <p className="text-gray-400 text-sm">{caseName}</p>
      </motion.div>
      
      <motion.div
        className="bg-noir-medium p-4 rounded-lg"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <div className="flex flex-col items-center justify-center py-4">
          <div className="w-24 h-24 rounded-full bg-crime-clue bg-opacity-20 flex items-center justify-center mb-3">
            <Award size={48} className="text-crime-clue" />
          </div>
          <h3 className="text-lg font-detective">{status.label}</h3>
          <p className={`text-sm ${status.color}`}>{accuracy}% de precisão</p>
        </div>
      </motion.div>
      
      <motion.div
        className="paper-bg p-4 rounded-lg"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <h3 className="text-lg font-detective text-noir-dark mb-3">Resolução do Caso</h3>
        <p className="text-noir-dark text-sm mb-4">{conclusion}</p>
        
        <div className="bg-noir-dark bg-opacity-10 p-3 rounded-lg">
          <p className="text-noir-dark text-sm italic">
            "A solução estava nos detalhes. João revelou conhecimento do envenenamento antes que essa informação fosse divulgada, e as câmeras foram corrompidas exatamente no horário estimado do crime."
          </p>
          <p className="text-noir-medium text-xs text-right mt-1">- Investigador-chefe</p>
        </div>
      </motion.div>
      
      <motion.div
        className="flex space-x-3"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <motion.button
          className="flex-1 bg-noir-medium py-3 flex items-center justify-center space-x-2 rounded-lg"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={onRestart}
        >
          <Bookmark size={16} />
          <span className="text-sm font-detective">Salvar Caso</span>
        </motion.button>
        
        <motion.button
          className="flex-1 bg-crime-police py-3 flex items-center justify-center space-x-2 rounded-lg"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={onShare}
        >
          <Share size={16} />
          <span className="text-sm font-detective">Compartilhar</span>
        </motion.button>
      </motion.div>
    </div>
  );
}
