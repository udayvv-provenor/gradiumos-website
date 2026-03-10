
export interface CompetenceLevel {
  id: string;
  level: number;
  title: string;
  description: string;
  milestones: string[];
}

export interface Simulation {
  id: string;
  title: string;
  category: string;
  difficulty: 'L1' | 'L2' | 'L3' | 'L4' | 'L5';
  duration: string;
  image: string;
}

export interface ReadinessSignal {
  id: string;
  name: string;
  issuer: string;
  status: 'Verified' | 'Pending' | 'In Progress';
  icon: string;
}
