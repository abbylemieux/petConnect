import React, { useState } from 'react';
import './Recommendations.css';

const initialRecommendations = {
  veterinarians: [
    {
      name: "Healthy Paws Vet Clinic",
      address: "123 Main St, Seattle, WA",
      rating: 5,
      reviews: 42,
    },
  ],
  groomers: [
    {
      name: "Pawfect Grooming",
      address: "456 Pine St, Seattle, WA",
      rating: 4.5,
      reviews: 38,
    },
  ],
  petStores: [],
  dogParks: [],
  daycare: [],
};

function Recommendations() {
  const [recommendations, setRecommendations] = useState(initialRecommendations);
  const [newRecommendation, setNewRecommendation] = useState({
    category: "veterinarians",
    name: "",
    address: "",
    rating: "",
    reviews: "",
  });
  const [showForm, setShowForm] = useState(false);

  const renderStars = (rating) => {
    const stars = "★".repeat(Math.floor(rating)) + (rating % 1 ? "½" : "");
    return <div className="text-yellow-400">{stars}</div>;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewRecommendation({ ...newRecommendation, [name]: value });
  };

  const handleAddRecommendation = (e) => {
    e.preventDefault();

    const { category, name, address, rating, reviews } = newRecommendation;
    if (!name || !address || !rating || !reviews) {
      alert("Please fill out all fields before adding a recommendation.");
      return;
    }

    const newEntry = {
      name,
      address,
      rating: parseFloat(rating),
      reviews: parseInt(reviews, 10),
    };

    // Add new entry to the selected category
    setRecommendations((prevRecommendations) => ({
      ...prevRecommendations,
      [category]: [...prevRecommendations[category], newEntry],
    }));

    // Reset the form
    setNewRecommendation({
      category: "veterinarians",
      name: "",
      address: "",
      rating: "",
      reviews: "",
    });
    setShowForm(false); // Hide the form after submission
    alert("Recommendation added successfully!");
  };

  return (
    <div className="recommendations-container p-6">
      <section id="recommendations" className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-bold mb-4">Local Recommendations</h2>
        <div className="grid md:grid-cols-2 gap-4">
          {Object.entries(recommendations).map(([category, items]) => (
            <div key={category} className="space-y-4">
              <h3 className={`font-semibold ${category === 'veterinarians' ? 'text-blue-600' : 'text-green-600'}`}>
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </h3>
              {items.map((item, index) => (
                <div
                  key={index}
                  className="p-3 bg-gray-50 rounded hover:shadow-md transition-shadow"
                >
                  <h4 className="font-medium">{item.name}</h4>
                  <p className="text-sm text-gray-600">{item.address}</p>
                  <div className="flex items-center mt-1">
                    {renderStars(item.rating)}
                    <span className="text-sm text-gray-500 ml-1">
                      ({item.reviews} reviews)
                    </span>
                  </div>
                </div>
              ))}
              {items.length === 0 && <p className="text-gray-500 text-sm">No recommendations yet.</p>}
            </div>
          ))}
        </div>
      </section>

      {/* Add Recommendation Section */}
      <section className="add-recommendation mt-6">
        <button
          onClick={() => setShowForm(!showForm)}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
        >
          {showForm ? "Cancel" : "Add Recommendation"}
        </button>

        {showForm && (
          <form
            className="space-y-4 bg-gray-50 p-6 rounded-lg shadow-md mt-4"
            onSubmit={handleAddRecommendation}
          >
            <div>
              <label className="block font-semibold">Category</label>
              <select
                name="category"
                value={newRecommendation.category}
                onChange={handleInputChange}
                className="w-full p-2 border rounded"
              >
                <option value="veterinarians">Veterinarian</option>
                <option value="groomers">Groomer</option>
                <option value="petStores">Pet Store</option>
                <option value="dogParks">Dog Park</option>
                <option value="daycare">Daycare</option>
              </select>
            </div>
            <div>
              <label className="block font-semibold">Name</label>
              <input
                type="text"
                name="name"
                value={newRecommendation.name}
                onChange={handleInputChange}
                className="w-full p-2 border rounded"
                placeholder="Enter name"
              />
            </div>
            <div>
              <label className="block font-semibold">Address</label>
              <input
                type="text"
                name="address"
                value={newRecommendation.address}
                onChange={handleInputChange}
                className="w-full p-2 border rounded"
                placeholder="Enter address"
              />
            </div>
            <div>
              <label className="block font-semibold">Rating (1-5)</label>
              <input
                type="number"
                name="rating"
                value={newRecommendation.rating}
                onChange={handleInputChange}
                className="w-full p-2 border rounded"
                placeholder="Enter rating"
                min="1"
                max="5"
                step="0.5"
              />
            </div>
            <div>
              <label className="block font-semibold">Number of Reviews</label>
              <input
                type="number"
                name="reviews"
                value={newRecommendation.reviews}
                onChange={handleInputChange}
                className="w-full p-2 border rounded"
                placeholder="Enter number of reviews"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-green-500 text-white p-2 rounded hover:bg-green-600"
            >
              Add Recommendation
            </button>
          </form>
        )}
      </section>
    </div>
  );
}

export default Recommendations;

/* Updated Code */