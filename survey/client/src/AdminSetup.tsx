import React from "react";
import {Form,Button} from "react-bootstrap"

export default class AdminSetup extends React.Component<{configured: () => null}>{

    participants: number;
    files: FileList;

    async send(): Promise{
        const response={
            participants:this.participants,
            questions:JSON.parse(await this.files.item(0).text())
        }
        console.log(response);
        const res=await fetch("/Api/SetConfig",{
            method:"PUT",
            body:JSON.stringify(response)
        });
        if(!res.ok)throw new Error(res.statusText);
        console.log(res);
        this.props.configured();
    }

    render(): React.Component{
        return <Form>
            <Form.Group>
                <Form.Label>Bitte Fragen hochladen</Form.Label>
                <Form.Control type="file" onChange={(e): void => this.files=e.target.files}></Form.Control>
            </Form.Group>
            <Form.Group>
                <Form.Label>Anzahl Teilnehmer</Form.Label>
                <input className="form-control-file" type="number" onChange={(e): void => this.participants=e.target.valueAsNumber} accept=".json"></input>
            </Form.Group>
            <Button variant="primary" type="submit" onClick={(x): void=>{
                x.preventDefault();
                this.send().catch(console.error);
            }}>
                Senden
            </Button>
        </Form>
    }
}