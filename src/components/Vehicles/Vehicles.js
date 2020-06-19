import React from "react";
//Components
import { Row } from "antd";
import Loading from "../../components/Loading";
import { map } from "lodash";
import VehicleCard from "../VehicleCard";

export default function Vehicles(props) {
  const { vehicles, loading } = props;

  return (
    <Row>
      <div className="vehicles">
        {loading || !vehicles ? (
          <Loading />
        ) : (
          map(vehicles, (vehicle) => (
            <VehicleCard
              name={vehicle.name}
              kilometers={vehicle.kilometers}
              fuel={vehicle.fuel}
              price={vehicle.price}
            />
          ))
        )}
      </div>
    </Row>
  );
}
