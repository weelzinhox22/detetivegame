import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Confetti from "react-confetti";
import { useWindowSize } from "react-use";
import { Swiper, SwiperSlide } from "swiper/react";
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/effect-flip';
import 'swiper/css/effect-cards';
import { ChevronLeft, ChevronRight, Calendar, MapPin, User, FileText as File } from "lucide-react";
import { useNavigate } from "react-router-dom";
import CaseDetail from "./CaseDetail";
import Suspects from "./Suspects";
import CaseNotes from "./CaseNotes";
import AccusationForm from "./AccusationForm";
import CaseConclusion from "./CaseConclusion";
import { caseMansao } from "@/data/cases";
import { useToast } from "@/hooks/use-toast";

// Importa o som de página sendo virada
import pageSound from "/sounds/page-flip.mp3";

// Componente principal do caso
export default function MansaoAberdeen() {
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
    if (suspectId === caseMansao.solution.culpritId) {
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
        title: 'Crime Chronicles - A Mansão Aberdeen',
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
    if (selectedSuspect === caseMansao.solution.culpritId) return 100;
    // Cálculo de precisão parcial para outros suspeitos
    if (selectedSuspect === 'emilia') return 30;
    if (selectedSuspect === 'beatriz') return 20;
    if (selectedSuspect === 'alexandre') return 45;
    return 0;
  };
  
  // Mensagem de conclusão do caso
  const getConclusionMessage = () => {
    if (selectedSuspect === caseMansao.solution.culpritId) {
      return "Você identificou corretamente Ricardo Monteiro como o assassino! Ele planejou meticulosamente a morte de toda sua família para herdar a fortuna. Ricardo modificou o testamento secretamente, comprou passagem para fugir do país e fingiu estar doente para não consumir a sobremesa envenenada. Ele tinha acesso à cozinha quando a chef saiu e colocou o veneno apenas na torta, sabendo que era o único prato que ele poderia evitar sem levantar suspeitas.";
    }
    return "Infelizmente sua acusação não identificou o verdadeiro culpado. As evidências apontam para Ricardo Monteiro, que planejou meticulosamente a morte de toda sua família para herdar a fortuna. Ele modificou o testamento em seu favor, comprou passagem para fugir do país e fingiu estar doente para não consumir a sobremesa envenenada.";
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
              {activeSection === 'case' && <MansaoCaseDetail onPageTurn={playPageSound} />}
              {activeSection === 'suspects' && <Suspects caseData={caseMansao} />}
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
        <AccusationForm suspects={caseMansao.suspects} onAccuse={handleAccuse} />
      )}
      
      {caseStage === 'conclusion' && (
        <CaseConclusion
          caseName="A Mansão Aberdeen"
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

interface CaseDetailProps {
  onPageTurn?: () => void;
}

function MansaoCaseDetail({ onPageTurn }: CaseDetailProps) {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(0);
  
  // Conteúdo do caso da Mansão Aberdeen
  const casePages = [
    // Página 1 - Introdução
    <div className="space-y-4">
      <h2 className="file-heading">A Mansão Aberdeen</h2>
      <p className="case-text">
        A família Monteiro, conhecida por sua riqueza e influência na cidade,
        foi encontrada morta durante um jantar na histórica Mansão Aberdeen.
        As vítimas incluíam Augusto Monteiro (68 anos), o patriarca da família;
        sua esposa Elisa (65 anos); e seus filhos Marcelo (41 anos) e Cláudia (38 anos).
      </p>
      <p className="case-text">
        Os corpos foram encontrados na sala de jantar, todos ainda sentados
        à mesa, como se tivessem morrido simultaneamente durante a refeição.
        A princípio, suspeitou-se de intoxicação alimentar, mas os exames
        preliminares apontaram para um possível envenenamento deliberado.
      </p>
      <p className="case-text">
        Augusto Monteiro era dono de um império empresarial avaliado em
        centenas de milhões, e sua morte levanta questões sobre quem poderia
        se beneficiar de tal tragédia.
      </p>
    </div>,
    
    // Página 2 - Cena do Crime
    <div className="space-y-4">
      <h2 className="file-heading">Cena do Crime - Sala de Jantar</h2>
      <p className="case-text">
        A sala de jantar, onde os corpos foram encontrados, estava impecavelmente
        arrumada. A mesa estava posta para cinco pessoas, apesar de apenas
        quatro terem participado da refeição final. Havia uma cadeira vazia, com
        o prato e talheres intocados.
      </p>
      <p className="case-text">
        O jantar consistia em três cursos: uma sopa de abóbora como entrada,
        filé ao molho madeira como prato principal e uma torta de frutas
        vermelhas como sobremesa. Os quatro falecidos tinham consumido todos
        os pratos, com os pratos de sobremesa parcialmente comidos.
      </p>
      <p className="case-text">
        Não havia sinais de luta ou qualquer indicação de que as vítimas
        perceberam o que estava acontecendo. Parecia que morreram de forma
        rápida, mas não instantânea, pois alguns tinham expressões de dor
        no rosto.
      </p>
    </div>,
    
    // Página 3 - Relatório Toxicológico
    <div className="space-y-4">
      <h2 className="file-heading">Relatório Toxicológico</h2>
      <p className="case-text">
        A análise toxicológica confirmou que as vítimas morreram devido a um
        veneno raro, derivado de uma planta asiática chamada "Moonshadow",
        que causa paralisia respiratória. O veneno foi encontrado apenas na
        sobremesa - a torta de frutas vermelhas - e não nos outros pratos.
      </p>
      <p className="case-text">
        Este veneno é particularmente perigoso porque é inodoro e tem um
        sabor que pode ser facilmente mascarado por ingredientes doces ou
        ácidos, como os frutos vermelhos. Os efeitos começam a aparecer cerca
        de 15 minutos após a ingestão, inicialmente como dormência nos lábios,
        evoluindo rapidamente para paralisia muscular e, finalmente, parada
        respiratória.
      </p>
      <p className="case-text">
        Segundo os especialistas, este veneno não é comum e não está disponível
        comercialmente. Seria necessário conhecimento especializado para obter
        ou extrair este composto.
      </p>
    </div>,
    
    // Página 4 - Depoimento da Chef
    <div className="space-y-4">
      <h2 className="file-heading">Depoimento de Emília Campos (Chef)</h2>
      <p className="case-text">
        <span className="font-bold">Investigador:</span> "Sra. Campos, pode nos descrever como foi o preparo do jantar aquela noite?"
      </p>
      <p className="case-text">
        <span className="font-bold">Emília:</span> "Sim, claro. Cheguei por volta das 15h para preparar tudo. O cardápio foi definido pelo Sr. Augusto Monteiro pessoalmente: sopa de abóbora, filé ao molho madeira e, para a sobremesa, torta de frutas vermelhas."
      </p>
      <p className="case-text">
        <span className="font-bold">Investigador:</span> "Em algum momento você deixou a cozinha desacompanhada?"
      </p>
      <p className="case-text">
        <span className="font-bold">Emília:</span> "Sim, por cerca de 20 minutos. Recebi uma ligação urgente do hospital sobre minha mãe. Saí para o jardim para falar, pois o sinal dentro da mansão é ruim. A Beatriz estava na cozinha quando saí."
      </p>
      <p className="case-text">
        <span className="font-bold">Investigador:</span> "A senhora notou algo estranho na cozinha quando voltou?"
      </p>
      <p className="case-text">
        <span className="font-bold">Emília:</span> "Não... bem, agora que penso nisso, a sobremesa já estava fora da geladeira quando voltei, o que foi estranho porque eu a tinha deixado resfriando."
      </p>
    </div>,
    
    // Página 5 - Depoimento da Governanta
    <div className="space-y-4">
      <h2 className="file-heading">Depoimento de Beatriz Oliveira (Governanta)</h2>
      <p className="case-text">
        <span className="font-bold">Investigador:</span> "Sra. Oliveira, entendo que você estava na cozinha quando a chef Emília saiu para atender um telefonema?"
      </p>
      <p className="case-text">
        <span className="font-bold">Beatriz:</span> "Sim, eu estava ajudando com a preparação da mesa. Emília recebeu uma ligação e saiu para o jardim."
      </p>
      <p className="case-text">
        <span className="font-bold">Investigador:</span> "Você permaneceu na cozinha o tempo todo enquanto ela estava fora?"
      </p>
      <p className="case-text">
        <span className="font-bold">Beatriz:</span> "Não, eu não fiquei lá o tempo todo. Tive que atender ao Sr. Ricardo que pediu um chá para a enxaqueca. Ele estava em seu quarto, dizendo que se sentia mal demais para jantar com a família."
      </p>
      <p className="case-text">
        <span className="font-bold">Investigador:</span> "Então a cozinha ficou desocupada em algum momento?"
      </p>
      <p className="case-text">
        <span className="font-bold">Beatriz:</span> "Sim, por alguns minutos enquanto eu levava o chá. Qualquer um poderia ter entrado lá."
      </p>
    </div>,
    
    // Página 6 - Depoimento de Ricardo
    <div className="space-y-4">
      <h2 className="file-heading">Depoimento de Ricardo Monteiro (Sobrinho)</h2>
      <p className="case-text">
        <span className="font-bold">Investigador:</span> "Sr. Monteiro, por que não se juntou à família para o jantar?"
      </p>
      <p className="case-text">
        <span className="font-bold">Ricardo:</span> "Eu estava com enxaqueca terrível desde a tarde. Tomei um remédio forte e fiquei no meu quarto. Inclusive pedi à Beatriz para me trazer um chá. Não tinha condições de descer."
      </p>
      <p className="case-text">
        <span className="font-bold">Investigador:</span> "O senhor sabia da recente modificação no testamento de seu tio?"
      </p>
      <p className="case-text">
        <span className="font-bold">Ricardo:</span> "Não, isso é uma surpresa para mim. Meu tio não comentou nada comigo. Estou chocado com essa informação."
      </p>
      <p className="case-text">
        <span className="font-bold">Investigador:</span> "E quanto à passagem para a Tailândia encontrada em seu nome, com data para o dia seguinte à morte de sua família?"
      </p>
      <p className="case-text">
        <span className="font-bold">Ricardo:</span> "Ah, isso... Eu planejava uma viagem há meses. Simples coincidência. Iria informar meu tio no jantar, mas acabei passando mal."
      </p>
    </div>,
    
    // Página 7 - Depoimento de Alexandre
    <div className="space-y-4">
      <h2 className="file-heading">Depoimento de Alexandre Costa (Advogado)</h2>
      <p className="case-text">
        <span className="font-bold">Investigador:</span> "Sr. Costa, entendo que o senhor participou do jantar como convidado?"
      </p>
      <p className="case-text">
        <span className="font-bold">Alexandre:</span> "Sim, eu fui convidado pelo Sr. Augusto para discutir alguns negócios durante o jantar. Saí antes da sobremesa porque tinha outro compromisso."
      </p>
      <p className="case-text">
        <span className="font-bold">Investigador:</span> "O Sr. Augusto comentou sobre alguma mudança recente em seu testamento?"
      </p>
      <p className="case-text">
        <span className="font-bold">Alexandre:</span> "Na verdade, sim. Eu mesmo elaborei a última versão há cerca de duas semanas. Augusto incluiu uma cláusula específica onde Ricardo seria o único herdeiro se toda a família morresse simultaneamente. Achei estranho, mas ele insistiu."
      </p>
      <p className="case-text">
        <span className="font-bold">Investigador:</span> "E quem solicitou essa alteração?"
      </p>
      <p className="case-text">
        <span className="font-bold">Alexandre:</span> "Foi Ricardo quem entrou em contato comigo inicialmente, dizendo que o tio queria fazer alterações. Depois, confirmei pessoalmente com Augusto, que parecia um tanto relutante, mas concordou."
      </p>
    </div>,
    
    // Página 8 - Evidência crucial
    <div className="space-y-4">
      <h2 className="file-heading">Evidência Adicional - Plantas Exóticas</h2>
      <p className="case-text">
        Uma busca no quarto de Ricardo revelou um livro sobre plantas asiáticas venenosas,
        com diversas páginas marcadas, incluindo uma sobre a "Moonshadow". Encontramos também
        resíduos de material vegetal na lixeira de seu banheiro.
      </p>
      <p className="case-text">
        A análise desses resíduos confirmou ser a mesma planta cujo veneno foi usado
        no assassinato. Além disso, o histórico de navegação de Ricardo mostrava pesquisas
        recentes sobre extrair toxinas de plantas e métodos de envenenamento indetectáveis.
      </p>
      <p className="case-text">
        Confrontado com essas evidências, Ricardo permaneceu em silêncio, solicitando
        a presença de seu advogado.
      </p>
    </div>
  ];
  
  const handleSlideChange = (swiper: any) => {
    setCurrentPage(swiper.activeIndex);
    if (onPageTurn) onPageTurn();
  };
  
  return (
    <div className="space-y-4">
      <motion.div 
        className="flex justify-between items-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="flex items-center space-x-2">
          <motion.button
            onClick={() => navigate('/cases')}
            whileTap={{ scale: 0.9 }}
          >
            <ChevronLeft size={24} className="text-crime-clue" />
          </motion.button>
          <h1 className="text-xl font-detective text-white">A Mansão Aberdeen</h1>
        </div>
        <div className="text-xs bg-crime-police px-2 py-1 rounded-full">
          HOMICÍDIO
        </div>
      </motion.div>
      
      <div className="flex justify-between text-xs text-gray-400 px-1">
        <div className="flex items-center space-x-1">
          <Calendar size={12} />
          <span>Julho 2023</span>
        </div>
        <div className="flex items-center space-x-1">
          <MapPin size={12} />
          <span>Mansão Aberdeen</span>
        </div>
      </div>
      
      <motion.div
        className="relative"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <Swiper
          effect={'flip'}
          grabCursor={true}
          pagination={true}
          className="mySwiper"
          onSlideChange={handleSlideChange}
        >
          {casePages.map((pageContent, index) => (
            <SwiperSlide key={index}>
              <div className="evidence-card min-h-[400px]">
                {pageContent}
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
        
        <div className="flex justify-between mt-4">
          <button
            onClick={() => {
              if (currentPage > 0) {
                const swiperElement = document.querySelector('.swiper') as HTMLElement & { swiper: any };
                if (swiperElement) {
                  swiperElement.swiper.slidePrev();
                  if (onPageTurn) onPageTurn();
                }
              }
            }}
            disabled={currentPage === 0}
            className={`nav-button ${currentPage === 0 ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            Anterior
          </button>
          
          <div className="text-center text-sm text-gray-400">
            {currentPage + 1} / {casePages.length}
          </div>
          
          <button
            onClick={() => {
              if (currentPage < casePages.length - 1) {
                const swiperElement = document.querySelector('.swiper') as HTMLElement & { swiper: any };
                if (swiperElement) {
                  swiperElement.swiper.slideNext();
                  if (onPageTurn) onPageTurn();
                }
              }
            }}
            disabled={currentPage === casePages.length - 1}
            className={`nav-button ${currentPage === casePages.length - 1 ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            Próximo
          </button>
        </div>
      </motion.div>
      
      <motion.div
        className="bg-noir-medium p-4 rounded-lg"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <h2 className="text-lg font-detective mb-3">Evidências</h2>
        
        <div className="flex space-x-2 overflow-x-auto pb-2">
          <EvidenceItem 
            label="Cena do Crime" 
            icon={<MapPin size={14} />} 
            isActive 
          />
          <EvidenceItem 
            label="Depoimentos" 
            icon={<User size={14} />} 
          />
          <EvidenceItem 
            label="Documentos" 
            icon={<File size={14} />} 
          />
        </div>
      </motion.div>
    </div>
  );
}

interface EvidenceItemProps {
  label: string;
  icon: React.ReactNode;
  isActive?: boolean;
}

function EvidenceItem({ label, icon, isActive }: EvidenceItemProps) {
  return (
    <motion.button 
      className={`flex items-center space-x-1 text-xs whitespace-nowrap py-2 px-3 rounded-full ${
        isActive 
          ? 'bg-crime-clue text-noir-dark' 
          : 'bg-noir-light text-gray-300 hover:bg-opacity-80'
      }`}
      whileTap={{ scale: 0.95 }}
    >
      {icon}
      <span>{label}</span>
    </motion.button>
  );
}
