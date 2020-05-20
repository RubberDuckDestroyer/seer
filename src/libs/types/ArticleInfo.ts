import DateUtils from "../DateUtils";

import Enum from "../enums/Enum";
import ResearchMethodType from "../enums/ResearchMethodType";
import MethodType from "../enums/MethodType";
import MethodologyType from "../enums/MethodologyType";
import ParticipantType from "../enums/ParticipantType";
import IntegrityType from "../enums/IntegrityType";

export default class ArticleInfo {

    rawArticle: any;
    submission: any;
    bibliography: any;

    cachedCredibility: number | undefined;
    cachedQuality: number | undefined;


    constructor(rawArticle: any) {
        this.rawArticle = rawArticle;
        this.submission = rawArticle.submission;
        this.bibliography = this.submission.bibliography;
    }

    getType() { return this.bibliography.type as String; }

    getAuthor() { return this.bibliography.AUTHOR as String; }

    getTitle() { return this.bibliography.TITLE as String; }

    getJournal() { return this.bibliography.JOURNAL as String; }

    getYear() { return this.bibliography.YEAR as String; }

    getMonth() { return this.bibliography.MONTH as String; }

    getVolume() { return this.bibliography.VOLUME as String; }

    getNumber() { return this.bibliography.NUMBER as String; }

    getPages() { return this.bibliography.PAGES as String; }

    getDate() { return DateUtils.toUTC(this.bibliography.DATE as String); }

    getCredibility() {
        if (this.cachedCredibility === undefined) {
            if (this.rawArticle.credibilityOverride !== undefined) {
                this.cachedCredibility = this.rawArticle.credibilityOverride as number;
            }
            else if(Array.isArray(this.rawArticle.credibilityRatings)) {
                const ratings = this.rawArticle.credibilityRatings as any[];
                if (ratings.length > 0) {
                    ratings.forEach(r => this.cachedCredibility += (r.rating as number));
                    this.cachedCredibility /= ratings.length;
                }
                else {
                    this.cachedCredibility = 0;
                }
            }
            else {
                this.cachedCredibility = 0;
            }
        }
        return this.cachedCredibility;
    }

    getQuality() {
        if (this.cachedQuality === undefined) {
            const ratings = this.rawArticle.qualityRatings as any[];
            if (Array.isArray(ratings) && ratings.length > 0) {
                ratings.forEach(r => this.cachedQuality += (r.rating as number));
                this.cachedQuality /= ratings.length;
            }
            else {
                this.cachedQuality = 0;
            }
        }
        return this.cachedQuality;
    }

    getQuestion() { return this.rawArticle.question as String; }

    getMetric() { return this.rawArticle.metric as String; }

    getReserachMethodType() {
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
        return new Array<ParticipantType>();
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
