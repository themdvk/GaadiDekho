'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { formatPrice } from '../../../lib/utils';

export default function CarDetailsClient({ car, session }) {
  const router = useRouter();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const isOwner = session?.user?.id === car.userId;

  const handleDelete = async () => {
    if (!confirm('Are you sure you want to delete this listing?')) return;

    try {
      const response = await fetch(`/api/cars/${car.id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Failed to delete car');
      }
      
      router.push('/cars');
      router.refresh();
    } catch (error) {
      console.error('Error deleting car:', error);
      alert(error.message || 'Failed to delete car. Please try again.');
    }
  };

  const handleEdit = () => {
    router.push(`/cars/${car.id}/edit`);
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % car.images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + car.images.length) % car.images.length);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          {/* Image Gallery */}
          <div className="relative aspect-[16/9] bg-gray-100">
            {car.images.length > 0 ? (
              <>
                <Image
                  src={car.images[currentImageIndex]}
                  alt={`${car.make} ${car.model}`}
                  fill
                  className="object-cover"
                  priority
                />
                {car.images.length > 1 && (
                  <>
                    <button
                      onClick={prevImage}
                      className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75 transition-all"
                    >
                      ←
                    </button>
                    <button
                      onClick={nextImage}
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75 transition-all"
                    >
                      →
                    </button>
                  </>
                )}
              </>
            ) : (
              <div className="flex items-center justify-center h-full">
                <p className="text-gray-500">No images available</p>
              </div>
            )}
          </div>

          {/* Car Details */}
          <div className="p-8">
            <div className="flex justify-between items-start">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">
                  {car.make} {car.model} {car.year}
                </h1>
                <p className="mt-2 text-2xl font-semibold text-indigo-600">
                  {formatPrice(car.price)}
                </p>
              </div>
              {isOwner && (
                <div className="flex gap-4">
                  <button
                    onClick={handleEdit}
                    className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors"
                  >
                    Edit
                  </button>
                  <button
                    onClick={handleDelete}
                    className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
                  >
                    Delete
                  </button>
                </div>
              )}
            </div>

            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h2 className="text-lg font-semibold text-gray-900">Details</h2>
                <dl className="mt-2 space-y-2">
                  <div>
                    <dt className="text-sm font-medium text-gray-500">Place</dt>
                    <dd className="text-sm text-gray-900">{car.place}</dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-gray-500">Mileage</dt>
                    <dd className="text-sm text-gray-900">{car.mileage.toLocaleString()} km</dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-gray-500">Fuel Type</dt>
                    <dd className="text-sm text-gray-900">{car.fuelType}</dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-gray-500">Transmission</dt>
                    <dd className="text-sm text-gray-900">{car.transmission}</dd>
                  </div>
                </dl>
              </div>

              <div>
                <h2 className="text-lg font-semibold text-gray-900">Description</h2>
                <p className="mt-2 text-sm text-gray-600">{car.description}</p>
              </div>
            </div>

            {car.features && car.features.length > 0 && (
              <div className="mt-6">
                <h2 className="text-lg font-semibold text-gray-900">Features</h2>
                <ul className="mt-2 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
                  {car.features.map((feature, index) => (
                    <li key={index} className="text-sm text-gray-600">
                      • {feature}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
