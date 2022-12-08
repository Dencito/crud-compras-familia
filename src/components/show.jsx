import React, {useState , useEffect} from 'react';
import { Link } from "react-router-dom";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore"

import { db } from '../firebaseConfig/firebase';

import Swal from "sweetalert2"
import withReactContent from "sweetalert2-react-content"
import emailjs from '@emailjs/browser';

import moment from 'moment'
import 'moment-timezone'

const myAlert = withReactContent(Swal);
document.head.title = 'Lista de registrados';



const Show = () => {
    document.title = 'Lista de registrados';

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
    hostings.forEach(host => {
        /* console.log(host.fecha) */
        /* console.log((host.fecha).split("-")) */
        console.log("---------------------------------")
        console.log("fecha de inicio del host de "+ host.name, moment(host.fecha).format("DD/MM/YYYY"))
        console.log("fecha de fin del host de "+ host.name, moment(host.fecha).add(1, "year").format("DD/MM/YYYY"))
        console.log("fecha actual", moment().format("DD/MM/YYYY"))
        console.log("Fecha de la enviada del mail: "+ host.name, moment(host.fecha).subtract(10, 'days').format("DD/MM/YYYY"))
        const enviarMail = async (name, dominio) => {
            let mensajeEmail = {
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
        }
        
        if(/* moment(host.fecha).subtract(10, 'days').format("DD/MM/YYYY") */moment().add(1, "days").format("DD/MM/YYYY") === moment().format("DD/MM/YYYY")) {
            console.log("enviando mail: "+ host.name);
            enviarMail(host.name, host.dominio);
        }
        
    })
    
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
                                        <td>{moment(hosting.fecha).format("DD/MM/YYYY")}</td>
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