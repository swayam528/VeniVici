import "../styles/BanList.css";
function BanList({ bannedAttributes, removeBan }) {
  return (
    <div className="sidebar">
      <h3 className="ban-list-title">Ban List</h3>
      <p className="ban-list-instructions">
        Select an attribute in your listing to ban it
      </p>
      <div className="ban-list">
        {bannedAttributes.map((item, index) => (
          <div
            key={index}
            className="banned-item"
            onClick={() => removeBan(item)}
          >
            {item}
          </div>
        ))}
      </div>
    </div>
  );
}

export default BanList;
