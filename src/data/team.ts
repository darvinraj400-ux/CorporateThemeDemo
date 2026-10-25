export interface TeamMember {
  id: string;
  name: string;
  role: string;
  bio: string;
  expertise: string[];
  background: string;
  isSample: boolean;
  portrait: string;
}

export const teamMembers: TeamMember[] = [
  {
    id: 'sarah-chen',
    name: 'Sarah Chen',
    role: 'Managing Partner, Strategy',
    bio: 'Leads strategy engagements with a focus on helping leadership teams clarify priorities and build practical roadmaps. Brings experience across technology, professional services, and manufacturing sectors.',
    expertise: ['Strategic planning', 'Growth strategy', 'Decision frameworks', 'Stakeholder alignment'],
    background: '15+ years in management consulting and corporate strategy',
    isSample: true,
    portrait: 'https://image.qwenlm.ai/generated-images/24679a13-14c6-4314-80d8-2af56d13c450/_result.png'
  },
  {
    id: 'marcus-webb',
    role: 'Partner, Operations',
    name: 'Marcus Webb',
    bio: 'Focuses on operational improvement and process optimization. Works with teams to identify friction, clarify responsibilities, and design workflows that support consistent delivery.',
    expertise: ['Process optimization', 'Workflow design', 'Performance measurement', 'Resource planning'],
    background: '12+ years in operations consulting and process improvement',
    isSample: true,
    portrait: 'https://image.qwenlm.ai/generated-images/82d2dc13-d3e4-4ce0-9b3d-04b0837685c6/_result.png'
  },
  {
    id: 'elena-rodriguez',
    name: 'Elena Rodriguez',
    role: 'Partner, Digital & Technology',
    bio: 'Helps organizations navigate digital opportunities with a business-first approach. Connects technology decisions to clear business outcomes and realistic implementation plans.',
    expertise: ['Digital strategy', 'Technology assessment', 'Implementation planning', 'Capability building'],
    background: '10+ years in digital transformation and technology advisory',
    isSample: true,
    portrait: 'https://image.qwenlm.ai/generated-images/2ebece2e-0c5e-496d-8cba-dbe02437cc35/_result.png'
  },
  {
    id: 'david-okafor',
    name: 'David Okafor',
    role: 'Partner, Organizational Change',
    bio: 'Supports organizations through significant transitions with a focus on practical implementation and genuine stakeholder engagement. Believes that sustainable change requires both structure and understanding.',
    expertise: ['Change management', 'Operating model design', 'Implementation support', 'Team alignment'],
    background: '14+ years in organizational design and change leadership',
    isSample: true,
    portrait: 'https://image.qwenlm.ai/generated-images/94a00686-a0aa-41f9-ba69-5a562b2c2b8d/_result.png'
  }
];
