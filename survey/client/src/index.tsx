import React from "react";
import ReactDOM from "react-dom";


declare const initialState:number;


class App extends React.Component<{},{currState:number}>{

    constructor(props:{}){
        super(props);
        let currState:number=initialState;
        if(typeof currState==="undefined")currState=0;
        this.state={currState:currState}
    }
    render(){
        return <div>lol</div>
    }
}
ReactDOM.render(<App></App>,document.getElementById("root"));