import React, { useEffect, useState } from "react";
//Components
import {
  Form,
  Input,
  Button,
  Select,
  InputNumber,
  Row,
  Col,
  message,
} from "antd";
import { useParams } from "react-router-dom";
import Loading from "../../components/Loading";
import { each } from "async";
import ImageUploader from "../../components/ImageUploader";
//Firebase
import firebase from "../../utils/Firebase";
import "firebase/firestore";

import "./VehicleForm.scss";

const db = firebase.firestore(firebase);

export default function VehicleForm(props) {
  const { uploadVehicle, isLoading } = props;
  const [vehicle, setVehicle] = useState([]);
  const [isLoadingCar, setIsLoadingCar] = useState(true);
  const [vehicleImages, setVehicleImages] = useState([]);

  const { Option } = Select;
  const { vehicleId } = useParams();

  //This useEffect checks the parameter, if its not new-car it will get the selected car from firebase
  useEffect(() => {
    if (vehicleId !== "new-vehicle") {
      setIsLoadingCar(true);
      db.collection("vehicles")
        .doc(vehicleId)
        .get()
        .then((response) => {
          setVehicle(response.data());
          getVehicleImages(vehicleId, response.data().images);
        })
        .catch((response) => {
          message.error("Error al obtener información del vehiculo.");
          setIsLoadingCar(false);
        });
    } else {
      setIsLoadingCar(false);
    }
  }, [vehicleId]);

  //Form Layout
  const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 10 },
  };
  const tailLayout = {
    wrapperCol: { offset: 0, span: 16 },
  };

  //This function gets the vehicle images
  const getVehicleImages = (vehicleId, images) => {
    //Firebase Storage References
    const storageRef = firebase.storage().ref();
    const imageRef = storageRef.child("images");

    const fileList = { fileList: [] };

    each(
      images,
      (image, callback) => {
        imageRef
          .child(`${vehicleId}/${image}`)
          .getDownloadURL()
          .then((url) => {
            const imageFile = {
              uid: image,
              name: image,
              status: "done",
              url: url,
            };
            //We need to get the already uploaded images blobs, and turn them into files
            //and add them into fileOriginObj
            //XMLHttpRequest to get blob file
            var xhr = new XMLHttpRequest();
            xhr.responseType = "blob";
            xhr.onload = function (event) {
              var blob = xhr.response;
              var file = new File([blob], image, {
                type: "image/jpeg",
                lastModified: Date.now(),
              });
              imageFile.originFileObj = file;
            };
            xhr.open("GET", url);
            xhr.send();
            fileList.fileList.push(imageFile);
            callback();
          });
      },
      () => {
        setVehicleImages(fileList);
        setIsLoadingCar(false);
      }
    );
  };

  //This function creates the object and the calls createVehicle function from parent
  //to create it or update it
  const onFinish = (values) => {
    if (vehicleId !== "new-vehicle") {
      const vehicle = {
        name: values.name,
        year: values.year,
        kilometers: values.kilometers,
        fuel: values.fuel,
        transmission: values.transmission,
        color: values.color,
        price: values.price,
        description: values.description,
        images: [],
      };
      uploadVehicle(vehicle, vehicleId, vehicleImages);
    } else {
      const vehicle = {
        name: values.name,
        year: values.year,
        kilometers: values.kilometers,
        fuel: values.fuel,
        transmission: values.transmission,
        color: values.color,
        price: values.price,
        description: values.description,
        images: [],
      };
      uploadVehicle(vehicle, null, vehicleImages);
    }
  };

  return (
    <div className="vehicle-form">
      {isLoadingCar ? (
        <Loading />
      ) : (
        <Row align="top" justify="space-evenly">
          <Col span={10}>
            <Form onFinish={onFinish} {...layout} initialValues={vehicle}>
              <h2>Formulario de Vehiculo</h2>
              <Form.Item
                name="name"
                label="Nombre del Vehiculo"
                rules={[
                  {
                    required: true,
                    message: "Por favor ingresa el nombre del vehiculo.",
                  },
                ]}
              >
                <Input maxLength={100} />
              </Form.Item>
              <Form.Item
                name="year"
                label="Año"
                rules={[
                  {
                    required: true,
                    message: "Por favor ingresa el año.",
                  },
                ]}
              >
                <InputNumber max={2050} maxLength={4} />
              </Form.Item>
              <Form.Item
                name="kilometers"
                label="Kilometros"
                rules={[
                  {
                    required: true,
                    message: "Por favor introduce el kilometraje.",
                  },
                ]}
              >
                <InputNumber maxLength={7} />
              </Form.Item>
              <Form.Item
                name="fuel"
                label="Combustible"
                rules={[
                  {
                    required: true,
                    message: "Por favor seleccione el tipo de combustible.",
                  },
                ]}
              >
                <Select placeholder="Tipo de Combustible">
                  <Option value="Nafta">Nafta</Option>
                  <Option value="Diesel">Diesel</Option>
                  <Option value="GNC">GNC</Option>
                  <Option value="Hibrido">Híbrido</Option>
                  <Option value="Electrico">Eléctrico</Option>
                </Select>
              </Form.Item>
              <Form.Item
                name="transmission"
                label="Transmisión"
                rules={[
                  {
                    required: true,
                    message: "Por favor seleccione la transmisión.",
                  },
                ]}
              >
                <Select placeholder="Transmisión">
                  <Option value="Manual">Manual</Option>
                  <Option value="Automatica">Automatica</Option>
                </Select>
              </Form.Item>
              <Form.Item
                name="color"
                label="Color"
                rules={[
                  {
                    required: true,
                    message: "Por favor ingrese el color del vehiculo.",
                  },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                {...tailLayout}
                name="price"
                label="Precio"
                rules={[
                  {
                    required: true,
                    message: "Por favor ingrese el precio del vehiculo.",
                  },
                ]}
              >
                <InputNumber />
              </Form.Item>
              <Form.Item name="description" label="Descripción">
                <Input.TextArea rows={4} />
              </Form.Item>
              <Form.Item>
                <Button htmlType="submit" type="primary" loading={isLoading}>
                  Cargar Vehiculo
                </Button>
              </Form.Item>
            </Form>
          </Col>
          <Col span={8}>
            <p>Imágenes</p>
            <ImageUploader
              setVehicleImages={setVehicleImages}
              vehicleImages={vehicleImages}
            />
          </Col>
        </Row>
      )}
    </div>
  );
}
