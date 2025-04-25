
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const DepartmentSelect = ({ value, onChange }) => {
  const [departments, setDepartments] = useState([]);
  const apiUrl = process.env.REACT_APP_API_URL;

  useEffect(() => {
    axios
      .get(`${apiUrl}/departments`)
      .then((res) => setDepartments(res.data))
      .catch((err) => console.error('Error fetching departments:', err));
  }, [apiUrl]);

  return (
    <select name="department_id" value={value} onChange={onChange}>
      <option value="">Select Department</option>
      {departments.map((dept) => (
        <option key={dept.department_id} value={dept.department_id}>
          {dept.department_name}
        </option>
      ))}
    </select>
  );
};

export default DepartmentSelect;
