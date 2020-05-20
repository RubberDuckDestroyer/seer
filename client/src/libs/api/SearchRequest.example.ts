import SearchRequest from "./SearchRequest";

const createRequest = () => new SearchRequest({
    filters: [
        {
            category: "",
            condition: "",
            value: ""
        }
    ],
    minDate: new Date("2001-07-31"),
    maxDate: new Date("2001-08-01"),
    sort: {
        key: "submission.bibliography.TITLE",
        isAscending: true
    }
})
