'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';

export default function NewCarPage() {
  const router = useRouter();
  const { status } = useSession();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [imageUrls, setImageUrls] = useState(['']);
  const [tags, setTags] = useState(['']);

  if (status === 'unauthenticated') {
    router.push('/auth/login');
    return null;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const formData = new FormData(e.target);
    const data = {
      title: formData.get('title'),
      description: formData.get('description'),
      price: parseFloat(formData.get('price')),
      year: parseInt(formData.get('year')),
      mileage: parseInt(formData.get('mileage')),
      fuelType: formData.get('fuelType'),
      transmission: formData.get('transmission'),
      place: formData.get('place'),
      images: imageUrls.filter(url => url.trim() !== ''),
      tags: tags.filter(tag => tag.trim() !== ''),
    };

    try {
      const res = await fetch('/api/cars', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const result = await res.json();

      if (!res.ok) {
        throw new Error(result.error || 'Failed to create car');
      }

      router.push('/cars');
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  const addImageUrl = () => {
    if (imageUrls.length < 10) {
      setImageUrls([...imageUrls, '']);
    }
  };

  const removeImageUrl = (index) => {
    setImageUrls(imageUrls.filter((_, i) => i !== index));
  };

  const updateImageUrl = (index, value) => {
    const newUrls = [...imageUrls];
    newUrls[index] = value;
    setImageUrls(newUrls);
  };

  const addTag = () => {
    if (tags.length < 5) {
      setTags([...tags, '']);
    }
  };

  const removeTag = (index) => {
    setTags(tags.filter((_, i) => i !== index));
  };

  const updateTag = (index, value) => {
    const newTags = [...tags];
    newTags[index] = value;
    setTags(newTags);
  };

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold text-gray-900 mb-8">Add New Car</h1>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        {error && (
          <div className="bg-red-50 p-4 rounded-md">
            <p className="text-sm text-red-700">{error}</p>
          </div>
        )}

        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700">
            Title
          </label>
          <input
            type="text"
            name="title"
            id="title"
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
        </div>

        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700">
            Description
          </label>
          <textarea
            name="description"
            id="description"
            rows={4}
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="price" className="block text-sm font-medium text-gray-700">
              Price
            </label>
            <input
              type="number"
              name="price"
              id="price"
              required
              min="0"
              step="0.01"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label htmlFor="year" className="block text-sm font-medium text-gray-700">
              Year
            </label>
            <input
              type="number"
              name="year"
              id="year"
              required
              min="1900"
              max={new Date().getFullYear()}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="mileage" className="block text-sm font-medium text-gray-700">
              Mileage
            </label>
            <input
              type="number"
              name="mileage"
              id="mileage"
              required
              min="0"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label htmlFor="fuelType" className="block text-sm font-medium text-gray-700">
              Fuel Type
            </label>
            <select
              name="fuelType"
              id="fuelType"
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            >
              <option value="">Select Fuel Type</option>
              <option value="Petrol">Petrol</option>
              <option value="Diesel">Diesel</option>
              <option value="Electric">Electric</option>
              <option value="Hybrid">Hybrid</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="transmission" className="block text-sm font-medium text-gray-700">
              Transmission
            </label>
            <select
              name="transmission"
              id="transmission"
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            >
              <option value="">Select Transmission</option>
              <option value="Manual">Manual</option>
              <option value="Automatic">Automatic</option>
            </select>
          </div>

          <div>
            <label htmlFor="place" className="block text-sm font-medium text-gray-700">
              Place
            </label>
            <input
              type="text"
              name="place"
              id="place"
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Images (Max 10)
          </label>
          {imageUrls.map((url, index) => (
            <div key={index} className="flex gap-2 mb-2">
              <input
                type="url"
                value={url}
                onChange={(e) => updateImageUrl(index, e.target.value)}
                placeholder="Enter image URL"
                className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
              <button
                type="button"
                onClick={() => removeImageUrl(index)}
                className="px-2 py-1 text-sm text-red-600 hover:text-red-800"
              >
                Remove
              </button>
            </div>
          ))}
          {imageUrls.length < 10 && (
            <button
              type="button"
              onClick={addImageUrl}
              className="text-sm text-indigo-600 hover:text-indigo-800"
            >
              + Add Image URL
            </button>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Tags (Max 5)
          </label>
          {tags.map((tag, index) => (
            <div key={index} className="flex gap-2 mb-2">
              <input
                type="text"
                value={tag}
                onChange={(e) => updateTag(index, e.target.value)}
                placeholder="Enter tag"
                className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
              <button
                type="button"
                onClick={() => removeTag(index)}
                className="px-2 py-1 text-sm text-red-600 hover:text-red-800"
              >
                Remove
              </button>
            </div>
          ))}
          {tags.length < 5 && (
            <button
              type="button"
              onClick={addTag}
              className="text-sm text-indigo-600 hover:text-indigo-800"
            >
              + Add Tag
            </button>
          )}
        </div>

        <div>
          <button
            type="submit"
            disabled={loading}
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
          >
            {loading ? 'Creating...' : 'Create Car'}
          </button>
        </div>
      </form>
    </div>
  );
}
