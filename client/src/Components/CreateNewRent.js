import React from "react";

export default function CreateNewRent(props) {
  const handleSubmit = (e) => {
    e.preventDefault();
    props.createRent();
  };
  const handlerNameBike = (e) => {
    props.setNameBike(e.target.value);
  };
  const handlerType = (e) => {
    props.setType(e.target.value);
  };
  const handlerPrice = (e) => {
    props.setPrice(e.target.value);
  };
  return (
    <div>
      <h3>Create new rent</h3>
      <div className="create_rent">
        <form className="form_create" onSubmit={handleSubmit}>
          <div className="div_input">
            <label>
              Bike name <br />
              <input
                className="input"
                placeholder="Ex. Cannondale S6"
                type="text"
                onChange={handlerNameBike}
              />
            </label>
          </div>
          <div className="div_input">
            <label>
              Bike type
              <br />
              <select
                className="input select"
                type="text"
                onChange={handlerType}
              >
                <option>Mountain</option>
                <option>Road</option>
                <option>BMX</option>
                <option>Walking (urban)</option>
              </select>
            </label>
          </div>
          <div className="div_input">
            <label>
              Rent price
              <br />
              <input
                className="input"
                placeholder="99"
                type="number"
                onChange={handlerPrice}
              />
            </label>
          </div>
          <button className="button green" type="submit">
            Submit rent
          </button>
        </form>
      </div>
    </div>
  );
}
