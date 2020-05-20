import { expect } from "chai";
import { describe, it } from "mocha";

import BibtexParser from "./BibtexParser";

describe("Testing BibtexParser functions", () => {
    it("Tests whether Bibtex format string can be parsed", () => {
        const rawData = `
        @article{Janzen:2008fx,
        author = {{Janzen, D S} and {Saiedian, H}},
        title = {{Does Test-Driven Development Really Improve Software Design Quality?}},
        journal = {Software, IEEE},
        year = {2008},
        volume = {25},
        number = {2},
        pages = {77--84}
        }
        `;

        const result = BibtexParser.parse(rawData);
        // console.log(result);
        expect(Array.isArray(result)).to.equal(true);
        expect(result.length).to.equal(1);

        const entry = result[0];
        expect(entry.key).to.equal("Janzen:2008fx");
        expect(entry.type).to.equal("article");
        expect(entry.AUTHOR).to.equal("Janzen, D S and Saiedian, H");
        expect(entry.TITLE).to.equal("Does Test-Driven Development Really Improve Software Design Quality?");
        expect(entry.JOURNAL).to.equal("Software, IEEE");
        expect(entry.YEAR).to.equal("2008");
        expect(entry.VOLUME).to.equal("25");
        expect(entry.NUMBER).to.equal("2");
        expect(entry.PAGES).to.equal("77--84");
    });

    it("Tests whether Bibtex format string can be parsed with two entries in a single string", () => {
        const rawData = `
        @article{Janzen:2008fx,
        author = {{Janzen, D S} and {Saiedian, H}},
        title = {{Does Test-Driven Development Really Improve Software Design Quality?}},
        journal = {Software, IEEE},
        year = {2008},
        volume = {25},
        number = {2},
        pages = {77--84}
        }

        @proceedings{Anonymous:O7UPDeq-,
        title = {{A prototype empirical evaluation of test driven development - Software Metrics, 2004. Proceedings. 10th International Symposium on}},
        year = {2001},
        month = aug
        }
        `;

        const result = BibtexParser.parse(rawData);
        // console.log(result);
        expect(Array.isArray(result)).to.equal(true);
        expect(result.length).to.equal(2);

        let entry = result[0];
        expect(entry.key).to.equal("Janzen:2008fx");
        expect(entry.type).to.equal("article");
        expect(entry.AUTHOR).to.equal("Janzen, D S and Saiedian, H");
        expect(entry.TITLE).to.equal("Does Test-Driven Development Really Improve Software Design Quality?");
        expect(entry.JOURNAL).to.equal("Software, IEEE");
        expect(entry.YEAR).to.equal("2008");
        expect(entry.VOLUME).to.equal("25");
        expect(entry.NUMBER).to.equal("2");
        expect(entry.PAGES).to.equal("77--84");

        entry = result[1];
        expect(entry.key).to.equal("Anonymous:O7UPDeq-");
        expect(entry.type).to.equal("proceedings");
        expect(entry.TITLE).to.equal("A prototype empirical evaluation of test driven development - Software Metrics, 2004. Proceedings. 10th International Symposium on");
        expect(entry.YEAR).to.equal("2001");
        expect(entry.MONTH).to.equal("August");
    });
});
