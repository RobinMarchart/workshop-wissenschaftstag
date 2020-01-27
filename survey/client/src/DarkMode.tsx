import React from "react";

import Switch from "react-switch";

import {
    enable as enableDarkMode,
    disable as disableDarkMode,
} from 'darkreader';

export default class DarkMode extends React.Component<{}, { enabled: boolean }>{

    setDarkMode(checked: boolean) {
        window.localStorage.setItem("darkmode", JSON.stringify({ darkmode: checked }));
        this.setState({ enabled: checked });
        if (checked) enableDarkMode();
        else disableDarkMode();
    }
    getDarkMode(): boolean {
        const saved = window.localStorage.getItem("darkmode");
        if (saved) return JSON.parse(saved).darkmode;
        else return false;
    }
    constructor(props) {
        super(props);
        this.state = { enabled: this.getDarkMode() }
        if (this.state.enabled) enableDarkMode();
        else disableDarkMode();
    }

    render() {
        return <div className="darkSwitch">
            <span>Switch with style inspired by Material Design</span>
            <Switch
                checked={this.state.enabled}
                onChange={(x): void=>this.setDarkMode(x)}
                onColor="#86d3ff"
                onHandleColor="#2693e6"
                handleDiameter={30}
                uncheckedIcon={false}
                checkedIcon={false}
                boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
                activeBoxShadow="0px 0px 1px 10px rgba(0, 0, 0, 0.2)"
                height={20}
                width={48}
                className="react-switch"
                id="material-switch"
            />
        </div>
    }
}