import React, { useState } from "react";
//Components
import { message, Button } from "antd";
import VehicleForm from "../../forms/VehicleForm";
import firebase from "../../utils/Firebase";
import "firebase/firestore";
import "firebase/storage";

import "./vehicleEdit.scss";

const db = firebase.firestore(firebase);

export default function VehicleEdit() {
  const [isLoading, setIsLoading] = useState(false);

  //Upload Vehicle
  const uploadVehicle = (vehicle, id, images) => {
    setIsLoading(true);
    try {
      try {
        //Adding the images to the vehicle object prior to upload
        images.fileList.forEach((image) => {
          vehicle.images.push(image.uid);
        });
        //Creating or Updating Vehicle
        if (id != null) {
          db.collection("vehicles")
            .doc(id)
            .update(vehicle)
            .then(() => message.success("Vehiculo modificado correctamente"))
            .catch(() => message.error("Error al modificar vehiculo"));
        } else {
          db.collection("vehicles")
            .add(vehicle)
            .then((docRef) => {
              id = docRef.id;
              message.success("Vehiculo creado correctamente");
            })
            .catch(() => message.error("Error al cargar vehiculo"));
        }
      } catch {
        message.error("Error al cargar vehiculo General");
      }
      try {
        //Uploading Images
        //Creating Upload folder and Storage REF
        const storageRef = firebase.storage().ref();
        const imageRef = storageRef.child("images");
        images.fileList
          .forEach((image) => {
            imageRef
              .child(`${id}/${image.uid}`)
              .put(image.originFileObj)
              .then(() => message.success(`Imagen ${image.uid} Subida`));
          })
          .catch(() => message.error("Error al subir Imagen"));
      } catch {}
    } catch {
      message.error("Error general");
    }
    setIsLoading(false);
  };

  return (
    <div className="vehicle-edit">
      <Button href="/admin">Volver</Button>
      <VehicleForm uploadVehicle={uploadVehicle} isLoading={isLoading} />
    </div>
  );
}
