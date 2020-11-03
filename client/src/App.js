import React, { useState, useEffect } from "react";
import "./App.css";
import CreateNewRent from "../src/Components/CreateNewRent";
import AvailableBike from "./Components/AvailableBike";
import { httpMethod } from "../src/httpRequset";
import YourRent from "./Components/YourRent";

function App() {
  const [bikes, setBikes] = useState([]);
  const [nameBike, setNameBike] = useState("");
  const [type, setType] = useState("dsad");
  const [price, setPrice] = useState();
  const createRent = () => {
    const newBike = {
      name: nameBike,
      price: price,
      type: type,
      available: true,
    };
    httpMethod("", newBike, "POST");
    setBikes(bikes.concat(newBike));
  };
  useEffect(async () => {
    const list = await httpMethod("", {}, "GET");
    setBikes(list);
  }, []);

  const rentBike = (item) => {
    httpMethod("", { ...item, available: false }, "PUT");
    setBikes(
      bikes.map((bike) => {
        if (item._id === bike._id) return { ...item, available: false };
        return bike;
      })
    );
  };
  const deleteBike = (id) => {
    httpMethod(`/${id}`, {}, "DELETE");
    setBikes(bikes.filter((bike) => bike._id !== id));
  };

  const cancelRent = (item) => {
    httpMethod("", { ...item, available: true }, "PUT");
    setBikes(
      bikes.map((bike) => {
        if (item._id === bike._id) return { ...item, available: true };
        return bike;
      })
    );
  };
  return (
    <div className="wrapper_app">
      <div className="App">
        <h1>Awesome Bike Rental</h1>
        <CreateNewRent
          setNameBike={setNameBike}
          setType={setType}
          setPrice={setPrice}
          createRent={createRent}
        />
        <YourRent
          priceBike={bikes}
          cancelRent={cancelRent}
          rentedBikes={bikes.filter((bike) => !bike.available)}
        />
        <AvailableBike
          countBike={bikes}
          rentBike={rentBike}
          deleteBike={deleteBike}
          availableBikes={bikes.filter((bike) => bike.available)}
        />
      </div>
    </div>
  );
}

export default App;
