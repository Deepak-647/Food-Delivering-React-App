import React from 'react'
 

const SearchCity = ({ setCity, searchRestaurants, city }) => {
  return (
    <div className="ml-28 flex items-center ">
        <div className="border rounded-xl px-2 py-1">
          <input
            type="text"
            className="outline-none"
            placeholder="Search by City"
            onChange={(e) => setCity(e.target.value)}
            value={city}
             
            
          />
        </div>
          <button
            className="border rounded-xl px-2  py-1 ml-2 bg-orange-600 text-white"
            onClick={() => searchRestaurants()}
          >
            Search
          </button>
        </div>
  )
}

export default SearchCity