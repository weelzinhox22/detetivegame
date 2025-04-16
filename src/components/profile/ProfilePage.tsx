
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { Settings, Star, Award, Info, LogOut, Edit, Check } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function ProfilePage() {
  const { toast } = useToast();
  const [userName, setUserName] = useState("Detetive");
  const [editingName, setEditingName] = useState(false);
  const [editedName, setEditedName] = useState("");

  // Carrega o nome salvo ao iniciar
  useEffect(() => {
    const savedName = localStorage.getItem("detectiveName");
    if (savedName) {
      setUserName(savedName);
    }
  }, []);

  const handleEditName = () => {
    setEditedName(userName);
    setEditingName(true);
  };

  const handleSaveName = () => {
    if (editedName.trim()) {
      setUserName(editedName.trim());
      localStorage.setItem("detectiveName", editedName.trim());
      toast({
        description: "Nome atualizado com sucesso!",
      });
    }
    setEditingName(false);
  };

  return (
    <div className="space-y-4">
      <motion.div 
        className="flex justify-between items-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <h1 className="text-2xl font-detective text-white">Perfil do Detetive</h1>
        <Settings className="text-gray-400" size={20} />
      </motion.div>
      
      <motion.div
        className="bg-noir-medium p-4 rounded-lg flex items-center space-x-4"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <div className="relative">
          <div className="w-16 h-16 rounded-full bg-crime-police flex items-center justify-center text-white text-2xl font-detective">
            {userName.charAt(0).toUpperCase()}
          </div>
          <div className="absolute -bottom-1 -right-1 bg-crime-clue text-noir-dark text-xs px-1.5 rounded-full font-bold">
            1
          </div>
        </div>
        
        <div className="flex-1">
          {editingName ? (
            <div className="flex items-center">
              <input
                type="text"
                value={editedName}
                onChange={(e) => setEditedName(e.target.value)}
                className="bg-noir-light text-white px-2 py-1 rounded text-lg font-detective w-full"
                autoFocus
              />
              <button 
                onClick={handleSaveName}
                className="ml-2 bg-crime-clue text-noir-dark p-1.5 rounded-full"
              >
                <Check size={16} />
              </button>
            </div>
          ) : (
            <h2 className="font-detective text-lg flex items-center">
              {userName}
              <button 
                onClick={handleEditName}
                className="ml-2 text-gray-400 hover:text-white"
              >
                <Edit size={14} />
              </button>
            </h2>
          )}
          <p className="text-xs text-gray-400">Ingressou em Abril 2023</p>
          <div className="flex items-center space-x-1 mt-1">
            <Star size={12} className="text-crime-clue" />
            <Star size={12} className="text-crime-clue" />
            <Star size={12} className="text-gray-500" />
            <Star size={12} className="text-gray-500" />
            <Star size={12} className="text-gray-500" />
            <span className="text-xs text-gray-400 ml-1">Novato</span>
          </div>
        </div>
      </motion.div>
      
      <motion.div
        className="bg-noir-medium p-4 rounded-lg"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <h2 className="text-lg font-detective mb-3">Conquistas</h2>
        
        <div className="space-y-3">
          <AchievementCard
            title="Primeiro Caso"
            description="Inicie sua primeira investigação"
            icon={<Award size={18} className="text-crime-clue" />}
            isUnlocked
          />
          
          <AchievementCard
            title="Detetive Mestre"
            description="Resolva 5 casos"
            icon={<Award size={18} className="text-gray-500" />}
            progress={0}
            total={5}
          />
          
          <AchievementCard
            title="Observador Atento"
            description="Encontre todas as evidências em um caso"
            icon={<Award size={18} className="text-gray-500" />}
            progress={15}
            total={25}
          />
        </div>
      </motion.div>
      
      <motion.div
        className="grid grid-cols-1 gap-3"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <ProfileButton
          label="Configurações"
          icon={<Settings size={18} className="text-gray-400" />}
        />
        
        <ProfileButton
          label="Sobre"
          icon={<Info size={18} className="text-gray-400" />}
        />
        
        <ProfileButton
          label="Sair"
          icon={<LogOut size={18} className="text-crime-blood" />}
          variant="danger"
        />
      </motion.div>
    </div>
  );
}

interface AchievementCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  isUnlocked?: boolean;
  progress?: number;
  total?: number;
}

function AchievementCard({ 
  title, 
  description, 
  icon, 
  isUnlocked, 
  progress, 
  total 
}: AchievementCardProps) {
  return (
    <div className={`bg-noir-light p-3 rounded-lg ${!isUnlocked && !progress ? 'opacity-50' : ''}`}>
      <div className="flex justify-between items-start">
        <div>
          <h3 className="font-detective text-sm">{title}</h3>
          <p className="text-xs text-gray-400 mt-0.5">{description}</p>
        </div>
        {icon}
      </div>
      
      {(progress !== undefined && total !== undefined) && (
        <div className="mt-2">
          <div className="flex justify-between text-xs text-gray-400">
            <span>Progresso:</span>
            <span>{progress}/{total}</span>
          </div>
          <div className="w-full bg-noir-dark rounded-full h-1.5 mt-1">
            <div 
              className="bg-crime-clue h-1.5 rounded-full" 
              style={{ width: `${(progress / total) * 100}%` }}
            ></div>
          </div>
        </div>
      )}
    </div>
  );
}

interface ProfileButtonProps {
  label: string;
  icon: React.ReactNode;
  variant?: 'default' | 'danger';
}

function ProfileButton({ label, icon, variant = 'default' }: ProfileButtonProps) {
  return (
    <motion.button 
      className={`flex items-center justify-between p-3 rounded-lg ${
        variant === 'danger' 
          ? 'bg-crime-blood bg-opacity-20 hover:bg-opacity-30' 
          : 'bg-noir-medium hover:bg-noir-light'
      }`}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      <span className="font-detective">{label}</span>
      {icon}
    </motion.button>
  );
}
