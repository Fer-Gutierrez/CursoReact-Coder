import React, { useContext, useEffect, useState } from "react";
import ItemDatail from "./ItemDatail";
import { products } from "../../productsMock";
import { useParams } from "react-router-dom";
import { CartContext } from "../../context/CartContext";
import { ClipLoader } from "react-spinners";

//Importaciones para usar FireBase
import { db } from "../../firebaseConfig";
import { getDoc, collection, doc } from "firebase/firestore";

const ItemDetailContainer = () => {
  const [product, setProduct] = useState({});

  const { agregarAlCarrito, getQuantityById } = useContext(CartContext);

  //useParams te trae siempre un objeto con propiedades, dichas propiedades tienen como key lo que le puse luego del /: en la ruta (en App.js)
  //Podemos desestructurar el objeto para acceder directamente a una o varias de sus propiedades.
  const { id } = useParams();
  //useParams te trae siempre un string dentro de cada propiedad, por lo tanto debemos convertirlo a numero para usar el find().

  // console.log(typeof id);

  //USANDO EL MOCK DE PRODUCTOS
  // useEffect(() => {
  //   console.log(products);
  //   let encontrado = products.find((prod) => prod.id === +id); //Convertimos el id (string) en id (number).
  //   setTimeout(() => {
  //     setProduct(encontrado);
  //   }, 2000);
  // }, [id]);

  //USANDO FIREBASE
  useEffect(() => {
    const itemCollection = collection(db, "products");
    const refDoc = doc(itemCollection, id);
    getDoc(refDoc)
      .then((res) => setProduct({ ...res.data(), id: res.id }))
      .catch((err) => console.log(err));
  }, [id]);

  const onAdd = (cantidad) => {
    let data = {
      ...product,
      quantity: cantidad,
    };

    agregarAlCarrito(data);
    alert(`Se agregó al carrito ${cantidad} unidad/es de ${product.title}`);
  };

  let cantidadTotal = getQuantityById(product.id);

  return (
    <div>
      {!product.img && (
        <div
          style={{
            display: "flex",
            height: "90vh",
            justifyContent: "center",
            alignContent: "center",
            alignItems: "center",
          }}
        >
          <ClipLoader
            color="#030509"
            cssOverride={{}}
            loading
            size={100}
            speedMultiplier={0.7}
          />
        </div>
      )}
      <ItemDatail
        product={product}
        onAdd={onAdd}
        cantidadTotal={cantidadTotal}
      />
    </div>
  );
};

export default ItemDetailContainer;
