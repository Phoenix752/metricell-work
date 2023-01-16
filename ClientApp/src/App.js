import React, { useState, useEffect } from 'react';

export default function () {

    async function getEmployees() {
        return fetch("/employees").then(response => response.json());
    }

    async function createEmployee(name, value) {
        return fetch("/employees", {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name: name, value: value })
        });
    }

    async function updateEmployee(name, value) {
        return fetch("/employees", {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name: name, value: value })
        });
    }

    return (
        <div>
            <h1>Employees</h1>
            <ul>
                {employees.map(employee => (
                    <li key={employee.name}>{employee.name} - {employee.value}</li>
                    ))}
            </ul>
            <form onSubmit={e => {
                e.preventDefault();
                createEmployee(e.target.name.value, e.target.value.value);
                e.target.reset();
            }}>
                <label>
                    Name:
                    <input type="text" name="name" />
                </label>
                <label>
                    Value:
                    <input type="text" name="value" />
                </label>
                <button type="submit">Createt</button>
           </form>
           <form onSubmit={e => {
               e.preventDefault();
               updateEmployee(e.target.name.value,e.target.value.value);
               e.target.reset();
            }}>
                <label>
                    Name:
                    <input type="text" name="name" />
                </label>
                <label>
                    Value:
                    <input type="text" name="value" />
                </label>
                <button type="submit">Update</button>
          </form>                 
            
        </div>
    );
}
