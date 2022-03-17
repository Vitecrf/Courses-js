export default class Alert{
    #alertElement
    constructor(alertID) {
        this.#alertElement = document.getElementById(alertID);
    }

    showAlert(message){
        const alert =   `
                <div class="alert alert-danger alert-dismissible fade show" role="alert">
                    <strong>Error!</strong> The server is unavailable, repeat request later on. ${message}
                    <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                </div>`
        this.#alertElement.innerHTML = alert;
    }
    hideAlert(){
        this.#alertElement.innerHTML = '';
    }

}
