import AuthService from './AuthService';

export default class Requests{
    constructor(){
        this.AuthService = new AuthService();
    }

    add(from, data) {
        return this.AuthService.requestFetch(from,{
            method: "POST",
            body: JSON.stringify(data)
        }).catch(this.handleError);
    }

    query(from) {
        return this.AuthService.requestFetch(from,{
            method: "GET",
        }).catch(this.handleError);
    }

    ActivateOrDeactivate(from, id) {
        return this.AuthService.requestFetch(from,{
            method: "PUT",
            body: JSON.stringify({_id: id})
        }).catch(this.handleError);
    }

    update(from, data) {
        return this.AuthService.requestFetch(from,{
            method: "PUT",
            body: JSON.stringify(data)
        }).catch(this.handleError);
    }

    list(from) {
        return this.AuthService.requestFetch(from,{
            method: "GET",
        }).catch(this.handleError);
    }

    handleError(error){
        console.error("Error en el Request")
        return Promise.reject(false);
    }
}