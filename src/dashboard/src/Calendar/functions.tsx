export const getTodaysCassandraDate = () => {
  const todayDate = new Date();
  return (
    todayDate.getFullYear + "-" + todayDate.getMonth + "-" + todayDate.getDay
  );
};
