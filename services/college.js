// Data processor - отвечает за обработку данных для ввода и вывода
export default class College {
    #courseData;
    #courses

    constructor(courses, courseData) {
        this.#courses = courses;
        this.#courseData = courseData;
    }

    addCourse(course) {
        //TODO validation of the course data
        //if course is valid, then course should be added : this.#courses.add(course)
        //if course is invalid, then the method returns full message describing what's wrong
        //if course is valid
       course.hours = +course.hours;
       course.cost = +course.cost;
       course.openingDate = new Date(course.openingDate);       //получаем дату
       const validationMessage = this.#getValidationMessage(course);
       if(!validationMessage){
           this.#courses.add(course);
       }
       return validationMessage;
    }

    #getValidationMessage(course) {
        //TODO validate course
        const {courses, lectors, minCost, maxCost, minHours, maxHours, minYear, maxYear, minId, maxId} = this.#courseData;
        const {name, lecturer, hours, cost, openingDate} = course;

        let message = '';
        message += cost > maxCost || cost < minCost ?
            `wrong cost value - should be in range [${minCost}-${maxCost}] <br>`: '';
        message += hours > maxHours || hours < minHours ?
            `wrong hours value - should be in range [${minHours}-${maxHours}] <br>`: '';
        message += !lectors.includes(lecturer) ? `wrong lecturer name - should be one from ${lectors} <br>`: '';
        message += !courses.includes(name) ? `wrong course name - should be one from ${courses}`:'';
        const year = openingDate.getFullYear();
        message += year < minYear || year > maxYear ?
            `wrong opening date - year should be in range [${minYear} - ${maxYear}]` : ''
        console.log(typeof (message))
        return message;
    }
}
