'use client';

import { useState } from 'react';
import BMCDetailView from '../components/BMCDetailView';

interface BMCSection {
  title: string;
  content: string[];
  color: string;
}

export default function BusinessModelCanvasPage() {
  const [activeSection, setActiveSection] = useState<string | null>(null);

  const sections: Record<string, BMCSection> = {
    'value-propositions': {
      title: 'Value Propositions',
      content: [
        'Core Program Benefits',
        'Program Structure Excellence',
        'Career Advancement',
        'Investment Value'
      ],
      color: 'bg-blue-100 dark:bg-blue-900'
    },
    'customer-segments': {
      title: 'Customer Segments',
      content: [
        'Engineering Students',
        'Recent Graduates',
        'Target Specializations',
        'Geographic Focus'
      ],
      color: 'bg-purple-100 dark:bg-purple-900'
    },
    'channels': {
      title: 'Channels',
      content: [
        'Marketing & Recruitment',
        'Program Delivery',
        'Communication',
        'Support Channels'
      ],
      color: 'bg-indigo-100 dark:bg-indigo-900'
    },
    'customer-relationships': {
      title: 'Customer Relationships',
      content: [
        'Pre-Program Engagement',
        'During Program Support',
        'Post-Program Relationships',
        'Quality Assurance'
      ],
      color: 'bg-pink-100 dark:bg-pink-900'
    },
    'revenue-streams': {
      title: 'Revenue Streams',
      content: [
        'Core Program Fee ($2,500)',
        'Extra Certification Programs',
        'Value-Added Services',
        'Financial Metrics'
      ],
      color: 'bg-orange-100 dark:bg-orange-900'
    },
    'key-resources': {
      title: 'Key Resources',
      content: [
        'Physical Resources',
        'Human Resources',
        'Intellectual Resources',
        'Brand Resources'
      ],
      color: 'bg-cyan-100 dark:bg-cyan-900'
    },
    'key-activities': {
      title: 'Key Activities',
      content: [
        'Program Delivery',
        'Student Support',
        'Quality Management',
        'Partnership Management'
      ],
      color: 'bg-teal-100 dark:bg-teal-900'
    },
    'key-partners': {
      title: 'Key Partners',
      content: [
        'Academic Partners',
        'Technology Partners',
        'Industry Partners',
        'Service Partners'
      ],
      color: 'bg-emerald-100 dark:bg-emerald-900'
    },
    'cost-structure': {
      title: 'Cost Structure',
      content: [
        'Fixed Costs',
        'Variable Costs',
        'Marketing & Sales Costs',
        'Operational Costs'
      ],
      color: 'bg-red-100 dark:bg-red-900'
    }
  };

  return (
    <div className="min-h-screen p-6 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white flex items-center gap-3">
            <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
            </svg>
            Business Model Canvas
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 mt-4">
            Interactive visualization of EliteClass's Business Model
          </p>
        </div>

        {/* BMC Grid */}
        <div className="grid grid-cols-5 gap-4 mb-8">
          {/* Left Section */}
          <div className="col-span-1">
            <div className={`p-4 h-full rounded-lg cursor-pointer transition-all hover:shadow-lg ${sections['key-partners'].color} ${activeSection === 'key-partners' ? 'ring-2 ring-blue-500' : ''}`}
              onClick={() => setActiveSection('key-partners')}>
              <h3 className="font-semibold">Key Partners</h3>
              <ul className="mt-2 text-sm">
                {sections['key-partners'].content.map((item, i) => (
                  <li key={i} className="mt-1">• {item}</li>
                ))}
              </ul>
            </div>
          </div>

          {/* Key Activities & Resources */}
          <div className="col-span-1 grid grid-rows-2 gap-4">
            <div className={`p-4 rounded-lg cursor-pointer transition-all hover:shadow-lg ${sections['key-activities'].color} ${activeSection === 'key-activities' ? 'ring-2 ring-blue-500' : ''}`}
              onClick={() => setActiveSection('key-activities')}>
              <h3 className="font-semibold">Key Activities</h3>
              <ul className="mt-2 text-sm">
                {sections['key-activities'].content.map((item, i) => (
                  <li key={i} className="mt-1">• {item}</li>
                ))}
              </ul>
            </div>
            <div className={`p-4 rounded-lg cursor-pointer transition-all hover:shadow-lg ${sections['key-resources'].color} ${activeSection === 'key-resources' ? 'ring-2 ring-blue-500' : ''}`}
              onClick={() => setActiveSection('key-resources')}>
              <h3 className="font-semibold">Key Resources</h3>
              <ul className="mt-2 text-sm">
                {sections['key-resources'].content.map((item, i) => (
                  <li key={i} className="mt-1">• {item}</li>
                ))}
              </ul>
            </div>
          </div>

          {/* Value Propositions */}
          <div className="col-span-1">
            <div className={`p-4 h-full rounded-lg cursor-pointer transition-all hover:shadow-lg ${sections['value-propositions'].color} ${activeSection === 'value-propositions' ? 'ring-2 ring-blue-500' : ''}`}
              onClick={() => setActiveSection('value-propositions')}>
              <h3 className="font-semibold">Value Propositions</h3>
              <ul className="mt-2 text-sm">
                {sections['value-propositions'].content.map((item, i) => (
                  <li key={i} className="mt-1">• {item}</li>
                ))}
              </ul>
            </div>
          </div>

          {/* Customer Relationships & Channels */}
          <div className="col-span-1 grid grid-rows-2 gap-4">
            <div className={`p-4 rounded-lg cursor-pointer transition-all hover:shadow-lg ${sections['customer-relationships'].color} ${activeSection === 'customer-relationships' ? 'ring-2 ring-blue-500' : ''}`}
              onClick={() => setActiveSection('customer-relationships')}>
              <h3 className="font-semibold">Customer Relationships</h3>
              <ul className="mt-2 text-sm">
                {sections['customer-relationships'].content.map((item, i) => (
                  <li key={i} className="mt-1">• {item}</li>
                ))}
              </ul>
            </div>
            <div className={`p-4 rounded-lg cursor-pointer transition-all hover:shadow-lg ${sections['channels'].color} ${activeSection === 'channels' ? 'ring-2 ring-blue-500' : ''}`}
              onClick={() => setActiveSection('channels')}>
              <h3 className="font-semibold">Channels</h3>
              <ul className="mt-2 text-sm">
                {sections['channels'].content.map((item, i) => (
                  <li key={i} className="mt-1">• {item}</li>
                ))}
              </ul>
            </div>
          </div>

          {/* Customer Segments */}
          <div className="col-span-1">
            <div className={`p-4 h-full rounded-lg cursor-pointer transition-all hover:shadow-lg ${sections['customer-segments'].color} ${activeSection === 'customer-segments' ? 'ring-2 ring-blue-500' : ''}`}
              onClick={() => setActiveSection('customer-segments')}>
              <h3 className="font-semibold">Customer Segments</h3>
              <ul className="mt-2 text-sm">
                {sections['customer-segments'].content.map((item, i) => (
                  <li key={i} className="mt-1">• {item}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Row */}
        <div className="grid grid-cols-2 gap-4">
          <div className={`p-4 rounded-lg cursor-pointer transition-all hover:shadow-lg ${sections['cost-structure'].color} ${activeSection === 'cost-structure' ? 'ring-2 ring-blue-500' : ''}`}
            onClick={() => setActiveSection('cost-structure')}>
            <h3 className="font-semibold">Cost Structure</h3>
            <ul className="mt-2 text-sm">
              {sections['cost-structure'].content.map((item, i) => (
                <li key={i} className="mt-1">• {item}</li>
              ))}
            </ul>
          </div>
          <div className={`p-4 rounded-lg cursor-pointer transition-all hover:shadow-lg ${sections['revenue-streams'].color} ${activeSection === 'revenue-streams' ? 'ring-2 ring-blue-500' : ''}`}
            onClick={() => setActiveSection('revenue-streams')}>
            <h3 className="font-semibold">Revenue Streams</h3>
            <ul className="mt-2 text-sm">
              {sections['revenue-streams'].content.map((item, i) => (
                <li key={i} className="mt-1">• {item}</li>
              ))}
            </ul>
          </div>
        </div>

        {/* Detailed Section View */}
        {activeSection && (
          <div className="mt-8 p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold mb-4">{sections[activeSection].title}</h2>
            <BMCDetailView section={activeSection} />
          </div>
        )}
      </div>
    </div>
  );
}
