import { CaseData } from "@/types/case";

// Caso 1: O Último Brinde
export const caseBrinde: CaseData = {
  id: "o-ultimo-brinde",
  title: "O Último Brinde",
  description: "Rodrigo Lima, influente empresário, é encontrado morto em seu escritório em circunstâncias misteriosas. O que parece ser um suicídio logo revela indícios de algo mais sombrio.",
  dateAdded: "Abril 2023",
  category: "Homicídio",
  difficulty: "Médio",
  locations: [
    {
      id: "escritorio",
      name: "Escritório de Rodrigo",
      description: "Escritório principal de Rodrigo Lima na sede da Technova.",
      imageSrc: "https://images.unsplash.com/photo-1497366216548-37526070297c?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=500&ixid=MnwxfDB8MXxyYW5kb218MHx8b2ZmaWNlfHx8fHx8MTY2NDIwMjgwMA&ixlib=rb-1.2.1&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=500"
    }
  ],
  suspects: [
    {
      id: "rafael",
      name: "Rafael Souza",
      relation: "Sócio da Empresa",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=500&ixid=MnwxfDB8MXxyYW5kb218MHx8bWFuLHN1aXR8fHx8fHwxNjY0MjAyMjM4&ixlib=rb-1.2.1&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=500",
      notes: "Tinha 40% das ações e pressionava Rodrigo para vender mais 30%, o que lhe daria controle majoritário."
    },
    {
      id: "clara",
      name: "Clara Oliveira",
      relation: "Secretária",
      image: "https://images.unsplash.com/photo-1664575602276-acd073f104c1?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=500&ixid=MnwxfDB8MXxyYW5kb218MHx8d29tYW4scHJvZmVzc2lvbmFsfHx8fHx8MTY2NDIwMjI5Mg&ixlib=rb-1.2.1&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=500",
      notes: "Era amante de Rodrigo. Seu DNA foi encontrado no copo de uísque na cena do crime."
    },
    {
      id: "fernanda",
      name: "Fernanda Lima",
      relation: "Esposa de Rodrigo",
      image: "https://images.unsplash.com/photo-1594744803329-e58b31de8bf5?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=500&ixid=MnwxfDB8MXxyYW5kb218MHx8d29tYW58fHx8fHwxNjY0MjAyMzM5&ixlib=rb-1.2.1&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=500",
      notes: "Descobriu a traição de Rodrigo com Clara. Esteve no escritório na noite do crime."
    },
    {
      id: "joao",
      name: "João Lima",
      relation: "Filho de Rodrigo",
      image: "https://images.unsplash.com/photo-1622543614317-7e0f98686271?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=500&ixid=MnwxfDB8MXxyYW5kb218MHx8dGVlbixib3l8fHx8fHwxNjY0MjAyNDMw&ixlib=rb-1.2.1&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=500",
      notes: "Esteve no escritório com sua mãe na noite do crime. Revelou detalhes que apenas o assassino conheceria."
    }
  ],
  evidence: [
    {
      id: "corpo",
      title: "Posição do Corpo",
      type: "photo",
      content: "O corpo foi encontrado sentado na cadeira, com uma corda ao redor do pescoço. A posição era estranha, como se tivesse tentado se afastar da corda após a morte.",
      imageSrc: "https://images.unsplash.com/photo-1581093803931-6d4a21984659?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=500&ixid=MnwxfDB8MXxyYW5kb218MHx8Y3JpbWUsc2NlbmV8fHx8fHwxNjY0MjAzMTAw&ixlib=rb-1.2.1&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=500"
    },
    {
      id: "copo",
      title: "Copo de Uísque",
      type: "photo",
      content: "Um copo meio cheio foi encontrado na mesa, com digitais que não pertenciam a Rodrigo.",
      imageSrc: "https://images.unsplash.com/photo-1566002183238-9728d9e3599c?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=500&ixid=MnwxfDB8MXxyYW5kb218MHx8d2hpc2tleXx8fHx8fDE2NjQyMDMxNTA&ixlib=rb-1.2.1&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=500"
    },
    {
      id: "pegada",
      title: "Pegada no Chão",
      type: "photo",
      content: "Pegada visível perto da cadeira caída, parcialmente obscurecida pela poeira.",
      imageSrc: "https://images.unsplash.com/photo-1549240923-93a2e080e653?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=500&ixid=MnwxfDB8MXxyYW5kb218MHx8Zm9vdHByaW50fHx8fHx8MTY2NDIwMzIwMA&ixlib=rb-1.2.1&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=500"
    }
  ],
  interrogations: [
    {
      id: "rafael-inicial",
      title: "Depoimento Inicial de Rafael",
      suspectId: "rafael",
      date: "12/04/2023",
      dialogLines: [
        {
          speaker: "Investigador",
          text: "Boa noite, Rafael. Agradeço por sua colaboração. Estamos investigando a morte de Rodrigo Lima, e algumas questões ainda não estão claras. Vamos começar com algumas perguntas sobre o seu envolvimento. Onde você estava no momento da morte de Rodrigo?",
          isInvestigator: true
        },
        {
          speaker: "Rafael",
          text: "Boa noite, Investigador. Eu estava no meu escritório, trabalhando normalmente. Eu e Rodrigo tínhamos escritórios separados no mesmo prédio. Não entrei na sala dele naquele dia."
        },
        {
          speaker: "Investigador",
          text: "Então, você não estava na sala de Rodrigo após as 18h, correto?",
          isInvestigator: true
        },
        {
          speaker: "Rafael",
          text: "Sim, correto. Eu saí do meu escritório por volta das 18h e fui para casa. Não voltei mais depois disso."
        }
      ]
    },
    {
      id: "clara-inicial",
      title: "Depoimento Inicial de Clara",
      suspectId: "clara",
      date: "12/04/2023",
      dialogLines: [
        {
          speaker: "Investigador",
          text: "Boa noite, Clara. Agradeço por sua colaboração. Estamos investigando a morte de Rodrigo Lima e algumas informações precisam ser esclarecidas. Para começar, você esteve no escritório de Rodrigo no dia em que ele faleceu?",
          isInvestigator: true
        },
        {
          speaker: "Clara",
          text: "Boa noite, Investigador. Eu não estive no escritório de Rodrigo naquele dia. No dia em que ele foi encontrado morto, eu passei o dia inteiro em uma consulta médica. Eu só saí do consultório no final da tarde e fui direto para casa, onde fiquei o restante da noite."
        }
      ]
    },
    {
      id: "fernanda-inicial",
      title: "Depoimento de Fernanda",
      suspectId: "fernanda",
      date: "13/04/2023",
      dialogLines: [
        {
          speaker: "Investigador",
          text: "Sra. Lima, obrigado por comparecer. Gostaríamos de esclarecer algumas questões sobre Rodrigo e sua relação com ele nos últimos meses.",
          isInvestigator: true
        },
        {
          speaker: "Fernanda",
          text: "Claro... Eu já disse tudo o que sabia, mas estou aqui para ajudar."
        },
        {
          speaker: "Investigador",
          text: "O casamento de vocês estava passando por dificuldades?",
          isInvestigator: true
        },
        {
          speaker: "Fernanda",
          text: "Todos os casamentos passam por momentos difíceis. Mas não éramos um casal infeliz, se é isso que está perguntando."
        },
        {
          speaker: "Investigador",
          text: "Há algumas semanas, uma reportagem no jornal mencionou que seu casamento estava em crise e levantou rumores sobre uma possível traição. O que tem a dizer sobre isso?",
          isInvestigator: true
        },
        {
          speaker: "Fernanda",
          text: "Rodrigo estava me traindo. Eu já sabia disso antes da reportagem."
        }
      ]
    },
    {
      id: "joao-inicial",
      title: "Depoimento de João",
      suspectId: "joao",
      date: "15/04/2023",
      dialogLines: [
        {
          speaker: "Investigador",
          text: "Boa tarde, João. Precisamos esclarecer alguns detalhes sobre a noite em que seu pai faleceu. Sabemos que você esteve no escritório naquela noite. Pode nos contar o que aconteceu exatamente?",
          isInvestigator: true
        },
        {
          speaker: "João",
          text: "Sim, claro. Eu estava lá, com a minha mãe, nós fomos até o escritório por volta das 18 horas, para conversar com o meu pai. Eu e ele tivemos uma discussão. Ele estava bêbado e não queria conversar direito, então ficou alterado. Ele começou a gritar e falar coisas sem sentido, algo sobre a empresa, sobre as ações e... ele estava bem nervoso."
        },
        {
          speaker: "Investigador",
          text: "O que exatamente foi discutido entre você e seu pai naquela noite?",
          isInvestigator: true
        },
        {
          speaker: "João",
          text: "Eu tentei conversar com ele sobre os problemas que estavam acontecendo, principalmente com as ações da empresa. Ele não queria ouvir, estava irritado. Eu estava tentando entender o que estava acontecendo, mas ele só ficou mais bravo. Aí a minha mãe tentou intervir, ela disse pra gente se acalmar, mas a discussão continuou. No final, ele ficou ainda mais furioso, disse que não iria vender as ações para ninguém, nem para o Rafael."
        }
      ]
    }
  ],
  solution: {
    culpritId: "joao",
    conclusion: "João Lima é o assassino. Ele revelou conhecimento do envenenamento antes dessa informação ser divulgada, detalhe que apenas o assassino poderia saber. As câmeras de segurança foram corrompidas no horário estimado do crime, e João não tinha álibi para aquele período."
  }
};

// Caso 2: A Mansão Aberdeen
export const caseMansao: CaseData = {
  id: "a-mansao-aberdeen",
  title: "A Mansão Aberdeen",
  description: "Uma família rica é encontrada envenenada durante um jantar na histórica Mansão Aberdeen. Quem entre os convidados teria motivo para eliminar toda a família?",
  dateAdded: "Julho 2023",
  category: "Homicídio",
  difficulty: "Difícil",
  locations: [
    {
      id: "mansao",
      name: "Mansão Aberdeen",
      description: "Mansão histórica do século XIX, propriedade da família Monteiro há três gerações.",
      imageSrc: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=500&ixid=MnwxfDB8MXxyYW5kb218MHx8bWFuc2lvbnx8fHx8fDE2NjQyMDQwMDA&ixlib=rb-1.2.1&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=500"
    },
    {
      id: "sala-jantar",
      name: "Sala de Jantar",
      description: "Grande sala de jantar onde a família foi encontrada.",
      imageSrc: "https://images.unsplash.com/photo-1617806118233-18e1de247200?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80"
    }
  ],
  suspects: [
    {
      id: "emilia",
      name: "Emília Campos",
      relation: "Chef contratada para o jantar",
      image: "https://images.unsplash.com/photo-1583394838336-acd977736f90?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80",
      notes: "Preparou todo o jantar. Teve acesso direto a todos os pratos."
    },
    {
      id: "ricardo",
      name: "Ricardo Monteiro",
      relation: "Sobrinho do patriarca",
      image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80",
      notes: "Único sobrevivente da família. Alegou passar mal e não jantou com os outros."
    },
    {
      id: "beatriz",
      name: "Beatriz Oliveira",
      relation: "Governanta da mansão",
      image: "https://images.unsplash.com/photo-1671726203638-83742a22625f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80",
      notes: "Trabalha para a família há 30 anos. Serviu os pratos na noite do crime."
    },
    {
      id: "alexandre",
      name: "Alexandre Costa",
      relation: "Advogado da família",
      image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80",
      notes: "Participou do jantar como convidado. Saiu antes da sobremesa, alegando compromisso."
    }
  ],
  evidence: [
    {
      id: "toxicologia",
      title: "Relatório Toxicológico",
      type: "report",
      content: "As vítimas foram envenenadas com uma toxina rara derivada de uma planta asiática. O veneno estava na sobremesa, uma torta de frutas vermelhas.",
      imageSrc: "https://images.unsplash.com/photo-1576615278693-f8e094af9050?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80"
    },
    {
      id: "testamento",
      title: "Testamento Modificado",
      type: "document",
      content: "Documento alterado recentemente, beneficiando Ricardo como único herdeiro caso toda a família falecesse simultaneamente.",
      imageSrc: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80"
    },
    {
      id: "viagem",
      title: "Reserva de Viagem",
      type: "document",
      content: "Passagem aérea para a Tailândia em nome de Ricardo, com partida agendada para o dia seguinte à morte da família.",
      imageSrc: "https://images.unsplash.com/photo-1583845112203-29329902332e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80"
    }
  ],
  interrogations: [
    {
      id: "emilia-inicial",
      title: "Depoimento da Chef Emília",
      suspectId: "emilia",
      date: "20/07/2023",
      dialogLines: [
        {
          speaker: "Investigador",
          text: "Sra. Campos, pode nos descrever como foi o preparo do jantar aquela noite?",
          isInvestigator: true
        },
        {
          speaker: "Emília",
          text: "Sim, claro. Cheguei por volta das 15h para preparar tudo. O cardápio foi definido pelo Sr. Augusto Monteiro pessoalmente: sopa de abóbora, filé ao molho madeira e, para a sobremesa, torta de frutas vermelhas."
        },
        {
          speaker: "Investigador",
          text: "Em algum momento você deixou a cozinha desacompanhada?",
          isInvestigator: true
        },
        {
          speaker: "Emília",
          text: "Sim, por cerca de 20 minutos. Recebi uma ligação urgente do hospital sobre minha mãe. Saí para o jardim para falar, pois o sinal dentro da mansão é ruim. A Beatriz estava na cozinha quando saí."
        }
      ]
    },
    {
      id: "ricardo-inicial",
      title: "Depoimento de Ricardo Monteiro",
      suspectId: "ricardo",
      date: "21/07/2023",
      dialogLines: [
        {
          speaker: "Investigador",
          text: "Sr. Monteiro, por que não se juntou à família para o jantar?",
          isInvestigator: true
        },
        {
          speaker: "Ricardo",
          text: "Eu estava com enxaqueca terrível desde a tarde. Tomei um remédio forte e fiquei no meu quarto. Inclusive pedi à Beatriz para me trazer um chá. Não tinha condições de descer."
        },
        {
          speaker: "Investigador",
          text: "O senhor sabia da recente modificação no testamento de seu tio?",
          isInvestigator: true
        },
        {
          speaker: "Ricardo",
          text: "Não, isso é uma surpresa para mim. Meu tio não comentou nada comigo. Estou chocado com essa informação."
        }
      ]
    }
  ],
  solution: {
    culpritId: "ricardo",
    conclusion: "Ricardo Monteiro planejou meticulosamente a morte de toda sua família para herdar a fortuna. Ele modificou o testamento secretamente, comprou passagem para fugir do país e fingiu estar doente para não consumir a sobremesa envenenada. Ele tinha acesso à cozinha quando a chef saiu e colocou o veneno apenas na torta, sabendo que era o único prato que ele poderia evitar sem levantar suspeitas."
  }
};

// Caso 3: O Mistério do Hospital
export const caseHospital: CaseData = {
  id: "o-misterio-do-hospital",
  title: "O Mistério do Hospital",
  description: "A Dra. Helena Martins, chefe da cardiologia do Hospital Santa Cruz, é encontrada morta em circunstâncias suspeitas. O que parecia ser um ataque cardíaco revela-se um caso de homicídio meticulosamente planejado.",
  dateAdded: "Outubro 2023",
  category: "Homicídio",
  difficulty: "Difícil",
  locations: [
    {
      id: "hospital",
      name: "Hospital Santa Cruz",
      description: "Grande hospital universitário conhecido por sua excelência em cardiologia.",
      imageSrc: "https://images.unsplash.com/photo-1538108149393-fbbd81895907?q=80&w=2128&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    },
    {
      id: "almoxarifado",
      name: "Almoxarifado do Hospital",
      description: "Local onde são armazenados medicamentos e equipamentos, de acesso restrito.",
      imageSrc: "https://images.unsplash.com/photo-1573883434320-af792e5212ce?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    }
  ],
  suspects: [
    {
      id: "carlos",
      name: "Dr. Carlos Mendes",
      relation: "Chefe de Neurologia",
      image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      notes: "Tinha disputas profissionais com a vítima por recursos hospitalares."
    },
    {
      id: "mariana",
      name: "Mariana Costa",
      relation: "Assistente da Dra. Helena",
      image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      notes: "Trabalhava diretamente com a vítima e tinha acesso a todas suas investigações."
    },
    {
      id: "eduardo",
      name: "Eduardo Silva",
      relation: "Farmacêutico-chefe",
      image: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      notes: "Responsável pelo controle de medicamentos do hospital, incluindo opioides."
    },
    {
      id: "renata",
      name: "Dra. Renata Oliveira",
      relation: "Amiga e colega de departamento",
      image: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      notes: "Amiga de longa data da vítima, poderia herdar sua posição no departamento."
    }
  ],
  evidence: [
    {
      id: "corpo",
      title: "Relatório de Autópsia",
      type: "report",
      content: "A morte foi causada por overdose de morfina, mascarada inicialmente como ataque cardíaco devido ao histórico de problemas cardíacos da vítima.",
      imageSrc: "https://images.unsplash.com/photo-1579154392429-0e6b4e850ad2?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    },
    {
      id: "registros",
      title: "Registros de Medicamentos",
      type: "document",
      content: "Análise revelando discrepâncias sistemáticas nos estoques de morfina e outros opioides nos últimos seis meses.",
      imageSrc: "https://images.unsplash.com/photo-1532938911079-1b06ac7ceec7?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    },
    {
      id: "camera",
      title: "Gravações de Segurança",
      type: "photo",
      content: "Falha seletiva no sistema de segurança durante os 15 minutos críticos após a entrada da Dra. Helena no almoxarifado.",
      imageSrc: "https://images.unsplash.com/photo-1555952494-efd681c7e3f9?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    }
  ],
  interrogations: [
    {
      id: "carlos-depoimento",
      title: "Depoimento do Dr. Carlos",
      suspectId: "carlos",
      date: "15/10/2023",
      dialogLines: [
        {
          speaker: "Investigador",
          text: "Dr. Mendes, qual era sua relação com a Dra. Helena?",
          isInvestigator: true
        },
        {
          speaker: "Carlos",
          text: "Éramos colegas há mais de dez anos. Ela era chefe do departamento de cardiologia, e eu sou chefe da neurologia. Tínhamos uma relação profissional respeitosa, embora discordássemos ocasionalmente sobre alocação de recursos do hospital."
        },
        {
          speaker: "Investigador",
          text: "Onde o senhor estava na noite do incidente?",
          isInvestigator: true
        },
        {
          speaker: "Carlos",
          text: "Eu estava em uma cirurgia de emergência que começou às 19h e terminou por volta das 21h30. Toda a equipe do centro cirúrgico pode confirmar. Só soube da morte de Helena quando saí da cirurgia."
        }
      ]
    },
    {
      id: "mariana-depoimento",
      title: "Depoimento de Mariana",
      suspectId: "mariana",
      date: "15/10/2023",
      dialogLines: [
        {
          speaker: "Investigador",
          text: "Sra. Costa, entendo que você era assistente da Dra. Helena. O que pode nos contar sobre ela?",
          isInvestigator: true
        },
        {
          speaker: "Mariana",
          text: "Sim, eu trabalhava diretamente com ela há dois anos. A Dra. Helena era extremamente metódica e organizada. Nos últimos dias, ela estava revisando todos os registros de medicamentos controlados dos últimos seis meses. Parecia preocupada."
        },
        {
          speaker: "Investigador",
          text: "Ela mencionou o motivo dessa revisão?",
          isInvestigator: true
        },
        {
          speaker: "Mariana",
          text: "Ela disse que havia notado discrepâncias nos números do estoque, especialmente em analgésicos e sedativos. Na tarde em que morreu, ela comentou que tinha descoberto algo sério e que precisava confrontar alguém. Não disse quem."
        }
      ]
    },
    {
      id: "eduardo-depoimento",
      title: "Depoimento de Eduardo",
      suspectId: "eduardo",
      date: "16/10/2023",
      dialogLines: [
        {
          speaker: "Investigador",
          text: "Sr. Silva, qual é sua função no hospital?",
          isInvestigator: true
        },
        {
          speaker: "Eduardo",
          text: "Sou farmacêutico-chefe e coordeno a distribuição de medicamentos para todos os setores. Trabalho aqui há cinco anos."
        },
        {
          speaker: "Investigador",
          text: "Os registros mostram que seu cartão de acesso foi usado no almoxarifado às 20:22. Como explica isso?",
          isInvestigator: true
        },
        {
          speaker: "Eduardo",
          text: "Eu... deve haver algum erro. Talvez eu tenha passado rapidamente para pegar algo, mas não me lembro. A farmácia fica próxima ao almoxarifado, então posso ter entrado brevemente."
        }
      ]
    },
    {
      id: "renata-depoimento",
      title: "Depoimento de Renata",
      suspectId: "renata",
      date: "16/10/2023",
      dialogLines: [
        {
          speaker: "Investigador",
          text: "Dra. Oliveira, entendo que você era amiga próxima da Dra. Helena. É verdade?",
          isInvestigator: true
        },
        {
          speaker: "Renata",
          text: "Sim, éramos amigas há mais de vinte anos, desde a faculdade de medicina. Também somos colegas de departamento, sou cardiologista como ela era."
        },
        {
          speaker: "Investigador",
          text: "Helena havia compartilhado alguma preocupação com você recentemente?",
          isInvestigator: true
        },
        {
          speaker: "Renata",
          text: "Na verdade, sim. Há cerca de duas semanas, ela me disse que estava preocupada com o que chamou de 'irregularidades sérias' nos registros de medicamentos. Helena suspeitava que alguém estava desviando opioides e falsificando documentação."
        }
      ]
    }
  ],
  solution: {
    culpritId: "eduardo",
    conclusion: "Eduardo Silva é o assassino. Ele estava desviando medicamentos controlados do hospital e alterando registros médicos. A Dra. Helena descobriu suas atividades ao comparar os registros de estoque com as prescrições reais. Quando ela o confrontou, ele a eliminou usando uma dose letal de morfina, aproveitando-se de sua condição cardíaca para mascarar o assassinato como morte natural."
  }
};

// Lista de todos os casos disponíveis
export const allCases = [caseBrinde, caseMansao, caseHospital];

// Template para criação de novo caso
export const caseTemplate: CaseData = {
  id: "template-caso",
  title: "Título do Caso",
  description: "Breve descrição do caso...",
  dateAdded: "Mês AAAA",
  category: "Categoria",
  difficulty: "Dificuldade",
  locations: [
    {
      id: "local-1",
      name: "Nome do Local",
      description: "Descrição do local...",
      imageSrc: "URL_DA_IMAGEM"
    }
  ],
  suspects: [
    {
      id: "suspeito-1",
      name: "Nome do Suspeito",
      relation: "Relação com a vítima",
      image: "URL_DA_IMAGEM",
      notes: "Observações sobre o suspeito..."
    }
  ],
  evidence: [
    {
      id: "evidencia-1",
      title: "Título da Evidência",
      type: "document", // Ou 'photo', 'testimony', 'report'
      content: "Descrição da evidência...",
      imageSrc: "URL_DA_IMAGEM"
    }
  ],
  interrogations: [
    {
      id: "interrogatorio-1",
      title: "Título do Interrogatório",
      suspectId: "suspeito-1",
      date: "DD/MM/AAAA",
      dialogLines: [
        {
          speaker: "Investigador",
          text: "Pergunta do investigador...",
          isInvestigator: true
        },
        {
          speaker: "Nome do Suspeito",
          text: "Resposta do suspeito..."
        }
      ]
    }
  ],
  solution: {
    culpritId: "suspeito-1",
    conclusion: "Explicação completa de como o crime foi cometido e por quê..."
  }
};
