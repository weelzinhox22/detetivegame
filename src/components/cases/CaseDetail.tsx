import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, File, User, MapPin, Calendar } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Swiper, SwiperSlide } from 'swiper/react';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/effect-flip';

interface CaseDetailProps {
  onPageTurn?: () => void;
}

export default function CaseDetail({ onPageTurn }: CaseDetailProps) {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(0);
  
  // Esta função vai conter todas as páginas do conteúdo do caso
  const casePages = getCaseContent();
  
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
          <h1 className="text-xl font-detective text-white">O Último Brinde</h1>
        </div>
        <div className="text-xs bg-crime-police px-2 py-1 rounded-full">
          HOMICÍDIO
        </div>
      </motion.div>
      
      <div className="flex justify-between text-xs text-gray-400 px-1">
        <div className="flex items-center space-x-1">
          <Calendar size={12} />
          <span>Abril 2023</span>
        </div>
        <div className="flex items-center space-x-1">
          <MapPin size={12} />
          <span>Sede da Technova</span>
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

function getCaseContent() {
  return [
    // Página 1 - Introdução
    <div className="space-y-4">
      <h2 className="file-heading">O Último Brinde</h2>
      <p className="case-text">
        Rodrigo Lima, um dos empresários mais influentes e carismáticos da cidade, 
        foi encontrado morto em seu escritório, aparentemente vítima de um suicídio. 
        A notícia se espalhou rapidamente e, à primeira vista, o caso parecia simples: 
        um homem sobrecarregado pelo estresse, pela pressão dos negócios e pela 
        constante luta financeira, que teria tomado a decisão trágica de pôr fim à própria vida.
      </p>
      <p className="case-text">
        Entretanto, ao analisar mais de perto a cena do crime, algo não se encaixa. 
        O comportamento da vítima nos últimos dias, as circunstâncias de sua morte e 
        os elementos deixados no local parecem sugerir que este não foi um simples suicídio. 
        E como o caso ganhou grande repercussão, o governo designou o melhor time para 
        investigar mais a fundo essa morte misteriosa.
      </p>
    </div>,
    
    // Página 2 - Cena do Crime
    <div className="space-y-4">
      <h2 className="file-heading">Cena do Crime</h2>
      <p className="case-text">
        O corpo de Rodrigo foi encontrado sentado em sua cadeira de escritório, 
        com uma corda fina ao redor do pescoço, pendurada na prateleira acima de sua mesa. 
        A posição do corpo era estranha: ele estava inclinado para frente, 
        como se tivesse tentado se afastar da corda após a morte. 
        Sua expressão não refletia a dor ou desespero típicos de um suicídio, 
        mas sim um semblante de quem estava em choque, como se tivesse sido 
        pego de surpresa em seus últimos momentos.
      </p>
      <p className="case-text">
        Na mesa, o copo de uísque ainda estava meio cheio, 
        com gelo derretido e uma leve camada de álcool, 
        indicando que não fazia muito tempo que alguém havia deixado o copo ali. 
        O computador de Rodrigo estava aberto, e a tela exibia uma mensagem interrompida, 
        como se ele estivesse tentando escrever algo importante, mas não teve tempo de concluir.
      </p>
    </div>,
    
    // Página 3 - Cena do Crime (continuação)
    <div className="space-y-4">
      <h2 className="file-heading">Cena do Crime (continuação)</h2>
      <p className="case-text">
        O ambiente estava calmo, mas um tanto desorganizado. 
        Um monte de papéis estava espalhado sobre a mesa, 
        e no chão, documentos rasgados e uma cadeira caída pareciam 
        indicar um movimento abrupto, como se alguém tivesse sido 
        empurrado ou se afastado com pressa.
      </p>
      <p className="case-text">
        Perto da cadeira caída, havia uma pegada visível, 
        parcialmente obscurecida pela poeira do escritório. 
        Ela parecia ser de um sapato masculino, mas o tamanho não correspondia ao de Rodrigo.
      </p>
      <p className="case-text">
        Ao lado de uma estante, um arquivo de documentos estava parcialmente aberto, 
        e um contrato de compra de ações jogado no chão parecia estar em vias de ser assinado. 
        O detalhe que chamava a atenção é que o contrato estava rasgado em duas partes, 
        como se alguém tivesse tentado destruí-lo ou impedir que fosse formalizado.
      </p>
    </div>,
    
    // Página 4 - Depoimento de Rafael
    <div className="space-y-4">
      <h2 className="file-heading">Depoimento de Rafael</h2>
      <p className="case-text">
        <span className="font-bold">Investigador:</span> "Boa noite, Rafael. Agradeço por sua colaboração. 
        Estamos investigando a morte de Rodrigo Lima, e algumas questões ainda não estão claras. 
        Vamos começar com algumas perguntas sobre o seu envolvimento. 
        Onde você estava no momento da morte de Rodrigo?"
      </p>
      <p className="case-text">
        <span className="font-bold">Rafael:</span> "Boa noite, Investigador. 
        Eu estava no meu escritório, trabalhando normalmente. 
        Eu e Rodrigo tínhamos escritórios separados no mesmo prédio. 
        Não entrei na sala dele naquele dia."
      </p>
      <p className="case-text">
        <span className="font-bold">Investigador:</span> "Então, você não estava na sala de Rodrigo após as 18h, correto?"
      </p>
      <p className="case-text">
        <span className="font-bold">Rafael:</span> "Sim, correto. 
        Eu saí do meu escritório por volta das 18h e fui para casa. 
        Não voltei mais depois disso."
      </p>
    </div>,
    
    // Página 5 - Depoimento de Rafael (continuação)
    <div className="space-y-4">
      <h2 className="file-heading">Depoimento de Rafael (continuação)</h2>
      <p className="case-text">
        <span className="font-bold">Investigador:</span> "Entendo. 
        Nós encontramos um copo de uísque na sala de Rodrigo, 
        e as digitais encontradas nele não pertencem a ele. Como você explica isso?"
      </p>
      <p className="case-text">
        <span className="font-bold">Rafael:</span> "Eu não sei como as digitais de outra pessoa poderiam estar no copo, 
        Investigador. Eu nunca toquei naquele copo. 
        Eu não estive na sala de Rodrigo após o final do expediente. 
        Não faço ideia de quem tenha mexido nas coisas dele."
      </p>
      <p className="case-text">
        <span className="font-bold">Investigador:</span> "E quanto à pegada encontrada perto da cadeira caída? 
        Alguma ideia de quem pode ter estado lá depois da morte de Rodrigo?"
      </p>
      <p className="case-text">
        <span className="font-bold">Rafael:</span> "Eu realmente não sei de quem possa ser aquela pegada, Investigador. 
        Quando saí, a sala de Rodrigo estava fechada. Não voltei lá depois. 
        Eu não sei como alguém mais teria acesso à sala depois de mim."
      </p>
    </div>,
    
    // Página 6 - Depoimento de Clara
    <div className="space-y-4">
      <h2 className="file-heading">Depoimento de Clara</h2>
      <p className="case-text">
        <span className="font-bold">Investigador:</span> "Boa noite, Clara. 
        Agradeço por sua colaboração. Estamos investigando a morte de Rodrigo Lima 
        e algumas informações precisam ser esclarecidas. Para começar, 
        você esteve no escritório de Rodrigo no dia em que ele faleceu?"
      </p>
      <p className="case-text">
        <span className="font-bold">Clara:</span> "Boa noite, Investigador. 
        Eu não estive no escritório de Rodrigo naquele dia. 
        No dia em que ele foi encontrado morto, eu passei o dia inteiro em uma consulta médica. 
        Eu só saí do consultório no final da tarde e fui direto para casa, 
        onde fiquei o restante da noite."
      </p>
      <p className="case-text">
        <span className="font-bold">Investigador:</span> "Você tem como confirmar que não foi ao escritório de Rodrigo naquele dia? Que horas você saiu do consultório?"
      </p>
      <p className="case-text">
        <span className="font-bold">Clara:</span> "Sim, eu posso confirmar. A consulta foi pela manhã e durou um bom tempo. Eu saí por volta das 17h. Depois disso, eu fui para casa e não voltei ao trabalho naquele dia."
      </p>
    </div>,
    
    // Página 7 - Relatório de Investigação
    <div className="space-y-4">
      <h2 className="file-heading">Relatório de Investigação</h2>
      <p className="case-text">
        Após a análise minuciosa das evidências e da investigação dos eventos
        que ocorreram na noite da morte de Rodrigo Lima, obtivemos uma
        descoberta relevante que pode ser crucial para resolver este caso.
      </p>
      <p className="case-text">
        Com o auxílio de nossa equipe técnica, conseguimos restaurar os
        arquivos corrompidos das câmeras de segurança da empresa. Os
        registros indicam que Rafael foi visto saindo das instalações da empresa
        por volta das 17 horas, não retornando mais naquele dia. Já Fernanda,
        esposa de Rodrigo, foi registrada entrando no escritório por volta das 19
        horas e saindo com seu filho por volta das 20 horas.
      </p>
      <p className="case-text">
        Essa informação confirma os álibis dos suspeitos durante o período
        crítico, mas ainda deixa perguntas sobre o que realmente aconteceu após
        as 20 horas naquela noite.
      </p>
    </div>,
    
    // Página 8 - Depoimento de Fernanda
    <div className="space-y-4">
      <h2 className="file-heading">Depoimento de Fernanda</h2>
      <p className="case-text">
        <span className="font-bold">Investigador:</span> "Sra. Lima, obrigado por comparecer. Gostaríamos de esclarecer algumas questões sobre Rodrigo e sua relação com ele nos últimos meses."
      </p>
      <p className="case-text">
        <span className="font-bold">Fernanda:</span> "Claro... Eu já disse tudo o que sabia, mas estou aqui para ajudar."
      </p>
      <p className="case-text">
        <span className="font-bold">Investigador:</span> "O casamento de vocês estava passando por dificuldades?"
      </p>
      <p className="case-text">
        <span className="font-bold">Fernanda:</span> "Todos os casamentos passam por momentos difíceis. Mas não éramos um casal infeliz, se é isso que está perguntando."
      </p>
      <p className="case-text">
        <span className="font-bold">Investigador:</span> "Há algumas semanas, uma reportagem no jornal mencionou que seu casamento estava em crise e levantou rumores sobre uma possível traição. O que tem a dizer sobre isso?"
      </p>
      <p className="case-text">
        <span className="font-bold">Fernanda:</span> "Rodrigo estava me traindo. Eu já sabia disso antes da reportagem."
      </p>
    </div>,
    
    // Página 9 - Depoimento de João
    <div className="space-y-4">
      <h2 className="file-heading">Depoimento de João</h2>
      <p className="case-text">
        <span className="font-bold">Investigador:</span> "Boa tarde, João. Precisamos esclarecer alguns detalhes sobre a noite em que seu pai faleceu. Sabemos que você esteve no escritório naquela noite. Pode nos contar o que aconteceu exatamente?"
      </p>
      <p className="case-text">
        <span className="font-bold">João:</span> "Sim, claro. Eu estava lá, com a minha mãe, nós fomos até o escritório por volta das 18 horas, para conversar com o meu pai. Eu e ele tivemos uma discussão. Ele estava bêbado e não queria conversar direito, então ficou alterado. Ele começou a gritar e falar coisas sem sentido, algo sobre a empresa, sobre as ações e... ele estava bem nervoso."
      </p>
      <p className="case-text">
        <span className="font-bold">Investigador:</span> "E após a briga, onde você foi?"
      </p>
      <p className="case-text">
        <span className="font-bold">João:</span> "Nós saímos do escritório por volta das 19h30. Minha mãe estava bem abalada, mas tentamos conversar. A gente voltou para casa. Quando chegamos, minha mãe foi direto para o quarto e foi dormir, eu fiquei acordado. Fui para o meu quarto jogar, eu estava tentando distrair minha cabeça."
      </p>
    </div>,
    
    // Página 10 - Detalhe Crucial
    <div className="space-y-4">
      <h2 className="file-heading">Detalhe Crucial</h2>
      <p className="case-text">
        <span className="font-bold">Investigador:</span> "E qual foi a sua reação ao saber da morte de seu pai?"
      </p>
      <p className="case-text">
        <span className="font-bold">João:</span> "Eu fiquei em choque. Não sabia o que pensar. Minha mãe me contou que ele tinha se suicidado."
      </p>
      <p className="case-text">
        <span className="font-bold">João:</span> "É muito difícil aceitar que ele usou veneno de insetos e depois se enforcou."
      </p>
      <p className="case-text">
        <span className="font-bold">João:</span> "Eu não sabia como reagir, tudo aconteceu tão rápido... eu só fiquei olhando para ela sem acreditar."
      </p>
      <p className="case-text font-italic">
        Este detalhe é particularmente relevante, pois a informação sobre o envenenamento antes do enforcamento não havia sido divulgada publicamente. Apenas o assassino poderia saber dessa sequência específica de eventos.
      </p>
    </div>
  ];
}
