import React, { useState } from "react";
import { Typography } from "@material-tailwind/react";

// Sample customer data
const customerData = [
  { id: 1, name: "John Doe", email: "johndoe@example.com", status: "Active", image: "https://via.placeholder.com/150" },
  { id: 2, name: "Jane Smith", email: "janesmith@example.com", status: "Inactive", image: "https://via.placeholder.com/150" },
  { id: 3, name: "Alice Johnson", email: "alice.johnson@example.com", status: "Active", image: "https://via.placeholder.com/150" },
  { id: 4, name: "Bob Brown", email: "bob.brown@example.com", status: "Inactive", image: "https://via.placeholder.com/150" },
  // More customers can be added here
];

const Customers = () => {
  return (
    <div className="py-8 px-4 bg-gray-100">
      <h1 className="text-3xl font-bold text-center mb-6">Customers List</h1>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8">
        {customerData.map((customer) => (
          <div
            key={customer.id}
            className="bg-white p-4 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 ease-in-out transform hover:scale-105"
          >
            <div className="relative group">
              <img
                src={customer.image}
                alt={customer.name}
                className="w-full h-48 object-cover rounded-lg mb-4"
              />
              <div className="absolute top-0 left-0 w-full h-full bg-black opacity-0 group-hover:opacity-50 transition-opacity duration-300"></div>
              <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <button className="bg-blue-500 text-white px-6 py-2 rounded-full font-semibold transition-all duration-300 hover:bg-blue-600">
                  View Details
                </button>
              </div>
            </div>
            
            <div className="text-center">
              <h2 className="text-xl font-semibold text-gray-800">{customer.name}</h2>
              <p className="text-gray-600 mt-2">{customer.email}</p>
            </div>

            <div className="mt-4 text-center">
              <span
                className={`px-4 py-1 rounded-full text-white text-sm ${
                  customer.status === "Active" ? "bg-green-500" : "bg-red-500"
                }`}
              >
                {customer.status}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Customers;
