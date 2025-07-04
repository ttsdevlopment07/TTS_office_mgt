import React, { useState } from 'react';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import * as XLSX from 'xlsx';
import '../../styles/Pim.css';

function EmployeeTab() {
  const [employees, setEmployees] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [createLogin, setCreateLogin] = useState(false);
  const [sameAddress, setSameAddress] = useState(false);

  const [formData, setFormData] = useState({
    profile: '',
    firstName: '',
    middleName: '',
    lastName: '',
    id: '',
    email: '',
    phone: '',
    designation: '',
    department: '',
    dob: '',
    doj: '',
    presentAddress: '',
    permanentAddress: '',
    aadhar: '',
    pan: '',
    bankName: '',
    accNo: '',
    ifsc: '',
    branch: '',
    gender: '',
    lastEducation: '',
    password: '',
    confirmPassword: ''
  });

  const handleInputChange = (e) => {
  const { name, value } = e.target;
  setFormData(prev => ({
    ...prev,
    [name]: value
  }));
};

const handleSameAddressToggle = () => {
  setSameAddress(prev => {
    const updated = !prev;
    if (updated) {
      setFormData(f => ({ ...f, permanentAddress: f.presentAddress }));
    }
    return updated;
  });
};


  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prev => ({ ...prev, profile: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const addEmployee = () => {
    setEmployees(prev => [...prev, formData]);
    setFormData({
      profile: '', firstName: '', middleName: '', lastName: '', id: '', email: '', phone: '', designation: '',
      department: '', dob: '', doj: '', presentAddress: '', permanentAddress: '',
      aadhar: '', pan: '', bankName: '', accNo: '', ifsc: '', branch: '',
      gender: '', lastEducation: '', password: '', confirmPassword: ''
    });
    setCreateLogin(false);
    setSameAddress(false);
    setShowForm(false);
  };

  const removeEmployee = (index) => {
    const updated = [...employees];
    updated.splice(index, 1);
    setEmployees(updated);
  };

  const exportToExcel = () => {
    const data = employees.map(emp => ({
      ID: emp.id,
      Name: `${emp.firstName} ${emp.middleName} ${emp.lastName}`,
      Email: emp.email,
      Phone: emp.phone,
      Designation: emp.designation,
      Department: emp.department,
      DOB: emp.dob,
      DOJ: emp.doj,
      Gender: emp.gender,
      LastEducation: emp.lastEducation,
      PresentAddress: emp.presentAddress,
      PermanentAddress: emp.permanentAddress,
      Aadhar: emp.aadhar,
      PAN: emp.pan,
      BankName: emp.bankName,
      AccountNo: emp.accNo,
      IFSC: emp.ifsc,
      Branch: emp.branch
    }));
    const ws = XLSX.utils.json_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Employees');
    XLSX.writeFile(wb, 'employee-list.xlsx');
  };

  const exportToPDF = () => {
    const doc = new jsPDF('l', 'pt');
    const headers = [
      "ID", "Name", "Email", "Phone", "Designation", "Department", "DOB", "DOJ",
      "Gender", "Last Education", "Present Address", "Permanent Address",
      "Aadhar", "PAN", "Bank Name", "Account No", "IFSC", "Branch"
    ];
    const rows = employees.map(emp => [
      emp.id,
      `${emp.firstName} ${emp.middleName} ${emp.lastName}`,
      emp.email,
      emp.phone,
      emp.designation,
      emp.department,
      emp.dob,
      emp.doj,
      emp.gender,
      emp.lastEducation,
      emp.presentAddress,
      emp.permanentAddress,
      emp.aadhar,
      emp.pan,
      emp.bankName,
      emp.accNo,
      emp.ifsc,
      emp.branch
    ]);

    autoTable(doc, {
      head: [headers],
      body: rows,
      margin: { top: 30, left: 20, right: 20 },
      styles: { fontSize: 8, cellPadding: 4 },
      headStyles: { fillColor: [123, 31, 162] }
    });

    doc.save('employee-list.pdf');
  };

  return (
    <div className="employee-section">
      <div className="employee-header">
        <h3>Employee List</h3>
        <div>
          <button className="action-btn" onClick={() => setShowForm(true)}>Add Employee</button>
          <button className="action-btn" onClick={exportToExcel}>Export to Excel</button>
          <button className="action-btn" style={{ backgroundColor: '#7b1fa2' }} onClick={exportToPDF}>Export to PDF</button>
        </div>
      </div>

      {!showForm && (
        <div className="employee-table-wrapper">
          <table className="employee-table">
            <thead>
              <tr>
                <th>Profile</th>
                <th>Name</th>
                <th>ID</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Designation</th>
                <th>Department</th>
                <th>DOB</th>
                <th>DOJ</th>
                <th>Gender</th>
                <th>Last Education</th>
                <th>Present Address</th>
                <th>Permanent Address</th>
                <th>Aadhar</th>
                <th>PAN</th>
                <th>Bank Name</th>
                <th>Acc No</th>
                <th>IFSC</th>
                <th>Branch</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {employees.map((emp, idx) => (
                <tr key={idx}>
                  <td><img src={emp.profile} alt="Profile" className="emp-profile" /></td>
                  <td>{emp.firstName} {emp.middleName} {emp.lastName}</td>
                  <td>{emp.id}</td>
                  <td>{emp.email}</td>
                  <td>{emp.phone}</td>
                  <td>{emp.designation}</td>
                  <td>{emp.department}</td>
                  <td>{emp.dob}</td>
                  <td>{emp.doj}</td>
                  <td>{emp.gender}</td>
                  <td>{emp.lastEducation}</td>
                  <td>{emp.presentAddress}</td>
                  <td>{emp.permanentAddress}</td>
                  <td>{emp.aadhar}</td>
                  <td>{emp.pan}</td>
                  <td>{emp.bankName}</td>
                  <td>{emp.accNo}</td>
                  <td>{emp.ifsc}</td>
                  <td>{emp.branch}</td>
                  <td>
                    <button className="action-btn" style={{ background: '#e53935' }} onClick={() => removeEmployee(idx)}>Remove</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {showForm && (
        <div className="employee-form">
          <h3>Add New Employee</h3>

          <div className="form-top-row">
            <div className="profile-container">
              <label htmlFor="profileUpload" className="profile-wrapper">
                {formData.profile ? (
                  <img src={formData.profile} alt="Profile" className="profile-circle" />
                ) : (
                  <div className="profile-circle profile-placeholder">Profile</div>
                )}
              </label>
              <input type="file" id="profileUpload" accept="image/*" style={{ display: 'none' }} onChange={handleImageUpload} />
              <div className="upload-note">Accepts jpg, png, gif (max 1MB)</div>
            </div>

            <div className="form-details-right">
              <label className="form-label">Employee Full Name*</label>
              <div className="flex-row">
                <input name="firstName" placeholder="First Name" value={formData.firstName} onChange={handleInputChange} />
                <input name="middleName" placeholder="Middle Name" value={formData.middleName} onChange={handleInputChange} />
                <input name="lastName" placeholder="Last Name" value={formData.lastName} onChange={handleInputChange} />
              </div>

              <label className="form-label">Employee ID</label>
              <input name="id" placeholder="Enter ID" value={formData.id} onChange={handleInputChange} />

              <label className="form-label">Create Login Details</label>
              <div className="toggle-row">
                <label className="switch">
                  <input type="checkbox" checked={createLogin} onChange={() => setCreateLogin(!createLogin)} />
                  <span className="slider"></span>
                </label>
              </div>

              {createLogin && (
                <div className="flex-row">
                  <input name="password" type="password" placeholder="Password" value={formData.password} onChange={handleInputChange} />
                  <input name="confirmPassword" type="password" placeholder="Confirm Password" value={formData.confirmPassword} onChange={handleInputChange} />
                </div>
              )}
            </div>
          </div>

          <div className="flex-row">
            <div className="form-group">
              <label>Email</label>
              <input name="email" type="email" value={formData.email} onChange={handleInputChange} />
            </div>
            <div className="form-group">
              <label>Phone</label>
              <input name="phone" value={formData.phone} onChange={handleInputChange} />
            </div>
            <div className="form-group">
              <label>Designation</label>
              <input name="designation" value={formData.designation} onChange={handleInputChange} />
            </div>
            <div className="form-group">
              <label>Department</label>
              <input name="department" value={formData.department} onChange={handleInputChange} />
            </div>
            <div className="form-group">
              <label>DOB</label>
              <input name="dob" type="date" value={formData.dob} onChange={handleInputChange} />
            </div>
            <div className="form-group">
              <label>DOJ</label>
              <input name="doj" type="date" value={formData.doj} onChange={handleInputChange} />
            </div>
            <div className="form-group">
              <label>Gender</label>
              <select name="gender" value={formData.gender} onChange={handleInputChange}>
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div className="form-group">
              <label>Last Education</label>
              <select name="lastEducation" value={formData.lastEducation} onChange={handleInputChange}>
                <option value="">Select</option>
                <option value="BTech">BTech</option>
                <option value="MTech">MTech</option>
                <option value="MBA">MBA</option>
                <option value="MCA">MCA</option>
              </select>
            </div>
          </div>

          <div className="flex-row">
  <div className="form-group">
    <label>Present Address</label>
    <textarea
      name="presentAddress"
      value={formData.presentAddress}
      onChange={handleInputChange}
      rows={4}
    />
    <div className="checkbox-inline">
      <input
        type="checkbox"
        checked={sameAddress}
        onChange={handleSameAddressToggle}
        id="sameAddress"
      />
      <label htmlFor="sameAddress">Same as Present Address</label>
    </div>
  </div>

  <div className="form-group">
    <label>Permanent Address</label>
    <textarea
      name="permanentAddress"
      value={formData.permanentAddress}
      onChange={handleInputChange}
      rows={4}
    />
  </div>
</div>


          <div className="flex-row">
            <div className="form-group">
              <label>Aadhar Number</label>
              <input name="aadhar" value={formData.aadhar} onChange={handleInputChange} />
            </div>
            <div className="form-group">
              <label>PAN Number</label>
              <input name="pan" value={formData.pan} onChange={handleInputChange} />
            </div>
          </div>

          <h4>Bank Details</h4>
          <div className="flex-row">
            <input name="bankName" placeholder="Bank Name" value={formData.bankName} onChange={handleInputChange} />
            <input name="accNo" placeholder="Account Number" value={formData.accNo} onChange={handleInputChange} />
            <input name="ifsc" placeholder="IFSC Code" value={formData.ifsc} onChange={handleInputChange} />
            <input name="branch" placeholder="Branch Name" value={formData.branch} onChange={handleInputChange} />
          </div>

          <div style={{ display: 'flex', gap: '10px', marginTop: '15px' }}>
            <button className="action-btn" onClick={addEmployee}>Save</button>
            <button className="action-btn" style={{ backgroundColor: '#e53935' }} onClick={() => setShowForm(false)}>Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default EmployeeTab;
