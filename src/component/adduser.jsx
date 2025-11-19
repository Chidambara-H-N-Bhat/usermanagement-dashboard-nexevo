import React, { useState } from "react";

const countrylist =["India", "USA", "UK", "China", "Rusia", "UAE"]

function Adduser({onClose, onSave}){
    
        const [name, setName] = useState("");
        const [code, setCode] = useState("");
        const [countries, setCountries] = useState([]);

        const toggleCountry=(c)=>{
            setCountries((pre)=>
                pre.includes(c) ? pre.filter((x)=> x !== c) : [...pre, c]

            );
        };

    const handleSubmit = () => {
    if (!name.trim()) {
      alert("User Name is required");
      return;
    }

    onSave({
      id: Date.now(),
      name,
      code,
      countries
    });
  };







return(
    <>
        <div>
            <h2>New User</h2>
            <label> User Name</label>
            <input
            type="text"
            className="modal-input"
            placeholder="required"
            value={name}
            onChange={(e) => setName(e.target.value)}
             />
             <label> Set Code(optional)</label>
            <input
            type="text"
            className="modal-input"
            placeholder="optional"
            value={code}
            onChange={(e) => setCode(e.target.value)}
             />

            <label> Assign Countries (multi-select dropdown) </label>
            <div className="country-box">
            {countrylist.map((c)=>(
            <div key={c} className="">
            <input
            type="checkbox"
            checked={countries.includes(c)}
            onChange={() => toggleCountry(c)}
             />
             <span>{c}</span>
        </div>
        ))}
        </div>
        <div className="modal-buttons">
          <button className="btn-cancel" onClick={onClose}>Cancel</button>
          <button className="btn-save" onClick={handleSubmit}>Save</button>
        </div>
        </div>
        </>
    )

}

export default Adduser;