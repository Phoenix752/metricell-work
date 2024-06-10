import React, { useState, useEffect } from 'react';

export default function () {

    async function getEmployees() {
        return fetch("/employees").then(response => response.json());
    }

    async function createEmployee(name, value) {
        setInputName("");
        setInputValue("");
        return fetch("/employees", {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name: name, value: value })
        });
    }

    async function updateEmployee(name, value) {
        setInputName("");
        setInputValue("");
        return fetch("/employees", {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name: name, value: value })
        });
    }

    const [employeeData, setEmployeeData] = useState([]);
    const [inputName, setInputName] = useState('');
    const [inputValue, setInputValue] = useState('');

    const handleNameInput = (event) => {
        setInputName(event.target.value);
    };
    const handleValueInput = (event) => {
        setInputValue(event.target.value);
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getEmployees();
                console.log(data);
                setEmployeeData(data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    return (
        <div>
        <h1>Employees</h1>
        <input type="text" value={inputName} onChange={handleNameInput} placeholder="Enter employee name"/>
        <input type="text" value={inputValue} onChange={handleValueInput} placeholder="Enter employee value"/>
        <button onClick={() => createEmployee(inputName,inputValue)}>Add new employee</button>
        <button onClick={() => updateEmployee(inputName,inputValue)}>Update value of an employee</button>
        <ul>
            {employeeData.map((employee, index) => (
                <li key={index}>
                     {employee.name} - {employee.value}
                </li>
            ))}
        </ul>
    </div>
    );
}
