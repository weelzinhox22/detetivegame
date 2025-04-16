
import { motion } from "framer-motion";
import { User, UserCircle2 } from "lucide-react";

interface DialogLine {
  speaker: string;
  text: string;
  isInvestigator?: boolean;
}

interface InterrogationTranscriptProps {
  title: string;
  date?: string;
  dialogLines: DialogLine[];
}

export default function InterrogationTranscript({ title, date, dialogLines }: InterrogationTranscriptProps) {
  return (
    <div className="space-y-4">
      <div className="flex flex-col items-start">
        <h2 className="file-heading">Transcrição do Interrogatório</h2>
        <h3 className="file-subheading">{title}</h3>
        {date && <span className="text-xs text-gray-600">{date}</span>}
      </div>
      
      <div className="space-y-4 my-6">
        {dialogLines.map((line, index) => (
          <motion.div
            key={index}
            className={`flex space-x-3 ${line.isInvestigator ? 'justify-start' : 'justify-start'}`}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
          >
            <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
              line.isInvestigator ? 'bg-crime-police' : 'bg-gray-700'
            }`}>
              {line.isInvestigator ? 
                <User size={16} className="text-white" /> : 
                <UserCircle2 size={16} className="text-white" />
              }
            </div>
            
            <div className={`bg-noir-light p-3 rounded-lg max-w-[85%] ${
              line.isInvestigator ? 'bg-opacity-70' : 'bg-opacity-40'
            }`}>
              <div className="text-xs text-gray-400 mb-1">{line.speaker}</div>
              <p className="text-sm">{line.text}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
