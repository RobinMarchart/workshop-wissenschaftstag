import React from "react";
import ReactDOM from "react-dom";
import {Container} from "react-bootstrap"
import axios from "axios";

class App extends React.Component{

    constructor(props){
        super(props);
    }

    render(): React.Component{
        return <Container></Container>
    }
}

ReactDOM.render(<App></App>,document.getElementById("root"));