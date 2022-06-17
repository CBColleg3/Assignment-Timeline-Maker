import React, { useState } from 'react';
import DatePicker from "react-datepicker";

export function SetDateTime(): JSX.Element {

    //State
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());

    //Component

    //Return
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

        </div>

    );
}