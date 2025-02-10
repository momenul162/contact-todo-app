// Helper functions for date filtering
export const isToday = (dateString) => {
  const today = new Date();
  const contactDate = new Date(dateString);

  return (
    contactDate.getUTCFullYear() === today.getUTCFullYear() &&
    contactDate.getUTCMonth() === today.getUTCMonth() &&
    contactDate.getUTCDate() === today.getUTCDate()
  );
};

export const normalizeDate = (date) => {
  const normalized = new Date(date);
  normalized.setHours(0, 0, 0, 0);
  return normalized;
};

export const isLast7Days = (dateString) => {
  const today = new Date();
  const sevenDaysAgo = new Date();
  sevenDaysAgo.setDate(today.getDate() - 7);

  const contactDate = new Date(dateString);

  return contactDate >= sevenDaysAgo && contactDate <= today;
};
