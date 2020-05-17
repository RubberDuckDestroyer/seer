const bibtexParse = require('bibtex-parse');

const BibtexParser = {
    /**
     * Parses the specifeid raw text of bibtex data and returns it as a JSON data.
     */
    parse: (content) => {
        return bibtexParse.entries(content);
    }
};
module.exports = BibtexParser;
