import { DatePicker, useDatepicker } from "@navikt/ds-react";
import React from "react";

function DatoVelger() {
  const { datepickerProps, inputProps } = useDatepicker({
    defaultSelected: new Date(),
  });

  return (
    <DatePicker {...datepickerProps}>
      <DatePicker.Input {...inputProps} label="Dagens dato" readOnly />
    </DatePicker>
  );
}

export default DatoVelger;
