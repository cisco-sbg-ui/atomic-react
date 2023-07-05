const sortDates = (dates) => {
    return dates.sort((a, b) => Date.parse(a) - Date.parse(b));
};

const isSameDate = (a, b) => {
    return a.getFullYear() === b.getFullYear() &&
        a.getMonth() === b.getMonth() &&
        a.getDate() === b.getDate()
};

const isDateTipOfRange = (date, range) => {
    const [startDate, endDate] = range;
    return startDate instanceof Date && isSameDate(date, startDate) ||
        endDate instanceof Date && isSameDate(date, endDate) ||
        false;
};

const isDateBetweenRange = (date, range) => {
    const [startDate, endDate] = range;
    return Date.parse(date) > Date.parse(startDate) &&
        Date.parse(date) < Date.parse(endDate);
};

export {
    sortDates,
    isSameDate,
    isDateTipOfRange,
    isDateBetweenRange
}
