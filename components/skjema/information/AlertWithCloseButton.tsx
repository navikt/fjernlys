import React from "react";
import { Alert, AlertProps } from "@navikt/ds-react";

interface AlertWithCloseButtonProps {
  children?: React.ReactNode;
  variant: AlertProps["variant"];
  setShowAlert?: any;
  showPropAlert?: boolean;
}

const AlertWithCloseButton: React.FC<AlertWithCloseButtonProps> = ({
  children,
  variant,
  showPropAlert,
  setShowAlert,
}) => {
  const showAlertFunc = () => {
    setShowAlert(false);
  };

  return showPropAlert ? (
    <Alert variant={variant} onClick={() => showAlertFunc()} closeButton>
      {children || "Content"}
    </Alert>
  ) : null;
};

export default AlertWithCloseButton;
