import moment from "moment";

const DateUtils = {
    toUTC: (date) => {
        if (typeof (date) === "string") {
            date = new Date(date);
        }
        return moment(date).utcOffset("+0000").toDate();
    }
};
export default DateUtils;
