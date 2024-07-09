import React from "react";
import { Alert, AlertProps } from "@navikt/ds-react";

interface AlertWithCloseButtonProps {
  children?: React.ReactNode;
  variant: AlertProps["variant"];
}

const AlertWithCloseButton: React.FC<AlertWithCloseButtonProps> = ({
  children,
  variant,
}) => {
  const [show, setShow] = React.useState(true);

  return show ? (
    <Alert variant={variant} onClose={() => setShow(false)} closeButton>
      {children || "Content"}
    </Alert>
  ) : null;
};

export default AlertWithCloseButton;