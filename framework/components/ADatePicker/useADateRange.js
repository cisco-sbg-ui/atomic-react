import { useState } from "react";
  
  const useADateRange = (initialRange  = [null, null]) => {
    const [range, setRange] = useState(initialRange)
  
    const onChange = (date) => {
      setRange(prevRange => {
        const [prevStartDate, prevEndDate] = prevRange;
        if (!prevStartDate && !prevEndDate) {
          return [date, null];
        }
        return prevEndDate ? [date, null] : [prevStartDate, date];
      })
    }
  
    return {
      value: range,
      onChange,
    };
  }

  export default useADateRange;