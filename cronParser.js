const arrayOfCrons = [
  "01 13 * * 3,4",
  "09 05 * * 1,3,5",
  "19 05 * * 1,3,5",
  "45 09 * * 2,4",
  "jkjk",
  null,
  "33 18 * * 0",
];

const dayMap = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

const parseAndGetTime = ({ min, hr }) =>
  `${hr.padStart(2, "0")}:${min.padStart(2, "0")}`;

const parseAndGetDays = ({ dayString }) =>
  dayString
    .split(",")
    .map((day) => dayMap[day])
    .join(" and ");

const isValidCron = (cron) => {
  const cronRegex =
    /^([0-5]?[0-9]) ([01]?[0-9]|2[0-3]) (\*|([1-9]|[12][0-9]|3[01])) (\*|([1-9]|1[0-2])) (\*|[0-6](,[0-6])*)$/;
  return cronRegex.test(cron);
};

const parseAndGetReadbleString = (cron) => {
  const [min, hr, , , dayString] = cron.split(" ");
  if (min && hr && dayString) {
    const time = parseAndGetTime({ min, hr });
    const days = parseAndGetDays({ dayString });
    return `At ${time} on ${days}`;
  }
};

const cronToDays = (cronArray) =>
  Array.isArray(cronArray)
    ? cronArray.reduce(
        (acc, cron) =>
          isValidCron(cron) ? [...acc, parseAndGetReadbleString(cron)] : acc,
        []
      )
    : [];

const result = cronToDays(arrayOfCrons);
console.log(result);
