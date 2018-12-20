import React, { Component } from "react";
import { vanex, start } from "vanex";
import model from "./model";

@vanex("home")
class App extends Component {
    constructor() {
        super(...arguments);
    }

    componentWillMount() {
        this.home.getName("test");
    }

    render() {
        const { name } = this.home.toJS();

        return <section>{name}</section>;
    }
}

// 直接渲染
start({
    component: App,
    models: {
        home: model
    },
    container: "#root"
});
