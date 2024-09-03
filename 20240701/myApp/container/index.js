class Container {
    services = {}; // {"UserController" : {def : UserController, dep : ["UserService"]}}

    register(name, definition, dependencie) {
        this.services[name] = { definition, dependencie }; // name : { definition : definition, dependencie : dependencie}
    }

    get(name) {
        const service = this.services[name]; // {def : UserController, dep : ["UserService"]}
        if (!service.instance) {
            const dependencies = service.dependencie.map(el => this.get(el)); // "UserService"
            service.instance = new service.definition(...dependencies); // const userController = new UserController(...UserService)
        }
        return service.instance;
    }
}

// 의존성 주입
// Container.register("userController", UserController, ["UserService"]);

module.exports = new Container();