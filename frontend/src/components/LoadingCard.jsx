const LoadingCard = () => {
  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden p-0 animate-pulse">
      {/* Image Skeleton */}
      <div className="h-48 bg-slate-800 w-full"></div>
      
      <div className="p-6">
        {/* Title Skeleton */}
        <div className="h-6 bg-slate-800 rounded w-3/4 mb-4"></div>
        
        {/* Meta Skeleton */}
        <div className="flex gap-4 mb-6">
           <div className="h-4 bg-slate-800 rounded w-1/3"></div>
           <div className="h-4 bg-slate-800 rounded w-1/4"></div>
        </div>

        {/* Footer Skeleton */}
        <div className="flex justify-between items-center pt-4 border-t border-slate-800">
           <div className="h-8 bg-slate-800 rounded w-16"></div>
           <div className="h-8 bg-slate-800 rounded w-24"></div>
        </div>
      </div>
    </div>
  );
};

export default LoadingCard;