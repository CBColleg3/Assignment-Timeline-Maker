import React from "react";
import DatePicker from "react-datepicker";

/**
 * Set Date and Time components on the timeline
 */
export function SetDateTime({
  startDate,
  setStartDate,
  endDate,
  setEndDate,
}: {
  startDate: Date;
  setStartDate: (startDate: Date) => void;
  endDate: Date;
  setEndDate: (endDate: Date) => void;
}): JSX.Element {
  return (
    <div>
      <div>
        Start Date
        <DatePicker
          showTimeSelect
          dateFormat="Pp"
          selected={startDate}
          onChange={(date: Date) => setStartDate(date)}
        />
      </div>
      <div>
        End Date
        <DatePicker
          showTimeSelect
          dateFormat="Pp"
          selected={endDate}
          onChange={(date: Date) => setEndDate(date)}
        />
      </div>
    </div>
  );
}
