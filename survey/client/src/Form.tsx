import React from "react";
import { Form, Button } from "react-bootstrap"
import { questionOptions, question, questions, questionResult } from "./types"

class FormSelect extends React.Component<{ options: questionOptions }, { unselected: boolean }>{

    value: number;

    constructor(props: { options: questionOptions }) {
        super(props);
        this.state = { unselected: true };
        this.value = -1;
    }

    handleOnChange(e): void {
        if (this.state.unselected) this.setState({ unselected: false });
        const select= e.target as HTMLSelectElement;
        this.value=select.selectedIndex;
    }

    render(): React.Component {
        return this.state.unselected ?
            <Form.Control as="select"
                onChange={(e): void => this.handleOnChange(e)}
                ref={this.props.Ref}
                isInvalid>
                <option selected disabled key={-1}>Bitte Auswählen ...</option>
                {this.props.options.map((x, y) => <option value={y.toString()} key={y}>{x}</option>)}
            </Form.Control> : <Form.Control as="select"
                onChange={(e): void => this.handleOnChange(e)}
                ref={this.props.Ref}>
                {this.props.options.map((x, y) => <option key={y}>{x}</option>)}
            </Form.Control>;
    }
}

class QuestionForm extends React.Component<{ question: question }>{

    child: FormSelect;

    read(): number {
        return this.child.value;
    }

    render(): React.Component {
        return <Form.Group>
            <Form.Label>{this.props.question.descr}</Form.Label>
            <FormSelect options={this.props.question.options} ref={(x): void => this.child = x}></FormSelect>
        </Form.Group>
    }

}

export default class QuestionsForm extends React.Component<{questions: questions; submit: (res: questionResult) => void}>{
    
    children: Map<number,QuestionForm>

    constructor(props){
        super(props);
        this.children=new Map();
    }

    render(): React.Component{
        return <Form>
            {this.props.questions.map((x,y)=><QuestionForm question={x} key={y.toString()} ref={(x): void => this.children.set(y,x)}></QuestionForm>)}
            <Button variant="outline-primary" type="submit" onClick={(x): void=>{
                x.preventDefault();
                const curr=this.props.questions.map((x,y) => this.children.get(y))
                if(curr.every(x=>typeof x !== "undefined"&&(x as QuestionForm).read()>=0)){
                    this.props.submit(curr.map(x=> (x as QuestionForm).read()));
                }
            }}>Weiter</Button>
        </Form>
    }
}