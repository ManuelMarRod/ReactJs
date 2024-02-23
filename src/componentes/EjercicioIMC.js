import { useState, useEffect } from "react";
import IMCForm from "./IMCForm";
import InfoIMC from "./InfoIMC";
import "materialize-css/dist/css/materialize.min.css"

export default function EjercicioIMC (){
    const [state, setState] = useState([]);
    const [data, setData] = useState({});

    useEffect(()=>{
        const diaDePesaje = state.map(el => el.diaDePesaje);
        const imc = state.map(el => el.imc);

        let nuevaData = {diaDePesaje, imc};

        setData(nuevaData);
    },[state]);

    const handleChange =(objetoConValores) =>{
         let altura =objetoConValores.altura/100;
         objetoConValores.imc =(objetoConValores.peso/(altura*altura)).toFixed(2);
         let nuevoValor =[...state, objetoConValores];
         //mostrar historial 
         let len= nuevoValor.length;
         if(len>4) nuevoValor = nuevoValor.slice(1,len);
         //fin mostrar historial
         setState(nuevoValor);
    };

    return(
        <div className='container'>
            <div className='row center'>
                <h1 className='white-text'>Calcula tu IMC</h1>
            </div>
            <div className="row">
                <div className="col m12 s12">
                    <IMCForm change={handleChange}/>
                </div>
            </div>
            <div className="row center">
                <h2 className="white-text">Historial de mediciones</h2>
            </div>
            <div className="data-container row">
                {state.length>0
                ? state.map(info =>
                    <InfoIMC key={info.key} peso={info.peso} altura={info.altura} imc={info.imc} diaDePesaje={info.diaDePesaje} horaDePesaje={info.horaDePesaje}/>)
                    :<h3 className="white-text center">Realiza alguna consulta.</h3>

                }
            </div>
        </div>
    );
};