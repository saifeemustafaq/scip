export default function Analytics() {
  return (
    <div className="p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Analytics</h1>
          <p className="mt-2 text-gray-600">Track your performance metrics and gain insights into your data.</p>
        </div>
        
        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600">87.5%</div>
              <div className="text-sm text-gray-600 mt-1">Conversion Rate</div>
              <div className="text-xs text-green-500 mt-1">↑ 2.3% from last month</div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow p-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600">$15,240</div>
              <div className="text-sm text-gray-600 mt-1">Revenue</div>
              <div className="text-xs text-green-500 mt-1">↑ 8.1% from last month</div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow p-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600">2,456</div>
              <div className="text-sm text-gray-600 mt-1">Page Views</div>
              <div className="text-xs text-red-500 mt-1">↓ 1.2% from last month</div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow p-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-orange-600">4.2</div>
              <div className="text-sm text-gray-600 mt-1">Avg Session Duration</div>
              <div className="text-xs text-green-500 mt-1">↑ 12.5% from last month</div>
            </div>
          </div>
        </div>
        
        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Traffic Overview</h3>
            <div className="h-64 flex items-center justify-center bg-gray-50 rounded-md">
              <div className="text-center">
                <svg className="h-16 w-16 text-gray-400 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
                <p className="text-gray-500">Chart will be displayed here</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">User Engagement</h3>
            <div className="h-64 flex items-center justify-center bg-gray-50 rounded-md">
              <div className="text-center">
                <svg className="h-16 w-16 text-gray-400 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z" />
                </svg>
                <p className="text-gray-500">Pie chart will be displayed here</p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Data Table */}
        <div className="mt-8 bg-white rounded-lg shadow">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">Top Pages</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Page</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Views</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Unique Visitors</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Bounce Rate</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">/home</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">1,248</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">892</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">23.4%</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">/dashboard</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">856</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">634</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">18.7%</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">/analytics</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">432</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">312</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">15.2%</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
