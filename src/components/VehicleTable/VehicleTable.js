import React from "react";
//Components
import { Table, Popconfirm, Button } from "antd";
//Icons
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";

import "./VehicleTable.scss";

export default function VehicleTable(props) {
  const { dataSet, isLoading, onEditButtonClick, deleteVehicle } = props;

  return (
    <div className="vehicle-table">
      <Table
        loading={isLoading}
        dataSource={dataSet}
        className="table"
        pagination={{ pageSize: 50 }}
        scroll={{ y: 500 }}
        size="large"
      >
        <Table.Column title="Nombre del Vehículo" dataIndex="name" key="id" />
        <Table.Column
          title="Acciones"
          key="actions"
          render={(record) => (
            <div className="topics-table__buttons">
              <Button
                type="secondary"
                shape="circle"
                icon={<EditOutlined />}
                onClick={() => onEditButtonClick(record)}
              />
              <Popconfirm
                title="Estas seguro que deseas eliminar?"
                okText="Eliminar"
                cancelText="No"
                onConfirm={() => deleteVehicle(record.key)}
              >
                <Button
                  type="danger"
                  shape="circle"
                  icon={<DeleteOutlined />}
                />
              </Popconfirm>
            </div>
          )}
        />
      </Table>
    </div>
  );
}
