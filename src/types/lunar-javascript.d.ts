declare module 'lunar-javascript' {
    export class Solar {
        static fromYmd(year: number, month: number, day: number): Solar;
        static fromYmdHms(year: number, month: number, day: number, hour: number, minute: number, second: number): Solar;
        getLunar(): Lunar;
    }

    export class Lunar {
        getEightChar(): EightChar;
        getYearZhiInGan(): string[];
        getMonthZhiInGan(): string[];
        getDayZhiInGan(): string[];
        getTimeZhiInGan(): string[];
    }

    export class EightChar {
        getYearGan(): string;
        getYearZhi(): string;
        getMonthGan(): string;
        getMonthZhi(): string;
        getDayGan(): string;
        getDayZhi(): string;
        getTimeGan(): string;
        getTimeZhi(): string;
    }
}
