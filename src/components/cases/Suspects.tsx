
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Info } from "lucide-react";
import SuspectCard from "../ui/suspectCard";
import { CaseData } from "@/types/case";

interface SuspectsProps {
  caseData?: CaseData;
}

export default function Suspects({ caseData }: SuspectsProps) {
  const [selectedSuspect, setSelectedSuspect] = useState<string | null>(null);
  
  // Dados dos suspeitos (usando os dados padrão caso o caseData não seja fornecido)
  const suspects = caseData?.suspects || [
    {
      id: "rafael",
      name: "Rafael Souza",
      relation: "Sócio da Empresa",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=500&ixid=MnwxfDB8MXxyYW5kb218MHx8bWFuLHN1aXR8fHx8fHwxNjY0MjAyMjM4&ixlib=rb-1.2.1&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=500",
      notes: "Tinha 40% das ações e pressionava Rodrigo para vender mais 30%, o que lhe daria controle majoritário.",
      isCleared: false,
    },
    {
      id: "clara",
      name: "Clara Oliveira",
      relation: "Secretária",
      image: "https://images.unsplash.com/photo-1664575602276-acd073f104c1?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=500&ixid=MnwxfDB8MXxyYW5kb218MHx8d29tYW4scHJvZmVzc2lvbmFsfHx8fHx8MTY2NDIwMjI5Mg&ixlib=rb-1.2.1&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=500",
      notes: "Era amante de Rodrigo. Seu DNA foi encontrado no copo de uísque na cena do crime.",
      isCleared: false,
    },
    {
      id: "fernanda",
      name: "Fernanda Lima",
      relation: "Esposa de Rodrigo",
      image: "https://images.unsplash.com/photo-1594744803329-e58b31de8bf5?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=500&ixid=MnwxfDB8MXxyYW5kb218MHx8d29tYW58fHx8fHwxNjY0MjAyMzM5&ixlib=rb-1.2.1&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=500",
      notes: "Descobriu a traição de Rodrigo com Clara. Esteve no escritório na noite do crime.",
      isCleared: false,
    },
    {
      id: "joao",
      name: "João Lima",
      relation: "Filho de Rodrigo",
      image: "https://images.unsplash.com/photo-1622543614317-7e0f98686271?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=500&ixid=MnwxfDB8MXxyYW5kb218MHx8dGVlbixib3l8fHx8fHwxNjY0MjAyNDMw&ixlib=rb-1.2.1&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=500",
      notes: "Esteve no escritório com sua mãe na noite do crime. Revelou detalhes que apenas o assassino conheceria.",
      isGuilty: false,
    },
  ];
  
  const suspectDetails: {[key: string]: {title: string, content: React.ReactNode}} = {
    rafael: {
      title: "Rafael Souza (Sócio da Empresa)",
      content: <>
        <p>Rafael tinha uma motivação financeira clara: ele já possuía 40% da empresa e pressionava Rodrigo para vender mais 30% das ações, o que lhe daria o controle majoritário da empresa.</p>
        <p>Eles tiveram uma discussão intensa no dia do crime, o que o colocava como um suspeito relevante.</p>
        <p>No entanto, Rafael foi visto saindo da empresa às 17h e as câmeras de segurança confirmam que ele não voltou naquela noite.</p>
        <p>Além disso, mesmo que as câmeras tenham sido corrompidas posteriormente, a adulteração ocorreu entre 22h e 23h, e Rafael não tinha acesso remoto às imagens nem poderia apagá-las após já estar longe da empresa.</p>
        <p>A perícia também não encontrou nenhum vestígio de Rafael na cena do crime.</p>
      </>
    },
    clara: {
      title: "Clara Oliveira (Secretária)",
      content: <>
        <p>Clara era amante de Rodrigo, o que poderia gerar suspeitas, especialmente pelo fato de Fernanda, esposa dele, ter descoberto a traição.</p>
        <p>No entanto, durante toda a investigação, não encontramos nenhum indício de que Clara tivesse interesse na morte de Rodrigo. Ela não ganharia financeiramente com sua morte, nem teria um motivo pessoal forte o suficiente para matá-lo.</p>
        <p>Além disso, não há registros dela entrando ou saindo do escritório na noite do crime, e ninguém relatou sua presença no local no horário do assassinato.</p>
        <p>Sua ligação com Rodrigo era baseada no relacionamento extraconjugal, e não há evidências de que ela tenha planejado ou cometido o crime.</p>
      </>
    },
    fernanda: {
      title: "Fernanda Lima (Esposa de Rodrigo)",
      content: <>
        <p>Fernanda tinha motivos emocionais para estar furiosa com Rodrigo, pois descobriu que ele a traía com Clara.</p>
        <p>Foi confirmada sua presença no escritório na noite do crime, chegando por volta das 19h e saindo às 20h acompanhada do filho, João.</p>
        <p>No entanto, não há registros de que ela tenha retornado ao local.</p>
        <p>As câmeras de segurança foram adulteradas entre 22h e 23h, muito depois de Fernanda já estar em casa.</p>
        <p>Durante seu depoimento, Fernanda mostrou surpresa ao saber da causa da morte do marido e não demonstrou conhecimento prévio do envenenamento.</p>
        <p>Se ela fosse a assassina, João provavelmente teria encoberto a mãe em seu depoimento, mas em vez disso, ele afirmou que ambos saíram juntos e foram para casa.</p>
      </>
    },
    joao: {
      title: "João Lima (Filho de Rodrigo)",
      content: <>
        <p>João era um dos poucos que possuíam acesso irrestrito ao escritório do pai.</p>
        <p>Ele admitiu que teve uma discussão com Rodrigo naquela noite e que o pai estava alcoolizado.</p>
        <p>Afirmou que após sair do escritório com a mãe às 20h, foi para casa e ficou jogando videogame, sem nenhum álibi que pudesse confirmar sua versão.</p>
        <p>As câmeras de segurança foram corrompidas entre 22h e 23h, exatamente no horário estimado da morte. Se João saiu de casa e voltou ao escritório, ninguém poderia provar sua movimentação.</p>
        <p>Durante seu depoimento, João mencionou espontaneamente que o pai foi envenenado antes do enforcamento, mas essa informação não havia sido divulgada.</p>
        <p>Essa informação levanta suspeitas sérias, pois como ele poderia saber desse detalhe específico?</p>
        <p>Além disso, o frasco de veneno não foi encontrado na cena do crime, indicando que o assassino se livrou dele antes que a polícia chegasse.</p>
      </>
    }
  };
  
  const handleSelectSuspect = (id: string) => {
    setSelectedSuspect(id);
  };
  
  const handleClose = () => {
    setSelectedSuspect(null);
  };
  
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-detective">Suspeitos</h2>
        <div className="flex items-center text-xs text-gray-400">
          <Info size={14} className="mr-1" />
          <span>Toque para detalhes</span>
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-3">
        {suspects.map((suspect) => (
          <SuspectCard
            key={suspect.id}
            name={suspect.name}
            relation={suspect.relation}
            image={suspect.image}
            notes={suspect.notes}
            isGuilty={suspect.isGuilty}
            isCleared={suspect.isCleared}
            onClick={() => handleSelectSuspect(suspect.id)}
          />
        ))}
      </div>
      
      <AnimatePresence>
        {selectedSuspect && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-80 z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-evidence-paper rounded-lg w-full max-w-md max-h-[80vh] overflow-y-auto"
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 50, opacity: 0 }}
            >
              <div className="p-4">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-xl font-detective text-noir-dark">
                    {suspectDetails[selectedSuspect as keyof typeof suspectDetails]?.title}
                  </h3>
                  <button 
                    onClick={handleClose}
                    className="bg-noir-dark p-1 rounded-full"
                  >
                    <X size={18} className="text-white" />
                  </button>
                </div>
                
                <div className="prose prose-sm text-noir-dark">
                  {suspectDetails[selectedSuspect as keyof typeof suspectDetails]?.content}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
