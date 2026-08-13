import React, { useState, useEffect } from "react";

import Header from "./Header";
import ToyForm from "./ToyForm";
import ToyContainer from "./ToyContainer";

function App() {
  const [showForm, setShowForm] = useState(false);
  const [toys, setToys] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3001/toys")
      .then((res) => res.json())
      .then((data) => setToys(data))
      .catch((err) => console.error("Error loading toys:", err));
  }, []);

  function handleClick() {
    setShowForm((showForm) => !showForm);
  }

  const handleAddToy = (newToy) => {
    setToys((prevToys) => [...prevToys, newToy]);
  };

  const handleDeleteToy = (idToDelete) => {
    setToys((prevToys) => prevToys.filter((toy) => toy.id !== idToDelete));
  };

  const handleUpdateToy = (updatedToy) => {
    setToys((prevToys) =>
      prevToys.map((toy) => (toy.id === updatedToy.id ? updatedToy : toy))
    );
  };

  return (
    <>
      <Header />
      {showForm ? <ToyForm onAddToy={handleAddToy} /> : null}
      <div className="buttonContainer">
        <button onClick={handleClick}>Add a Toy</button>
      </div>
      <ToyContainer 
        toys={toys} 
        onDeleteToy={handleDeleteToy} 
        onUpdateToy={handleUpdateToy} 
      />
    </>
  );
}

export default App;
