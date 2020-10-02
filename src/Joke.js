import React, { useEffect, useState } from "react";
import axios from "axios";

const Joke = () => {
  const [joke, setJoke] = useState("");
  useEffect(() => {
    getJoke();
  }, []);
  const getJoke = () => {
    axios
      .get("https://icanhazdadjoke.com/", {
        headers: {
          "Content-Type": "application/json"
        }
      })
      .then(function(response) {
        let parser = new DOMParser();
        let doc = parser.parseFromString(response.data, "text/html");
        const metas = doc.getElementsByTagName("meta");
        for (let i = 0; i < metas.length; i++) {
          if (metas[i].getAttribute("property") === "og:description") {
            setJoke(metas[i].getAttribute("content"));
          }
        }
      })
      .catch(function(error) {
        alert("Something went wrong.");
      });
  };
  return (
    <div>
      <div className="joke">{joke}</div>
      <button className="newJoke" onClick={getJoke}>
        New
      </button>
    </div>
  );
};

export default Joke;
