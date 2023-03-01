import React from 'react';

export default function CustomShapeTemplate(employee) {
    employee.map((item) => {
        console.log(item.Title)
    })
  return (
    (employee.map((item) => {
        <svg className="template">
          <text className="template-name" x="50%" y="20%">{item.Full_Name}</text>
          <text className="template-title" x="50%" y="45%">{item.Title}</text>
        </svg>
    }))
  );
}