import React, { useState } from 'react';
import DatePicker from "react-datepicker";
import { FileImport } from "./FileImport";

export function SetDateTime(): JSX.Element {

    //State
    const [startDate, setStartDate] = useState<Date>(new Date());
    const [endDate, setEndDate] = useState<Date>(new Date());

    return (
        <div>
            <div>
                Start Date
                <DatePicker showTimeSelect dateFormat="Pp" selected={startDate} onChange={(date: Date) => setStartDate(date)} />
            </div>
            <div>
                End Date
                <DatePicker showTimeSelect dateFormat="Pp" selected={endDate} onChange={(date: Date) => setEndDate(date)} />
            </div>
            <div>    
            <FileImport
            startDate={startDate}
            setStartDate={setStartDate}
            endDate={endDate}
            setEndDate={setEndDate}
          ></FileImport>{" "}
            </div>


        </div>

    );
}