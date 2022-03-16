export default class Spinner {
    #spinnerParentElem

    constructor(parentId) {
        this.#spinnerParentElem = document.getElementById(parentId);
    }

    start() {
        this.#spinnerParentElem.innerHTML = `<button class="btn btn-primary" type="button" disabled>
        <span class="spinner-grow spinner-grow-sm" role="status" aria-hidden="true"></span>
        Loading...
        </button>`
    }
    stop(){
        this.#spinnerParentElem.innerHTML = '';
    }
}
