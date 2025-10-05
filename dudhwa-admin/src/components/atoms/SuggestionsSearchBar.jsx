import React, { useState, useEffect } from "react";
import Autosuggest from "react-autosuggest";
import { useSelector } from "react-redux";
     
const SearchBar = ({ onSearch, searchQuery, setSearchQuery, screenName,setCurrentPage }) => {
  const [suggestions, setSuggestions] = useState([]);
  const [value, setValue] = useState(searchQuery);
  const token = useSelector((state) => state.central.token);

  // Dynamically import the API function based on screenName
  const getSuggestionsApi = async (screenName, token, value) => {
    try {
      const { GetSuggestions } = await import(
        `../../redux/api/${screenName}Api`
      );
      return GetSuggestions(token, value);
    } catch (error) {
      console.error(`Error loading API for screen: ${screenName}`, error);
      return { data: [] };
    }
  };

  const onSuggestionsFetchRequested = async ({ value }) => {
    if (value.trim().length > 0) {
      try {
        const result = await getSuggestionsApi(screenName, token, value);
        setSuggestions(result.data || []);
      } catch (error) {
        console.error("Error fetching suggestions:", error);
      }
    } else {
      setSuggestions([]);
    }
  };

  const onSuggestionsClearRequested = () => setSuggestions([]);

  const getSuggestionValue = (suggestion) => suggestion.text;

  const renderSuggestion = (suggestion) => (
    <div className="px-4 py-2 text-base font-semibold transition-all duration-200 ease-in-out cursor-pointer hover:bg-gray-200 font-urbanist text-rhythm">
      {suggestion.text}
    </div>
  );

  const handleInputChange = (event, { newValue }) => {
    setValue(newValue);
    setCurrentPage(1);
    setSearchQuery(newValue);
  };

  const handleSearch = (event) => {
    event.preventDefault();
    onSearch(value.trim());
  };

  const handleClear = () => {
    setValue("");
    setSearchQuery("");
    onSearch("");
  };

  const inputProps = {
     placeholder: `Search ${
      screenName.charAt(0).toUpperCase() + screenName.slice(1)
    }`,
    value,
    onChange: handleInputChange,
    className:
      "rounded-[10px] border border-[#1C1C1C] border-opacity-10 px-2 py-3 hover:bg-[#F7F9FB] block w-[320px] h-[47px] ps-10 text-sm text-gray-900 focus:outline-none",
  };

  return (
    <div>
      <form className="max-w-md mx-auto h-[47px]" onSubmit={handleSearch}>
        <div className="relative">
          <Autosuggest
            suggestions={suggestions}
            onSuggestionsFetchRequested={onSuggestionsFetchRequested}
            onSuggestionsClearRequested={onSuggestionsClearRequested}
            getSuggestionValue={getSuggestionValue}
            renderSuggestion={renderSuggestion}
            inputProps={inputProps}
            theme={{
              suggestionsContainer:
                "max-h-60 overflow-y-auto bg-[#F7F9FB] mt-2 rounded-2xl",
              suggestion: "border-b border-gray-200",
            }}
          />
        </div>
      </form>
    </div>
  );
};

export default SearchBar;

    