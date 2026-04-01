import './InsightPanel.css';

const InsightPanel = ({ insight }) => {
  return (
    <div className="insight-panel">
      <h3>Insight:</h3>
      <p>{insight}</p>
    </div>
  );
};

export default InsightPanel;