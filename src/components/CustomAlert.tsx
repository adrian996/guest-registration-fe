import { useEffect } from "react";
import { Alert } from "react-bootstrap";
import "./CustomAlert.css";

export default function CustomAlert({ showAlert, setShowAlert, message }) {
  useEffect(() => {
    if (showAlert) {
      const timer = setTimeout(() => {
        setShowAlert(false);
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [showAlert, setShowAlert]);

  return (
    <>
      <div className="position-absolute top-0 start-50 translate-middle-x">
        {showAlert && (
          <Alert
            className="custom_alert"
            variant="success"
            onClose={() => setShowAlert(false)}
          >
            {message}
          </Alert>
        )}
      </div>
    </>
  );
}
