import React from "react";
const Card = ({ data }) => {
    return (
        // <div >

        //     {data.name}
        // </div>

        <div className="max-w-sm rounded overflow-hidden shadow-md mt-5">
            <div className="px-6 py-4">
                <p className="text-gray-700 text-base"> Created: {data.name} </p>
                <p className="text-gray-700 text-base"> Created: {data.created} </p>
                <p className="text-gray-700 text-base"> Climate: {data.climate} </p>
                <p className="text-gray-700 text-base"> Film:  </p>
                {
                    data.films.map((it) => (
                        <p className="text-gray-700 text-base"> {it} </p>
                    ))
                }
                <br />
            </div>
        </div>
    )
}

export default Card