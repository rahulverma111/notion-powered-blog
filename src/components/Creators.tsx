import React from "react";

const Creators = () => {
  const creators = [
    { id: 1, name: "Arihant", image: "/creators/arihant.jpg" },
    { id: 2, name: "Param", image: "/creators/param.jpg" },
    { id: 3, name: "Rahul", image: "/creators/rahul.jpg" },
    { id: 4, name: "Amir", image: "/creators/amir.jpeg" },
    { id: 5, name: "Shubham", image: "/creators/shubham.jpeg" }, // no name
    { id: 6, name: "Shreekant", image: "/creators/shreekant.jpeg" }, // no name
    { id: 7, name: "Rakshith", image: "/creators/rakshith.jpeg" }, // no name
    { id: 8, name: "Avi", image: "/creators/avi.jpg" }, // no name
    { id: 9, name: "Rajesh", image: "/creators/rajesh.jpeg" }, // no name
    { id: 10, name: "Shrey", image: "/creators/shrey.jpeg" }, // no name
    { id: 11, name: "Varsha", image: "/creators/varsha.jpeg" }, // no name
    { id: 12, name: "Namrata", image: "/creators/namrata.png" }, // no name
    { id: 13, name: "Manasa", image: "/creators/manasa.jpg" }, // no name
    { id: 14, name: "Rajiv", image: "/creators/rajiv.jpeg" }, // no name
  ];

  const duplicated = [...creators, ...creators];

  return (
    <div className="relative overflow-hidden w-full bg-transparent py-4">
      <h1 className="flex justify-center font-bold text-lg text-white mb-5 w-full">
        Creators
      </h1>
      <div className="w-max flex animate-scroll">
        {duplicated.map((creator, index) => (
          <div
            key={`${creator.id}-${index}`}
            className="group relative mx-4 flex-shrink-0"
          >
            <img
              src={creator.image}
              alt={creator.name || "Unknown Creator"}
              className="w-16 h-16 rounded-full border-2 border-gray-300"
            />
            {creator.name && (
              <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-black text-white text-sm rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-20">
                {creator.name}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Creators;
