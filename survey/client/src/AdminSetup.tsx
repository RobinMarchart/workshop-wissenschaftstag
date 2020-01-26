import React from "react";
import { Form, Button } from "react-bootstrap"

export default class AdminSetup extends React.Component<{ configured: () => null }>{

    participants: number;
    files: FileList;

    async send(): Promise {
        const response = {
            participants: this.participants,
            questions: JSON.parse(await this.files.item(0).text())
        }
        console.log(response);
        const res = await fetch("/Api/SetConfig", {
            method: "PUT",
            body: JSON.stringify(response),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        if (!res.ok) throw new Error(res.statusText);
        console.log(res);
        this.props.configured();
    }

    render(): React.Component {
        return <Form>
            <Form.Group>
                <Form.Label>Bitte Fragen hochladen</Form.Label>
                <input className="form-control-file" type="file" accept="application/json,.json" onChange={(e): void => this.files = e.target.files}></input>
            </Form.Group>
            <Form.Group>
                <Form.Label>Anzahl Teilnehmer</Form.Label>
                <Form.Control type="number" min="1" onChange={(e): void => this.participants = e.target.valueAsNumber}></Form.Control>
            </Form.Group>
            <div className="group">
                <Button variant="outline-primary" type="submit" onClick={(x): void => {
                    x.preventDefault();
                    this.send().catch(console.error);
                }}>
                    Senden
            </Button>
                <Button variant="outline-primary" type="submit" onClick={(x): void => {
                    x.preventDefault();
                    this.props.configured();
                }}>
                    Überspringen
            </Button>
            </div>
        </Form>

    }
}