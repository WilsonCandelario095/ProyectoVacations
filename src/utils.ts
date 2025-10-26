import { Visibility, Weather, type NewDiary } from "./types";

const parseComment = (commentFrontRequest: any): string => {
    if (!isString(commentFrontRequest)) {
        throw new Error('Incorrect or missing comment');
    }
    return commentFrontRequest;
}

const parseDate = (dateFrontRequest: any): string => {
    if (!isString(dateFrontRequest) || !isDate(dateFrontRequest)) {
        throw new Error('Incorrect or missing date: ' + dateFrontRequest);
    }
    return dateFrontRequest;
}

const parseWeather = (weatherFrontRequest: any): Weather => {
    if (!isString(weatherFrontRequest) || !isWeather(weatherFrontRequest)) {
        throw new Error('Incorrect or missing weather: ' + weatherFrontRequest);
    }
    return weatherFrontRequest;
}

const parseVisbility = (visibilityFrontRequest: any): Visibility => {
    if (!isString(visibilityFrontRequest) || !isVisibility(visibilityFrontRequest)) {
        throw new Error('Incorrect or missing visibility: ' + visibilityFrontRequest);
    }
    return visibilityFrontRequest;
}

const isString = (string : string) : boolean => {
    return typeof string === 'string';
}
const isDate = (date : string): boolean => {
    return Boolean(Date.parse(date));
}
const isWeather = (param: any): boolean => {
    return Object.values(Weather).includes(param);
}
const isVisibility = (param: any): boolean => {
    return Object.values(Visibility).includes(param);
}

const toNewDiaryEntry = (object: any): NewDiary => {
    const newEntry: NewDiary = {
        date: parseDate(object.date),
        weather: parseWeather(object.weather),
        visibility: parseVisbility(object.visibility),
        comment: parseComment(object.comment)
    }

    return newEntry;
}

export default toNewDiaryEntry