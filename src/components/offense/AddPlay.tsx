import React, { useState } from "react";

const AddPlay: React.FC = () => {
  const [formData, setFormData] = useState({
    down: "",
    distance: "",
    playType: "",
    playName: "",
    yardageGained: "",
    resultOfPlay: "",
    formation: "",
    ballPlacement: "",
    driveStarter: false,
    driveNumber: "",
  });

  // ✅ PLACE THIS FUNCTION HERE
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;

    if (e.target instanceof HTMLInputElement && e.target.type === "checkbox") {
      setFormData({
        ...formData,
        [name]: e.target.checked,
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Play submitted:", formData);
    // You can also clear the form here if needed
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Down:
        <input type="number" name="down" value={formData.down} onChange={handleChange} />
      </label>

      <label>
        Drive Starter:
        <input type="checkbox" name="driveStarter" checked={formData.driveStarter} onChange={handleChange} />
      </label>

      {/* Add more fields here using handleChange */}

      <button type="submit">Add Play</button>
    </form>
  );
};

export default AddPlay;
