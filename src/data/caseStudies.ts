export interface CaseStudy {
  id: string;
  title: string;
  industry: string;
  serviceId: string;
  challenge: string;
  objectives: string[];
  approach: string[];
  deliverables: string[];
  considerations: string[];
  outcomeSummary: string;
  isIllustrative: boolean;
}

export const caseStudies: CaseStudy[] = [
  {
    id: 'operational-workflows',
    title: 'Streamlining Operational Workflows for a Growing Services Firm',
    industry: 'Professional Services',
    serviceId: 'operational-excellence',
    challenge: 'A mid-size professional services organization found that internal processes had become fragmented as the team grew. Responsibilities overlapped, handoffs between departments were unclear, and project delivery timelines were inconsistent.',
    objectives: [
      'Map current workflows and identify friction points',
      'Clarify team responsibilities and handoff processes',
      'Reduce project delivery variability',
      'Create a sustainable improvement framework'
    ],
    approach: [
      'Conducted process mapping sessions with team leads and frontline staff',
      'Identified key friction points through structured interviews',
      'Designed optimized workflows with clear ownership',
      'Developed phased implementation priorities',
      'Created performance tracking mechanisms'
    ],
    deliverables: [
      'Current-state process documentation',
      'Optimized workflow designs with RACI matrices',
      'Phased implementation roadmap',
      'Performance measurement framework',
      'Team communication plan for changes'
    ],
    considerations: [
      'Changes needed to be introduced gradually to avoid disrupting active projects',
      'Team input was essential for adoption — top-down mandates would not work',
      'Some process improvements required tool changes that needed separate planning'
    ],
    outcomeSummary: 'The organization gained clarity on process ownership and established a structured approach to ongoing improvement. Teams reported better alignment on responsibilities and more predictable project timelines.',
    isIllustrative: true
  },
  {
    id: 'digital-transformation-plan',
    title: 'Planning a Responsible Digital Transformation for a Regional Business',
    industry: 'Manufacturing & Distribution',
    serviceId: 'digital-transformation',
    challenge: 'A regional manufacturing and distribution business recognized that its digital capabilities were falling behind competitors. However, the leadership team was uncertain where to start, how to prioritize investments, and how to connect technology decisions to business outcomes.',
    objectives: [
      'Assess current digital capabilities and gaps',
      'Identify and prioritize digital opportunities',
      'Create a realistic implementation roadmap',
      'Build leadership alignment on technology direction'
    ],
    approach: [
      'Assessed current technology landscape and digital capabilities',
      'Mapped business objectives to potential digital initiatives',
      'Evaluated options based on impact, feasibility, and dependencies',
      'Developed a phased roadmap with clear decision points',
      'Facilitated alignment sessions with leadership'
    ],
    deliverables: [
      'Digital capability assessment',
      'Opportunity prioritization matrix',
      'Phased technology roadmap',
      'Business case for priority initiatives',
      'Leadership alignment documentation'
    ],
    considerations: [
      'The organization had limited internal technology expertise, so the plan needed to account for support requirements',
      'Budget constraints required clear sequencing — not everything could happen at once',
      'Some quick wins were identified to build momentum for longer-term initiatives'
    ],
    outcomeSummary: 'The leadership team gained a clear, prioritized view of their digital opportunities and a practical roadmap for implementation. The phased approach allowed them to start with high-impact, lower-risk initiatives while building capability for more complex changes.',
    isIllustrative: true
  },
  {
    id: 'strategic-alignment',
    title: 'Aligning Teams Around Strategic Priorities During a Period of Growth',
    industry: 'Technology',
    serviceId: 'business-strategy',
    challenge: 'A technology company experiencing rapid growth found that different teams had developed their own interpretations of strategic priorities. This led to duplicated efforts, conflicting initiatives, and difficulty making coherent resource allocation decisions.',
    objectives: [
      'Clarify and agree on strategic priorities across the organization',
      'Create a shared understanding of trade-offs',
      'Establish a decision framework for resource allocation',
      'Build a practical roadmap that teams could execute against'
    ],
    approach: [
      'Conducted stakeholder interviews to understand perspectives and concerns',
      'Facilitated workshops to surface competing priorities and dependencies',
      'Developed a structured evaluation framework for initiatives',
      'Created a strategic roadmap with clear milestones and ownership',
      'Designed communication approach for organization-wide alignment'
    ],
    deliverables: [
      'Strategic priorities framework',
      'Initiative evaluation criteria',
      'Strategic roadmap with milestones',
      'Resource allocation guidelines',
      'Alignment communication plan'
    ],
    considerations: [
      'Not every team would get everything they wanted — trade-offs needed to be explicit',
      'The framework needed to be simple enough for ongoing use, not just a one-time exercise',
      'Regular check-ins were built in to adjust priorities as conditions changed'
    ],
    outcomeSummary: 'The organization established a shared strategic framework that teams could reference when making decisions. Leadership gained a clear mechanism for evaluating new opportunities against agreed priorities, and teams reported improved clarity on where to focus their efforts.',
    isIllustrative: true
  },
  {
    id: 'change-management',
    title: 'Supporting Organizational Change Through a Operating Model Redesign',
    industry: 'Financial Services',
    serviceId: 'organizational-change',
    challenge: 'A financial services organization needed to restructure how teams worked together to better serve clients. The proposed operating model changes were significant, and leadership was concerned about maintaining service quality during the transition.',
    objectives: [
      'Assess change readiness across affected teams',
      'Design a transition approach that minimized service disruption',
      'Build stakeholder understanding and support',
      'Create tracking mechanisms for the transition'
    ],
    approach: [
      'Assessed readiness and concerns through structured stakeholder input',
      'Designed a phased transition plan with clear milestones',
      'Developed targeted communication for different stakeholder groups',
      'Created support mechanisms for teams during the transition',
      'Established progress tracking and adjustment processes'
    ],
    deliverables: [
      'Change readiness assessment',
      'Phased transition plan',
      'Stakeholder communication plan',
      'Support and training framework',
      'Progress tracking dashboard'
    ],
    considerations: [
      'Client service continuity was the primary constraint on transition timing',
      'Middle management needed specific support — they were the critical link',
      'The plan included built-in review points to adjust based on real feedback'
    ],
    outcomeSummary: 'The organization completed the operating model transition with maintained service quality. Teams reported that the structured approach and clear communication helped them navigate the change with confidence, and the built-in review mechanisms allowed for timely adjustments.',
    isIllustrative: true
  }
];

export function getCaseStudyById(id: string): CaseStudy | undefined {
  return caseStudies.find(cs => cs.id === id);
}

export function getCaseStudiesByService(serviceId: string): CaseStudy[] {
  return caseStudies.filter(cs => cs.serviceId === serviceId);
}
