export default class RandomCours{
    #randomElement
    #element
    constructor(idRandom) {
        this.#randomElement = document.getElementById(idRandom);
        console.log(this.#randomElement);
        // this.#element = idElem;
    }
    generetElement(){
        return this.#randomElement.innerHTML = `<div class="mt-4 offset-2"> ${this.#getInput()} ${this.#getButton()} ${this.#getBloock()}`
    }
    #getBloock(){
        return `</div>`
    }
    #getInput(){
        return `<input id="randomInput" type="number" class="form-label col-2 mt-4">`;
    }
    #getButton(){
        return `<button id="generetValue" onclick='${this.add}()' class="btn btn-outline-primary offset-1 col-2">Generation</button>`
    }
    show(){
        this.#randomElement.hidden = false;
    }
    hide(){
        this.#randomElement.hidden = true;
    }

    add(){
        const input = document.querySelector("randomInput").value;
        console.log(input)
        // return input;
    }

}
