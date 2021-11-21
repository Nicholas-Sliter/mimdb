//a card with a dropdown menu for selecting options from a list of options (e.g. directors from the registered directors list)
//below the dropdown is a span for each option that is selected
//those spans can be clicked to remove the option from the list
import { useState, useEffect } from "react";

import style from "../../styles/FilmSubmission/OptionSelectCard.module.scss";

export default function OptionSelectCard({
  title,
  options,
  selectedOptions,
  onChangeFunction,
}) {
  const [ filterTerm, setFilterTerm ] = useState("");
  const [ filteredOptions, setFilteredOptions ] = useState([]);

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
    onChangeFunction(selectedOptions.concat(option));
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

  const optionsDropdown =
    <div className={style.inputContainer}>
      <input type="text" onChange={(e) => handleFilterTermChange(e)} />
      <div className={style.dropdown}>
        {filteredOptions
          ? filteredOptions.map((option) => (
              <div className={style.item} key={option}>
                <span
                  className="option-dropdown-item-text"
                  onClick={() => addOption(option)}
                >
                  {option}
                </span>
              </div>
            ))
          : null}
      </div>
    </div>;

  const renderSelectedOptions = selectedOptions.map((option) => {
    <span className="selected-option" key={option}>
      {option}
      <span
        className="selected-option-remove"
        onClick={() => removeOption(option)}
      >
        &times;
      </span>
    </span>;
  });

  return (
    <div className="option-select-card">
      <div className="option-select-card-title">{title}</div>
      {optionsDropdown}
      <div className="selected-options">{renderSelectedOptions}</div>
    </div>
  );
}
