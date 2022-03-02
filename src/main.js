import courseData from './config/courseData.json'
import { getRandomCourse } from './utils/randomCourse';
import {getRandomElement} from "./utils/random";
import College from "../services/college";
import Courses from "../services/courses";
import FormHandler from "./ui/form_handler";
const N_COURSES = 10;
function createCourses() {
    const courses = [];
    for (let i = 0; i < N_COURSES; i++) {
        courses.push(getRandomCourse(courseData));
    }
    return courses;
}
//TODO rendering inside <ul>
function getCourseItems (courses){
    return courses.map(i => `<li>${JSON.stringify(i)}</li>`).join("");
}

const ulElem = document.getElementById('courses');


//TODO rendering inside <ul>
const courses = createCourses();
// ulElem.innerHTML = `${getCourseItems(createCourses())}`;
ulElem.innerHTML = `${getCourseItems(courses)}`
const dataProvider = new Courses(courseData.minId, courseData.maxId, courses);
const dataProcessor = new College(dataProvider, courseData);
const formHandler = new FormHandler("courses-form", "alert");
formHandler.addHandler(course => {
    const message = dataProcessor.addCourse(course);
    console.log(typeof (message))
    if (typeof(message) !== 'string') {
    //     course.id = 1000000
        ulElem.innerHTML += `<li>${JSON.stringify(course)}</li>`;
        return "";
    }
    return message;
})

