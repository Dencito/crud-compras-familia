import React, {useState , useEffect} from 'react';
import { Link } from "react-router-dom";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore"

import { db } from '../firebaseConfig/firebase';

import Swal from "sweetalert2"
import withReactContent from "sweetalert2-react-content"
const myAlert = withReactContent(Swal);



const Show = () => {

    // configuramos los hooks
    const [hostings, setHostings] = useState([]);
    const [loading, setLoading] = useState(false)

    // refenciamos la database firestore
    const hostingsCollection = collection(db, "hosting");

    // funcion para mostrar todos los documentos
    const getHostings = async() => {
        const data = await getDocs(hostingsCollection)
        /* console.log(data.docs) */
        setHostings(
            data.docs.map( (doc) => ({...doc.data(), id:doc.id}))
            )
            /* console.log(hostings) */
            setLoading(true)
    }

    // creamos funcion para eliminar documento
    const deleteHosting = async (id) => {
        const hostingDoc = doc(db, 'hosting', id);
        await deleteDoc(hostingDoc)
        getHostings()
    }

    // creamos confirmacion para eliminar con sweet alert
    const confirmDelete = (id, dominio) => {
        myAlert.fire({
            title: "¿Estas seguro de eliminar el dominio? ",
            text: dominio,
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6",
            cancelButtonText: "Cancelar",
            confirmButtonText: "Si, Eliminar"
        }).then((result) => {
            if(result.isConfirmed) {
                deleteHosting(id)
                console.log("dominio eliminado: "+dominio)
                Swal.fire(
                    "Eliminado",
                    `El dominio ${dominio} fue eliminado exisamente`,
                    "success"
                )
            }
        })
    }
    // usamos useEffect
    useEffect(() => {
        getHostings()
        //eslint-disable-next-line
    }, [])
    if(loading===false) {
        return(
            <h2 className='mt-4'>Cargando Datos de los Clientes...</h2>
        )
    }
    console.log(hostings.length)
  return (
    <>
        <div className="container">
            <div className="row">
                <div className="col">
                    <div className="d-grid gap-2">
                        <Link to="/crear-hosting" className='btn btn-success my-2'>Crear nuevo cliente</Link>
                    </div>
                    <table className='table table-dark table-hover'>
                        <thead>
                            <tr>
                                <th>Dueño</th>
                                <th>Dominio</th>
                                <th>Fecha de compra</th>
                                <th>Opciones</th>
                            </tr>
                        </thead>

                        <tbody>
                            {
                                hostings.map( (hosting)=>(
                                    <tr key={hosting.id}>
                                        <td>{hosting.name}</td>
                                        <td>{hosting.dominio}</td>
                                        <td>{hosting.fecha}</td>
                                        <td>
                                            <Link to={`/editar/${hosting.id}`} className="btn btn-light mx-1"><i className="fa-solid fa-pen-to-square"></i></Link>
                                            <button onClick={()=> confirmDelete(hosting.id, hosting.dominio)} className="btn btn-danger mx-1"><i className="fa-solid fa-trash-can"></i></button>
                                        </td>
                                    </tr>
                                )  )
                            }
                        </tbody>
                    </table>
                            {hostings.length===0 ? <h3 className='color-dark'>Tabla de clientes vacia, crea algun cliente para ver resultados...</h3> : ""}
                </div>
            </div>
        </div>
    </>

  )
}

export default Show