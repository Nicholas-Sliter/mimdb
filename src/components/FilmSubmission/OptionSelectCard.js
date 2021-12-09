//a card with a dropdown menu for selecting options from a list of options (e.g. directors from the registered directors list)
//below the dropdown is a span for each option that is selected
//those spans can be clicked to remove the option from the list
import { useState, useEffect } from "react";

import style from "../../styles/FilmSubmission/OptionSelectCard.module.scss";
import ErrorMessage from "../common/ErrorMessage";

export default function OptionSelectCard({
  title,
  initialOptions = [],
  selectedOptions,
  onChangeFunction,
  allowCustom = false,
  useDropdown = true,
  validator = (t) => "", // eslint-disable-line no-unused-vars
  limit = null,
  allowEmpty = false
}) {
  const [value, setValue] = useState("");
  const [filteredOptions, setFilteredOptions] = useState([]);
  const [options, setOptions] = useState([]); // eslint-disable-line no-unused-vars
  const [errorMessage, setErrorMessage] = useState("");

  //TODO: raise a flag in the parent component to indicate that the card is invalid and prevent submission

  //merge intial options and options (uniques only)
  useEffect(() => {
    const newOptions = [...new Set([...initialOptions, ...options])];
    if (newOptions.length !== options.length) {
      setOptions(newOptions);
    }
  }, [initialOptions]);

  useEffect(() => {
    //filter the dropdown options based on the selected options
    let tempFilteredOptions = options.filter(
      (option) => !selectedOptions.includes(option)
    );

    //filter for search
    if (value && value !== "") {
      tempFilteredOptions = tempFilteredOptions.filter((option) =>
        option.toLowerCase().includes(value.toLowerCase())
      );
    }

    setFilteredOptions(tempFilteredOptions);
  }, [value, options, selectedOptions]);

  const errorMessageTimeout = (error) => {
    setErrorMessage(error);
    setTimeout(() => {
      setErrorMessage("");
    }, 10000);
  };

  const addOption = (option) => {
    if (selectedOptions.length+1 > 0 && errorMessage!=="") {
      setErrorMessage("");
    }
    if (limit && selectedOptions.length + 1 > limit) {
      errorMessageTimeout(`You can only select ${  limit  } options`);
      return false;
    }
    //add the option to the list of selected options
    onChangeFunction(selectedOptions.concat([option]));
  };

  const removeOption = (option) => {
    if (selectedOptions.length-1 === 0 && !allowEmpty) {
      setErrorMessage("This field cannot be empty");
    }
    onChangeFunction(
      selectedOptions.filter((selectedOption) => selectedOption !== option)
    );
  };

  const validateInput = (input) => {
    const error = validator(input);
    //console.log(error);
    if (error) {
      errorMessageTimeout(error);
      return false;
    }

    setErrorMessage("");
    return true;
  };

  const addNewOption = (newOption) => {
    if (!allowCustom) {
      return false;
    }

    if (options.includes(newOption) || selectedOptions.includes(newOption)) {
      return false;
    }

    if (!validateInput(newOption)) {
      return false;
    }

    if (newOption && newOption !== "") {
      //setOptions([...options, newOption]); //this line was causing issues
      addOption(newOption);
      return true;
    }

    return false;
  };

  //todo, change this to use value from component instead of e from input
  const handleNewOption = (e) => {
    //on enter in search bar
    if (e.key === "Enter") {
      const res = addNewOption(e.target.value);
      if (res) {
        e.target.value = "";
        //setValue("");
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
        <button className={style.addButton} onClick={handleButtonPress}>
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
    (option && option !== "" ? (
      <span
        className={style.selectedOption}
        key={option}
        onMouseDown={() => removeOption(option)}
      >
        {option}
      </span>
    ) : null)
  );

  return (
    <div className={style.card}>
      <div className={style.title}>{title}</div>
      {optionsDropdown}
      <div className={style.selectedOptionList}>{renderSelectedOptions}</div>
      <div className={style.error}>
        <ErrorMessage className={style.error} message={errorMessage} />
      </div>
    </div>
  );
}
