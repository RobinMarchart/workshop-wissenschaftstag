import React from "react";
import {Form,Button,Jumbotron} from "react-bootstrap"
import {questions} from "./Content"

export type QuestionConfig={ids: number[]; questions: questions};

export class QuestionsInit extends React.Component<{initialized: (init: Promise<QuestionConfig>) => null}>{

    numPart: number;

    async sendInit(): Promise<QuestionConfig>{
        const res=await fetch("/Api/Register",
            {
                method: "POST",
                headers: {
                    'Content-Type':'application/json'
                },
                body: JSON.stringify({participants:this.numPart})
            });
            if(!res.ok)throw new Error(res.statusText);
            return res.json() as QuestionConfig;
    }

    render(): React.Component{
        return <Jumbotron>
            <h1>Auswertung einer kursinternen Umfrage</h1>
            <p>Erklärungs-text</p>
            <p>
                <Form>
                    <Form.Group>
                        <Form.Label>
                            Anzahl der Unfage-T6eilnehmer
                        </Form.Label>
                        <Form.Control type="number" min="1" onChange={(e): void=>this.numPart=e.target.valueAsNumber}>

                        </Form.Control>
                    </Form.Group>
                    <Button type="submit" variant="outline-primary" onClick={(e): void=>{
                        e.preventDefault();
                        this.state.initialized(this.sendInit());
                    }}>
                        Weiter
                    </Button>
                </Form>
            </p>
        </Jumbotron>
    }
}