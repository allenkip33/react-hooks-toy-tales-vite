import React from "react";

function ToyCard({ toy, onDeleteToy, onUpdateToy }) {
  const { id, name, image, likes } = toy;

  // PATCH: Increment likes counter and persist change to server database
  const handleLikeClick = () => {
    fetch(`http://localhost:3001/toys/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        likes: likes + 1
      })
    })
      .then((res) => res.json())
      .then((updatedToy) => onUpdateToy(updatedToy));
  };

  // DELETE: Remove record from server database
  const handleDeleteClick = () => {
    fetch(`http://localhost:3001/toys/${id}`, {
      method: "DELETE"
    })
      .then(() => onDeleteToy(id));
  };

  return (
    <div className="card" data-testid="toy-card">
      <h2>{name}</h2>
      <img
        src={image || "https://placeholder.com"}
        alt={name}
        className="toy-avatar"
      />
      <p>{likes} Likes </p>
      <button className="like-btn" onClick={handleLikeClick}>Like {"<3"}</button>
      <button className="del-btn" onClick={handleDeleteClick}>Donate to GoodWill</button>
    </div>
  );
}

export default ToyCard;
