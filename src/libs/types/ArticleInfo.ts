import DateUtils from "../DateUtils";

import Enum from "../enums/Enum";
import ResearchMethodType from "../enums/ResearchMethodType";
import MethodType from "../enums/MethodType";
import MethodologyType from "../enums/MethodologyType";
import ParticipantType from "../enums/ParticipantType";
import IntegrityType from "../enums/IntegrityType";
import { ColumnEnum } from '../enums/ColumnType';
import ColumnType from '../enums/ColumnType';

export default class ArticleInfo {

    rawArticle: any;
    submission: any;
    bibliography: any;

    cachedCredibility: boolean = false;
    cachedQuality: boolean = false;
    credibility: number = 0;
    quality: number = 0;


    constructor(rawArticle: any) {
        this.rawArticle = rawArticle;
        this.submission = rawArticle.submission;
        this.bibliography = this.submission.bibliography;
    }

    getValueForColumn(column: ColumnEnum) {
        if (column === null || column === undefined) {
            console.log(`ArticleInfo.getValueForColumn - column mustn't be null or undefined!`);
            return "";
        }
        switch (column) {
            case ColumnType.title: return this.getTitle();
            case ColumnType.author: return this.getAuthor();
            case ColumnType.journal: return this.getJournal();
            case ColumnType.publicationDate: return this.getDate();
            case ColumnType.publicationType: return this.getType();
            case ColumnType.doi: return this.getDOI();
            case ColumnType.question: return this.getQuestion();
            case ColumnType.metric: return this.getMetric();
            case ColumnType.researchMethodType: return this.getResearchMethodType();
            case ColumnType.methodType: return this.getMethodType();
            case ColumnType.methodologyType: return this.getMethodologyType();
            case ColumnType.integrity: return this.getIntegrity();
            case ColumnType.result: return this.getResult();
        }
        console.log(`ArticleInfo.getValueForColumn - Unsupported column type: ${column.name}`);
        return "";
    }

    getType() { return this.bibliography.type as String; }

    getDOI() { return this.bibliography.DOI as String; }

    getAuthor() { return this.bibliography.AUTHOR as String; }

    getTitle() { return this.bibliography.TITLE as String; }

    getJournal() { return this.bibliography.JOURNAL as String; }

    getYear() { return this.bibliography.YEAR as String; }

    getMonth() { return this.bibliography.MONTH as String; }

    getVolume() { return this.bibliography.VOLUME as String; }

    getNumber() { return this.bibliography.NUMBER as String; }

    getPages() { return this.bibliography.PAGES as String; }

    getDate() {
        const dateString = this.bibliography.DATE;
        if(typeof (dateString) === "string")
            return DateUtils.toUTC(dateString);
        return null;
    }

    getCredibility() {
        if (!this.cachedCredibility) {
            this.cachedCredibility = true;

            if (this.rawArticle.credibilityOverride !== undefined) {
                this.credibility = this.rawArticle.credibilityOverride as number;
            }
            else if(Array.isArray(this.rawArticle.credibilityRatings)) {
                const ratings = this.rawArticle.credibilityRatings as any[];
                if (ratings.length > 0) {
                    ratings.forEach(r => this.credibility += (r.rating as number));
                    this.credibility /= ratings.length;
                }
                else {
                    this.credibility = 0;
                }
            }
            else {
                this.credibility = 0;
            }
        }
        return this.credibility;
    }

    getQuality() {
        if (!this.cachedQuality) {
            this.cachedQuality = true;

            const ratings = this.rawArticle.qualityRatings as any[];
            if (Array.isArray(ratings) && ratings.length > 0) {
                ratings.forEach(r => this.quality += (r.rating as number));
                this.quality /= ratings.length;
            }
            else {
                this.quality = 0;
            }
        }
        return this.quality;
    }

    getQuestion() { return this.rawArticle.question as String; }

    getMetric() { return this.rawArticle.metric as String; }

    getResearchMethodType() {
        return Enum.findByName(ResearchMethodType, this.rawArticle.researchMethodType);
    }

    getMethodType() {
        return Enum.findByName(MethodType, this.rawArticle.methodType);
    }

    getMethodologyType() {
        return Enum.findByName(MethodologyType, this.rawArticle.methodologyType);
    }

    getBenefit() { return this.rawArticle.benefit as String; }

    getParticipants() {
        const participants = this.rawArticle.participants as any[];
        if (Array.isArray(participants) && participants.length > 0) {
            return participants.map(p => Enum.findByName(ParticipantType, p));
        }
        return new Array<Enum>();
    }

    getContext() {
        const context = {
            where: "",
            when: "",
            what: "",
            whom: "",
            how: ""
        };
        if (typeof(this.rawArticle.context) === "object") {
            const c = this.rawArticle.context;
            if (typeof (c.where) === "string")
                context.where = c.where as string;
            if (typeof (c.when) === "string")
                context.when = c.when as string;
            if (typeof (c.what) === "string")
                context.what = c.what as string;
            if (typeof (c.whom) === "string")
                context.where = c.where as string;
            if (typeof (c.how) === "string")
                context.how = c.how as string;
        }
        return context;
    }

    getResult() { return this.rawArticle.result as String; }

    getConfidenceRating() { return this.rawArticle.confidenceRating as number; }

    getIntegrity() {
        return Enum.findByName(IntegrityType, this.rawArticle.integrityType);
    }

}
