import { motion } from "framer-motion";
import { Briefcase, Calendar, Search, Bookmark, FileText } from "lucide-react";
import { allCases } from "@/data/cases";
import { Link } from "react-router-dom";

export default function CasesPage() {
  // Get the first case as the current case
  const currentCase = allCases[0]; // O Último Brinde
  
  // Get the remaining cases as available cases
  const availableCases = allCases.slice(1); // Get all cases except the first one

  return (
    <div className="space-y-4">
      <motion.div 
        className="flex justify-between items-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <h1 className="text-2xl font-detective text-white">Arquivos de Casos</h1>
        <Search className="text-gray-400" size={20} />
      </motion.div>
      
      <motion.div
        className="flex space-x-2 overflow-x-auto pb-2"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.2 }}
      >
        <CategoryButton label="Todos" isActive icon={<Briefcase size={14} />} />
        <CategoryButton label="Homicídio" icon={<FileText size={14} />} />
        <CategoryButton label="Roubo" icon={<Bookmark size={14} />} />
        <CategoryButton label="Desaparecimento" icon={<Search size={14} />} />
      </motion.div>
      
      <motion.div
        className="bg-crime-police bg-opacity-20 p-4 rounded-lg"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <h2 className="text-lg font-detective mb-1">Caso Atual</h2>
        <p className="text-sm text-gray-300 mb-3">Você está investigando:</p>
        
        <div className="bg-noir-medium p-3 rounded-lg">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="font-detective text-crime-clue text-lg">{currentCase.title}</h3>
              <p className="text-xs text-gray-400 mt-1">Investigação ativa</p>
            </div>
            <span className="text-xs bg-crime-police px-2 py-1 rounded-full">
              {currentCase.category}
            </span>
          </div>
          
          <div className="mt-3 text-xs text-gray-300 space-y-1">
            <div className="flex justify-between">
              <span>Data adicionada:</span>
              <span>{currentCase.dateAdded}</span>
            </div>
            <div className="flex justify-between">
              <span>Dificuldade:</span>
              <span>{currentCase.difficulty}</span>
            </div>
          </div>
          
          <motion.div>
            <Link 
              to={`/cases/${currentCase.id}`}
              className="mt-3 bg-crime-police text-white py-2 px-3 rounded text-sm block text-center font-detective"
            >
              Continuar Investigação
            </Link>
          </motion.div>
        </div>
      </motion.div>
      
      <motion.div
        className="bg-noir-medium p-4 rounded-lg"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-detective">Próximos Casos</h2>
          <Calendar size={16} className="text-gray-400" />
        </div>
        
        <div className="space-y-3 mt-3">
          {/* Map through available cases */}
          {availableCases.map(caseData => (
            <UpcomingCase 
              key={caseData.id}
              title={caseData.title} 
              releaseDate={caseData.dateAdded} 
              description={caseData.description}
              category={caseData.category}
              id={caseData.id}
            />
          ))}
          
          {/* Upcoming future cases */}
          <UpcomingCase title="Sombras na Cidade" releaseDate="Em breve" />
          <UpcomingCase title="O Último Código" releaseDate="Em breve" />
        </div>
      </motion.div>
    </div>
  );
}

interface CategoryButtonProps {
  label: string;
  icon?: React.ReactNode;
  isActive?: boolean;
}

function CategoryButton({ label, icon, isActive }: CategoryButtonProps) {
  return (
    <motion.button 
      className={`flex items-center space-x-1 text-xs whitespace-nowrap py-2 px-3 rounded-full ${
        isActive 
          ? 'bg-crime-clue text-noir-dark' 
          : 'bg-noir-medium text-gray-300 hover:bg-noir-light'
      }`}
      whileTap={{ scale: 0.95 }}
    >
      {icon}
      <span>{label}</span>
    </motion.button>
  );
}

interface UpcomingCaseProps {
  title: string;
  releaseDate: string;
  description?: string;
  category?: string;
  id?: string;
}

function UpcomingCase({ title, releaseDate, description, category, id }: UpcomingCaseProps) {
  const isAvailable = !!id;

  return (
    <div className={`bg-noir-light p-3 rounded-lg ${!isAvailable ? 'opacity-60' : ''}`}>
      <div className="flex justify-between items-start">
        <h3 className="font-detective text-sm">{title}</h3>
        {category && (
          <span className="text-xs bg-crime-police bg-opacity-70 px-2 py-0.5 rounded-full text-white">
            {category}
          </span>
        )}
      </div>
      
      {description && (
        <p className="text-xs text-gray-400 mt-1 line-clamp-2">{description}</p>
      )}
      
      <div className="flex justify-between text-xs text-gray-400 mt-2">
        <span>Data de lançamento:</span>
        <span>{releaseDate}</span>
      </div>
      
      {isAvailable && (
        <Link
          to={`/cases/${id}`}
          className="mt-2 bg-crime-police bg-opacity-70 text-white py-1 px-2 rounded text-xs block text-center font-detective"
        >
          Investigar
        </Link>
      )}
    </div>
  );
}
