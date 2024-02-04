export function timeAgo(timestamp) {
  const currentDate = new Date();
  const targetDate = new Date(timestamp);

  const timeDifference = currentDate - targetDate;
  const daysAgo = Math.floor(timeDifference / (1000 * 60 * 60 * 24));

  if (daysAgo === 0) {
    return "Today";
  } else if (daysAgo === 1) {
    return "Yesterday";
  } else {
    return `${daysAgo} days ago`;
  }
}
