export const calculateDaysLeft = (deadline) => {
  const today = new Date();
  const deadlineDate = new Date(deadline);
  const diffTime = deadlineDate.getTime() - today.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays;
};

export const isGoalOverdue = (deadline) => {
  const today = new Date();
  const deadlineDate = new Date(deadline);
  return deadlineDate < today;
};

export const isDeadlineApproaching = (deadline, daysThreshold = 30) => {
  const daysLeft = calculateDaysLeft(deadline);
  return daysLeft > 0 && daysLeft <= daysThreshold;
};