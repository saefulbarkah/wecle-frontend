type dateProps = {
  date: Date;
  type: 'DD-MM-YYYY' | '';
};
export function dateToString({ date, type }: dateProps) {
  switch (type) {
    case 'DD-MM-YYYY':
      return DDMMYYY(date);

    default:
      return DDMMYYY(date);
  }
}

function DDMMYYY(data: Date): string {
  const date = new Date(data);
  const day = date.getDate().toString().padStart(2, '0');
  const month = new Intl.DateTimeFormat('en-US', { month: 'long' }).format(
    date
  );
  const year = date.getFullYear();

  return `${day}-${month}-${year}`;
}
