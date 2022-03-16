import courseData from './config/courseData.json'
import { getRandomCourse } from './utils/randomCourse';
import {getRandomElement} from "./utils/random";
import College from "../services/college";
import Courses from "../services/courses";
import FormHandler from "./ui/form_handler";
import TableHandler from "./ui/table_handler";
import _ from 'lodash';
import NavigatorButtons from "./ui/navigator_buttons";
import Spinner from "./ui/spinner";


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
], "courses-table", "sortCourses", "removeCourse");
const formHandler = new FormHandler("courses-form", "alert");
formHandler.addHandler(async course => {
    const message = await dataProcessor.addCourse(course);
    console.log(typeof (message))
    if (typeof(message) !== 'string') {
    //     course.id = 1000000
    //     ulElem.innerHTML += `<li>${JSON.stringify(course)}</li>`;
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

//==========NavigatorButtons========
const navigator = new NavigatorButtons(["0","1","2", "3", "4"])
formHandler.addHandler(async course => {
    const res = await asyncRequestWithSpinner(dataProcessor.addCourse.bind(dataProcessor, course));
        if (typeof (res) !== 'string') {
        return '';
    }
    return res;

})
const generationHandler = new FormHandler("generation-form", "alert");
generationHandler.addHandler(async generation => {

    for (let i=0; i < generation.nCourses; i++) {
       await asyncRequestWithSpinner(dataProcessor.addCourse.bind(dataProcessor, getRandomCourse(courseData)))
    }
    return '';
})
const spinner = new Spinner("spinner");

formHandler.fillOptions("course-name-options", courseData.courses);
formHandler.fillOptions("lecturer-options", courseData.lectors);
// tableHandler.showTable(courses);

async function asyncRequestWithSpinner(asyncFn){
    spinner.start();
    const res = await asyncFn();
    spinner.stop();
    return res;
}

function hide(){
    formHandler.removeMessage();
    tableHandler.hideTable();
    formHandler.hide();
    generationHandler.hide();
}

window.showForm = () =>{
    hide()
    navigator.setActive(0);
    formHandler.show();
}
window.showCourses = async () =>{
    hide();
    navigator.setActive(1);
    tableHandler.showTable(await asyncRequestWithSpinner(dataProcessor.getAllCourses.bind(dataProcessor)));
}
window.sortCourses = async (key) =>{
    tableHandler.showTable(await dataProcessor.sortCourses(key));
}
window.showHoursStatistics = async (hours) =>{
    hide();
    navigator.setActive(2);
    tableHoursStatistics.showTable(await asyncRequestWithSpinner(
        dataProcessor.getStatistics.bind(dataProcessor, hours, courseData.intervalHours)))
}
window.showCostStatistics = async (cost) => {
    hide();
    navigator.setActive(3);
    tableHoursStatistics.showTable(await asyncRequestWithSpinner(
        dataProcessor.getStatistics.bind(dataProcessor, cost, courseData.intervalHours)))
}
window.removeCourse = async (id) =>{
    if(window.confirm(`you are going to remove course id: ${id}`)){
        await dataProcessor.removeCourse(+id);
        tableHandler.showTable(await asyncRequestWithSpinner(dataProcessor.getAllCourses.bind(dataProcessor)));
    }
}
window.showGeneration = () =>{
    hide();
    navigator.setActive(4);
    generationHandler.show();
}

