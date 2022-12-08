import React, { useState} from 'react'

import { Link, useNavigate } from 'react-router-dom';

import { collection, addDoc } from 'firebase/firestore';

import { db } from '../firebaseConfig/firebase';


const Create = () => {
    document.title = 'Crear cliente';
    const [name, setName] = useState('')
    const [dominio, setDominio] = useState('')
    let [fecha, setFecha] = useState('')
    const navigate = useNavigate()

    const hostingsCollection = collection(db, "hosting");

    const hostingsAll = async (e) => {
        e.preventDefault()
        /* let dia = fecha.split("-")[2]
        let mes= fecha.split("-")[1]
        let anio = fecha.split("-")[0];
        fecha = `${dia}-${mes}-${anio}`; */
        await addDoc(hostingsCollection, { name: name, dominio: dominio, fecha: fecha })
        
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

                    <h1 className='text-center'> <Link to="/" className='me-5'><i className="fa-solid fa-arrow-left"></i></Link>Crear nuevo cliente</h1>
                    <form onSubmit={hostingsAll}>
                        <div className="mb-3">
                            <label className="form-label">nombre</label>
                            <input
                                required
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="form-control" />
                        </div>

                        <div className="mb-3">
                            <label className="form-label">Dominio</label>
                            <input
                                required
                                type="text"
                                value={dominio}
                                onChange={(e) => setDominio(e.target.value)}
                                className="form-control" />
                        </div>

                        <div className="mb-3">
                            <label className="form-label">Fecha</label>
                            <input
                                required
                                type="date"
                                value={fecha}
                                onChange={(e) => setFecha(e.target.value)}
                                className="form-control" />
                        </div>
                        <button type='submit' className='btn btn-success'>Crear</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Create