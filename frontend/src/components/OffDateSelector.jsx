import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { parseISO, format } from "date-fns";
import { useDispatch, useSelector } from "react-redux";
import { configGetOffDates } from "../redux/services/configs/configServices";

const OffDateSelector = ({ selectedDate, setSelectedDate }) => {
  const dispatch = useDispatch();
  const { offDates } = useSelector((state) => state.config); // get off-dates
  const disabledDates = offDates?.map((d) => parseISO(d)) || [];

  useEffect(() => {
    dispatch(configGetOffDates());
  }, [dispatch]);

  return (
    <div className="datepicker-wrapper">
      <DatePicker
        selected={selectedDate}
        onChange={(date) => setSelectedDate(date)}
        dateFormat="yyyy-MM-dd"
        placeholderText="Select a date"
        excludeDates={disabledDates} // disable these dates
        minDate={new Date()} // prevent past dates
        dayClassName={(date) => {
          const isDisabled = disabledDates.some(
            (d) => format(d, "yyyy-MM-dd") === format(date, "yyyy-MM-dd")
          );
          return isDisabled ? "tooltip-disabled" : undefined;
        }}
        className="custom-datepicker-input"
      />

      <style>
        {`
          .custom-datepicker-input {
            width: 100%;
            padding: 0.5rem 1rem;
            font-size: 1rem;
            border: 1px solid #ccc;
            border-radius: 8px;
            outline: none;
            transition: all 0.2s ease;
            box-shadow: 0 1px 3px rgba(0,0,0,0.1);
          }

          .custom-datepicker-input:focus {
            border-color: #D15A09;
            box-shadow: 0 0 0 3px rgba(209, 90, 9, 0.2);
          }

          .custom-datepicker-input::placeholder {
            color: #aaa;
          }

          .tooltip-disabled {
            background-color: #f5c6cb !important;
            color: #721c24 !important;
            position: relative;
          }
          .tooltip-disabled:hover::after {
            content: 'This date is unavailable';
            position: absolute;
            top: -25px;
            left: 50%;
            transform: translateX(-50%);
            background-color: #000;
            color: #fff;
            padding: 2px 6px;
            border-radius: 4px;
            font-size: 12px;
            white-space: nowrap;
            z-index: 1000;
          }
        `}
      </style>
    </div>
  );
};

export default OffDateSelector;
