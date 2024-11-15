export default function LoadingShell() {
  return (
    <>
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900">Add New Car</h2>
        <p className="mt-1 text-sm text-gray-600">
          Loading form...
        </p>
      </div>
      <div className="animate-pulse">
        <div className="space-y-6">
          <div className="h-4 bg-gray-200 rounded w-1/4"></div>
          <div className="h-10 bg-gray-200 rounded"></div>
          <div className="h-4 bg-gray-200 rounded w-1/4"></div>
          <div className="h-10 bg-gray-200 rounded"></div>
        </div>
      </div>
    </>
  )
}
