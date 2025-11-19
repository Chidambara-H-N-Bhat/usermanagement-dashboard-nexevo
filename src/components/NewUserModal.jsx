import React, { useState, useEffect } from "react";
import { Modal, Input, Select, Button, message } from "antd";
import axios from "axios";


const { Option } = Select; 
const countries = [
     { name: "India", code: "IN", flag: "🇮🇳" }, 
     { name: "United States", code: "US", flag: "🇺🇸" }, 
     { name: "Canada", code: "CA", flag: "🇨🇦" }, 
     { name: "Australia", code: "AU", flag: "🇦🇺" },
     ]; 
     
     const NewUserModal = ({ visible, setVisible, onUserSaved }) =>{
        const [username, setUsername] = useState("");
        const [setCode, setSetCode] = useState(""); 
        const [selectedCountries, setSelectedCountries] = useState([]); 

        
    useEffect(() => {
         if (!visible) {
             setUsername("");
              setSetCode("");
               setSelectedCountries([]);
             } }, [visible]);
             
    const handleSave = async () => {
     if (!username || selectedCountries.length === 0) {
     message.error("Username and at least one country are required!");
      return; 
    } 
      
    const data = { username, setCode, countries: selectedCountries };
    
    try {
         const res = await 
         axios.post("http://localhost:5000/users", data);
          message.success("User saved successfully!");
           onUserSaved(res.data);
         }
         
    catch (error) {
         message.error("Failed to save user.");
          console.error(error); } };
        
        
  return (
     <Modal 
     title="Create New User"
    open={visible}
    onCancel={() => setVisible(false)}
     footer={[
         <Button key="cancel" onClick={() => setVisible(false)}>Cancel</Button>,
         <Button key="save" type="primary" onClick={handleSave}>Save</Button>,
         ]} >

     <div className="flex flex-col gap-4">
     <Input 
     placeholder="Username"
      value={username}
    onChange={(e) => setUsername(e.target.value)}
     /> 
     
     <Input
    placeholder="Set Code (optional)"
    value={setCode}
    onChange={(e) => setSetCode(e.target.value)}
     /> 
    <Select
     mode="multiple"
      placeholder="Select countries"
       value={selectedCountries}
        onChange={(values) => setSelectedCountries(values)}
         className="w-full" 
         >
    
     {countries.map((c) => (
        
    <Option key={c.code}
     value={c.name}> {c.flag} {c.name}
     </Option>
      ))}
    </Select>
     </div> 
     </Modal>
      );
     };
     
     
     export default NewUserModal;

