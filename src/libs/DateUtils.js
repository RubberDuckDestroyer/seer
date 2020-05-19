import moment from "moment";

const DateUtils = {
    toUTC: (date) => {
        if (typeof (date) === "string") {
            date = new Date(date);
        }
        const newDate = moment(date).utcOffset("+0000").hour(0).minute(0).second(0);
        return newDate.toDate();
    }
};
export default DateUtils;
