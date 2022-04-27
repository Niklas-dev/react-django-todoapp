import React from "react";

type timeAtDisplayProps = {
  text: string;
  time: string;
};
const TimeAtDisplay = ({ text, time }: timeAtDisplayProps) => {
  const toDate = (date: string) => {
    let newDate = new Date(date);

    return `${newDate.getDate()}.${newDate.getMonth()}.${newDate.getFullYear()} - ${newDate.getHours()}:${newDate.getMinutes()}`;
  };
  return (
    <div className="pt-1 flex flex-row justify-start transition-opacity">
      <div className="flex flex-row gap-2">
        <p className="text-gray-200 font-medium">{text}</p>
        <p className="text-gray-300 ">{toDate(time)}</p>
      </div>
    </div>
  );
};

export default TimeAtDisplay;
