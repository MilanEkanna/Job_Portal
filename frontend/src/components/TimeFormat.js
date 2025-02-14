export const formatTime = (createdAt) => {
  const now = new Date();
  const createdTime = new Date(createdAt);
  const diffInSeconds = Math.floor((now - createdTime) / 1000);
  
  if (diffInSeconds < 60) {
      return `${diffInSeconds} seconds ago`;
  } else if (diffInSeconds < 3600) {
      return `${Math.floor(diffInSeconds / 60)} minutes ago`;
  } else if (diffInSeconds < 86400) {
      return `${Math.floor(diffInSeconds / 3600)} hours ago`;
  } else {
      return `${Math.floor(diffInSeconds / 86400)} days ago`;
  }
};