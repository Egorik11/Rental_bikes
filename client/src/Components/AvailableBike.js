import React from "react";

export default function AvailableBike(props) {
  const handleRentBike = (item) => {
    return () => {
      props.rentBike(item);
    };
  };
  const handleDeleteBike = (id) => {
    return () => {
      props.deleteBike(id);
    };
  };
  const count = props.countBike.length
  return (
    <div>
      <h3>Available bicycles ({count})</h3>

      <div className="available">
        <div>
          {props.availableBikes.map((item) => (
            <div className="available_bike" key={item._id}>
              <p>
                {item.name} / {item.type} / {item.price}
              </p>
              <div>
                <button className="button blue" onClick={handleRentBike(item)}>
                  Rent
                </button>
                <button
                  className="button red"
                  onClick={handleDeleteBike(item._id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
