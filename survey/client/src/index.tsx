import React from "react";
import ReactDOM from "react-dom";
import {Container} from "react-bootstrap"
import axios from "axios";
import {PromiseComponent,DefaultErrorHandler} from "./PromiseComponent"

import {Content,questions} from "./Content"

//declare const initialState:number;

async function getConfig():Promise<questions>{
    let repeat=true
    let response:any=null
    while(repeat){
        try{
            response=JSON.parse(await axios);
            repeat=false;
        }catch(e){
            console.log(e);
        }
    }
    console.log(response);
    return response
}

class App extends React.Component<{},{currState:number}>{

    constructor(props:{}){
        super(props);
    }
    render(){
        return <Container>
            <PromiseComponent<questions> promise={getConfig()}
            loading={()=><div className="loading">Loading</div>}
            resolved={Content}
            error={DefaultErrorHandler}>
            </PromiseComponent>
        </Container>
    }
}
ReactDOM.render(<App></App>,document.getElementById("root"));