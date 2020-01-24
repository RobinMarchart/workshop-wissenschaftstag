import React from "react";
import ReactDOM from "react-dom";


declare const initialState:number;

const AppList:React.Component<{}>[]=[]

class App extends React.Component<{},{currState:number}>{

    constructor(props:{}){
        super(props);
        let currState:number=initialState;
        if(typeof currState==="undefined")currState=0;
        this.state={currState:currState}
    }
    render(){
        return AppList[this.state.currState]
    }
}
alert("lol");
ReactDOM.render(<App></App>,document.getElementById("root"));