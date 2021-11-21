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
}) {
  const [filterTerm, setFilterTerm] = useState("");
  const [filteredOptions, setFilteredOptions] = useState([]);
  const [options, setOptions] = useState(initialOptions); //this allows custom options to be added and passed up later

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


  const handleNewOption = (e) => {
     //on enter in search bar
     e.preventDefault();
      if (e.key === "Enter") {
         const res = addNewOption(e.target.value);
         if (res){
            e.target.value = "";
         }
      }
   };

  const addOption = (option) => {
    //add the option to the list of selected options
    onChangeFunction(selectedOptions.concat([option]));
  };

  const removeOption = (option) => {
    onChangeFunction(
      selectedOptions.filter((selectedOption) => selectedOption !== option)
    );
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
      />
      <div className={style.dropdown}>
        {filteredOptions
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

  const renderSelectedOptions = selectedOptions.map((option) => (
    <span
      className={style.selectedOption}
      key={option}
      onMouseDown={() => removeOption(option)}
    >
      {option}
    </span>
  ));

  // <span
  //   className="selected-option-remove"
  //   onClick={() => removeOption(option)}
  // >
  //   &times;
  // </span>;

  return (
    <div className={style.card}>
      <div className={style.title}>{title}</div>
      {optionsDropdown}
      <div className={style.selectedOptionList}>{renderSelectedOptions}</div>
    </div>
  );
}
