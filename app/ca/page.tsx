'use client';

import { useState } from 'react';

interface Competitor {
  name: string;
  description: string[];
  cost: string;
  duration: string;
  focus: string[];
  features: string[];
}

export default function CompetitorAnalysisPage() {
  const [selectedCompetitor, setSelectedCompetitor] = useState<string | null>(null);

  const competitors: Record<string, Competitor> = {
    'Year Up': {
      name: 'Year Up',
      description: [
        'Targets 18-24 year-olds from low-income backgrounds',
        'Offers longer programs with internships at major employers',
        'Focuses on professional and technical skills development'
      ],
      cost: '$28,290 per participant (employer funded)',
      duration: 'Long-term program with internships',
      focus: ['Professional skills', 'Technical skills', 'Workplace experience'],
      features: [
        'Employer-funded model',
        'Internship placements',
        'Comprehensive training',
        'Professional development'
      ]
    },
    'BrainStation': {
      name: 'BrainStation',
      description: [
        'Offers immersive, project-based learning experiences',
        'Provides both online and in-person options',
        'Focuses on professionals and organizations'
      ],
      cost: '$16,500 for bootcamps',
      duration: 'Various program lengths',
      focus: ['Project-based learning', 'Professional development', 'Tech skills'],
      features: [
        'Online and in-person options',
        'Project-based curriculum',
        'Professional focus',
        'Industry partnerships'
      ]
    },
    'Hack Reactor': {
      name: 'Hack Reactor',
      description: [
        'Offers 12-week immersive coding bootcamps',
        'Provides strong alumni network and job placement support',
        'Focuses on adult learners transitioning into tech careers'
      ],
      cost: '$19,480 (all formats)',
      duration: '12 weeks',
      focus: ['Coding', 'Software Engineering', 'Career Transition'],
      features: [
        'Income share agreements',
        'Strong alumni network',
        'Job placement support',
        'Multiple format options'
      ]
    },
    'App Academy': {
      name: 'App Academy',
      description: [
        'Offers 16-week Software Engineering Immersive program',
        'Provides both in-person and online options',
        'Uses income share agreements',
        'Strong focus on job placement'
      ],
      cost: '$17,000-$31,000 (depending on payment method)',
      duration: '16-24 weeks',
      focus: ['Software Engineering', 'Job Placement', 'Career Support'],
      features: [
        'Income share agreements',
        'Access Scholarship ($5,000)',
        'Multiple program lengths',
        'Comprehensive curriculum'
      ]
    },
    'General Assembly': {
      name: 'General Assembly',
      description: [
        'Offers a variety of tech-focused bootcamps and courses',
        'Provides flexible learning formats',
        'Targets both individuals and enterprises',
        'Strong focus on practical training'
      ],
      cost: '$1,250-$14,950 (varies by program)',
      duration: 'Various (part-time to full-time)',
      focus: ['Tech Skills', 'Enterprise Training', 'Professional Development'],
      features: [
        'Flexible formats',
        'Multiple course options',
        'Enterprise solutions',
        'Global presence'
      ]
    },
    'Flatiron School': {
      name: 'Flatiron School',
      description: [
        'Offers both full-time and part-time options',
        'Provides a job guarantee',
        'Focuses on multiple tech disciplines',
        'Comprehensive curriculum'
      ],
      cost: '$17,900',
      duration: '15-40 weeks',
      focus: ['Software Engineering', 'Data Science', 'Cybersecurity', 'Product Design'],
      features: [
        'Job guarantee',
        'Multiple disciplines',
        'Flexible scheduling',
        'Career support'
      ]
    }
  };

  const eliteClassFeatures = {
    name: 'EliteClass',
    description: [
      'Short, intensive program in Silicon Valley',
      'Direct partnership with Carnegie Mellon University',
      'Guaranteed Microsoft certifications',
      'Focus on Indian engineering students'
    ],
    cost: '$2,500',
    duration: '2 weeks',
    focus: ['Silicon Valley Immersion', 'Microsoft Certifications', 'Networking'],
    features: [
      'CMU partnership',
      'Microsoft certifications',
      'Silicon Valley exposure',
      'Affordable pricing'
    ]
  };

  return (
    <div className="min-h-screen p-6 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white flex items-center gap-3">
            <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
            Competitor Analysis
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 mt-4">
            Compare EliteClass with other leading tech education providers
          </p>
        </div>

        {/* EliteClass Card */}
        <div className="mb-8 bg-blue-50 dark:bg-blue-900/20 p-6 rounded-lg border-2 border-blue-200 dark:border-blue-800">
          <h2 className="text-2xl font-bold text-blue-900 dark:text-blue-100 mb-4">EliteClass Advantages</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {eliteClassFeatures.features.map((feature, index) => (
              <div key={index} className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm">
                <p className="font-semibold text-blue-600 dark:text-blue-400">{feature}</p>
              </div>
            ))}
          </div>
          <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm">
              <p className="font-semibold text-gray-600 dark:text-gray-400">Cost</p>
              <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">{eliteClassFeatures.cost}</p>
            </div>
            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm">
              <p className="font-semibold text-gray-600 dark:text-gray-400">Duration</p>
              <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">{eliteClassFeatures.duration}</p>
            </div>
            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm">
              <p className="font-semibold text-gray-600 dark:text-gray-400">Focus Areas</p>
              <div className="flex flex-wrap gap-2 mt-2">
                {eliteClassFeatures.focus.map((item, index) => (
                  <span key={index} className="px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded text-sm">
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Competitor Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Object.entries(competitors).map(([key, competitor]) => (
            <div
              key={key}
              className={`bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden transition-all duration-200 ${
                selectedCompetitor === key ? 'ring-2 ring-blue-500' : ''
              }`}
              onClick={() => setSelectedCompetitor(selectedCompetitor === key ? null : key)}
            >
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{competitor.name}</h3>
                <div className="space-y-4">
                  <div>
                    <p className="text-sm font-semibold text-gray-500 dark:text-gray-400">Cost</p>
                    <p className="text-lg font-bold text-gray-900 dark:text-white">{competitor.cost}</p>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-500 dark:text-gray-400">Duration</p>
                    <p className="text-lg font-bold text-gray-900 dark:text-white">{competitor.duration}</p>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-500 dark:text-gray-400">Key Features</p>
                    <ul className="mt-2 space-y-1">
                      {competitor.features.map((feature, index) => (
                        <li key={index} className="text-gray-600 dark:text-gray-300 flex items-center">
                          <svg className="w-4 h-4 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-500 dark:text-gray-400">Focus Areas</p>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {competitor.focus.map((item, index) => (
                        <span key={index} className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded text-sm">
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Selected Competitor Comparison */}
        {selectedCompetitor && (
          <div className="mt-8 bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-bold mb-6">EliteClass vs {selectedCompetitor}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-semibold mb-4">EliteClass</h3>
                <ul className="space-y-3">
                  {eliteClassFeatures.description.map((item, index) => (
                    <li key={index} className="flex items-start">
                      <svg className="w-5 h-5 mr-2 text-green-500 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-4">{selectedCompetitor}</h3>
                <ul className="space-y-3">
                  {competitors[selectedCompetitor].description.map((item, index) => (
                    <li key={index} className="flex items-start">
                      <svg className="w-5 h-5 mr-2 text-blue-500 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}