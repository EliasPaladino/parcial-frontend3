import React from "react";
import data from  '../data/data';
import Opcion from "./Opcion";
import Historial from "./Historial";
import Swal from "sweetalert2"

// Este array nos permite en un futuro agregar más opciones sin tener que modificar la funcionalidad de la aplicación.
let opciones = [ ["1", 0], ["2a", 1], ["2b", 2], ["3a", 3], ["3b", 4], ["4a", 5], ["4b", 6], ["5a", 7], ["5b", 8] ];

export default class Opciones extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            contador: 0,
            indice: 1,
            seleccionPrev: '',
            historial: []
        }
    }

    manejarClick = (e) => {
        let id = `${++this.state.indice}` + (e.target.id).toLowerCase();
        opciones.map((opcion) => {
            if(this.state.contador >= 7){
                this.finalizarJuego();
            }

           else if(opcion[0] === id){
                this.setState({
                    contador: opcion[1],
                    seleccionPrev: e.target.id
                })
            }
        })
    }

    componentDidUpdate(prevProps, prevState){
        if(prevState.contador !== this.state.contador){
            if(prevState.contador !== 8 && prevState.contador !== 7){
                this.state.historial.push(this.state.seleccionPrev);
            }
        }
    }

    render(){
        return(
            <div className="layout">
                <h1 className="historia">{data[this.state.contador].historia}</h1>
                <div className="opciones">
                    <Opcion id="A" opcion={data[this.state.contador].opciones.a} manejarClick={this.manejarClick}> </Opcion>
                    <Opcion id="B" opcion={data[this.state.contador].opciones.b} manejarClick={this.manejarClick}> </Opcion>
                </div>
                
                <Historial seleccionPrev={this.state.seleccionPrev} 
                    historial={this.state.historial.map( 
                        (e,index) => (
                            <li key={index}>{e}</li>
                        ), data[this.state.contador].historia
                    )}
                />
            </div>
        )
    }

    //Terminar juego
    finalizarJuego = () => {
        Swal.fire({
            title: '¿Quieres seguir jugando?',
            text: "Animate a seguir otro camino :)",
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: '#716add',
            cancelButtonColor: '#d33',
            confirmButtonText: '¡Claro!',
            cancelButtonText: 'Quizas luego'
          }).then((result) => {
            if (result.isConfirmed) {
              this.reset();
            } else {
                Swal.fire({
                    title: '¡Gracias por jugar!',
                    width: 600,
                    padding: '3em',
                    color: '#716add',
                    background: '#fff',
                    backdrop: `
                      url("./images/nyan-cat.gif")
                      left top
                      no-repeat
                    `
                  })
            }
          })
    }

    //Resetear el juego
    reset = () => {
        this.setState({
            contador: 0,
            indice: 1,
            seleccionPrev: '',
            historial: []
        })
    }

}
