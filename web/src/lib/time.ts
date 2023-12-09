export function timeAgo(timestamp: Date): string {
  const currentDate = new Date();
  const targetDate = new Date(timestamp);

  const seconds = Math.floor(
    (currentDate.getTime() - targetDate.getTime()) / 1000
  );

  const intervals: Record<string, number> = {
    year: Math.floor(seconds / (365 * 24 * 60 * 60)),
    month: Math.floor(seconds / (30 * 24 * 60 * 60)),
    week: Math.floor(seconds / (7 * 24 * 60 * 60)),
    day: Math.floor(seconds / (24 * 60 * 60)),
    hour: Math.floor(seconds / (60 * 60)),
    minute: Math.floor(seconds / 60),
    second: seconds,
  };

  let result: string | undefined;

  for (const [unit, value] of Object.entries(intervals)) {
    if (value > 0) {
      result = `${value} ${unit}${value === 1 ? '' : 's'} ago`;
      break;
    }
  }

  return result || 'Just now';
}
