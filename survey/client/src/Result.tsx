import React from "react";
import { Jumbotron, ProgressBar } from "react-bootstrap";

import { statusResponse } from "./types";

function Waiting(props: { status: statusResponse | undefined }): React.Component {
    return <Jumbotron>
        {typeof props.status === "undefined" ? null : <h1>{props.status.curr}/{props.status.all}</h1>}
        <p> Text, der das warten auf die anderen überbrücken soll</p>
        <ProgressBar animated now={typeof props.status === "undefined" ? 0 : props.status?.curr / props.status.all * 100} />
    </Jumbotron>
}

function Download(): React.Component{
    return <Jumbotron>
        <h1><a href="/Api/Result" download="umfrage.csv">Download</a></h1>
    </Jumbotron>
}

export default class Result extends React.Component<{},{status: statusResponse | undefined }>{

    timer: number;
    timerNotCancelled: boolean;

    constructor(props){
        super(props);
        this.state={status:undefined};
        this.timerNotCancelled=false;
    }

    async tick(): Promise<void>{
        const resp=await fetch("/Api/Status");
        if (!resp.ok)throw new Error(resp.statusText);
        this.setState({status:await resp.json()});
    }

    componentDidMount(): void{
        this.timer=setInterval(()=>this.tick().catch(console.error),5000);
        this.timerNotCancelled=true;
        this.tick().catch(console.error);
    }

    componentWillUnmount(): void{
        if(this.timerNotCancelled)clearInterval(this.timer);
    }

    render(): React.Component{
        if (typeof this.state.status===undefined)return <Waiting></Waiting>
        else{
            if(this.state.status?.all<=this.state.status?.curr){
                if(this.timerNotCancelled){
                    clearInterval(this.timer);
                    this.timerNotCancelled=false;
                }
                return <Download></Download>
            }
            else return <Waiting status={this.state.status}></Waiting>
        }
    }
}

