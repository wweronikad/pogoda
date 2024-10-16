import { Button } from "@nextui-org/react";
import './LocationButton.css'; // Import the updated CSS

const LocationButton = ({ onClick }) => {
  return (
    <div className="location-button-container"> {/* Wrapper to apply flex properties */}
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
