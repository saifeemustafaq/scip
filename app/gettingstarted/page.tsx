'use client';

import { useState } from 'react';

interface FormCardProps {
  title: string;
  description: string;
  sender?: string;
  action: string;
  category: 'receive' | 'file';
  important?: boolean;
}

function FormCard({ title, description, sender, action, category, important }: FormCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div 
      className={`bg-white dark:bg-gray-800 rounded-lg shadow-sm border 
        ${important ? 'border-blue-300 dark:border-blue-700' : 'border-gray-200 dark:border-gray-700'} 
        p-6 mb-4 transition-all duration-200 hover:shadow-md cursor-pointer`}
      onClick={() => setIsExpanded(!isExpanded)}
    >
      <div className="flex items-start justify-between">
        <div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center gap-2">
            {title}
            {important && (
              <span className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-xs px-2 py-1 rounded">
                Important
              </span>
            )}
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
            {category === 'receive' ? 'Form You Receive' : 'Form You File'}
          </p>
        </div>
        <button 
          className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
          aria-label="Toggle details"
        >
          <svg
            className={`w-6 h-6 transform transition-transform ${isExpanded ? 'rotate-180' : ''}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>
      </div>
      
      {isExpanded && (
        <div className="mt-4 space-y-3">
          <div className="text-gray-700 dark:text-gray-300">{description}</div>
          {sender && (
            <div className="text-sm">
              <span className="font-medium text-gray-700 dark:text-gray-300">Who sends it: </span>
              <span className="text-gray-600 dark:text-gray-400">{sender}</span>
            </div>
          )}
          <div className="text-sm">
            <span className="font-medium text-gray-700 dark:text-gray-300">What you do with it: </span>
            <span className="text-gray-600 dark:text-gray-400">{action}</span>
          </div>
        </div>
      )}
    </div>
  );
}

export default function GettingStartedPage() {
  const [activeTab, setActiveTab] = useState<'receive' | 'file'>('receive');

  return (
    <div className="p-6">
      <div className="max-w-4xl mx-auto">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white flex items-center gap-3">
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            Tax Forms Guide
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            Understanding U.S. tax forms as an F-1 student - Interactive Guide
          </p>
        </div>

        {/* Key Takeaway Banner */}
        <div className="bg-blue-50 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-800 rounded-lg p-4 mb-6">
          <h2 className="text-blue-800 dark:text-blue-200 font-semibold">Key Takeaway</h2>
          <p className="text-blue-700 dark:text-blue-300 mt-1">
            Every F-1 student must file <strong>Form 8843</strong>. If you earned any money, you must also file a <strong>Form 1040-NR</strong> (federal) and likely a <strong>state tax return</strong>.
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-gray-200 dark:border-gray-700 mb-6">
          <button
            className={`py-2 px-4 -mb-px ${
              activeTab === 'receive'
                ? 'border-b-2 border-blue-500 text-blue-600 dark:text-blue-400'
                : 'text-gray-500 dark:text-gray-400'
            }`}
            onClick={() => setActiveTab('receive')}
          >
            Forms You Receive
          </button>
          <button
            className={`py-2 px-4 -mb-px ${
              activeTab === 'file'
                ? 'border-b-2 border-blue-500 text-blue-600 dark:text-blue-400'
                : 'text-gray-500 dark:text-gray-400'
            }`}
            onClick={() => setActiveTab('file')}
          >
            Forms You File
          </button>
        </div>

        {/* Forms Content */}
        <div className="space-y-4">
          {activeTab === 'receive' && (
            <div className="space-y-4">
              <FormCard
                title="Form W-2: Wage and Tax Statement"
                description="This is the most common form for anyone with a job. It summarizes your total earnings (wages, tips) from an employer and shows how much tax was already withheld from your paychecks."
                sender="Your employer (one from each employer you worked for)"
                action="Use the numbers on this form to fill out your federal (1040-NR) and state tax returns"
                category="receive"
              />
              
              <FormCard
                title="Form 1042-S: Foreign Person's U.S. Source Income"
                description="Reports specific types of income paid to a foreign person, including scholarship/fellowship grants for living expenses and wages exempt from U.S. tax due to tax treaties."
                sender="Your university or institution that paid you"
                action="Use this information to complete your Form 1040-NR"
                category="receive"
                important={true}
              />

              <FormCard
                title="Form 1098-T: Tuition Statement"
                description="Reports the amount of tuition you paid to your university. BE CAREFUL: As a nonresident alien, you are generally not eligible for education tax credits."
                sender="Your university"
                action="Keep for your records, but do not use it to claim education tax credits"
                category="receive"
                important={true}
              />

              <FormCard
                title="Form 1099 Series"
                description="Reports miscellaneous income such as bank interest (1099-INT) or independent contractor work (1099-NEC). Note: F-1 students are generally not allowed to perform independent contractor work."
                sender="Banks or companies that paid you"
                action="Consult with your DSO and a tax professional if you receive a 1099-NEC"
                category="receive"
              />
            </div>
          )}

          {activeTab === 'file' && (
            <div className="space-y-4">
              <FormCard
                title="Form W-4: Employee's Withholding Certificate"
                description="This form tells your employer how much federal income tax to withhold from your paycheck. As a nonresident alien, you must follow specific instructions."
                action="Give to your employer when you start a job, following special NRA instructions"
                category="file"
              />

              <FormCard
                title="Form 8843: Statement for Exempt Individuals"
                description="A crucial informational form that explains why you should not be counted as a resident for tax purposes under the Substantial Presence Test."
                action="MANDATORY for all F-1 students. Mail to the IRS by the deadline, even if you had no income"
                category="file"
                important={true}
              />

              <FormCard
                title="Form 1040-NR: U.S. Nonresident Alien Income Tax Return"
                description="This is the primary federal income tax return for nonresident aliens, equivalent to Form 1040 that U.S. citizens use."
                action="File with the IRS by the deadline if you had any U.S. source income"
                category="file"
                important={true}
              />

              <FormCard
                title="State Tax Return (e.g., Form 540NR)"
                description="An income tax return for the specific state where you lived and worked. Each state has its own rules and forms."
                action="File with the state's tax agency if you had income in that state"
                category="file"
              />
            </div>
          )}
          {/* Summary Table */}
          <div className="mt-12">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Quick Reference Table</h2>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <thead className="bg-gray-50 dark:bg-gray-800">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Form Name
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Category
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      What It Is
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Your Action
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                  <tr className="hover:bg-gray-50 dark:hover:bg-gray-700">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">W-4</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">You Fill Out</td>
                    <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-400">Tells your employer how much tax to withhold from your paycheck</td>
                    <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-400">Give to your employer when you start a job</td>
                  </tr>
                  <tr className="hover:bg-gray-50 dark:hover:bg-gray-700">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">W-2</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">You Receive</td>
                    <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-400">Reports your total wages and taxes withheld from an employer</td>
                    <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-400">Use for federal and state tax returns</td>
                  </tr>
                  <tr className="hover:bg-gray-50 dark:hover:bg-gray-700">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">1042-S</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">You Receive</td>
                    <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-400">Reports scholarship income or wages exempt under a tax treaty</td>
                    <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-400">Use for Form 1040-NR</td>
                  </tr>
                  <tr className="hover:bg-gray-50 dark:hover:bg-gray-700">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">8843</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">You File</td>
                    <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-400">Declares you as an &quot;exempt individual&quot; from the Substantial Presence Test</td>
                    <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-400">Mail to IRS by deadline (mandatory)</td>
                  </tr>
                  <tr className="hover:bg-gray-50 dark:hover:bg-gray-700">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">1040-NR</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">You File</td>
                    <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-400">The main U.S. federal income tax return for nonresidents</td>
                    <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-400">File with IRS if you had U.S. income</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
