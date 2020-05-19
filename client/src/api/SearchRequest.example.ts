import SearchRequest from "./SearchRequest";

const createRequest = () => new SearchRequest({
    filters: [
        {
            category: "",
            condition: "",
            value: ""
        }
    ],
    minDate: new Date("2020-05-14T06:49:24.442Z"),
    maxDate: new Date("2020-05-14T06:49:24.442Z"),
    sort: {
        key: "submission.bibliography.TITLE",
        order: 1
    }
})
