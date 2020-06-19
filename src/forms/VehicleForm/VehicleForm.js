import React from "react";
//Components
import { Form, Input, Button, Select, InputNumber } from "antd";

import "./VehicleForm.scss";

export default function VehicleForm(props) {
  const { createVehicle, isLoading } = props;
  const { Option } = Select;

  //This function creates the object and the calls createVehicle function from parent
  //to upload it
  const onFinish = (values) => {
    const vehicle = {
      name: values.name,
      year: values.year,
      kilometers: values.kilometers,
      fuel: values.fuel,
      transmission: values.transmission,
      color: values.color,
      price: values.price,
    };
    createVehicle(vehicle);
  };

  return (
    <div className="vehicle-form">
      <Form onFinish={onFinish}>
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
            <Option value="nafta">Nafta</Option>
            <Option value="diesel">Diesel</Option>
            <Option value="hibrido">Híbrido</Option>
            <Option value="electric">Eléctrico</Option>
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
            <Option value="manual">Manual</Option>
            <Option value="automatica">Automatica</Option>
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
          name="price"
          label="Precio"
          rules={[
            {
              required: true,
              message: "Por favor ingresa el precio del vehiculo.",
            },
          ]}
        >
          <InputNumber />
        </Form.Item>
        <Form.Item>Imagenes</Form.Item>
        <Form.Item>
          <Button htmlType="submit" loading={isLoading}>
            Crear Vehiculo
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}
