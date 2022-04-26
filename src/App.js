import "./styles.css";

import React, { useCallback, useEffect, useState } from "react";
import debounce from "lodash.debounce";

export default function App() {
  const [response, setResponse] = useState([]);
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    const res = await fetch(`https://restcountries.com/v3.1/name/${name}`);
    const data = await res.json();
    console.log(data);
    setResponse(data);
  };

  useEffect(() => {
    setLoading(true);
    fetchData();
    setLoading(false);
  }, [name]);

  const handleText = debounce((text) => {
    setName(text);
  }, 1000);

  return (
    <>
      <div className="mx-4 mt-4 p-10 bg-white ">
        {/* search */}
        <div className="flex justify-center">
          <div className="mb-3">
            <div className="input-group relative flex mb-4">
              <input
                type="search"
                className="form-control relative flex-auto min-w-0 block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none md:w-[400px]"
                placeholder="Search"
                onChange={(e) => handleText(e.target.value)}
              />
            </div>
          </div>
        </div>

        {/* cards */}
        <p className="px-4 text-xl font-bold capitalize border-b-2 mb-4">
          <span className="text-lg font-medium text-gray-500">
            Showing Resulit For :{" "}
          </span>
          {name}
        </p>
        {loading && (
          <p className="w-full h-full flex flex-row items-center justify-center font-bold text-green-500">
            {" "}
            Loading Data Please Wait
          </p>
        )}
        <div className="grid lg:grid-cols-4 gap-4 md:grid-cols-2 grid-cols-1 w-full h-full">
          {response.length > 0 ? (
            response.map((res) => {
              return (
                <div className="flex justify-center" key={res.tld}>
                  <div className="rounded-lg shadow-lg bg-white max-w-sm">
                    <img className="rounded-t-lg" src={res.flags.svg} alt="" />
                    <div className="p-4">
                      <h5 className="text-gray-900 text-xl font-medium mb-2">
                        {res.name.common}
                      </h5>
                      <p className="text-sm text-gray-500">
                        <span className=" text-gray-800 font-semibold">
                          Continent
                        </span>{" "}
                        : {res.continents}
                      </p>
                      <p className="text-sm text-gray-500">
                        <span className=" text-gray-800 font-semibold">
                          Area
                        </span>{" "}
                        : {res.area} sqkm
                      </p>
                      <p className="text-sm text-gray-500">
                        <span className=" text-gray-800 font-semibold">
                          Currencies
                        </span>{" "}
                        : {Object.keys(res.currencies)[0]}
                      </p>
                      <p className="text-sm text-gray-500">
                        <span className=" text-gray-800 font-semibold">
                          Languages
                        </span>{" "}
                        : {Object.keys(res.languages)[0]}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="text-center flex flex-row items-center justify-center font-bold text-blue-400 text-xl">
              Search Your Countries
            </div>
          )}
        </div>
      </div>
    </>
  );
}
