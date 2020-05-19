import bibtexParse from 'bibtex-parse';
import DateUtils from "./DateUtils";

const BibtexParser = {
    /**
     * Parses the specifeid raw text of bibtex data and returns it as a JSON data.
     */
    parse: (content) => {
        const result = bibtexParse.entries(content);
        result.forEach(r => {
            if (typeof (r.YEAR) === "string") {
                r.DATE = DateUtils.toUTC(`${r.YEAR}-${r.MONTH || "01"}-01`);
            }
        });
        return result;
    }
};
export default BibtexParser;
