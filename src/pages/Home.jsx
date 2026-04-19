import { useState, useEffect } from "react";
import api from "../api";
import { Link } from "react-router-dom";

export default function Home() {
    const [groups, setGroups] = useState([]);
    const [name, setName] = useState("");

    const fetchGroups = async () => {
        try {
            const res = await api.get("/groups");
            setGroups(res.data);
        } catch (e) {
            console.log(e);
        }
    };

    useEffect(() => { fetchGroups(); }, []);

    const createGroup = async () => {
        try {
            await api.post("/groups", { name });
            setName("");
            fetchGroups();
        } catch (e) { console.log(e); }
    };

    return (
        <div className="p-6 bg-[#fef6f3] min-h-screen">
            <h1 className="text-3xl font-bold text-[#c7522a]">Expense Splitter</h1>

            <div className="mt-4">
                <input value={name} onChange={(e) => setName(e.target.value)} className="border p-2 mr-2" />
                <button onClick={createGroup} className="bg-[#c7522a] text-white px-4 py-2 rounded">Create</button>
            </div>

            <div className="mt-6">
                {groups.map(g => (
                    <Link key={g.id} to={`/group/${g.id}`}>
                        <div className="p-3 border mb-2 rounded hover:bg-[#ffeae3]">{g.name}</div>
                    </Link>
                ))}
            </div>
        </div>
    );
}
