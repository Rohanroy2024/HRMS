import React, { useState, useEffect } from "react";
import "./Employee.css"; // Import your CSS for styling

const Employee = () => {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [currentEmployee, setCurrentEmployee] = useState(null);
  const [updatedEmployee, setUpdatedEmployee] = useState({
    name: "",
    role: "",
    status: "",
    gender: "", // Added gender to the updated employee object
  });

  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [employeeToDelete, setEmployeeToDelete] = useState(null);

  const [isAdding, setIsAdding] = useState(false); // State for adding employee
  const [newEmployee, setNewEmployee] = useState({
    name: "",
    role: "Employee",
    status: "Active",
    gender: "Male",
  });

  // Fetch employee data
  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await fetch(
          "https://jsonplaceholder.typicode.com/users"
        );
        const data = await response.json();

        const employeesWithDetails = data.map((employee, index) => ({
          ...employee,
          role: index % 2 === 0 ? "Manager" : "Employee",
          status: index % 2 === 0 ? "Active" : "Inactive",
          gender: index % 2 === 0 ? "Male" : "Female",
          imageUrl: `https://i.pravatar.cc/150?img=${employee.id}`,
        }));

        setEmployees(employeesWithDetails);
        setLoading(false);
      } catch (err) {
        setError("Failed to load employees");
        setLoading(false);
      }
    };

    fetchEmployees();
  }, []);

  if (loading) {
    return <div className="loading">Loading employees...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  const handleEdit = (employee) => {
    setIsEditing(true);
    setCurrentEmployee(employee);
    setUpdatedEmployee({
      name: employee.name,
      role: employee.role,
      status: employee.status,
      gender: employee.gender, // Set the gender field to the current employee's gender
    });
  };

  const handleDeleteClick = (id) => {
    setEmployeeToDelete(id);
    setShowDeleteConfirm(true);
  };

  const handleDelete = () => {
    const updatedEmployees = employees.filter(
      (employee) => employee.id !== employeeToDelete
    );
    setEmployees(updatedEmployees);
    setShowDeleteConfirm(false);
    setEmployeeToDelete(null);
  };

  const handleCancelDelete = () => {
    setShowDeleteConfirm(false);
    setEmployeeToDelete(null);
  };

  const handleUpdate = () => {
    const updatedEmployees = employees.map((employee) =>
      employee.id === currentEmployee.id
        ? { ...employee, ...updatedEmployee }
        : employee
    );
    setEmployees(updatedEmployees);
    setIsEditing(false);
    setCurrentEmployee(null);
    setUpdatedEmployee({ name: "", role: "", status: "", gender: "" });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedEmployee((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const closeModal = () => {
    setIsEditing(false);
    setCurrentEmployee(null);
    setUpdatedEmployee({ name: "", role: "", status: "", gender: "" });
  };

  // Handle Add Employee Modal form input
  const handleAddInputChange = (e) => {
    const { name, value } = e.target;
    setNewEmployee((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Handle the submission of the new employee form
  const handleAddEmployee = () => {
    const newEmployeeWithId = {
      ...newEmployee,
      id: employees.length + 1,
      imageUrl: `https://i.pravatar.cc/150?img=${employees.length + 1}`,
    };
    setEmployees([...employees, newEmployeeWithId]);
    setIsAdding(false); // Close the add employee modal
    setNewEmployee({
      name: "",
      role: "Employee",
      status: "Active",
      gender: "Male",
    }); // Reset new employee form
  };

  return (
    <div className="employee-list-container">
      {/* Edit Form Modal (only visible when editing) */}
      {isEditing && (
        <div className="modal-overlay">
          <div className="edit-form">
            <h3>Edit Employee</h3>
            <input
              type="text"
              name="name"
              value={updatedEmployee.name}
              onChange={handleInputChange}
              placeholder="Name"
            />
            <input
              type="text"
              name="role"
              value={updatedEmployee.role}
              onChange={handleInputChange}
              placeholder="Role"
            />
            <input
              type="text"
              name="status"
              value={updatedEmployee.status}
              onChange={handleInputChange}
              placeholder="Status"
            />
            <select
              className="gender"
              name="gender"
              value={updatedEmployee.gender}
              onChange={handleInputChange}
            >
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
            <button className="save" onClick={handleUpdate}>
              Save
            </button>
            <button onClick={closeModal} className="cancel-btn">
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="modal-overlay">
          <div className="delete-confirmation">
            <h3>Are you sure you want to delete this employee?</h3>
            <button onClick={handleDelete} className="yes-btn">
              Yes
            </button>
            <button onClick={handleCancelDelete} className="no-btn">
              No
            </button>
          </div>
        </div>
      )}

      {/* Add Employee Modal */}
     {isAdding && (
  <div className="modal-overlay">
    <div className="add-form">
      <div className="header">
        <h3>Add New Employee</h3>
        <span className="close-icon" onClick={() => setIsAdding(false)}>&#x2715;</span> {/* Cross icon */}
      </div>

      <input
        type="text"
        name="name"
        value={newEmployee.name}
        onChange={handleAddInputChange}
        placeholder="Name"
      />
      <input
        type="text"
        name="role"
        value={newEmployee.role}
        onChange={handleAddInputChange}
        placeholder="Role"
      />
      <select
        name="status"
        value={newEmployee.status}
        onChange={handleAddInputChange}
        placeholder="Status"
      >
        <option value="Active">Active</option>
        <option value="Inactive">Inactive</option>
      </select>

      <select
        className="gender"
        name="gender"
        value={newEmployee.gender}
        onChange={handleAddInputChange}
      >
        <option value="Male">Male</option>
        <option value="Female">Female</option>
      </select>

      <input
        type="date"
        name="dob"
        onChange={handleAddInputChange}
        placeholder="Date of Birth"
      />
      <input
        type="text"
        name="employee-number"
        onChange={handleAddInputChange}
        placeholder="Employee_Id"
      />
      <input
        type="text"
        name="department"
        onChange={handleAddInputChange}
        placeholder="Department"
      />
      <input
        type="text"
        name="designation"
        onChange={handleAddInputChange}
        placeholder="Designation"
      />
      <input
        type="text"
        name="branch"
        onChange={handleAddInputChange}
        placeholder="Branch"
      />
      <input
        type="text"
        name="employee_type"
        onChange={handleAddInputChange}
        placeholder="Employee_type"
      />
      <input
        type="text"
        name="phone"
        onChange={handleAddInputChange}
        placeholder="Phone"
      />
      <input
        type="text"
        name="email"
        onChange={handleAddInputChange}
        placeholder="Personal_Email"
      />
      <input
        type="text"
        name="email"
        onChange={handleAddInputChange}
        placeholder="Company_Email"
      />
      <input
        type="text"
        name="email"
        onChange={handleAddInputChange}
        placeholder="Refered-Email"
      />
      <input
        type="text"
        name="reports-to"
        onChange={handleAddInputChange}
        placeholder="Reports-To"
      />

      <button className="save" onClick={handleAddEmployee}>
        Add Employee
      </button>
      <button onClick={() => setIsAdding(false)} className="cancel-btn">
        Cancel
      </button>
    </div>
  </div>
)}

      {/* ADD EMPLOYEE BUTTON */}
      <div>
        <button onClick={() => setIsAdding(true)} className="add-employee">
          <span>Add Employee</span>
        </button>
      </div>

      {/* Employee List Table */}
      <div className="employee-list">
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Role</th>
              <th>Status</th>
              <th>Gender</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {employees.map((employee) => (
              <tr key={employee.id}>
                <td className="employee-name-cell">
                  <img
                    src={employee.imageUrl}
                    alt={employee.name}
                    className="employee-image"
                  />
                  <div>
                    <span className="employee-name">{employee.name}</span>
                    <br />
                    <span className="employee-email">{employee.email}</span>
                  </div>
                </td>
                <td>
                  <span className={`role-icon ${employee.role.toLowerCase()}`}>
                    {employee.role === "Manager" ? (
                      <span className="material-icons">supervisor_account</span>
                    ) : (
                      <span className="material-icons">person</span>
                    )}
                    {employee.role}
                  </span>
                </td>
                <td className="employee-status-cell">
                  <span
                    className={`employee-status ${employee.status.toLowerCase()}`}
                  >
                    {employee.status}
                  </span>
                </td>
                <td>{employee.gender}</td>
                <td>
                  <div className="button-container">
                    <button className="profile-btn">
                      <span className="material-icons">account_circle</span>
                    </button>
                    <button
                      onClick={() => handleEdit(employee)}
                      className="edit-btn"
                    >
                      <span className="material-icons">edit</span>
                    </button>
                    <button
                      onClick={() => handleDeleteClick(employee.id)}
                      className="delete-btn"
                    >
                      <span className="material-icons">delete</span>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Employee;

// import React, { useState, useEffect } from 'react';
// import './Employee.css'; // Import your CSS for styling

// const Employee = () => {
//   const [employees, setEmployees] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState('');
//   const [isEditing, setIsEditing] = useState(false);
//   const [currentEmployee, setCurrentEmployee] = useState(null);
//   const [updatedEmployee, setUpdatedEmployee] = useState({
//     name: '',
//     role: '',
//     status: '',
//     gender: ''  // Added gender to the updated employee object
//   });

//   const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
//   const [employeeToDelete, setEmployeeToDelete] = useState(null);

//   const token = '10f7d3bd52a2a6a:30811bd5da890eb'; // Your token

//   // Fetch employee data
//   useEffect(() => {
//     const fetchEmployees = async () => {
//       try {
//         const response = await fetch('https://hrms.xlayer.in/api/v2/document/Employee', {
//           method: 'GET',
//           headers: {
//             'Content-Type': 'application/json',
//             Authorization: `Bearer ${token}`,  // Add token here
//           },
//         });
//         const data = await response.json();

//         const employeesWithDetails = data.map((employee, index) => ({
//           ...employee,
//           role: index % 2 === 0 ? 'Manager' : 'Employee',
//           status: index % 2 === 0 ? 'Active' : 'Inactive',
//           gender: index % 2 === 0 ? 'Male' : 'Female',
//           imageUrl: `https://i.pravatar.cc/150?img=${employee.id}`,
//         }));

//         setEmployees(employeesWithDetails);
//         setLoading(false);
//       } catch (err) {
//         setError('Failed to load employees');
//         setLoading(false);
//       }
//     };

//     fetchEmployees();
//   }, []);

//   if (loading) {
//     return <div className="loading">Loading employees...</div>;
//   }

//   if (error) {
//     return <div className="error">{error}</div>;
//   }

//   const handleEdit = (employee) => {
//     setIsEditing(true);
//     setCurrentEmployee(employee);
//     setUpdatedEmployee({
//       name: employee.name,
//       role: employee.role,
//       status: employee.status,
//       gender: employee.gender,  // Set the gender field to the current employee's gender
//     });
//   };

//   const handleDeleteClick = (id) => {
//     setEmployeeToDelete(id);
//     setShowDeleteConfirm(true);
//   };

//   const handleDelete = async () => {
//     try {
//       const response = await fetch(`https://hrms.xlayer.in/api/v2/document/Employee/${employeeToDelete}`, {
//         method: 'DELETE',
//         headers: {
//           'Content-Type': 'application/json',
//           Authorization: `Bearer ${token}`, // Add token here
//         },
//       });

//       if (response.ok) {
//         // Remove the employee from the list
//         const updatedEmployees = employees.filter((employee) => employee.id !== employeeToDelete);
//         setEmployees(updatedEmployees);
//         setShowDeleteConfirm(false);
//         setEmployeeToDelete(null);
//       } else {
//         // Handle errors
//         const data = await response.json();
//         setError(data.message || 'Failed to delete employee');
//       }
//     } catch (error) {
//       setError('An error occurred while deleting employee');
//     }
//   };

//   const handleCancelDelete = () => {
//     setShowDeleteConfirm(false);
//     setEmployeeToDelete(null);
//   };

//   const handleUpdate = async () => {
//     const updatedEmployeeData = { ...updatedEmployee };

//     try {
//       const response = await fetch(`https://hrms.xlayer.in/api/v2/document/Employee/${currentEmployee.id}`, {
//         method: 'PUT',
//         headers: {
//           'Content-Type': 'application/json',
//           Authorization: `Bearer ${token}`, // Add token here
//         },
//         body: JSON.stringify(updatedEmployeeData),
//       });

//       if (response.ok) {
//         // Handle the response if the update is successful
//         const updatedEmployees = employees.map((employee) =>
//           employee.id === currentEmployee.id
//             ? { ...employee, ...updatedEmployee }
//             : employee
//         );
//         setEmployees(updatedEmployees);
//         setIsEditing(false);
//         setCurrentEmployee(null);
//         setUpdatedEmployee({ name: '', role: '', status: '', gender: '' });
//       } else {
//         // Handle errors
//         const data = await response.json();
//         setError(data.message || 'Failed to update employee');
//       }
//     } catch (error) {
//       setError('An error occurred while updating employee');
//     }
//   };

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setUpdatedEmployee((prevState) => ({
//       ...prevState,
//       [name]: value,
//     }));
//   };

//   const closeModal = () => {
//     setIsEditing(false);
//     setCurrentEmployee(null);
//     setUpdatedEmployee({ name: '', role: '', status: '', gender: '' });
//   };

//   return (
//     <div className="employee-list-container">
//       {/* Edit Form Modal (only visible when editing) */}
//       {isEditing && (
//         <div className="modal-overlay">
//           <div className="edit-form">
//             <h3>Edit Employee</h3>
//             <input
//               type="text"
//               name="name"
//               value={updatedEmployee.name}
//               onChange={handleInputChange}
//               placeholder="Name"
//             />
//             <input
//               type="text"
//               name="role"
//               value={updatedEmployee.role}
//               onChange={handleInputChange}
//               placeholder="Role"
//             />
//             <input
//               type="text"
//               name="status"
//               value={updatedEmployee.status}
//               onChange={handleInputChange}
//               placeholder="Status"
//             />
//             <select
//               className="gender"
//               name="gender"
//               value={updatedEmployee.gender}
//               onChange={handleInputChange}
//             >
//               <option value="Male">Male</option>
//               <option value="Female">Female</option>
//             </select>
//             <button className="save" onClick={handleUpdate}>Save</button>
//             <button onClick={closeModal} className="cancel-btn">
//               Cancel
//             </button>
//           </div>
//         </div>
//       )}

//       {/* Delete Confirmation Modal */}
//       {showDeleteConfirm && (
//         <div className="modal-overlay">
//           <div className="delete-confirmation">
//             <h3>Are you sure you want to delete this employee?</h3>
//             <button onClick={handleDelete} className="yes-btn">Yes</button>
//             <button onClick={handleCancelDelete} className="no-btn">No</button>
//           </div>
//         </div>
//       )}

//       {/* Employee List Table */}
//       <div className="employee-list">
//         <table>
//           <thead>
//             <tr>
//               <th>Name</th>
//               <th>Role</th>
//               <th>Status</th>
//               <th>Gender</th>
//               <th>Action</th>
//             </tr>
//           </thead>
//           <tbody>
//             {employees.map((employee) => (
//               <tr key={employee.id}>
//                 <td className="employee-name-cell">
//                   <img
//                     src={employee.imageUrl}
//                     alt={employee.name}
//                     className="employee-image"
//                   />
//                   <div>
//                     <span className="employee-name">{employee.name}</span>
//                     <br />
//                     <span className="employee-email">{employee.email}</span>
//                   </div>
//                 </td>
//                 <td>
//                   <span
//                     className={`role-icon ${employee.role.toLowerCase()}`}
//                   >
//                     {employee.role === 'Manager' ? (
//                       <span className="material-icons">supervisor_account</span>
//                     ) : (
//                       <span className="material-icons">person</span>
//                     )}
//                     {employee.role}
//                   </span>
//                 </td>
//                 <td className="employee-status-cell">
//                   <span className={`employee-status ${employee.status.toLowerCase()}`}>
//                     {employee.status}
//                   </span>
//                 </td>
//                 <td>{employee.gender}</td>
//                 <td>
//                   <div className="button-container">
//                     <button className="profile-btn">
//                       <span className="material-icons">account_circle</span>
//                     </button>
//                     <button onClick={() => handleEdit(employee)} className="edit-btn">
//                       <span className="material-icons">edit</span>
//                     </button>
//                     <button onClick={() => handleDeleteClick(employee.id)} className="delete-btn">
//                       <span className="material-icons">delete</span>
//                     </button>
//                   </div>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default Employee;
