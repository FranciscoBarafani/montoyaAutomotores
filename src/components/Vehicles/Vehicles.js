import React from "react";
//Components
import { List } from "antd";
import Loading from "../../components/Loading";
import VehicleCard from "../VehicleCard";

export default function Vehicles(props) {
  const { vehicles, loading } = props;

  return (
    <div className="vehicles">
      {loading || !vehicles ? (
        <Loading />
      ) : (
        <List
          grid={{ gutter: 20, xs: 2, sm: 2, md: 4, lg: 4, xl: 4, xxl: 4 }}
          dataSource={vehicles}
          locale={{ emptyText: <><h3>Error al cargar vehículos, por favor inténtelo de nuevo</h3></> }}
          renderItem={(item) => (
            <List.Item>
              <VehicleCard
                id={item.id}
                name={item.name}
                kilometers={item.kilometers}
                fuel={item.fuel}
                price={item.price}
                showImage={item.images[0]}
              />
            </List.Item>
          )}
        />
      )}
    </div>
  );
}
