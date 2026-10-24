export interface AssessmentAnswers {
  challenge: string;
  situation: string;
  outcome: string;
}

export interface AssessmentResult {
  serviceId: string;
  serviceTitle: string;
  explanation: string;
  discussionTopics: string[];
  relatedCaseStudyId: string;
}

export function getAssessmentResult(answers: AssessmentAnswers): AssessmentResult {
  const { challenge, situation, outcome } = answers;

  // Determine primary service based on challenge
  let serviceId = 'business-strategy';
  
  if (challenge === 'clarifying-direction') {
    serviceId = 'business-strategy';
  } else if (challenge === 'improving-operations') {
    serviceId = 'operational-excellence';
  } else if (challenge === 'modernizing-digital') {
    serviceId = 'digital-transformation';
  } else if (challenge === 'organizational-change') {
    serviceId = 'organizational-change';
  } else if (challenge === 'new-opportunity') {
    serviceId = 'business-strategy';
  } else if (challenge === 'not-sure') {
    // Use situation to determine
    if (situation === 'unclear-priorities') {
      serviceId = 'business-strategy';
    } else if (situation === 'inefficient-processes') {
      serviceId = 'operational-excellence';
    } else if (situation === 'implementation-plan') {
      serviceId = 'organizational-change';
    } else if (situation === 'team-alignment') {
      serviceId = 'organizational-change';
    } else {
      serviceId = 'business-strategy';
    }
  }

  // Refine based on outcome preference
  if (outcome === 'strategic-roadmap') {
    if (serviceId !== 'business-strategy') {
      serviceId = 'business-strategy';
    }
  } else if (outcome === 'efficient-workflows') {
    if (serviceId !== 'operational-excellence') {
      serviceId = 'operational-excellence';
    }
  } else if (outcome === 'digital-plan') {
    if (serviceId !== 'digital-transformation') {
      serviceId = 'digital-transformation';
    }
  } else if (outcome === 'implementation-alignment') {
    if (serviceId !== 'organizational-change') {
      serviceId = 'organizational-change';
    }
  }

  const serviceMap: Record<string, { title: string; explanation: string; topics: string[]; caseStudy: string }> = {
    'business-strategy': {
      title: 'Business Strategy',
      explanation: 'Based on your responses, a strategy-focused engagement may be the most relevant starting point. This area focuses on clarifying priorities, evaluating options, and building a practical direction for your organization.',
      topics: [
        'Current strategic priorities and how they were set',
        'Key decisions that need clearer frameworks',
        'How leadership currently aligns on direction',
        'What a useful strategic roadmap would look like for your team'
      ],
      caseStudy: 'strategic-alignment'
    },
    'operational-excellence': {
      title: 'Operational Excellence',
      explanation: 'Based on your responses, an operations-focused engagement may be the most relevant starting point. This area focuses on identifying process friction, clarifying responsibilities, and improving how work flows through your organization.',
      topics: [
        'Which processes feel most inefficient or inconsistent',
        'Where responsibilities overlap or fall between teams',
        'How you currently measure operational performance',
        'What improvements would have the most immediate impact'
      ],
      caseStudy: 'operational-workflows'
    },
    'digital-transformation': {
      title: 'Digital Transformation',
      explanation: 'Based on your responses, a digital transformation engagement may be the most relevant starting point. This area focuses on understanding digital opportunities, prioritizing technology initiatives, and planning responsible adoption.',
      topics: [
        'Current digital capabilities and known gaps',
        'Business objectives that technology could support',
        'Previous technology investments and their outcomes',
        'How technology decisions connect to business priorities'
      ],
      caseStudy: 'digital-transformation-plan'
    },
    'organizational-change': {
      title: 'Organizational Change',
      explanation: 'Based on your responses, an organizational change engagement may be the most relevant starting point. This area focuses on supporting teams through transitions, designing operating models, and building structured implementation approaches.',
      topics: [
        'The nature and scope of the change you are navigating',
        'Current readiness and known concerns across teams',
        'How the change connects to business objectives',
        'What support structures would help teams adapt'
      ],
      caseStudy: 'change-management'
    }
  };

  const result = serviceMap[serviceId];
  
  return {
    serviceId,
    serviceTitle: result.title,
    explanation: result.explanation,
    discussionTopics: result.topics,
    relatedCaseStudyId: result.caseStudy
  };
}

export const challengeOptions = [
  { value: 'clarifying-direction', label: 'Clarifying business direction' },
  { value: 'improving-operations', label: 'Improving operations' },
  { value: 'modernizing-digital', label: 'Modernizing digital systems' },
  { value: 'organizational-change', label: 'Supporting organizational change' },
  { value: 'new-opportunity', label: 'Exploring a new opportunity' },
  { value: 'not-sure', label: 'Not sure yet' }
];

export const situationOptions = [
  { value: 'unclear-priorities', label: 'We need clearer priorities' },
  { value: 'inefficient-processes', label: 'Our processes feel inefficient' },
  { value: 'implementation-plan', label: 'We need a structured implementation plan' },
  { value: 'team-alignment', label: 'Different teams need better alignment' },
  { value: 'exploring-options', label: 'We are exploring our options' }
];

export const outcomeOptions = [
  { value: 'strategic-roadmap', label: 'A clearer strategic roadmap' },
  { value: 'efficient-workflows', label: 'More efficient workflows' },
  { value: 'digital-plan', label: 'A digital transformation plan' },
  { value: 'implementation-alignment', label: 'Better implementation alignment' },
  { value: 'initial-assessment', label: 'A structured initial assessment' }
];
