import React from "react";
import ReactDOM from "react-dom";
import {Container} from "react-bootstrap";
import AdminSetup from "./AdminSetup";
import Result from "./Result";
import DarkMode from "./DarkMode";

import "./main.css"

class App extends React.Component<{},{state: number}>{

    constructor(props){
        super(props);
        this.state={state:0};
    }

    renderChild(): React.Component{
        switch(this.state.state){
            case 0:return <AdminSetup configured={(): null=>this.setState({state:1})}></AdminSetup>
            case 1:return <Result></Result>
        }
    }

    render(): React.Component{
        return <Container>
            {this.renderChild()}
            <DarkMode></DarkMode>
        </Container>
    }
}

ReactDOM.render(<App></App>,document.getElementById("root"));