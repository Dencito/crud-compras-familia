import React, { useState} from 'react'

import { Link, useNavigate } from 'react-router-dom';

import { collection, addDoc } from 'firebase/firestore';

import { db } from '../firebaseConfig/firebase';

const Create = () => {
    const [name, setName] = useState('')
    const [dominio, setDominio] = useState('')
    const [fecha, setFecha] = useState('')
    const navigate = useNavigate()

    const hostingsCollection = collection(db, "hosting");

    const hostingsAll = async (e) => {
        e.preventDefault()
        await addDoc(hostingsCollection, {name: name, dominio: dominio, fecha: fecha})
        navigate('/')
    }

  return (
    <div className="container">
        <div className="row">
            
            <div className="col">
            
                <h1 className='text-center'> <Link to="/" className='me-5'><i class="fa-solid fa-arrow-left"></i></Link>Crear nuevo cliente</h1>
                <form onSubmit={hostingsAll}>
                    <div className="mb-3">
                        <label className="form-label">nombre</label>
                        <input
                            required
                            type="text"
                            value={name}
                            onChange={ (e) => setName(e.target.value)}
                            className="form-control"/>
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Dominio</label>
                        <input
                            required
                            type="text"
                            value={dominio}
                            onChange={ (e) => setDominio(e.target.value)}
                            className="form-control"/>
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Fecha</label>
                        <input
                            required
                            type="date"
                            value={fecha}
                            onChange={ (e) => setFecha(e.target.value)}
                            className="form-control"/>
                    </div>
                    <button type='submit' className='btn btn-success'>Crear</button>
                </form>
            </div>
        </div>
    </div>
  )
}

export default Create