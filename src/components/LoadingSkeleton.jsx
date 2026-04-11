const LoadingSkeleton = ({ type = 'card', count = 1 }) => {
  const skeletons = {
    card: () => (
      <div className="bg-white dark:bg-gray-800 rounded-xl p-4 animate-pulse">
        <div className="w-full h-40 bg-gray-200 dark:bg-gray-700 rounded-lg mb-3"></div>
        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-2"></div>
        <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
      </div>
    ),
    text: () => (
      <div className="space-y-2 animate-pulse">
        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full"></div>
        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-5/6"></div>
      </div>
    ),
    avatar: () => (
      <div className="flex items-center gap-3 animate-pulse">
        <div className="w-10 h-10 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
        <div className="flex-1">
          <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-24"></div>
        </div>
      </div>
    )
  };
  
  const SkeletonComponent = skeletons[type] || skeletons.card;
  
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {Array(count).fill().map((_, i) => <SkeletonComponent key={i} />)}
    </div>
  );
};

export default LoadingSkeleton;
