import { createCourse } from "../models/course";
import {getRandomDate, getRandomElement, getRandomNumber} from "./random";
export function getRandomCourse(courseData) {
    //TODO getting random arguments for the below function call
    const {courses, lectors, minCost, maxCost, minHours, maxHours, minYear, maxYear, minId, maxId} = courseData;
    const id = getRandomNumber(minId, maxId);
    const name = getRandomElement(courses);
    const lecturer = getRandomElement(lectors);
    const hours = Math.round(getRandomNumber(minHours, maxHours) / 10) * 10;
    const cost = Math.round(getRandomNumber(minCost, maxCost) / 100) * 100;
    const openingDate = getRandomDate(minYear, maxYear);
    return createCourse(id,name,lecturer, hours, cost, openingDate);
}


