import React from 'react';
import './Recommendations.css';

const recommendationsData = {
  veterinarians: [
    {
      name: "Healthy Paws Vet Clinic",
      address: "123 Main St, Seattle, WA",
      rating: 5,
      reviews: 42
    }
  ],
  groomers: [
    {
      name: "Pawfect Grooming",
      address: "456 Pine St, Seattle, WA",
      rating: 4.5,
      reviews: 38
    }
  ]
};

function Recommendations() {
  const renderStars = (rating) => {
    const stars = "★".repeat(Math.floor(rating)) + (rating % 1 ? "½" : "");
    return <div className="text-yellow-400">{stars}</div>;
  };

  return (
    <div className="recommendations-container p-6">
      <section id="recommendations" className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-bold mb-4">Local Recommendations</h2>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="space-y-4">
            <h3 className="font-semibold text-blue-600">Veterinarians</h3>
            {recommendationsData.veterinarians.map((vet, index) => (
              <div key={index} className="p-3 bg-gray-50 rounded hover:shadow-md transition-shadow">
                <h4 className="font-medium">{vet.name}</h4>
                <p className="text-sm text-gray-600">{vet.address}</p>
                <div className="flex items-center mt-1">
                  {renderStars(vet.rating)}
                  <span className="text-sm text-gray-500 ml-1">({vet.reviews} reviews)</span>
                </div>
              </div>
            ))}
          </div>
          <div className="space-y-4">
            <h3 className="font-semibold text-green-600">Groomers</h3>
            {recommendationsData.groomers.map((groomer, index) => (
              <div key={index} className="p-3 bg-gray-50 rounded hover:shadow-md transition-shadow">
                <h4 className="font-medium">{groomer.name}</h4>
                <p className="text-sm text-gray-600">{groomer.address}</p>
                <div className="flex items-center mt-1">
                  {renderStars(groomer.rating)}
                  <span className="text-sm text-gray-500 ml-1">({groomer.reviews} reviews)</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export default Recommendations;