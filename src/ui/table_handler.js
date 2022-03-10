export default class TableHandler{
    #tableElem
    #columnsDefinition
    #sortFnName
    #removeFnName
    constructor(columnsDefinition, idTable, sortFnName, removeFnName) {
        this.#columnsDefinition = columnsDefinition;
        this.#tableElem = document.getElementById(idTable);
        this.#sortFnName = sortFnName ?? '';
        this.#removeFnName = removeFnName ?? '';
        if(!this.#tableElem){
            throw "Table element is not defined";
        }
    }
    showTable(objects){
        this.#tableElem.innerHTML = `${this.#getHeader()}${this.#getBody(objects)}`;
    }
    hideTable(){
        this.#tableElem.innerHTML = '';
    }
    #getHeader(){
        return `<thead><tr>${this.#getColumns()}</tr></thead>`;
    }
    #getColumns(){
        const columns = this.#columnsDefinition.map(c => `<th onclick='${this.#getSortFn(c)}'>${c.displayName}</th>`);
        if(this.#removeFnName){
            columns.push("<th></th>")
        }
        return columns.join("");
    }
    #getBody(objects){
        return objects.map(o => `<tr>${this.#getRecord(o)}</tr>`).join('');
    }
    #getRecord(object){
        const record = this.#columnsDefinition.map(c => `<td>${object[c.key]}</td>`);
        if(this.#removeFnName){
            record.push(`<td><button onclick="${this.#removeFnName}('${object.id}')">${this.#getIcon()}</button></td>`)
        }
        return record.join('');
    }
    #getIcon(){
        return `<ion-icon name="remove-circle"></ion-icon>`;
    }
    #getSortFn(columnDefinition){
        return this.#sortFnName ? `${this.#sortFnName}("${columnDefinition.key}")` : '';
    }
}

