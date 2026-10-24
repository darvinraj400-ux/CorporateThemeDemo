export interface Service {
  id: string;
  number: string;
  title: string;
  summary: string;
  problems: string[];
  areas: string[];
  deliverables: string[];
  approach: string[];
  stakeholders: string[];
  faqs: { question: string; answer: string }[];
}

export const services: Service[] = [
  {
    id: 'business-strategy',
    number: '01',
    title: 'Business Strategy',
    summary: 'Help organizations clarify priorities, assess opportunities, define objectives, and build practical strategic roadmaps.',
    problems: [
      'Unclear strategic direction or competing priorities',
      'Difficulty translating vision into actionable plans',
      'Market shifts requiring strategic reassessment',
      'Growth opportunities that need structured evaluation',
      'Misalignment between leadership on key decisions'
    ],
    areas: [
      'Strategic priority setting',
      'Market and competitive analysis',
      'Growth opportunity assessment',
      'Strategic roadmap development',
      'Decision framework design',
      'Stakeholder alignment'
    ],
    deliverables: [
      'Strategic priorities document',
      'Opportunity assessment matrix',
      'Strategic roadmap with milestones',
      'Decision-making frameworks',
      'Stakeholder communication plan'
    ],
    approach: [
      'Stakeholder interviews and perspective gathering',
      'Market and competitive context analysis',
      'Opportunity identification and evaluation',
      'Priority setting and trade-off analysis',
      'Roadmap development with clear milestones',
      'Alignment sessions with leadership team'
    ],
    stakeholders: [
      'CEO and executive leadership',
      'Board members',
      'Department heads',
      'Strategy and planning teams',
      'Investor relations'
    ],
    faqs: [
      {
        question: 'How long does a typical strategy engagement last?',
        answer: 'Strategy engagements typically range from 6 to 12 weeks depending on scope, stakeholder availability, and the complexity of the decision context.'
      },
      {
        question: 'Do you work with organizations of a specific size?',
        answer: 'We work with mid-market and enterprise organizations. Our approach adapts to the complexity and decision-making structure of each client.'
      },
      {
        question: 'How do you ensure recommendations are practical?',
        answer: 'Every recommendation is grounded in the organization\'s actual capabilities, resources, and constraints. We work with teams to validate feasibility before finalizing direction.'
      }
    ]
  },
  {
    id: 'operational-excellence',
    number: '02',
    title: 'Operational Excellence',
    summary: 'Identify process friction, clarify responsibilities, improve workflows, and help teams make better use of available resources.',
    problems: [
      'Processes that feel inefficient or duplicative',
      'Unclear ownership and accountability',
      'Resource constraints limiting output',
      'Quality inconsistencies across teams',
      'Difficulty scaling current operations'
    ],
    areas: [
      'Process mapping and analysis',
      'Workflow optimization',
      'Responsibility clarification',
      'Resource allocation review',
      'Performance measurement design',
      'Continuous improvement frameworks'
    ],
    deliverables: [
      'Current-state process maps',
      'Friction and waste analysis',
      'Optimized workflow designs',
      'RACI responsibility matrices',
      'Performance dashboards',
      'Implementation priorities'
    ],
    approach: [
      'Current-state process documentation',
      'Stakeholder and frontline input gathering',
      'Friction point identification',
      'Future-state workflow design',
      'Responsibility and handoff clarification',
      'Phased implementation planning'
    ],
    stakeholders: [
      'Operations leaders',
      'Process owners',
      'Frontline teams',
      'Quality and compliance',
      'Finance and resource planning'
    ],
    faqs: [
      {
        question: 'How do you identify the right processes to improve?',
        answer: 'We start by understanding your business objectives, then map current workflows to identify where friction, waste, or misalignment creates the most impact on your priorities.'
      },
      {
        question: 'Will this require significant disruption to current operations?',
        answer: 'We design improvements to minimize disruption. Changes are phased, tested where possible, and implemented with clear communication to affected teams.'
      }
    ]
  },
  {
    id: 'digital-transformation',
    number: '03',
    title: 'Digital Transformation',
    summary: 'Help businesses understand their digital opportunities, prioritize initiatives, improve systems, and plan technology adoption.',
    problems: [
      'Unclear digital strategy or priorities',
      'Legacy systems limiting business agility',
      'Technology investments not delivering expected value',
      'Digital capabilities lagging behind competitors',
      'Difficulty connecting technology decisions to business outcomes'
    ],
    areas: [
      'Digital opportunity assessment',
      'Technology prioritization',
      'Digital capability mapping',
      'Implementation planning',
      'Change management for technology adoption',
      'Vendor and platform evaluation'
    ],
    deliverables: [
      'Digital opportunity assessment',
      'Technology priority roadmap',
      'Capability gap analysis',
      'Implementation sequencing plan',
      'Business case documentation',
      'Adoption and change plan'
    ],
    approach: [
      'Current digital capability assessment',
      'Business objective alignment',
      'Opportunity identification and sizing',
      'Technology option evaluation',
      'Prioritized implementation roadmap',
      'Change and adoption planning'
    ],
    stakeholders: [
      'CIO and technology leadership',
      'Business unit leaders',
      'Digital and product teams',
      'IT operations',
      'Change management leads'
    ],
    faqs: [
      {
        question: 'Do you implement technology solutions?',
        answer: 'We focus on strategy, planning, and prioritization. We help you make informed decisions about what to build, buy, or improve — and plan the implementation approach.'
      },
      {
        question: 'How do you avoid recommending unnecessary technology?',
        answer: 'Every technology recommendation starts with a clear business problem. We evaluate options based on actual needs, existing capabilities, and realistic implementation capacity.'
      }
    ]
  },
  {
    id: 'organizational-change',
    number: '04',
    title: 'Organizational Change',
    summary: 'Support teams through changing priorities, new ways of working, operating-model improvements, and structured implementation.',
    problems: [
      'Change initiatives stalling or losing momentum',
      'Teams struggling with new ways of working',
      'Operating model misalignment with strategy',
      'Resistance or confusion during transitions',
      'Implementation plans lacking structure'
    ],
    areas: [
      'Change readiness assessment',
      'Operating model design',
      'Implementation planning',
      'Stakeholder communication',
      'Team alignment and capability building',
      'Progress tracking and adjustment'
    ],
    deliverables: [
      'Change readiness assessment',
      'Operating model design',
      'Implementation plan with milestones',
      'Communication and engagement plan',
      'Progress tracking framework',
      'Adjustment recommendations'
    ],
    approach: [
      'Current-state and readiness assessment',
      'Stakeholder understanding and concern mapping',
      'Future-state design with input',
      'Structured implementation sequencing',
      'Communication and support planning',
      'Progress review and course correction'
    ],
    stakeholders: [
      'Executive sponsors',
      'People and culture teams',
      'Middle management',
      'Change champions',
      'Affected business units'
    ],
    faqs: [
      {
        question: 'How do you handle resistance to change?',
        answer: 'We treat resistance as information. Understanding concerns helps us design approaches that address real issues rather than pushing through without alignment.'
      },
      {
        question: 'What makes your approach different from generic change management?',
        answer: 'We connect change directly to business outcomes and work with the actual people involved. Our approach is practical, specific to your context, and focused on sustainable adoption.'
      }
    ]
  }
];

export function getServiceById(id: string): Service | undefined {
  return services.find(s => s.id === id);
}
