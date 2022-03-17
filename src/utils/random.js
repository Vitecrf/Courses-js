export function getRandomNumber(min, max) {
    //TODO return a random number in the range [min-max]
    if(min > max){
        [min, max] = [max, min];
    }
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
export function getRandomElement(array) {
    //TODO return a random element of array
    const index = getRandomNumber(0, array.length-1);
    return array[index];
}
export function getRandomDate(minYear, maxYear) {
    //TODO return random Date object (see constructor of the standard class Date)
    //const date = new Date(year, month, day)
    const day = getRandomNumber(1, 31);
    const month = getRandomNumber(0, 11);
    const year = getRandomNumber(minYear, maxYear);
    const date = new Date(year, month, day);
    return date;
}
