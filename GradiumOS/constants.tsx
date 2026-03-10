
import React from 'react';
import { Shield, Target, Cpu, Layers, Activity, Award, Briefcase, GraduationCap } from 'lucide-react';
import { CompetenceLevel, Simulation, ReadinessSignal } from './types';

export const COMPETENCE_LEVELS: CompetenceLevel[] = [
  {
    id: 'l1',
    level: 1,
    title: 'Foundational Knowledge',
    description: 'Understanding core concepts and terminology of the domain.',
    milestones: ['Terminology Quiz', 'Concept Mapping', 'Basic Frameworks']
  },
  {
    id: 'l2',
    level: 2,
    title: 'Applied Theory',
    description: 'Demonstrating the ability to solve predefined problems.',
    milestones: ['Case Study Analysis', 'Tool Proficiency', 'Standard Scenarios']
  },
  {
    id: 'l3',
    level: 3,
    title: 'Operational Fluency',
    description: 'Executing tasks in a professional environment with guidance.',
    milestones: ['Workplace Sims', 'Communication Labs', 'Task Execution']
  },
  {
    id: 'l4',
    level: 4,
    title: 'Collaborative Readiness',
    description: 'Driving value within complex, cross-functional teams.',
    milestones: ['Team Projects', 'Conflict Management', 'Peer Leadership']
  },
  {
    id: 'l5',
    level: 5,
    title: 'Strategic Mastery',
    description: 'Solving ambiguous, high-stakes problems autonomously.',
    milestones: ['Executive Simulation', 'Crisis Management', 'System Design']
  }
];

export const SIMULATIONS: Simulation[] = [
  {
    id: 'sim1',
    title: 'Business Planning',
    category: 'Management',
    difficulty: 'L4',
    duration: '45 mins',
    image: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?q=80&w=2070&auto=format&fit=crop'
  },
  {
    id: 'sim2',
    title: 'Experience & Process Design',
    category: 'Engineering',
    difficulty: 'L3',
    duration: '30 mins',
    image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=2070&auto=format&fit=crop'
  },
  {
    id: 'sim3',
    title: 'High-Stakes Negotiation',
    category: 'Sales',
    difficulty: 'L5',
    duration: '60 mins',
    image: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?q=80&w=2070&auto=format&fit=crop'
  }
];

export const READINESS_SIGNALS: ReadinessSignal[] = [
  { id: 's1', name: 'Strategic Communication', issuer: 'Provenor Certified', status: 'Verified', icon: 'Shield' },
  { id: 's2', name: 'Data-Driven Decision Making', issuer: 'Gradium Standard', status: 'Verified', icon: 'Award' },
  { id: 's3', name: 'Agile Workflow Execution', issuer: 'Industry Verified', status: 'In Progress', icon: 'Cpu' }
];