import React from "react";

import Form from "./Form"

import {questionResult, QuestionConfig, answerRequest} from "./types"


export default class Content extends React.Component<{data: QuestionConfig; next: () => void},{num: number}>{

    getNum(): number{
        const saved=localStorage.getItem("formnum");
        if(saved!==null)return Number.parseInt(saved);
        else return 0;
    }

    constructor(props){
        super(props)
        this.state={num:this.getNum()}
    }
    
    async submit(res: questionResult): Promise<void>{
        const answer: answerRequest={id:this.props.data.ids[this.state.num],answers:res};
        const resp=await fetch("/Api/Answer",{
            method: "PUT",
                headers: {
                    'Content-Type':'application/json'
                },
                body:JSON.stringify(answer)
        });
        if(!resp.ok)throw new Error(res.statusText);
        this.setState({num:this.state.num+1});
        localStorage.setItem("formnum",this.state.num.toString());
    }

    render(): React.Component{
        if(this.props.data.ids.length<=this.state.num)setTimeout(this.props.next);
        return <Form key={this.state.num} questions={this.props.data.questions} submit={(x): void=>this.submit(x).catch(console.error)}></Form>
    }
}