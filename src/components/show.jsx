import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";

import { db } from "../firebaseConfig/firebase";

import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

import moment from "moment";
import "moment-timezone";

const myAlert = withReactContent(Swal);

const Show = () => {
  document.title = "Listado de compras";

  // configuramos los hooks
  const [compras, setCompras] = useState([]);
  const [loading, setLoading] = useState(false);

  // refenciamos la database firestore
  const comprasCollection = collection(db, "compras");

  // funcion para mostrar todos los documentos
  const getHostings = async () => {
    const data = await getDocs(comprasCollection);
    /* console.log(data.docs) */
    setCompras(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    /* console.log(compras) */
    setLoading(true);
  };

  // creamos funcion para eliminar documento
  const deleteCompra = async (id) => {
    const compraDoc = doc(db, "compras", id);
    await deleteDoc(compraDoc);
    getHostings();
  };

  // creamos confirmacion para eliminar con sweet alert
  const confirmDelete = (id, lugar, fecha) => {
    myAlert
      .fire({
        title: "¿Estas seguro de eliminar la compra? ",
        text: lugar,
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#d33",
        cancelButtonColor: "#3085d6",
        cancelButtonText: "Cancelar",
        confirmButtonText: "Si, Eliminar",
      })
      .then((result) => {
        if (result.isConfirmed) {
          deleteCompra(id);
          Swal.fire(
            "Eliminado",
            `La compra de ${lugar} de la fecha ${fecha} fue eliminada exisamente`,
            "success"
          );
        }
      });
  };
  // usamos useEffect
  useEffect(() => {
    getHostings();
    //eslint-disable-next-line
  }, []);
  if (loading === false) {
    return <h2 className="mt-4">Cargando Datos de las compras...</h2>;
  }

  const totalP = () => {
    console.log(typeof compras.reduce((prev, act) => prev + act.gastado, 0));
    return compras.reduce((prev, act) => prev + parseInt(act.gastado), 0);
  };

  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col">
            <div className="flex justifiy-content-center my-3 align-items-center">
              <Link to="/crear-compra" className="bg-btn">
                Crear compra <i className="fa-solid fa-plus"></i>
              </Link>
            </div>

            <table className="table bg-table">
              <thead>
                <tr className="fs-5">
                  <th>Lugar</th>
                  <th>Dinero gastado</th>
                  <th>Fecha de compra</th>
                  <th>Opciones</th>
                </tr>
              </thead>
              <tbody className="fs-6">
                {compras.map((compra) => (
                  <tr key={compra.id}>
                    <td>{compra.lugar}</td>
                    <td>{compra.gastado}</td>
                    <td>{moment(compra.fecha).format("DD/MM/YYYY")}</td>
                    <td>
                      <Link
                        to={`/editar/${compra.id}`}
                        className="btn btn-light mx-1"
                      >
                        <i className="fa-solid fa-pen-to-square"></i>
                      </Link>
                      <button
                        onClick={() =>
                          confirmDelete(compra.id, compra.lugar, compra.fecha)
                        }
                        className="btn btn-danger mx-1"
                      >
                        <i className="fa-solid fa-trash-can"></i>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
              
            </table>
            <div className="totalGastado mb-4">
                {compras.length === 0 ? (
                  " "
                ) : (
                  <span className="fs-4 fw-bold">Total gastado: ${totalP()}</span>
                )}
              </div>

            {compras.length === 0 ? (
              <h3 className="color-dark">
                Tabla de compras vacia, genera alguna compra para ver los
                resultados...
              </h3>
            ) : (
              ""
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Show;
