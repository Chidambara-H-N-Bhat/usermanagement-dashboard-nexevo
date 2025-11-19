import { useEffect, useState } from "react";

function Listpage(){
    const [users, setUsers] = useState([])

    useEffect(()=>{
        fetch("http://localhost:5000/users")
        .then(res => res.json())
        .then(data =>setUsers(data));
    }, []);

    return(
        <table className="w-full border mt-6">
            <thead>
                <tr>
                    <th>User Name</th>
                    <th>User code</th>
                    <th>countries</th>
                </tr>
            </thead>
            <tbody>
                {users.map((u)=>(
                <tr key={u.id}>
                <td>{u.username}</td>
                <td>{u.usercode}</td>
                <td>{u.countries.join(", ")}</td>
                </tr>
                ))}
            </tbody>
        </table>
    )
}

export default Listpage;