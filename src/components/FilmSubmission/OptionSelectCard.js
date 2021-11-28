//a card with a dropdown menu for selecting options from a list of options (e.g. directors from the registered directors list)
//below the dropdown is a span for each option that is selected
//those spans can be clicked to remove the option from the list
import { useState, useEffect } from "react";

import style from "../../styles/FilmSubmission/OptionSelectCard.module.scss";

export default function OptionSelectCard({
  title,
  initialOptions,
  selectedOptions,
  onChangeFunction,
  allowCustom = false,
  useDropdown = true,
  validator = (t) => (true,"")
}) {
  const [value, setValue] = useState(""); //current value in text box
  const [filteredOptions, setFilteredOptions] = useState([]);
  const [options, setOptions] = useState(initialOptions); //this allows custom options to be added and passed up later
  const [errorMessage, setErrorMessage] = useState("");

  //TODO: change to using the value state and make the button work
  //TODO: allow the option to pass in a validation function, implement the logic and display the error messages

  useEffect(() => {
    //filter the options based on the value
    let tempFilteredOptions = options.filter(
      (option) => !selectedOptions.includes(option)
    );

    if (value && value !== "") {
      tempFilteredOptions = tempFilteredOptions.filter((option) =>
        option.toLowerCase().includes(value.toLowerCase())
      );
    }

    setFilteredOptions(tempFilteredOptions);
  }, [value, options, selectedOptions]);

  const addOption = (option) => {
    //add the option to the list of selected options
    onChangeFunction(selectedOptions.concat([option]));
  };

  const removeOption = (option) => {
    onChangeFunction(
      selectedOptions.filter((selectedOption) => selectedOption !== option)
    );
  };

  const addNewOption = (newOption) => {
    if (!allowCustom) {
      return false;
    }
    //check if already in options
    if (options.includes(newOption)) {
      return false;
    }

    if (newOption && newOption !== "") {
      setOptions([...options, newOption]);
      addOption(newOption);
      return true;
    }

    return false;
  };

  //problem is here as the selected options list is initlaized in the enclosing component as [""].  Thus we need to initialize it as an empty array [] instead of [""].

  //todo, change this to use value from component instead of e from input
  const handleNewOption = (e) => {
    //on enter in search bar
    if (e.key === "Enter") {
      const res = addNewOption(e.target.value);
      if (res) {
        e.target.value = "";
      }
    }
  };

  const handleButtonPress = () => {
    addNewOption(value);
  };

  const handleFilterTermChange = (event) => {
    //update the value state
    event.preventDefault();
    setValue(event.target.value.toString());
  };

  const optionsDropdown = (
    <div className={style.inputContainer}>
      <input
        type="text"
        placeholder={`Add ${title}`}
        onChange={(e) => handleFilterTermChange(e)}
        onKeyPress={(e) => handleNewOption(e)}
      />
      {allowCustom ? (
        <button className={style.addButton} onClick={() => handleButtonPress}>
          +
        </button>
      ) : (
        <div> </div>
      )}
      <div className={useDropdown ? style.dropdown : style.none}>
        {filteredOptions && useDropdown
          ? filteredOptions.map((option) => (
              <div
                className={style.item}
                key={option}
                onMouseDown={() => addOption(option)}
              >
                <span>{option}</span>
              </div>
            ))
          : null}
      </div>
    </div>
  );

  const renderSelectedOptions = selectedOptions.map((option) =>
    option && option !== "" ? (
      <span
        className={style.selectedOption}
        key={option}
        onMouseDown={() => removeOption(option)}
      >
        {option}
      </span>
    ) : null
  );

  return (
    <div className={style.card}>
      <div className={style.title}>{title}</div>
      {optionsDropdown}
      <div className={style.selectedOptionList}>{renderSelectedOptions}</div>
    </div>
  );
}
