export interface Article {
  id: string;
  title: string;
  category: string;
  summary: string;
  date: string;
  readTime: string;
  serviceId?: string;
}

export const articles: Article[] = [
  {
    id: 'prioritizing-competing-initiatives',
    title: 'How to Prioritize Competing Business Initiatives',
    category: 'Strategy',
    summary: 'When every initiative feels urgent, making clear prioritization decisions becomes essential. A structured approach to evaluation helps teams focus resources on what matters most.',
    date: '2025-01-15',
    readTime: '6 min read',
    serviceId: 'business-strategy'
  },
  {
    id: 'useful-strategic-roadmap',
    title: 'Creating a Strategic Roadmap That Teams Actually Use',
    category: 'Strategy',
    summary: 'Most strategic roadmaps fail not because the strategy is wrong, but because they are too complex, too abstract, or disconnected from how teams actually make decisions.',
    date: '2025-02-03',
    readTime: '8 min read',
    serviceId: 'business-strategy'
  },
  {
    id: 'identifying-operational-friction',
    title: 'Identifying Operational Friction Before It Becomes a Crisis',
    category: 'Operations',
    summary: 'Operational problems rarely appear suddenly. They accumulate through small inefficiencies that compound over time. Learning to spot early signals helps teams act before friction becomes structural.',
    date: '2025-02-20',
    readTime: '5 min read',
    serviceId: 'operational-excellence'
  },
  {
    id: 'responsible-digital-transformation',
    title: 'Planning Digital Transformation Without Overpromising',
    category: 'Digital',
    summary: 'Digital transformation initiatives fail when they start with technology rather than business problems. A responsible approach begins with understanding what needs to change and why.',
    date: '2025-03-10',
    readTime: '7 min read',
    serviceId: 'digital-transformation'
  },
  {
    id: 'aligning-teams-organizational-change',
    title: 'Aligning Teams Around Organizational Change',
    category: 'Change',
    summary: 'Change initiatives stall when teams do not share a common understanding of what is changing and why. Alignment requires more than communication — it requires genuine involvement in the design.',
    date: '2025-03-25',
    readTime: '6 min read',
    serviceId: 'organizational-change'
  },
  {
    id: 'decisions-incomplete-information',
    title: 'Making Better Decisions with Incomplete Information',
    category: 'Strategy',
    summary: 'Waiting for perfect information is not a strategy. The most effective decision-makers learn to act with what they know while building mechanisms to adjust as new information emerges.',
    date: '2025-04-08',
    readTime: '5 min read',
    serviceId: 'business-strategy'
  },
  {
    id: 'strategy-implementation-milestones',
    title: 'Turning Strategy into Implementation Milestones',
    category: 'Operations',
    summary: 'The gap between strategy and execution is rarely a lack of ambition. It is usually a lack of structure. Breaking strategy into concrete milestones with clear ownership makes execution possible.',
    date: '2025-04-22',
    readTime: '7 min read',
    serviceId: 'operational-excellence'
  },
  {
    id: 'evaluating-process-before-replacing',
    title: 'Evaluating a Business Process Before Replacing It',
    category: 'Operations',
    summary: 'Not every process that feels broken needs to be replaced. Sometimes the issue is not the process itself but how it is resourced, governed, or connected to other workflows.',
    date: '2025-05-05',
    readTime: '6 min read',
    serviceId: 'operational-excellence'
  }
];

export function getArticleById(id: string): Article | undefined {
  return articles.find(a => a.id === id);
}

export function getArticlesByCategory(category: string): Article[] {
  return articles.filter(a => a.category === category);
}

export const articleCategories = [...new Set(articles.map(a => a.category))];
