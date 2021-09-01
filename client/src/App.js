import React, { useState, useEffect } from "react";

//Import components
import Header from "./components/Header";
import AddVideo from "./components/AddVideo";
import AllVideos from "./components/AllVideos";

const App = () => {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetch(`api/v1/videos`)
    .then(res => res.json())
    .then(data => setData(data))
  }, []);

 
  const handleSearch = (e) => {
    setSearch(e.target.value)
  };

  return (
    <div className="App">
      <Header />
      <main>
        <AddVideo search={search} handleSearch={handleSearch} />
        <div className="d-flex justify-content-center flex-wrap">
          {data.filter(val => {
            return (
           search === "" ? val : (val.title.toLowerCase().includes(search.toLowerCase()) ? val : null) 
            )
          }).map((value, idx) => (
            <AllVideos data={value} key={idx} />
          ))}
        </div>
      </main>
    </div>
  );
};

export default App;

