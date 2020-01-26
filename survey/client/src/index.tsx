import React from "react";
import ReactDOM from "react-dom";
import {Container} from "react-bootstrap"
import {PromiseComponent,DefaultErrorHandler} from "./PromiseComponent"
import {Content,questions} from "./Content"
import {QuestionsInit,QuestionConfig} from "./QuestionsInit"

import "./main.css"

class ContentWrapper extends React.Component<{rejected: () => null; promise: Promise<QuestionConfig>}>{

    usingPromise: boolean

    constructor(props){
        super(props);
        const saved=window.localStorage.getItem("conf");
        this.usingPromise=saved==null
    }

    setConfig(conf: QuestionConfig): void{
        window.localStorage.setItem("conf",JSON.stringify(conf));
    }

    render(): React.Component{
        return this.usingPromise?
        <PromiseComponent<questions> promise={this.props.promise}
            loading={(): React.Component=><div className="loading">Loading</div>}
            resolved={Content}
            error={DefaultErrorHandler}
            errorHandler={this.props.rejected}
            succsessHandler={(x): void =>this.setConfig(x)}>
            </PromiseComponent>:
            <Content data={JSON.parse(window.localStorage.getItem("conf"))}></Content>
    }
}

class App extends React.Component<{},{currState: number;config: Promise<QuestionConfig>}>{

    readCurrState(): number{
        const state=window.localStorage.getItem("status")
        if( state===null)return 0;
        else return Number.parseInt(state);
    }

    setCurrState(st: number): void{
        window.localStorage.setItem("status",st.toFixed(0));
        this.setState()
    }

    initHook(init: Promise<QuestionConfig>): void{
        this.setState({config:init});
        this.setCurrState(1);
    }

    constructor(props: {}){
        super(props);
        this.state={currState:this.readState()}
    }
    renderCurrState(): React.Component{
        switch (this.state.currState){
            case 0:return <QuestionsInit initialized={(x): void=>this.initHook(x)}></QuestionsInit>
            case 1:return <ContentWrapper rejected={(): null =>this.setCurrState(0)} promise={this.state.config}></ContentWrapper>
        }
    }
    render(): React.Component{
        return <Container>
            {this.renderCurrState()}
        </Container>
    }
}
ReactDOM.render(<App></App>,document.getElementById("root"));