import { Button } from "@nextui-org/react";
import './LocationButton.css';

const LocationButton = ({ onClick }) => {
  return (
    <div className="location-button-container">
      <Button
        onClick={onClick}
        className="location-button"
        radius="full"
      >
        Użyj mojej lokalizacji...
      </Button>
    </div>
  );
};

export default LocationButton;
