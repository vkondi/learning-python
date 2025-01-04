import { useEffect, useState } from "react";

const App = () => {
  const [data, setData] = useState("");

  useEffect(() => {
    fetch("/api/data")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        console.log(data);
        setData(data.message);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  return (
    <div>
      <h1>Hey, {data}</h1>
    </div>
  );
};

export default App;
