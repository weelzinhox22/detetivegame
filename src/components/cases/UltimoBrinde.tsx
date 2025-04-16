import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Confetti from "react-confetti";
import { useWindowSize } from "react-use";
import { Swiper, SwiperSlide } from "swiper/react";
import 'swiper/css';
import CaseDetail from "./CaseDetail";
import Suspects from "./Suspects";
import CaseNotes from "./CaseNotes";
import AccusationForm from "./AccusationForm";
import CaseConclusion from "./CaseConclusion";
import { caseBrinde } from "@/data/cases";
import { useToast } from "@/hooks/use-toast";
import { ChevronLeft, ChevronRight } from "lucide-react";

// Importa o som de página sendo virada
import pageSound from "/sounds/page-flip.mp3";

// Componente principal do caso
export default function UltimoBrinde() {
  const [caseStage, setCaseStage] = useState<'investigation' | 'accusation' | 'conclusion'>('investigation');
  const [activeSection, setActiveSection] = useState<'case' | 'suspects' | 'notes'>('case');
  const [selectedSuspect, setSelectedSuspect] = useState<string | null>(null);
  const [showConfetti, setShowConfetti] = useState(false);
  const { width, height } = useWindowSize();
  const { toast } = useToast();
  const audioRef = useRef<HTMLAudioElement | null>(null);
  
  useEffect(() => {
    // Inicializa o elemento de áudio
    audioRef.current = new Audio(pageSound);
    audioRef.current.volume = 0.3;
    
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);
  
  const playPageSound = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.play().catch(err => console.error("Erro ao reproduzir som:", err));
    }
  };
  
  const handleAccuse = (suspectId: string) => {
    setSelectedSuspect(suspectId);
    setCaseStage('conclusion');
    if (suspectId === caseBrinde.solution.culpritId) {
      setShowConfetti(true);
      toast({
        title: "Investigação concluída com sucesso!",
        description: "Você encontrou o verdadeiro culpado!"
      });
      setTimeout(() => setShowConfetti(false), 5000);
    } else {
      toast({
        title: "Investigação finalizada",
        description: "Você acusou o suspeito errado. Veja a conclusão do caso."
      });
    }
  };
  
  const handleSectionChange = (section: 'case' | 'suspects' | 'notes') => {
    setActiveSection(section);
    playPageSound();
  };
  
  const handleProceedToAccusation = () => {
    setCaseStage('accusation');
    playPageSound();
    toast({
      description: "Escolha o suspeito que você acredita ser o culpado."
    });
  };
  
  const handleRestart = () => {
    // Volta para o dashboard
    window.location.href = '/dashboard';
  };
  
  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: 'Crime Chronicles - O Último Brinde',
        text: 'Acabei de resolver um caso no Crime Chronicles! Você consegue descobrir quem é o culpado?',
        url: window.location.href,
      }).catch(err => {
        console.error('Erro ao compartilhar:', err);
        toast({ description: "Não foi possível compartilhar. Tente novamente mais tarde." });
      });
    } else {
      // Fallback para navegadores que não suportam a Web Share API
      toast({ description: "Compartilhamento disponível em breve!" });
    }
  };
  
  // Determina a precisão com base no suspeito selecionado
  const calculateAccuracy = () => {
    if (selectedSuspect === caseBrinde.solution.culpritId) return 100;
    // Cálculo de precisão parcial para outros suspeitos
    if (selectedSuspect === 'rafael') return 25;
    if (selectedSuspect === 'fernanda') return 40;
    if (selectedSuspect === 'clara') return 15;
    return 0;
  };
  
  // Mensagem de conclusão do caso
  const getConclusionMessage = () => {
    if (selectedSuspect === caseBrinde.solution.culpritId) {
      return "Você identificou corretamente João Lima como o assassino! O filho de Rodrigo revelou conhecimento do envenenamento antes dessa informação ser divulgada, um detalhe que apenas o assassino poderia saber. As câmeras de segurança foram corrompidas exatamente no horário estimado do crime, e João não tinha álibi para aquele período.";
    }
    return "Infelizmente sua acusação não identificou o verdadeiro culpado. As evidências apontam para João Lima, que revelou conhecimento do envenenamento antes dessa informação ser divulgada. Um detalhe que apenas o assassino poderia saber.";
  };
  
  return (
    <div className="relative">
      {showConfetti && <Confetti width={width} height={height} recycle={false} />}
      
      {caseStage === 'investigation' && (
        <>
          <div className="flex space-x-2 overflow-x-auto pb-2 mb-4">
            <TabButton 
              label="Caso" 
              isActive={activeSection === 'case'} 
              onClick={() => handleSectionChange('case')} 
            />
            <TabButton 
              label="Suspeitos" 
              isActive={activeSection === 'suspects'} 
              onClick={() => handleSectionChange('suspects')} 
            />
            <TabButton 
              label="Anotações" 
              isActive={activeSection === 'notes'} 
              onClick={() => handleSectionChange('notes')} 
            />
          </div>
          
          <AnimatePresence mode="wait">
            <motion.div
              key={activeSection}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              {activeSection === 'case' && <CaseDetail onPageTurn={playPageSound} />}
              {activeSection === 'suspects' && <Suspects caseData={caseBrinde} />}
              {activeSection === 'notes' && <CaseNotes />}
            </motion.div>
          </AnimatePresence>
          
          <motion.div
            className="mt-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <motion.button
              className="w-full bg-crime-blood py-3 rounded-lg font-detective text-white"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleProceedToAccusation}
            >
              Prosseguir para Acusação
            </motion.button>
          </motion.div>
        </>
      )}
      
      {caseStage === 'accusation' && (
        <AccusationForm suspects={caseBrinde.suspects} onAccuse={handleAccuse} />
      )}
      
      {caseStage === 'conclusion' && (
        <CaseConclusion
          caseName="O Último Brinde"
          conclusion={getConclusionMessage()}
          accuracy={calculateAccuracy()}
          onRestart={handleRestart}
          onShare={handleShare}
        />
      )}
    </div>
  );
}

interface TabButtonProps {
  label: string;
  isActive: boolean;
  onClick: () => void;
}

function TabButton({ label, isActive, onClick }: TabButtonProps) {
  return (
    <motion.button
      className={`tab-button ${isActive ? 'active' : 'bg-noir-light text-gray-300'}`}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
    >
      {label}
    </motion.button>
  );
}
