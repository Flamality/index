import React, { useEffect, useState } from "react";
import { databases } from "../../../../services/appwrite";
import Flag from "./components/Flag";

export default function Flags() {
  const [flags, setFlags] = useState([]);
  useEffect(() => {
    const fetchFlags = async () => {
      try {
        const res = await databases.listDocuments("main", "flags");
        setFlags(res.documents);
        console.log(res);
      } catch (error) {
        setFlags([]);
        console.error("Error fetching flags:", error);
      }
    };
    fetchFlags();
  }, []);
  return (
    <div>
      <h1>Flags</h1>
      <ul>
        {flags?.map((flag) => (
          <Flag key={flag.$id} flag={flag} />
        ))}
      </ul>
    </div>
  );
}
