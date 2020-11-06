export class Auth {
    constructor(props) {

        this.state = {
            props: props,
            auth: true
        }
    }

    getAuthState(){
        return this.state.auth;
    }
}