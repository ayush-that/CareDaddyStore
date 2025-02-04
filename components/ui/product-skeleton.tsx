export function ProductSkeleton() {
  return (
    <div className="group sm:w-[250px] bg-white rounded-lg overflow-hidden border-2 border-gray-100">
      {/* Image Container */}
      <div className="relative h-[180px] bg-gray-100 p-4 animate-pulse">
        <div className="absolute inset-0 m-auto w-24 h-24 bg-gray-200 rounded" />
      </div>

      {/* Info Container */}
      <div className="p-4 bg-gradient-to-b from-[#f3fafb] to-[#e5f4f5]">
        {/* Title */}
        <div className="h-6 bg-gray-200 rounded mb-2 animate-pulse" />

        {/* Disease */}
        <div className="h-4 bg-gray-200 rounded w-1/2 mb-3 animate-pulse" />

        {/* Rating */}
        <div className="flex items-center gap-2 mb-3">
          <div className="h-4 bg-gray-200 rounded w-24 animate-pulse" />
        </div>

        {/* Price */}
        <div className="flex items-center gap-2 mb-3">
          <div className="h-6 bg-gray-200 rounded w-20 animate-pulse" />
        </div>

        {/* Shipping Info */}
        <div className="space-y-2 mb-4">
          <div className="h-4 bg-gray-200 rounded w-3/4 animate-pulse" />
          <div className="h-4 bg-gray-200 rounded w-2/3 animate-pulse" />
        </div>

        {/* Button */}
        <div className="h-10 bg-gray-200 rounded animate-pulse" />
      </div>
    </div>
  );
}
