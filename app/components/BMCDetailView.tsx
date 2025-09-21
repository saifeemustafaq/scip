'use client';

import React from 'react';

interface BMCDetailViewProps {
  section: string;
}

const sectionContent: Record<string, { title: string; content: React.ReactNode }> = {
  'value-propositions': {
    title: 'Value Propositions',
    content: (
      <div>
        <h3 className="text-xl font-semibold mb-4">Core Program Benefits</h3>
        <ul className="list-disc pl-6 space-y-2">
          <li>Training at Carnegie Mellon University&apos;s Silicon Valley campus</li>
          <li>Two included Microsoft certifications (AZ-900 & AI-900)</li>
          <li>Silicon Valley company visits and networking</li>
          <li>Small batch size (40 students maximum)</li>
        </ul>

        <h3 className="text-xl font-semibold mt-6 mb-4">Program Structure</h3>
        <ul className="list-disc pl-6 space-y-2">
          <li>Intensive two-week program</li>
          <li>Morning: 3 hours classroom training</li>
          <li>Afternoon: 5 hours practical work</li>
          <li>Evening: 2 hours networking events</li>
        </ul>

        <h3 className="text-xl font-semibold mt-6 mb-4">Investment Value</h3>
        <ul className="list-disc pl-6 space-y-2">
          <li>All-inclusive program fee: $2,500</li>
          <li>Covers two Microsoft certifications</li>
          <li>Access to all networking events</li>
          <li>Complete Silicon Valley immersion</li>
        </ul>
      </div>
    )
  },
  'customer-segments': {
    title: 'Customer Segments',
    content: (
      <div>
        <h3 className="text-xl font-semibold mb-4">Primary Segments</h3>
        <ul className="list-disc pl-6 space-y-2">
          <li>Undergraduate engineering students</li>
          <li>Recent graduates (0-2 years experience)</li>
          <li>Career transitioners into tech</li>
        </ul>

        <h3 className="text-xl font-semibold mt-6 mb-4">Target Specializations</h3>
        <ul className="list-disc pl-6 space-y-2">
          <li>Cloud Computing and Infrastructure</li>
          <li>Artificial Intelligence/Machine Learning</li>
          <li>Software Engineering and Development</li>
          <li>Data Science and Analytics</li>
        </ul>

        <h3 className="text-xl font-semibold mt-6 mb-4">Geographic Focus</h3>
        <ul className="list-disc pl-6 space-y-2">
          <li>Primary focus on Indian engineering colleges</li>
          <li>Emphasis on tier-1 and tier-2 cities</li>
          <li>Diverse geographic representation across India</li>
        </ul>
      </div>
    )
  },
  'channels': {
    title: 'Channels',
    content: (
      <div>
        <h3 className="text-xl font-semibold mb-4">Marketing & Recruitment</h3>
        <ul className="list-disc pl-6 space-y-2">
          <li>Direct collaboration with Indian institutions</li>
          <li>Campus recruitment drives</li>
          <li>Digital marketing campaigns</li>
          <li>&quot;$1 Pizza Survey&quot; campaign</li>
        </ul>

        <h3 className="text-xl font-semibold mt-6 mb-4">Program Delivery</h3>
        <ul className="list-disc pl-6 space-y-2">
          <li>CMU Silicon Valley campus facilities</li>
          <li>Technical laboratories</li>
          <li>Networking event spaces</li>
        </ul>

        <h3 className="text-xl font-semibold mt-6 mb-4">Communication</h3>
        <ul className="list-disc pl-6 space-y-2">
          <li>24/7 student support hotline</li>
          <li>WhatsApp groups for batch coordination</li>
          <li>Digital announcement system</li>
        </ul>
      </div>
    )
  },
  'customer-relationships': {
    title: 'Customer Relationships',
    content: (
      <div>
        <h3 className="text-xl font-semibold mb-4">Pre-Program Support</h3>
        <ul className="list-disc pl-6 space-y-2">
          <li>Visa application assistance</li>
          <li>Housing coordination support</li>
          <li>Travel planning guidance</li>
        </ul>

        <h3 className="text-xl font-semibold mt-6 mb-4">During Program</h3>
        <ul className="list-disc pl-6 space-y-2">
          <li>One-on-one mentoring</li>
          <li>Daily progress tracking</li>
          <li>Extended study hours availability</li>
          <li>Cultural adaptation assistance</li>
        </ul>

        <h3 className="text-xl font-semibold mt-6 mb-4">Post-Program</h3>
        <ul className="list-disc pl-6 space-y-2">
          <li>Access to EliteClass alumni community</li>
          <li>Ongoing certification support</li>
          <li>Career guidance opportunities</li>
        </ul>
      </div>
    )
  },
  'revenue-streams': {
    title: 'Revenue Streams',
    content: (
      <div>
        <h3 className="text-xl font-semibold mb-4">Core Program Fee</h3>
        <ul className="list-disc pl-6 space-y-2">
          <li>Base fee: $2,500 per participant</li>
          <li>Initial deposit: $500 (non-refundable)</li>
          <li>Second installment: $1,000 (60 days before)</li>
          <li>Final payment: $1,000 (30 days before)</li>
        </ul>

        <h3 className="text-xl font-semibold mt-6 mb-4">Additional Revenue</h3>
        <ul className="list-disc pl-6 space-y-2">
          <li>Extra certification attempts: $100 per exam</li>
          <li>Supplementary training modules: $600 per course</li>
          <li>Additional certification tracks available</li>
        </ul>

        <h3 className="text-xl font-semibold mt-6 mb-4">Financial Metrics</h3>
        <ul className="list-disc pl-6 space-y-2">
          <li>Revenue per batch (40 students): $100,000</li>
          <li>Revenue per concurrent batches (80 students): $200,000</li>
        </ul>
      </div>
    )
  },
  'key-resources': {
    title: 'Key Resources',
    content: (
      <div>
        <h3 className="text-xl font-semibold mb-4">Physical Resources</h3>
        <ul className="list-disc pl-6 space-y-2">
          <li>CMU Silicon Valley campus facilities</li>
          <li>Technical laboratories</li>
          <li>High-speed internet infrastructure</li>
          <li>Training equipment</li>
        </ul>

        <h3 className="text-xl font-semibold mt-6 mb-4">Human Resources</h3>
        <ul className="list-disc pl-6 space-y-2">
          <li>Microsoft-certified lead trainers</li>
          <li>Technical support engineers</li>
          <li>Program coordinators</li>
          <li>Student success team</li>
        </ul>

        <h3 className="text-xl font-semibold mt-6 mb-4">Brand Resources</h3>
        <ul className="list-disc pl-6 space-y-2">
          <li>Carnegie Mellon University association</li>
          <li>Microsoft certification partnership</li>
          <li>Silicon Valley company networks</li>
        </ul>
      </div>
    )
  },
  'key-activities': {
    title: 'Key Activities',
    content: (
      <div>
        <h3 className="text-xl font-semibold mb-4">Program Delivery</h3>
        <ul className="list-disc pl-6 space-y-2">
          <li>Microsoft Azure certification training</li>
          <li>AI fundamentals certification preparation</li>
          <li>Hands-on laboratory sessions</li>
          <li>Networking events organization</li>
        </ul>

        <h3 className="text-xl font-semibold mt-6 mb-4">Student Support</h3>
        <ul className="list-disc pl-6 space-y-2">
          <li>Visa documentation support</li>
          <li>Housing coordination</li>
          <li>One-on-one mentoring</li>
          <li>Technical troubleshooting</li>
        </ul>

        <h3 className="text-xl font-semibold mt-6 mb-4">Quality Management</h3>
        <ul className="list-disc pl-6 space-y-2">
          <li>Daily feedback collection</li>
          <li>Performance tracking</li>
          <li>Continuous improvement implementation</li>
        </ul>
      </div>
    )
  },
  'key-partners': {
    title: 'Key Partners',
    content: (
      <div>
        <h3 className="text-xl font-semibold mb-4">Academic Partners</h3>
        <ul className="list-disc pl-6 space-y-2">
          <li>Carnegie Mellon University</li>
          <li>Indian Universities</li>
          <li>Technical institutions</li>
        </ul>

        <h3 className="text-xl font-semibold mt-6 mb-4">Technology Partners</h3>
        <ul className="list-disc pl-6 space-y-2">
          <li>Microsoft (Primary partner)</li>
          <li>Future partners: AWS, Google Cloud, Salesforce</li>
        </ul>

        <h3 className="text-xl font-semibold mt-6 mb-4">Service Partners</h3>
        <ul className="list-disc pl-6 space-y-2">
          <li>Housing assistance providers</li>
          <li>Local transportation services</li>
          <li>Insurance providers</li>
        </ul>
      </div>
    )
  },
  'cost-structure': {
    title: 'Cost Structure',
    content: (
      <div>
        <h3 className="text-xl font-semibold mb-4">Fixed Costs</h3>
        <ul className="list-disc pl-6 space-y-2">
          <li>CMU Silicon Valley campus rental</li>
          <li>Staff salaries</li>
          <li>Technology infrastructure</li>
        </ul>

        <h3 className="text-xl font-semibold mt-6 mb-4">Variable Costs</h3>
        <ul className="list-disc pl-6 space-y-2">
          <li>Microsoft certification vouchers ($200 per student)</li>
          <li>Training materials</li>
          <li>Event expenses</li>
        </ul>

        <h3 className="text-xl font-semibold mt-6 mb-4">Marketing & Sales</h3>
        <ul className="list-disc pl-6 space-y-2">
          <li>Digital marketing campaigns</li>
          <li>Referral program bonuses</li>
          <li>Campus recruitment drives</li>
        </ul>
      </div>
    )
  }
};

export default function BMCDetailView({ section }: BMCDetailViewProps) {
  const content = sectionContent[section];
  
  if (!content) {
    return null;
  }

  return (
    <div className="prose dark:prose-invert max-w-none">
      {content.content}
    </div>
  );
}
