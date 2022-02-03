export const sortDates = (dates) => {
    return dates.sort((a, b) => Date.parse(a) - Date.parse(b));
};

export const isSameDate = (a, b) => {
    return a.getFullYear() === b.getFullYear() &&
        a.getMonth() === b.getMonth() &&
        a.getDate() === b.getDate()
};

export const isDateTipOfRange = (date, range) => {
    const [rangeStartDate, rangeEndDate] = range;

    if (
        rangeStartDate instanceof Date && isSameDate(date, rangeStartDate) ||
        rangeEndDate instanceof Date && isSameDate(date, rangeEndDate)
    ) {
        return true;
    }

    return false;
};

export const isDateBetweenRange = (date, range) => {
    const [rangeStartDate, rangeEndDate] = range;
    return Date.parse(date) > Date.parse(rangeStartDate) &&
        Date.parse(date) < Date.parse(rangeEndDate);
};
