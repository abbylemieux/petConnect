function Recommendations() {
  return (
    <div className="recommendations">
      <h2 className="recommendations-title">Local Recommendations</h2>
      <div className="recommendation-item">
        <h3 className="recommendation-category">Veterinarians</h3>
        <p className="recommendation-name">Healthy Paws Vet Clinic</p>
        <p className="recommendation-address">123 Main St, Seattle, WA</p>
        <div className="recommendation-rating">★★★★★ (42 reviews)</div>
      </div>
      <div className="recommendation-item">
        <h3 className="recommendation-category">Groomers</h3>
        <p className="recommendation-name">Pawfect Grooming</p>
        <p className="recommendation-address">456 Pine St, Seattle, WA</p>
        <div className="recommendation-rating">★★★★½ (38 reviews)</div>
      </div>
    </div>
  );
}

export default Recommendations;