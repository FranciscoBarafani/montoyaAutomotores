import React, { useState } from "react";
//Components
import { Button, Row, Steps, Modal, message } from "antd";
import {
  CarOutlined,
  FileImageOutlined,
  LoadingOutlined,
} from "@ant-design/icons";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";
import VehicleForm from "../../forms/VehicleForm";
import each from "async/each";
import firebase from "../../utils/Firebase";
import "firebase/firestore";
import "firebase/storage";

import "./vehicleEdit.scss";

const db = firebase.firestore(firebase);

export default function VehicleEdit() {
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [stepStatus, setStepStatus] = useState("process");
  let history = useHistory();

  //Upload Vehicle
  const uploadVehicle = (vehicle, id, images) => {
    setIsLoading(true);
    setShowModal(true);
    //Sorting Images
    var sortedImages = [];
    images.fileList.forEach((image) => {
      sortedImages.push(image.uid);
    });
    console.log(sortedImages);
    sortedImages.sort((a, b) =>
      a.localeCompare(b, navigator.languages[0] || navigator.language, {
        numeric: true,
        ignorePunctuation: true,
      })
    );
    //Adding the images to the vehicle object prior to upload
    sortedImages.forEach((image) => {
      vehicle.images.push(image);
    });
    console.log(vehicle);
    //Creating or Updating Vehicle
    if (id != null) {
      db.collection("vehicles")
        .doc(id)
        .update(vehicle)
        .then(() => {
          setCurrentStep(1);
          uploadImage(images, id);
        })
        .catch(() => {
          message.error("Ha surgido un error, intentelo nuevamente.");
          setStepStatus("error");
        });
    } else {
      db.collection("vehicles")
        .add(vehicle)
        .then((docRef) => {
          id = docRef.id;
          setCurrentStep(1);
          uploadImage(images, id);
        })
        .catch(() => {
          message.error("Ha surgido un error, intentelo nuevamente.");
          setStepStatus("error");
        });
    }
  };

  //Upload Image
  const uploadImage = (images, id) => {
    //Uploading Images
    //Creating Upload folder and Storage REF
    const storageRef = firebase.storage().ref();
    const imageRef = storageRef.child("images");

    each(
      images.fileList,
      (image, callback) => {
        imageRef
          .child(`${id}/${image.uid}`)
          .put(image.originFileObj)
          .then(() => {
            callback();
          })
          .catch(() => {
            db.collection("vehicles").doc(id).delete();
            message.error(
              "Ha surgido un error al subir imagenes, intentelo nuevamente."
            );
            setStepStatus("error");
          });
      },
      () => {
        setCurrentStep(2);
        setStepStatus("finish");
        setIsLoading(false);
      }
    );
  };

  return (
    <div className="vehicle-edit">
      <Row>
        <Link to="/admin">
          <Button style={{ marginLeft: 10, marginTop: 10 }}>Volver</Button>
        </Link>
      </Row>
      <VehicleForm uploadVehicle={uploadVehicle} isLoading={isLoading} />
      <Modal
        visible={showModal}
        closable={false}
        destroyOnClose={true}
        footer={[
          <Button
            type="primary"
            onClick={() => {
              setShowModal(false);
              history.push(`/admin/`);
            }}
            disabled={isLoading}
          >
            Ok
          </Button>,
        ]}
      >
        <Steps direction="vertical" status={stepStatus} current={currentStep}>
          <Steps.Step
            title="Cargando Vehiculo"
            description="Se esta cargando su vehiculo"
            icon={currentStep === 0 ? <LoadingOutlined /> : <CarOutlined />}
          />
          <Steps.Step
            title="Cargando Imagenes"
            description="Se estan subiendo las imagenes."
            icon={
              currentStep === 1 ? <LoadingOutlined /> : <FileImageOutlined />
            }
          />
          <Steps.Step
            title="Finalizado"
            description="Su vehiculo fue cargado correctamente"
          />
        </Steps>
      </Modal>
    </div>
  );
}
