const MessageSkeleton = () => {
  // Create an array of 6 items for skeleton messages
  const skeletonMessages = Array(6).fill(null);

  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-white">
      {skeletonMessages.map((_, idx) => (
        <div key={idx} className={`chat ${idx % 2 === 0 ? "chat-start" : "chat-end"}`}>
          <div className="chat-image avatar">
            <div className="size-10 rounded-full border border-blue-100 bg-blue-50">
              <div className="skeleton w-full h-full rounded-full bg-blue-100" />
            </div>
          </div>

          <div className="chat-header mb-1">
            <div className="skeleton h-4 w-16 bg-blue-50" />
          </div>

          <div className="chat-bubble bg-blue-50 p-0">
            <div className="skeleton h-16 w-[200px] bg-blue-100" />
          </div>
        </div>
      ))}
    </div>
  );
};

export default MessageSkeleton;
