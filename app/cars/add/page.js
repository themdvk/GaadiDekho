// Server-side exports
export const dynamic = 'force-dynamic'
export const dynamicParams = true
export const revalidate = 0
export const fetchCache = 'force-no-store'
export const runtime = 'nodejs'
export const preferredRegion = 'auto'

'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'

export default function AddCarPage() {
  const router = useRouter()
  const { data: session, status } = useSession()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState('')
  const [imageUrls, setImageUrls] = useState([''])
  const [formData, setFormData] = useState({
    make: '',
    model: '',
    year: new Date().getFullYear(),
    price: '',
    mileage: '',
    place: '',
    fuelType: 'Petrol',
    transmission: 'Manual',
    features: '',
  })

  const addImageUrl = () => {
    setImageUrls([...imageUrls, ''])
  }

  const removeImageUrl = (index) => {
    const newUrls = imageUrls.filter((_, i) => i !== index)
    setImageUrls(newUrls.length ? newUrls : [''])
  }

  const handleImageUrlChange = (index, value) => {
    const newUrls = [...imageUrls]
    newUrls[index] = value
    setImageUrls(newUrls)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (status === 'unauthenticated') {
      router.push('/api/auth/signin')
      return
    }

    if (!formData.make || !formData.model || !formData.year || !formData.price) {
      setError('Please fill in all required fields')
      return
    }

    setIsSubmitting(true)
    setError('')

    try {
      const filteredImageUrls = imageUrls.filter(url => url.trim() !== '')
      
      const response = await fetch('/api/cars/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          imageUrls: filteredImageUrls,
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to add car')
      }

      router.push('/cars')
      router.refresh()
    } catch (err) {
      setError('Failed to add car. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Add a New Car</h1>
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Make *
          </label>
          <input
            type="text"
            value={formData.make}
            onChange={(e) => setFormData({ ...formData, make: e.target.value })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Model *
          </label>
          <input
            type="text"
            value={formData.model}
            onChange={(e) => setFormData({ ...formData, model: e.target.value })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Year *
          </label>
          <input
            type="number"
            value={formData.year}
            onChange={(e) => setFormData({ ...formData, year: parseInt(e.target.value) })}
            min="1900"
            max={new Date().getFullYear() + 1}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Price (₹) *
          </label>
          <input
            type="number"
            value={formData.price}
            onChange={(e) => setFormData({ ...formData, price: parseInt(e.target.value) })}
            min="0"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Mileage (km)
          </label>
          <input
            type="number"
            value={formData.mileage}
            onChange={(e) => setFormData({ ...formData, mileage: parseInt(e.target.value) })}
            min="0"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Location
          </label>
          <input
            type="text"
            value={formData.place}
            onChange={(e) => setFormData({ ...formData, place: e.target.value })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500"
            placeholder="e.g., Mumbai, Maharashtra"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Fuel Type
          </label>
          <select
            value={formData.fuelType}
            onChange={(e) => setFormData({ ...formData, fuelType: e.target.value })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500"
          >
            <option value="Petrol">Petrol</option>
            <option value="Diesel">Diesel</option>
            <option value="Electric">Electric</option>
            <option value="Hybrid">Hybrid</option>
            <option value="CNG">CNG</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Transmission
          </label>
          <select
            value={formData.transmission}
            onChange={(e) => setFormData({ ...formData, transmission: e.target.value })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500"
          >
            <option value="Manual">Manual</option>
            <option value="Automatic">Automatic</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Features
          </label>
          <textarea
            value={formData.features}
            onChange={(e) => setFormData({ ...formData, features: e.target.value })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500"
            rows="3"
            placeholder="List key features of your car (e.g., Air Conditioning, Power Steering, etc.)"
          />
        </div>

        <div>
          <div className="flex justify-between items-center mb-2">
            <label className="block text-sm font-medium text-gray-700">
              Car Images
            </label>
            <button
              type="button"
              onClick={addImageUrl}
              className="inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-md text-red-600 bg-red-100 hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
            >
              Add Image URL
            </button>
          </div>
          <div className="space-y-3">
            {imageUrls.map((url, index) => (
              <div key={index} className="flex gap-2">
                <input
                  type="url"
                  value={url}
                  onChange={(e) => handleImageUrlChange(index, e.target.value)}
                  className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500"
                  placeholder="Enter image URL"
                />
                {imageUrls.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeImageUrl(index)}
                    className="inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-md text-red-600 hover:bg-red-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                  >
                    Remove
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            disabled={isSubmitting}
            className={`inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 ${
              isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            {isSubmitting ? 'Adding...' : 'Add Car'}
          </button>
        </div>
      </form>
    </div>
  )
}
