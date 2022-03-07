import courseData from './config/courseData.json'
import { getRandomCourse } from './utils/randomCourse';
import {getRandomElement} from "./utils/random";
import College from "../services/college";
import Courses from "../services/courses";
import FormHandler from "./ui/form_handler";
import TableHandler from "./ui/table_handler";
import _ from 'lodash';

//контролер
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
// ulElem.innerHTML = `${getCourseItems(courses)}`
const dataProvider = new Courses(courseData.minId, courseData.maxId, courses);
const dataProcessor = new College(dataProvider, courseData);
const tableHandler = new TableHandler([
    {key: 'id', displayName: 'ID'},
    {key: 'name', displayName: 'Course Name'},
    {key: 'lecturer', displayName: 'Lecturer Name'},
    {key: 'cost', displayName: 'Cost (ILS)'},
    {key: 'hours', displayName: 'Course Duration (h)'},
], "courses-table", "sortCourses");
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
});

//==================================
const tableHoursStatistics = new TableHandler([
    {key: 'minInterval', displayName: 'min' },
    {key: 'maxInterval', displayName: 'max' },
    {key: 'amount', displayName: 'amount' },
], "courses-table", "sortCourses");




formHandler.fillOptions("course-name-options", courseData.courses);
formHandler.fillOptions("lecturer-options", courseData.lectors);
// tableHandler.showTable(courses);

window.showForm = () =>{
    formHandler.show();
    tableHandler.hideTable();
}
window.showCourses = () =>{
    formHandler.removeMessage();
    tableHandler.showTable(dataProcessor.getAllCourses());
    formHandler.hide();
}
window.sortCourses = (key) =>{
    tableHandler.showTable(dataProcessor.sortCourses(key));
}
window.showHoursStatistics = (hours) =>{
    formHandler.removeMessage();
    tableHoursStatistics.showTable(dataProcessor.getStatistics(hours, courseData.intervalHours));
    formHandler.hide();
}
window.showCostStatistics = (cost) => {
    formHandler.removeMessage();
    tableHoursStatistics.showTable(dataProcessor.getStatistics(cost, courseData.intervalCost));
    formHandler.hide();
}
