import React from "react"

export function DefaultErrorHandler(error:any){
    console.error(error);
    return <div>Some kind of error occurred</div>
}

export class PromiseComponent<T> extends React.Component<
    { promise: Promise<T>, loading: React.ComponentType, resolved: React.ComponentType<{ data: T }>, error: React.ComponentType<{ error: any }> },
    { notWaiting: boolean, state: string, result: T | undefined, error: any | undefined }>{

    constructor(prop: { promise: Promise<T>, loading: React.ComponentType, resolved: React.ComponentType<{ data: T }>, error: React.ComponentType<{ error: any }> }) {
        super(prop)
        this.state = { notWaiting: true, state: "unresolved", result: undefined, error: undefined }
    }

    handleReject(error: any) {
        this.setState({ state: "rejected", error: error });
    }

    handleResolve(data: T) {
        this.setState({ state: "resolved", result: data });
    }

    waitOnPromise() {

        this.props.promise.then(this.handleResolve.bind(this), this.handleReject.bind(this));
        this.setState({ notWaiting: false });
    }

    render() {
        if (this.state.notWaiting) {
            window.setTimeout(this.waitOnPromise.bind(this))
        }
        switch (this.state.state) {
            case "unresolved":
                return <this.props.loading></this.props.loading>
            case "resolved":
                if (typeof this.state.result !== "undefined")
                    return <this.props.resolved data={this.state.result}></this.props.resolved>
                break;
            case "rejected":
                if (typeof this.state.error !== "undefined")
                    return <this.props.error error={this.state.error}></this.props.error>
                break;
        }
        alert("wrong state identifier: " + this.state.state)
        return <div>WHY?</div>
    }

}