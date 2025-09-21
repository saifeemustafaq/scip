export default function CurrentBlockersPage() {
  return (
    <div className="p-6">
      <div className="max-w-4xl mx-auto">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white flex items-center gap-3">
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" /></svg>
            Current Blockers
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            Welcome to the Current Blockers page. This page was automatically generated.
          </p>
        </div>
        
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
            Current Blockers Content
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            This is the Current Blockers page content. You can customize this page by editing the file at:
          </p>
          <code className="block mt-2 p-2 bg-gray-100 dark:bg-gray-700 rounded text-sm">
            app/blockers/page.tsx
          </code>
        </div>
      </div>
    </div>
  );
}
