"use client";

import { useEffect, useState } from "react";

const getCurrentDate = () => {
  return new Date().toLocaleDateString("bn-BD", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "Asia/Dhaka",
  });
};

const CurrentDate = () => {
  const [date, setDate] = useState("");

  useEffect(() => {
    const updateDate = () => {
      setDate(getCurrentDate());
    };

    updateDate();

    const intervalId = setInterval(updateDate, 60 * 1000);

    return () => clearInterval(intervalId);
  }, []);

  if (!date) return null;

  return <span>{date}</span>;
};

export default CurrentDate;