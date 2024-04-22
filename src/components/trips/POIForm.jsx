import { useEffect, useState } from 'react';
import { getAllCategories } from '../../services/categoryService'; 
import { savePOI } from  '../../services/placeService'
export const POIForm = ({ currentUser, existingPOI }) => {
 const [categories, setCategories] = useState([]);
 const [editedPOI, setEditedPOI] = useState({
    name: existingPOI ? existingPOI.name : "",
    desc: existingPOI ? existingPOI.desc : "",
    categoryId: existingPOI ? existingPOI.categoryId : 0,
    userId: currentUser.id,
 });

 useEffect(() => {
    getAllCategories().then((categoriesArray) => {
      setCategories(categoriesArray);
    });
 }, []);

 const handleSave = () => {
    const poiToSave = {
      ...editedPOI,
      id: existingPOI ? existingPOI.id : null, // If editing, keep the existing ID; otherwise, it's a new POI
    };
    savePOI(poiToSave).then(() => {
      // Handle successful save, e.g., navigate back or show a success message
    }).catch((error) => {
      // Handle error, e.g., show an error message
    });
 };

 return (
    <form className="trip-edit__poi-form">
      <h2>{existingPOI ? "Edit Point of Interest" : "Add New Point of Interest"}</h2>
      <fieldset>
        <div className="form-group">
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={editedPOI.name}
            onChange={(event) => {
              const copy = { ...editedPOI };
              copy.name = event.target.value;
              setEditedPOI(copy);
            }}
          />
        </div>
        <div className="form-group">
          <label>Description:</label>
          <textarea
            name="desc"
            value={editedPOI.desc}
            onChange={(event) => {
              const copy = { ...editedPOI };
              copy.desc = event.target.value;
              setEditedPOI(copy);
            }}
          />
        </div>
        <div className="form-group">
          <label>Category:</label>
          <select
            name="category"
            value={editedPOI.categoryId}
            onChange={(event) => {
              const copy = { ...editedPOI };
              copy.categoryId = parseInt(event.target.value);
              setEditedPOI(copy);
            }}
          >
            <option value="" disabled>Select a category</option>
            {categories.map((category) => (
              <option value={category.id} key={category.id}>
                {category.category}
              </option>
            ))}
          </select>
        </div>
      </fieldset>
      <button type="button" onClick={handleSave}>Save</button>
    </form>
 );
};
