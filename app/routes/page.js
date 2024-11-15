'use client';

import Link from 'next/link';

export default function RoutesPage() {
  const routes = [
    {
      path: '/',
      method: 'GET',
      access: 'Public',
      description: 'Home page displaying featured cars and search functionality',
      details: 'The main landing page showcasing the latest car listings, search bar, and filtering options.'
    },
    {
      path: '/cars',
      method: 'GET',
      access: 'Public',
      description: 'Browse all car listings',
      details: 'View all available cars with advanced filtering and sorting options.'
    },
    {
      path: '/cars/new',
      method: 'GET',
      access: 'Protected',
      description: 'Create new car listing form',
      details: 'Form to add a new car listing. Requires user authentication.'
    },
    {
      path: '/cars/[id]',
      method: 'GET',
      access: 'Protected',
      description: 'View detailed car information',
      details: 'Detailed view of a specific car with all information, images, and contact options. Requires authentication.'
    },
    {
      path: '/cars/[id]/edit',
      method: 'GET',
      access: 'Protected (Owner Only)',
      description: 'Edit car listing form',
      details: 'Form to modify an existing car listing. Only accessible by the car owner.'
    },
    {
      path: '/api/cars',
      method: 'GET',
      access: 'Public',
      description: 'Fetch all cars API',
      details: 'API endpoint to retrieve all car listings with optional filtering parameters.'
    },
    {
      path: '/api/cars',
      method: 'POST',
      access: 'Protected',
      description: 'Create new car API',
      details: 'API endpoint to create a new car listing. Requires authentication.'
    },
    {
      path: '/api/cars/[id]',
      method: 'GET',
      access: 'Public',
      description: 'Fetch single car API',
      details: 'API endpoint to retrieve details of a specific car.'
    },
    {
      path: '/api/cars/[id]',
      method: 'PUT',
      access: 'Protected (Owner Only)',
      description: 'Update car API',
      details: 'API endpoint to update a car listing. Only accessible by the car owner.'
    },
    {
      path: '/api/cars/[id]',
      method: 'DELETE',
      access: 'Protected (Owner Only)',
      description: 'Delete car API',
      details: 'API endpoint to delete a car listing. Only accessible by the car owner.'
    },
    {
      path: '/auth/signin',
      method: 'GET',
      access: 'Public',
      description: 'Sign in page',
      details: 'Authentication page for user login using NextAuth.js.'
    },
    {
      path: '/auth/signup',
      method: 'GET',
      access: 'Public',
      description: 'Sign up page',
      details: 'Registration page for new users.'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Gaadi Dekho Routes Documentation</h1>
          <p className="text-lg text-gray-600 mb-8">
            Complete documentation of all available routes and their access levels
          </p>
        </div>

        <div className="grid gap-6">
          {routes.map((route, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <span className={`
                      px-3 py-1 rounded-full text-sm font-medium
                      ${route.method === 'GET' ? 'bg-green-100 text-green-800' :
                        route.method === 'POST' ? 'bg-blue-100 text-blue-800' :
                        route.method === 'PUT' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-red-100 text-red-800'}
                    `}>
                      {route.method}
                    </span>
                    <h2 className="text-xl font-semibold text-gray-900">{route.path}</h2>
                  </div>
                  <span className={`
                    px-3 py-1 rounded-full text-sm font-medium
                    ${route.access === 'Public' ? 'bg-gray-100 text-gray-800' :
                      route.access.includes('Owner') ? 'bg-purple-100 text-purple-800' :
                      'bg-indigo-100 text-indigo-800'}
                  `}>
                    {route.access}
                  </span>
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">{route.description}</h3>
                <p className="text-gray-600">{route.details}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link
            href="/"
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
