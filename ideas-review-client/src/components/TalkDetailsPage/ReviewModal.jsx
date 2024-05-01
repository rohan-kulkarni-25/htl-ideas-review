import React, { useState } from "react";

const ReviewModal = ({ onSubmit, onClose }) => {
  const [rating, setRating] = useState(1);

  const handleSubmit = () => {
    // Send request to backend with the selected rating
    onSubmit(rating);
    // Close the modal
    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-75">
      <div className="bg-white rounded-md w-80">
        <div className="p-6">
          <h2 className="text-lg font-semibold mb-4">Submit Review</h2>
          <label className="block mb-4">
            Rating:
            <select
              value={rating}
              onChange={(e) => setRating(parseInt(e.target.value))}
              className="border border-gray-300 rounded-md px-2 py-1 w-full"
            >
              {[1, 2, 3, 4, 5].map((num) => (
                <option key={num} value={num}>
                  {num}
                </option>
              ))}
            </select>
          </label>
        </div>
        <div className="flex justify-end bg-gray-100 px-4 py-2 rounded-b-md">
          <button onClick={onClose} className="text-gray-500 mr-2">
            Close
          </button>
          <button
            onClick={handleSubmit}
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
          >
            Submit Rating
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReviewModal;
