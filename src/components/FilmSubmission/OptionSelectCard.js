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
}) {
  const [filterTerm, setFilterTerm] = useState("");
  const [filteredOptions, setFilteredOptions] = useState([]);
  const [options, setOptions] = useState(initialOptions); //this allows custom options to be added and passed up later
  const [value, setValue] = useState(""); //this is the current value of text in the input field when allowCustom is true


  //TODO: change to using the value state and make the button work
  //TODO: allow the option to pass in a validation function, implement the logic and display the error messages



  useEffect(() => {
    //filter the options based on the filterTerm
    let tempFilteredOptions = options.filter(
      (option) => !selectedOptions.includes(option)
    );

    if (filterTerm && filterTerm !== "") {
      tempFilteredOptions = tempFilteredOptions.filter((option) =>
        option.toLowerCase().includes(filterTerm.toLowerCase())
      );
    }

    setFilteredOptions(tempFilteredOptions);
  }, [filterTerm, options, selectedOptions]);

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


  const handleNewOption = (e) => {
    //on enter in search bar
    if (e.key === "Enter") {
      const res = addNewOption(e.target.value);
      if (res) {
        e.target.value = "";
      }
    }
  };

  const handleFilterTermChange = (event) => {
    //update the filterTerm state
    event.preventDefault();
    setFilterTerm(event.target.value.toString());
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
        <button className={style.addButton}>+</button>
      ) : (
        <div> </div>
      )}
      <div className={(useDropdown) ? style.dropdown : style.none}>
        {(filteredOptions && useDropdown)
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

  const renderSelectedOptions = selectedOptions.map((option) => (option && option !== "") ?
    <span
      className={style.selectedOption}
      key={option}
      onMouseDown={() => removeOption(option)}
    >
      {option}
    </span>
      : null);

  return (
    <div className={style.card}>
      <div className={style.title}>{title}</div>
      {optionsDropdown}
      <div className={style.selectedOptionList}>{renderSelectedOptions}</div>
    </div>
  );
}
