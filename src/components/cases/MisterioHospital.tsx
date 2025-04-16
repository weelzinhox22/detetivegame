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
import Suspects from "./Suspects";
import CaseNotes from "./CaseNotes";
import AccusationForm from "./AccusationForm";
import CaseConclusion from "./CaseConclusion";
import { caseHospital } from "@/data/cases";
import { useToast } from "@/hooks/use-toast";

// Importa o som de página sendo virada
import pageSound from "/sounds/page-flip.mp3";

// Componente principal do caso
export default function MisterioHospital() {
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
    if (suspectId === caseHospital.solution.culpritId) {
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
        title: 'Crime Chronicles - O Mistério do Hospital',
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
    if (selectedSuspect === caseHospital.solution.culpritId) return 100;
    // Cálculo de precisão parcial para outros suspeitos
    if (selectedSuspect === 'mariana') return 35;
    if (selectedSuspect === 'carlos') return 45;
    if (selectedSuspect === 'renata') return 15;
    return 0;
  };
  
  // Mensagem de conclusão do caso
  const getConclusionMessage = () => {
    if (selectedSuspect === caseHospital.solution.culpritId) {
      return "Você identificou corretamente Eduardo Silva como o assassino! Eduardo estava desviando medicamentos controlados do hospital e alterando registros médicos. A Dra. Helena descobriu suas atividades ao comparar os registros de estoque com as prescrições reais. Ele a atraiu para o almoxarifado com o pretexto de discutir uma discrepância e, aproveitando-se de sua condição médica, usou uma dose letal de morfina, sabendo que seu histórico cardíaco poderia disfarçar a causa da morte.";
    }
    return "Infelizmente sua acusação não identificou o verdadeiro culpado. As evidências apontam para Eduardo Silva, que estava desviando medicamentos controlados do hospital e foi descoberto pela Dra. Helena. Ele aproveitou-se da condição cardíaca dela para mascarar um assassinato como morte natural, injetando uma dose letal de morfina e alterando os registros médicos posteriormente.";
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
              {activeSection === 'case' && <HospitalCaseDetail onPageTurn={playPageSound} />}
              {activeSection === 'suspects' && <Suspects caseData={caseHospital} />}
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
        <AccusationForm suspects={caseHospital.suspects} onAccuse={handleAccuse} />
      )}
      
      {caseStage === 'conclusion' && (
        <CaseConclusion
          caseName="O Mistério do Hospital"
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

function HospitalCaseDetail({ onPageTurn }: CaseDetailProps) {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(0);
  
  // Conteúdo do caso do Hospital Santa Cruz
  const casePages = [
    // Página 1 - Introdução
    <div className="space-y-4">
      <h2 className="file-heading">O Mistério do Hospital</h2>
      <p className="case-text">
        A Dra. Helena Martins, chefe do departamento de cardiologia do Hospital 
        Santa Cruz, foi encontrada morta no almoxarifado do hospital. Inicialmente, 
        sua morte foi atribuída a um ataque cardíaco, já que a médica tinha histórico 
        de problemas cardíacos.
      </p>
      <p className="case-text">
        No entanto, durante o procedimento padrão de autópsia, foram encontrados indícios 
        de uma substância não prescrita em seu organismo. A análise toxicológica 
        confirmou a presença de uma dose elevada de morfina, suficiente para causar 
        uma parada respiratória.
      </p>
      <p className="case-text">
        Como a Dra. Helena não tinha prescrição para morfina e não apresentava histórico 
        de uso indevido de medicamentos, a polícia foi chamada para investigar um possível 
        homicídio disfarçado de morte natural.
      </p>
    </div>,
    
    // Página 2 - Cena do Crime
    <div className="space-y-4">
      <h2 className="file-heading">Cena do Crime - Almoxarifado</h2>
      <p className="case-text">
        O corpo da Dra. Helena foi encontrado no almoxarifado central do hospital, 
        uma área de acesso restrito onde são armazenados medicamentos e equipamentos. 
        Ela estava caída entre duas estantes, com sua prancheta médica ao lado e 
        documentos espalhados no chão.
      </p>
      <p className="case-text">
        O local não mostrava sinais de luta, e sua bolsa permanecia intacta com 
        todos os pertences. A única marca visível em seu corpo era um pequeno 
        hematoma no braço direito, que poderia ser consistente com uma injeção.
      </p>
      <p className="case-text">
        As câmeras de segurança do corredor que leva ao almoxarifado revelaram que 
        a Dra. Helena entrou na área às 20:15 do dia anterior, aparentemente sozinha e 
        sem sinais de coação. Curiosamente, o sistema de segurança apresentou uma 
        falha técnica de 15 minutos logo após sua entrada, não registrando quem mais 
        poderia ter entrado ou saído do local durante esse período.
      </p>
    </div>,
    
    // Página 3 - Relatório de Autópsia
    <div className="space-y-4">
      <h2 className="file-heading">Relatório de Autópsia</h2>
      <p className="case-text">
        Data do Exame: 15/10/2023
        Hora da Morte Estimada: Entre 20:20 e 20:40 do dia 14/10/2023
        Causa da Morte: Parada respiratória induzida por overdose de morfina
      </p>
      <p className="case-text">
        A examinação revelou uma injeção recente no braço direito, administrada 
        por alguém com conhecimento médico, dada a precisão do local. A dose de 
        morfina encontrada era cinco vezes superior à dose terapêutica máxima.
      </p>
      <p className="case-text">
        A vítima apresentava condição cardíaca pré-existente, o que poderia ter 
        acelerado os efeitos da morfina. Não foram encontrados sinais de luta ou 
        outros traumas, sugerindo que a vítima não percebeu a injeção como ameaça 
        ou foi surpreendida.
      </p>
      <p className="case-text">
        Conclusão: Homicídio por envenenamento, provavelmente executado por alguém 
        com acesso e conhecimento de medicamentos controlados.
      </p>
    </div>,
    
    // Página 4 - Depoimento do Dr. Carlos Mendes
    <div className="space-y-4">
      <h2 className="file-heading">Depoimento: Dr. Carlos Mendes</h2>
      <p className="case-text">
        <span className="font-bold">Investigador:</span> "Dr. Mendes, qual era sua relação com a Dra. Helena?"
      </p>
      <p className="case-text">
        <span className="font-bold">Carlos:</span> "Éramos colegas há mais de dez anos. Ela era chefe do departamento de cardiologia, e eu sou chefe da neurologia. Tínhamos uma relação profissional respeitosa, embora discordássemos ocasionalmente sobre alocação de recursos do hospital."
      </p>
      <p className="case-text">
        <span className="font-bold">Investigador:</span> "Onde o senhor estava na noite do incidente?"
      </p>
      <p className="case-text">
        <span className="font-bold">Carlos:</span> "Eu estava em uma cirurgia de emergência que começou às 19h e terminou por volta das 21h30. Toda a equipe do centro cirúrgico pode confirmar. Só soube da morte de Helena quando saí da cirurgia."
      </p>
      <p className="case-text">
        <span className="font-bold">Investigador:</span> "A Dra. Helena tinha mencionado alguma preocupação com você recentemente?"
      </p>
      <p className="case-text">
        <span className="font-bold">Carlos:</span> "Na verdade, ela comentou que estava investigando algo relacionado ao estoque de medicamentos. Disse que havia discrepâncias nos registros, mas não entrou em detalhes. Achei que fosse apenas uma questão administrativa."
      </p>
    </div>,
    
    // Página 5 - Depoimento de Mariana Costa
    <div className="space-y-4">
      <h2 className="file-heading">Depoimento: Mariana Costa</h2>
      <p className="case-text">
        <span className="font-bold">Investigador:</span> "Sra. Costa, entendo que você era assistente da Dra. Helena. O que pode nos contar sobre ela?"
      </p>
      <p className="case-text">
        <span className="font-bold">Mariana:</span> "Sim, eu trabalhava diretamente com ela há dois anos. A Dra. Helena era extremamente metódica e organizada. Nos últimos dias, ela estava revisando todos os registros de medicamentos controlados dos últimos seis meses. Parecia preocupada."
      </p>
      <p className="case-text">
        <span className="font-bold">Investigador:</span> "Ela mencionou o motivo dessa revisão?"
      </p>
      <p className="case-text">
        <span className="font-bold">Mariana:</span> "Ela disse que havia notado discrepâncias nos números do estoque, especialmente em analgésicos e sedativos. Na tarde em que morreu, ela comentou que tinha descoberto algo sério e que precisava confrontar alguém. Não disse quem."
      </p>
      <p className="case-text">
        <span className="font-bold">Investigador:</span> "Você esteve no hospital na noite do incidente?"
      </p>
      <p className="case-text">
        <span className="font-bold">Mariana:</span> "Não, saí às 18h, antes da Dra. Helena. Mas ela me ligou por volta das 19h30 pedindo informações sobre onde estavam armazenados os registros físicos de dispensação de medicamentos do mês anterior. Disse que precisava verificar algo urgente."
      </p>
    </div>,
    
    // Página 6 - Depoimento do Eduardo Silva
    <div className="space-y-4">
      <h2 className="file-heading">Depoimento: Eduardo Silva</h2>
      <p className="case-text">
        <span className="font-bold">Investigador:</span> "Sr. Silva, qual é sua função no hospital?"
      </p>
      <p className="case-text">
        <span className="font-bold">Eduardo:</span> "Sou farmacêutico-chefe e coordeno a distribuição de medicamentos para todos os setores. Trabalho aqui há cinco anos."
      </p>
      <p className="case-text">
        <span className="font-bold">Investigador:</span> "Onde você estava na noite do incidente?"
      </p>
      <p className="case-text">
        <span className="font-bold">Eduardo:</span> "Eu estava no hospital, fechando o inventário mensal da farmácia. Saí por volta das 20h30 e fui direto para casa. Não vi a Dra. Helena naquela noite."
      </p>
      <p className="case-text">
        <span className="font-bold">Investigador:</span> "Os registros mostram que seu cartão de acesso foi usado no almoxarifado às 20:22. Como explica isso?"
      </p>
      <p className="case-text">
        <span className="font-bold">Eduardo:</span> "Eu... deve haver algum erro. Talvez eu tenha passado rapidamente para pegar algo, mas não me lembro. A farmácia fica próxima ao almoxarifado, então posso ter entrado brevemente."
      </p>
      <p className="case-text">
        <span className="font-bold">Investigador:</span> "A Dra. Helena havia discutido alguma preocupação sobre os medicamentos com você?"
      </p>
      <p className="case-text">
        <span className="font-bold">Eduardo:</span> "Ela tinha feito algumas perguntas sobre o controle de opioides na semana anterior, mas nada muito específico. Pensei que fosse apenas parte de uma auditoria de rotina."
      </p>
    </div>,
    
    // Página 7 - Depoimento da Dra. Renata Oliveira
    <div className="space-y-4">
      <h2 className="file-heading">Depoimento: Dra. Renata Oliveira</h2>
      <p className="case-text">
        <span className="font-bold">Investigador:</span> "Dra. Oliveira, entendo que você era amiga próxima da Dra. Helena. É verdade?"
      </p>
      <p className="case-text">
        <span className="font-bold">Renata:</span> "Sim, éramos amigas há mais de vinte anos, desde a faculdade de medicina. Também somos colegas de departamento, sou cardiologista como ela era."
      </p>
      <p className="case-text">
        <span className="font-bold">Investigador:</span> "Helena havia compartilhado alguma preocupação com você recentemente?"
      </p>
      <p className="case-text">
        <span className="font-bold">Renata:</span> "Na verdade, sim. Há cerca de duas semanas, ela me disse que estava preocupada com o que chamou de 'irregularidades sérias' nos registros de medicamentos. Helena suspeitava que alguém estava desviando opioides e falsificando documentação. Ela estava especialmente preocupada porque havia pacientes que pareciam não receber as doses completas de analgésicos prescritos."
      </p>
      <p className="case-text">
        <span className="font-bold">Investigador:</span> "Ela mencionou algum suspeito específico?"
      </p>
      <p className="case-text">
        <span className="font-bold">Renata:</span> "Não diretamente, mas lembro que ela estava analisando os horários de acesso da farmácia. Mencionou que o padrão de discrepâncias coincidia com o turno de algum funcionário específico. Na véspera de sua morte, ela disse que tinha reunido evidências suficientes e iria levar o caso à diretoria no dia seguinte."
      </p>
    </div>,
    
    // Página 8 - Evidências Cruciais
    <div className="space-y-4">
      <h2 className="file-heading">Evidências Adicionais</h2>
      <p className="case-text">
        1. Uma análise dos registros de estoque da farmácia revelou que aproximadamente 200mg de morfina e outros opioides vinham desaparecendo mensalmente nos últimos seis meses, sem documentação apropriada.
      </p>
      <p className="case-text">
        2. Foi encontrado no computador da Dra. Helena um arquivo detalhando discrepâncias nos registros de dispensação de medicamentos, com horários e datas específicas das irregularidades.
      </p>
      <p className="case-text">
        3. As câmeras de segurança do dia 10/10/2023 mostram Eduardo Silva acessando o sistema informático da farmácia fora de seu horário regular e imprimindo o que parecem ser relatórios de estoque.
      </p>
      <p className="case-text">
        4. Uma busca no armário pessoal de Eduardo revelou uma lista de pacientes que receberam prescrições de opioides potentes, com anotações sobre dosagens. Vários desses pacientes, quando entrevistados, relataram dores persistentes mesmo após medicação, sugerindo que não receberam as doses completas prescritas.
      </p>
      <p className="case-text">
        5. A análise das finanças pessoais de Eduardo mostrou depósitos regulares em dinheiro que não correspondiam ao seu salário, totalizando aproximadamente R$10.000 por mês nos últimos seis meses.
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
          <h1 className="text-xl font-detective text-white">O Mistério do Hospital</h1>
        </div>
        <div className="text-xs bg-crime-police px-2 py-1 rounded-full">
          HOMICÍDIO
        </div>
      </motion.div>
      
      <div className="flex justify-between text-xs text-gray-400 px-1">
        <div className="flex items-center space-x-1">
          <Calendar size={12} />
          <span>Outubro 2023</span>
        </div>
        <div className="flex items-center space-x-1">
          <MapPin size={12} />
          <span>Hospital Santa Cruz</span>
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