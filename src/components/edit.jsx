import React, { useEffect, useState} from 'react'
import { useNavigate, useParams, Link } from 'react-router-dom'
import { getDoc, updateDoc, doc } from 'firebase/firestore'
import { db } from '../firebaseConfig/firebase'
import Swal from "sweetalert2"


const Edit = () => {
    const [lugar, setLugar] = useState('')
    const [gastado, setGastado] = useState('')
    const [fecha, setFecha] = useState('')
    
    const navigate = useNavigate()
    const {id} = useParams()
    
    const update = async (e) => {
        e.preventDefault()
        const compra = doc(db, "compras", id)
        const data = {lugar, gastado, fecha}
        await updateDoc(compra, data)
        navigate('/')
        
    }
    

    const getCompraById = async (id) => {
        const compra = await getDoc(doc(db, "compras", id))
        if(compra.exists()){
            console.log(compra.data())
            setLugar(compra.data().lugar)
            setGastado(compra.data().gastado)
            setFecha(compra.data().fecha)
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
        getCompraById(id)
        // eslint-disable-next-line
    },[])
    document.title = 'Editar compra ' + lugar;
  return (
    <div className="container">
        <div className="row">
            
            <div className="col">
            
                <h1 className='text-center'> <Link to="/" className='me-5'><i className="fa-solid fa-arrow-left"></i></Link>Editar compra: {lugar} - Gastado ${gastado}</h1>
                <form onSubmit={update} className="col-11 col-sm-10 col-md-9 col-lg-8 col-xl-7 col-xxl-6 mx-auto my-4 form py-5">
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
                            type="text"
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
                    <button type='submit' className="bg-btn">Editar <i className="fa-solid fa-pen-to-square"></i></button>
                </form>
            </div>
        </div>
    </div>
  )
}

export default Edit