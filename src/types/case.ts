
export interface CaseEvidence {
  id: string;
  title: string;
  type: 'document' | 'photo' | 'testimony' | 'report';
  content: string;
  imageSrc?: string;
  notes?: string;
}

export interface CaseSuspect {
  id: string;
  name: string;
  relation: string;
  image?: string;
  notes?: string;
  isGuilty?: boolean;
  isCleared?: boolean;
}

export interface CaseLocation {
  id: string;
  name: string;
  description: string;
  imageSrc?: string;
}

export interface InvestigationPath {
  id: string;
  title: string;
  description: string;
}

export interface DialogLine {
  speaker: string;
  text: string;
  isInvestigator?: boolean;
}

export interface Interrogation {
  id: string;
  title: string;
  suspectId: string;
  date?: string;
  dialogLines: DialogLine[];
}

export interface CaseData {
  id: string;
  title: string;
  description: string;
  dateAdded: string;
  category: string;
  difficulty: string;
  locations: CaseLocation[];
  suspects: CaseSuspect[];
  evidence: CaseEvidence[];
  interrogations: Interrogation[];
  solution: {
    culpritId: string;
    conclusion: string;
  };
}

// Interface para controle de progresso do usuário
export interface UserProgress {
  caseId: string;
  completedSteps: string[];
  notes: string[];
  currentPage: number;
  isCompleted: boolean;
  accusedSuspect?: string;
  accuracy?: number;
}
