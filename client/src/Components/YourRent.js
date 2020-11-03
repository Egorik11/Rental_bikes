import React from "react";

export default function YourRent(props) {
  const handleCancelRent = (item) => {
    return () => {
      props.cancelRent(item);
    };
  };

  return (
    <div>
      <h3>Your Rent </h3>
      <div className="your_rent">
        <div>
          {props.rentedBikes.map((item) => (
            <div className="rented_bike" key={item._id}>
              <p>
                {item.name} / {item.type} / {item.price}
              </p>
              <button className="button red" onClick={handleCancelRent(item)}>
                Cancel rent
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
