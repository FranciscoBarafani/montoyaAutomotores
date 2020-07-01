import React, { useState } from "react";
//Components
import { Button, Row, Steps, Modal } from "antd";
import {
  CarOutlined,
  FileImageOutlined,
  LoadingOutlined,
} from "@ant-design/icons";
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

  //Upload Vehicle
  const uploadVehicle = (vehicle, id, images) => {
    console.log(images);

    setIsLoading(true);
    setShowModal(true);
    //Adding the images to the vehicle object prior to upload
    images.fileList.forEach((image) => {
      vehicle.images.push(image.uid);
    });
    //Creating or Updating Vehicle
    if (id != null) {
      db.collection("vehicles")
        .doc(id)
        .update(vehicle)
        .then(() => {
          setCurrentStep(1);
          uploadImage(images, id);
        })
        .catch(() => setStepStatus("error"));
    } else {
      db.collection("vehicles")
        .add(vehicle)
        .then((docRef) => {
          id = docRef.id;
          setCurrentStep(1);
          uploadImage(images, id);
        })
        .catch(() => setStepStatus("error"));
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
        <Button href="/admin" style={{ marginLeft: 10, marginTop: 10 }}>
          Volver
        </Button>
      </Row>
      <VehicleForm uploadVehicle={uploadVehicle} isLoading={isLoading} />
      <Modal
        visible={showModal}
        closable={false}
        destroyOnClose={true}
        footer={[
          <Button
            type="primary"
            onClick={() => setShowModal(false)}
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
