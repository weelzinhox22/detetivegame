
import { motion } from "framer-motion";
import { User, CheckCircle2, XCircle } from "lucide-react";

interface SuspectCardProps {
  name: string;
  relation: string;
  image?: string;
  notes?: string;
  isGuilty?: boolean;
  isCleared?: boolean;
  onClick?: () => void;
}

export default function SuspectCard({
  name,
  relation,
  image,
  notes,
  isGuilty,
  isCleared,
  onClick
}: SuspectCardProps) {
  return (
    <motion.div
      className="bg-noir-medium rounded-lg overflow-hidden hover:ring-1 hover:ring-crime-clue cursor-pointer"
      whileHover={{ y: -3 }}
      whileTap={{ y: 0 }}
      onClick={onClick}
    >
      <div className="relative">
        {image ? (
          <img src={image} alt={name} className="w-full h-32 object-cover" />
        ) : (
          <div className="w-full h-32 bg-noir-light flex items-center justify-center">
            <User size={40} className="text-gray-500" />
          </div>
        )}
        
        {isGuilty && (
          <div className="absolute top-2 right-2 bg-crime-blood text-white text-xs px-2 py-1 rounded-full flex items-center">
            <span>CULPADO</span>
          </div>
        )}
        
        {isCleared && (
          <div className="absolute top-2 right-2 bg-green-700 text-white text-xs px-2 py-1 rounded-full flex items-center">
            <span>INOCENTE</span>
          </div>
        )}
      </div>
      
      <div className="p-3">
        <h3 className="font-detective text-lg">{name}</h3>
        <p className="text-xs text-gray-400">{relation}</p>
        
        {notes && (
          <p className="text-sm text-gray-300 mt-2 line-clamp-2">{notes}</p>
        )}
        
        <div className="flex justify-end mt-2">
          {isGuilty && <XCircle size={16} className="text-crime-blood" />}
          {isCleared && <CheckCircle2 size={16} className="text-green-500" />}
        </div>
      </div>
    </motion.div>
  );
}
