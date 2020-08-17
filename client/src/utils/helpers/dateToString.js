const dateString = date => {
  if (!date) return ' ';
  const d = new Date(date);
  const mlist = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];

  const month = mlist[d.getMonth()];
  const minutes = (d.getMinutes() < 10 ? '0' : '') + d.getMinutes();
  const seconds = (d.getSeconds() < 10 ? '0' : '') + d.getSeconds();
  const dateString = `${d.getDate()} ${month} ${d.getFullYear()}, ${d.getHours()}:${minutes}:${seconds}`;

  return dateString;
};

export default dateString;
