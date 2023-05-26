import { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const initialValues = [
  { value: "select", label: "select", disabled: true },
  { value: "constant", label: "constant", disabled: false },
  { value: "argument", label: "argument", disabled: false },
  { value: "and", label: "and", disabled: false },
  { value: "or", label: "or", disabled: false },
];

const select = { select: "select" };

const Symbols = (props) => {
  const [values, setvalues] = useState([select]);
  const [currentOption, setcurrentOption] = useState([initialValues]);
  const [initials, setinitials] = useState(["select"]);
  const [output, setoutput] = useState("undefined");
  const [broadIndx, setbroadIndx] = useState("undefined");
  const [currentOptionName, setcurrentOptionName] = useState(["default"]);
  const [currentButton, setcurrentButton] = useState([]);
  const [indx, setindx] = useState(0);

  useEffect(() => {
    addoutput(broadIndx);
    let addOption = [...currentOption];
    currentOptionName.forEach((data, index) => {
      if (data === "argument") {
        addOption[index] = props.argument;
      }
    });
    addArgument(addOption);
  }, [props.largeMap, initials]);

  const addArgument = (addOption) => {
    setcurrentOption(addOption);
  };

  const addoutput = (finalValue) => {
    if (values.length === 1) {
      setoutput(
        props.largeMap.get(finalValue)
          ? props.largeMap.get(finalValue)
          : "undefined"
      );
    } else {
      initials.forEach((data, index) => {
        if (data === "and" || data === "and") {
          if (props.largeMap.get(initials[index + 1]) === "false") {
            setoutput("false");
          } else if (props.largeMap.get(initials[index + 1]) === "true") {
            if (props.largeMap.get(initials[index + 2]) === "true") {
              setoutput("true");
            } else {
              setoutput("false");
            }
          }
        }
        if (data === "or" || data === "or") {
          if (props.largeMap.get(initials[index + 1]) === "false") {
            if (props.largeMap.get(initials[index + 2]) === "false") {
              setoutput("false");
            } else {
              setoutput("true");
            }
          } else if (props.largeMap.get(initials[index + 1]) === "true") {
            setoutput("true");
          }
        }
      });
    }
  };

  const operatorOption = [
    { value: "and", label: "and", selected: true },
    { value: "or", label: "or" },
  ];

  const operatorOrOption = [
    { value: "or", label: "or", selected: true },
    { value: "and", label: "and" },
  ];

  const addAction = (e, index) => {
    const getvalues = document.getElementsByClassName("operator")[index].value;
    let finalValue = getvalues;
    finalValue = getvalues === "argument" ? props.argument[0].value : getvalues;
    const addinitials = [...initials];
    addinitials[index] = finalValue;
    setinitials(addinitials);
    setbroadIndx(finalValue);
    addoutput(finalValue);
    if (getvalues === "constant") {
      let addcurrentOptionName = [...currentOptionName];
      addcurrentOptionName[index] = "constant";
      setcurrentOptionName(addcurrentOptionName);
      finalValue = props.constant[0].value;
      setbroadIndx(finalValue);

      const addinitials = [...initials];
      addinitials[index] = finalValue;
      setinitials(addinitials);

      let addOption = [...currentOption];
      addOption[index] = props.constant;
      setcurrentOption(addOption);

      var addSelect = [...values];
      addSelect[index] = select;
      setvalues(addSelect);
      addoutput(finalValue);
    } else if (getvalues === "argument") {
      let addcurrentOptionName = [...currentOptionName];
      addcurrentOptionName[index] = "argument";
      setcurrentOptionName(addcurrentOptionName);

      let addOption = [...currentOption];
      addOption[index] = props.argument;
      setcurrentOption(addOption);

      var addSelect = [...values];
      addSelect[index] = select;
      setvalues(addSelect);
    } else if (getvalues === "and" || getvalues === "or") {
      var addSelect = [...values];
      addSelect[index] = select;
      addSelect[index + 1] = select;
      addSelect[index + 2] = select;
      setvalues(addSelect);

      let addOption = [...currentOption];
      addOption[index] =
        getvalues === "and" ? operatorOption : operatorOrOption;
      addOption[index + 1] = initialValues;
      addOption[index + 2] = initialValues;

      let addNewButton = [...currentButton];
      addNewButton[index + 1] = "";
      addNewButton[index + 2] = "";

      setcurrentButton(addNewButton);
      setcurrentOption(addOption);
      setindx(index + 2);
    }
  };

  const resetSelect = (index) => {
    let addcurrentOptionName = [...currentOptionName];
    addcurrentOptionName[index] = "default";
    setcurrentOptionName(addcurrentOptionName);

    var addSelect = [...values];
    addSelect[index] = select;
    setvalues(addSelect);

    let addOption = [...currentOption];
    addOption[index] = initialValues;
    setcurrentOption(addOption);
    setoutput("undefined");
  };

  const addSelect = (index) => {
    const addSelect = [...values];
    addSelect[index] = select;
    setvalues(addSelect);
    setindx(index);

    let addOption = [...currentOption];
    addOption[index] = initialValues;
    setcurrentOption(addOption);
  };

  return (
    <div style={{ marginTop: "50px", marginLeft: "30px" }}>
      {values.map((selectData, index) => (
        <div key={index}>
          <select
            className="operator"
            value={
              currentOption[index] === initialValues
                ? selectData.select
                : initials[index]
            }
            onChange={(e) => addAction(e, index)}
          >
            {currentOption[index].map((data, index) => (
              <option
                key={index}
                value={data.value}
                answer={data.answer}
                disabled={data.disabled}
                selected={data.selected}
              >
                {data.label}
              </option>
            ))}
          </select>
          <button className="btn btn-danger" onClick={() => resetSelect(index)}>
            x
          </button>
          <br />
        </div>
      ))}
      {currentButton.map((data, index) => (
        <div key={index}>
          {(initials[index - 1] === "and" ||
            initials[index - 1] === "or" ||
            initials[index - 1] === "or" ||
            initials[index - 1] === "and") && (
            <button onClick={() => addSelect(indx + 1)}>+add op</button>
          )}
        </div>
      ))}
      <div style={{ marginTop: "20px" }}>Result: {output}</div>
    </div>
  );
};

export default Symbols;
