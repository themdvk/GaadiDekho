import Link from 'next/link';
import Image from 'next/image';
import prisma from '@/lib/prisma';
import ProtectedLink from './components/ProtectedLink';

async function getLatestCars() {
  const cars = await prisma.car.findMany({
    take: 6,
    orderBy: {
      createdAt: 'desc'
    },
    include: {
      user: true
    }
  });
  return cars;
}

export default async function Home() {
  const latestCars = await getLatestCars();

  return (
    <div className="bg-white">
      {/* Hero section */}
      <div className="relative bg-gray-900">
        <div className="absolute inset-0">
          <Image
            className="w-full h-full object-cover"
            src="https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1920&q=80"
            alt="Hero background"
            fill
            priority
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gray-900 opacity-75"></div>
        </div>
        <div className="relative max-w-7xl mx-auto py-24 px-4 sm:py-32 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">
            Find Your Perfect Car
          </h1>
          <p className="mt-6 text-xl text-gray-300 max-w-3xl">
            Discover the best deals on new and used cars. Gaadi Dekho makes it easy to find, compare, and buy your dream car.
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <Link href="/cars"
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-red-600 hover:bg-red-700"
            >
              Browse Cars
            </Link>
            <Link href="/cars/new"
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
            >
              Sell Your Car
            </Link>
            <Link href="/routes"
              className="inline-flex items-center px-6 py-3 border-2 border-indigo-400 text-base font-medium rounded-md text-indigo-400 hover:bg-indigo-50 transition-colors"
            >
              View API Routes
            </Link>
          </div>
        </div>
      </div>

      {/* Featured Cars section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Featured Cars
          </h2>
          <p className="mt-3 max-w-2xl mx-auto text-xl text-gray-500 sm:mt-4">
            Browse our latest collection of premium cars
          </p>
        </div>

        <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {latestCars.map((car) => (
            <div key={car.id} className="group relative bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
              <div className="relative h-48">
                <Image
                  src={car.images[0] || 'https://via.placeholder.com/400x300?text=No+Image'}
                  alt={car.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4">
                  <h3 className="text-lg font-semibold text-white">{car.title}</h3>
                  <p className="text-sm text-gray-300">₹{car.price.toLocaleString()}</p>
                </div>
              </div>
              <div className="p-4">
                <div className="flex justify-between items-center text-sm text-gray-500">
                  <span>{car.year} • {car.mileage}km</span>
                  <span>{car.fuelType}</span>
                </div>
                <div className="mt-4 flex justify-between items-center">
                  <div className="text-sm text-gray-500">
                    <span>{car.location}</span>
                  </div>
                  <ProtectedLink
                    href={`/cars/${car.id}`}
                    className="inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700"
                  >
                    View Details
                  </ProtectedLink>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link href="/cars"
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-red-600 hover:bg-red-700"
          >
            View All Cars
          </Link>
        </div>
      </div>

      {/* Features section */}
      <div className="bg-gray-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
              Why Choose Gaadi Dekho?
            </h2>
            <p className="mt-4 text-lg text-gray-500">
              We make car buying and selling simple, secure, and hassle-free
            </p>
          </div>

          <div className="mt-10">
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {/* Feature 1 */}
              <div className="pt-6">
                <div className="flow-root bg-white rounded-lg px-6 pb-8">
                  <div className="-mt-6">
                    <div>
                      <span className="inline-flex items-center justify-center p-3 bg-red-600 rounded-md shadow-lg">
                        <svg className="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                      </span>
                    </div>
                    <h3 className="mt-8 text-lg font-medium text-gray-900 tracking-tight">Easy Search</h3>
                    <p className="mt-5 text-base text-gray-500">
                      Find your dream car with our advanced search filters and detailed listings
                    </p>
                  </div>
                </div>
              </div>

              {/* Feature 2 */}
              <div className="pt-6">
                <div className="flow-root bg-white rounded-lg px-6 pb-8">
                  <div className="-mt-6">
                    <div>
                      <span className="inline-flex items-center justify-center p-3 bg-red-600 rounded-md shadow-lg">
                        <svg className="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                        </svg>
                      </span>
                    </div>
                    <h3 className="mt-8 text-lg font-medium text-gray-900 tracking-tight">Secure Transactions</h3>
                    <p className="mt-5 text-base text-gray-500">
                      Your security is our priority with verified listings and secure communication
                    </p>
                  </div>
                </div>
              </div>

              {/* Feature 3 */}
              <div className="pt-6">
                <div className="flow-root bg-white rounded-lg px-6 pb-8">
                  <div className="-mt-6">
                    <div>
                      <span className="inline-flex items-center justify-center p-3 bg-red-600 rounded-md shadow-lg">
                        <svg className="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                        </svg>
                      </span>
                    </div>
                    <h3 className="mt-8 text-lg font-medium text-gray-900 tracking-tight">Expert Support</h3>
                    <p className="mt-5 text-base text-gray-500">
                      Get expert assistance throughout your car buying or selling journey
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
