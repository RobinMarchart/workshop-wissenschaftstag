import React from "react";
import { Form } from "react-bootstrap"

class FormSelect extends React.Component<{ options: string[]; label: string; Ref: (arg0: any) => void }, { unselected: boolean }>{
    constructor(props: { options: string[]; label: string; Ref: (arg0: any) => void }) {
        super(props);
        this.state = { unselected: true };
    }

    handleOnChange() {
        if (this.state.unselected) this.setState({ unselected: false });
    }

    render() {
        return <Form.Group>
            <Form.Label>{this.props.label}</Form.Label>
            <Form.Control as="select"
                onChange={this.handleOnChange.bind(this)}
                ref={this.props.Ref}>
                {this.state.unselected ? <option key={-1}>Bitte Auswählen ...</option> : null}
                {this.props.options.map((x, y) => <option key={y}>{x}</option>)}
            </Form.Control>
        </Form.Group>
    }
}

class Form extends React.Component{
    constructor(props){
        super(props)
        
    }
}