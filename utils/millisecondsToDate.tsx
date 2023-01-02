export const millisecondsToDate = (milliseconds: number) => {
    const today = new Date(milliseconds);
    const full = today.toDateString();
    const year = today.getFullYear();
    const month = today.getMonth();
    const day = today.getDay();
    const hours = today.getHours();
    const minutes = today.getMinutes();

    return {
        full: full,
        year: year,
        month: month,
        day: day,
        hours: hours,
        minutes: minutes
    }
}