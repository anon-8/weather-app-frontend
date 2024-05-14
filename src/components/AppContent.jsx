import React from "react";
import WeatherComponent from "./WeatherComponent";

export default class AppContent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            componentToShow: "weather",
        };
    }

    render() {
        const { componentToShow } = this.state;

        return (
            <div>

                {componentToShow === "weather" && <WeatherComponent/>}

            </div>

        );
    }
}
