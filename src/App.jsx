import React, { memo, useCallback, useMemo, useState } from "react";
import "./App.css";

// 리스트 항목 컴포넌트
const ListItem = memo(({ item, onClick }) => {
  console.log(`Rendering ${item}`);
  return <li onClick={() => onClick(item)}>{item}</li>
})

ListItem.displayName = `ListItem`;

const App = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedItem, setSelectedItem] = useState(null);

  const items = useMemo(() => ["Apple", "Banana", "Cherry", "Date", "Fig", "Grape"], []);

  const filteredItems = useMemo(() => {
    console.log(`filter render`)
    return items.filter((item) =>
      item.toLowerCase().includes(searchTerm.toLowerCase())
    )
  }, [items, searchTerm]);

  const handleItemClick = useCallback((item) => {
    return setSelectedItem(item);
  }, []);

  return (
    <div className="app-wrapper">
      <div className="app-container">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search..."
          className="search-input"
        />
        <ul className="item-list">
          {filteredItems.map((item) => (
            <ListItem key={item} item={item} onClick={handleItemClick} />
          ))}
        </ul>
        {selectedItem && (
          <p className="selected-item">Selected Item: {selectedItem}</p>
        )}
      </div>
    </div>
  );
};

export default App;
