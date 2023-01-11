import React, { useState} from 'react'

import { Link, useNavigate } from 'react-router-dom';

import { collection, addDoc } from 'firebase/firestore';

import { db } from '../firebaseConfig/firebase';


const Create = () => {
    document.title = 'Crear compra';
    const [lugar, setLugar] = useState('')
    const [gastado, setGastado] = useState('')
    const [fecha, setFecha] = useState('')
    
    const navigate = useNavigate()

    const comprasCollection = collection(db, "compras");

    const comprasAll = async (e) => {
        e.preventDefault()
        /* let dia = fecha.split("-")[2]
        let mes= fecha.split("-")[1]
        let anio = fecha.split("-")[0];
        fecha = `${dia}-${mes}-${anio}`; */
        await addDoc(comprasCollection, {lugar, gastado, fecha})
        
        console.log(fecha)
        /* let mensajeEmail = {
            email: "correo-del-cliente@gmail.com",
            name_cliente: name,
            mensj: `El cliente del hosting ${dominio}, le faltan 10 dias para su que termine su host de 1 año`
        }
        await emailjs.send('service_ab0niq6', 'template_5hyo8ve', mensajeEmail, '_3QPcXEoejDIjoo25')
            .then(function (response) {
                console.log('SUCCESS!', response.status, response.text);
                Swal.fire(
                    "Correo enviado",
                    `El correo del dominio: ${dominio} fue enviado exisamente`,
                    "success"
                )
                
            }, function (error) {
                console.log('FAILED...', error);
            });
         */
        navigate('/')
    }

    return (
        <div className="container">
            <div className="row">

                <div className="col">

                    <h2 className='text-center'> <Link to="/" className='me-5'><i className="fa-solid fa-arrow-left"></i></Link>Formulario de compra</h2>
                    <form onSubmit={comprasAll} className="col-11 col-sm-10 col-md-9 col-lg-8 col-xl-7 col-xxl-6 mx-auto my-4 py-5 form">
                    <div className="mb-3">
                        <label className="form-label">Lugar de compra</label>
                        <input
                            required
                            type="text"
                            value={lugar}
                            onChange={ (e) => setLugar(e.target.value)}
                            className="form-control"/>
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Dinero Gastado</label>
                        <input
                            required
                            type="number"
                            value={gastado}
                            onChange={ (e) => setGastado(e.target.value)}
                            className="form-control"/>
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Fecha de la compra</label>
                        <input
                            required
                            type="date"
                            value={fecha}
                            onChange={ (e) => setFecha(e.target.value)}
                            className="form-control"/>
                    </div>
                        <button type='submit' className="bg-btn">Crear <i className="fa-solid fa-plus"></i></button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Create