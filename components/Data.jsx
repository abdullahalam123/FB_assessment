import React, { useState, useEffect } from "react";
import Symbols from "./Choose";
import "bootstrap/dist/css/bootstrap.min.css";

const FormData = () => {
  const [argument, setArgument] = useState([
    { value: "My Arg", label: "My Arg", answer: "false", selected: true },
  ]);
  const [largeMap, setLargeMap] = useState(new Map());

  useEffect(() => {
    setValue();
  }, [argument]);

  const setArg = (index) => {
    const addArgument = document.getElementsByClassName("My Arg")[index].value;
    const addArg = [...argument];
    const argValue = document.getElementsByClassName("mySelect")[index].value;
    addArg[index] = {
      value: addArgument,
      label: addArgument,
      answer: argValue,
    };
    setArgument(addArg);
    setValue();
  };

  const constant = [
    { value: "false", label: "false", answer: "false", selected: true },
    { value: "true", label: "true", answer: "true" },
  ];

  const setValue = () => {
    argument.forEach((data) => {
      setLargeMap((map) => new Map(map.set(data.value, data.answer)));
    });

    constant.forEach((data) => {
      setLargeMap((map) => new Map(map.set(data.value, data.answer)));
    });
  };

  const addArg = () => {
    const addArg = [...argument, {}];
    setArgument(addArg);
  };

  return (
    <>
      <div className="container mt-4">
        <div id="argContainer">
          {argument.map((data, index) => (
            <div key={index} className="mb-3">
              <input
                type="text"
                value={data.value}
                name="arg"
                className="form-control My Arg"
                placeholder="newarg"
                onChange={(data) => setArg(index)}
              />
              <select
                className="form-select mySelect"
                onChange={() => setArg(index)}
              >
                <option value="false">False</option>
                <option value="true">True</option>
              </select>
            </div>
          ))}
        </div>
        <button className="btn btn-success" onClick={addArg}>
          + Add Arg
        </button>
        <br />
        <Symbols argument={argument} largeMap={largeMap} constant={constant} />
      </div>
    </>
  );
};

export default FormData;
