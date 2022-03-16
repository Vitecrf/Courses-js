//Fake Data Provisioning module
//data are the regular JS array
import {getRandomNumber} from "../src/utils/random";

function getPromise(timeout, value) {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve(value)
        }, timeout)
    })
}

export default class Courses {
    #courses
    #minId
    #maxId
    constructor(minId, maxId, courses) {
        this.#courses = courses ?? [];
        this.#minId = minId ?? 1;
        this.#maxId = maxId ?? 10000000;
    }
    add(course){
        // console.log(`add ${course.id}`)
        course.id = this.#getId();
        this.#courses.push(course);
        return getPromise(1000, course);
    }
    #getId(){
        let id;
        do{
            id = getRandomNumber(this.#minId, this.#maxId);
            // console.log(id)
        }while (this.exists(id));
        return id;
    }

    exists(id){
        //TODO checks if a course with the given id exists
        return !!this.#courses.find(i => i.id === id);
    }
    get(){
        return getPromise(2000, this.#courses);
    }
    remove(id){
        const index = this.#courses.findIndex(c => c.id == id);
        const res = this.#courses[index];
        this.#courses.splice(index, 1);
        return getPromise(1000, res);
    }
}
