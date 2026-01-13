const LoadingCard = () => {
  return (
    <div className="border rounded p-4 animate-pulse">
      <div className="h-40 bg-gray-300 rounded"></div>
      <div className="h-4 bg-gray-300 mt-4 w-3/4"></div>
      <div className="h-4 bg-gray-300 mt-2 w-1/2"></div>
    </div>
  );
};

export default LoadingCard;
