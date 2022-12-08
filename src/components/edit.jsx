import React, { useEffect, useState} from 'react'
import { useNavigate, useParams, Link } from 'react-router-dom'
import { getDoc, updateDoc, doc } from 'firebase/firestore'
import { db } from '../firebaseConfig/firebase'
import Swal from "sweetalert2"


const Edit = () => {
    const [name, setName] = useState('')
    const [dominio, setDominio] = useState('')
    const [fecha, setFecha] = useState('')

    const navigate = useNavigate()
    const {id} = useParams()

    const update = async (e) => {
        e.preventDefault()
        const hosting = doc(db, "hosting", id)
        const data = {name: name, dominio: dominio, fecha: fecha}
        await updateDoc(hosting, data)
        navigate('/')

    }

    const getHostingById = async (id) => {
        const hosting = await getDoc(doc(db, "hosting", id))
        if(hosting.exists()){
            console.log(hosting.data())
            setName(hosting.data().name)
            setDominio(hosting.data().dominio)
            setFecha(hosting.data().fecha)
        }else {
            console.log("producto erroneo")
            Swal.fire(
                "Oops",
                `El hosting no existe`,
                "error"
            )
            navigate('/')
        }
    }
    useEffect(() => {
        getHostingById(id)
        // eslint-disable-next-line
    },[])

  return (
    <div className="container">
        <div className="row">
            
            <div className="col">
            
                <h1 className='text-center'> <Link to="/" className='me-5'><i class="fa-solid fa-arrow-left"></i></Link>Editar cliente de {dominio}</h1>
                <form onSubmit={update}>
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
                    <button type='submit' className='btn btn-success'>Editar</button>
                </form>
            </div>
        </div>
    </div>
  )
}

export default Edit