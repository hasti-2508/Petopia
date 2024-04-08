import * as React from "react";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { StaticDateTimePicker } from "@mui/x-date-pickers/StaticDateTimePicker";
import { TrainingPlanBooking } from "@/interfaces/trainingPlanBooking";
import moment, { Moment } from "moment";

type DateAndTime = {
  booking_date: string;
  booking_time: string;
};

type DateAndTimeProps = DateAndTime & {
  updateFields: (fields: Partial<TrainingPlanBooking>) => void;
};

export default function DateAndTime({
  booking_date,
  booking_time,
  updateFields,
}: DateAndTimeProps) {
  const now = moment(); 
  const minDateTime = now.clone().add(1, "hour"); 

  const [value, setValue] = React.useState<Moment | null>(
    moment(`${booking_date}T${booking_time}`, "DD/MM/YYTHH:mm:ss")
  );

  const handleDateChange = (newValue: Moment | null) => {
    if (newValue) {
      const selectedDate = newValue.startOf("day");
      const selectedTime = newValue.clone().startOf("minute");

      if (selectedDate.isBefore(now.clone().startOf("day"))) {
        alert("Booking date should be at least today.");
        return;
      }

      if (selectedTime.isBefore(minDateTime)) {
        alert("Booking time should be at least one hour ahead.");
        return;
      }

      const date = newValue.toDate();
      const formattedDate = moment(date).format("DD/MM/YY");
      const formattedTime = moment(date).format("HH:mm:ss");

      updateFields({
        booking_date: formattedDate,
        booking_time: formattedTime,
      });
   
    } else {
      updateFields({
        booking_date: "",
        booking_time: "",
      });
    }
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <StaticDateTimePicker
        orientation="landscape"
        value={value}
        minDateTime={minDateTime}
        onChange={(newValue) => {
          setValue(newValue);
          handleDateChange(newValue);
        }}
      />
    </LocalizationProvider>
  );
}
