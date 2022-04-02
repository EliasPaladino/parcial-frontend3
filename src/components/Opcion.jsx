import React from "react";

export default class Opcion extends React.Component {

    render(){
        return (
            <div className="opcion">
                <button id={this.props.id} className="botones" onClick={this.props.manejarClick}>{this.props.id}</button>
                <h2>{this.props.opcion}</h2>
            </div>
        )
    }
}