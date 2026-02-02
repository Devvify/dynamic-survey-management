import { PAGE_ROUTES } from "@/lib/constants/routes";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-slate-900 dark:to-slate-800">
      <div className="container mx-auto px-4 py-16">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Dynamic Survey Management
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
            Create, distribute, and analyze surveys with ease
          </p>
        </div>

        {/* Main CTA */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
          <a
            href={PAGE_ROUTES.AUTH.LOGIN}
            className="px-8 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors"
          >
            Login
          </a>
          <a
            href={PAGE_ROUTES.OFFICER.SURVEYS.LIST}
            className="px-8 py-3 bg-white dark:bg-slate-700 text-gray-900 dark:text-white border-2 border-blue-600 rounded-lg font-semibold hover:bg-blue-50 dark:hover:bg-slate-600 transition-colors"
          >
            Browse Surveys
          </a>
        </div>

        {/* Features */}
        <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          <div className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-md">
            <div className="text-3xl mb-3">📝</div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              Create Surveys
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Build beautiful surveys with various question types and
              customization options.
            </p>
          </div>

          <div className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-md">
            <div className="text-3xl mb-3">📊</div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              Collect Responses
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Easily share surveys and collect responses from your audience in
              real-time.
            </p>
          </div>

          <div className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-md">
            <div className="text-3xl mb-3">📈</div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              Analyze Results
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Get insights from survey data with comprehensive analytics and
              reporting.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
