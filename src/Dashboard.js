import React, { useEffect, useState } from "react";
import API from "./api";
import logo from "./logo.svg";
import myPhoto from "./assets/Rakesh Malash.png";
import {
  FaHome,
  FaUsers,
  FaCalendarAlt,
  FaComments,
  FaCreditCard,
  FaCog,
  FaSearch,
  FaEllipsisH,
  FaHeart,
  FaThermometerHalf,
  FaLungs,
  FaTint
} from "react-icons/fa";

import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
} from "chart.js";
import { ClipLoader } from "react-spinners";
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend
);

function Dashboard() {
  const [patients, setPatients] = useState([]);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
  API.get("/")
  .then((res) => {

    const myPatient = {
      id: 999,
      name: "Rakesh Malash",
      gender: "Male",
      age: 22,
      profile_picture: myPhoto,

      phone_number: "9800135855",
      emergency_contact: "9800135855",

      insurance_type: "Individual Health Insurance",
      date_of_birth: "01/04/2003",

      diagnosis_history: [
  {
    month: "March",
    blood_pressure: {
      systolic: { value: 120, levels: "Normal" },
      diastolic: { value: 80, levels: "Normal" }
    },
    respiratory_rate: { value: 18, levels: "Normal" },
    temperature: { value: 98.6, levels: "Normal" },
    heart_rate: { value: 75, levels: "Normal" }
  },

  {
    month: "April",
    blood_pressure: {
      systolic: { value: 122, levels: "Normal" },
      diastolic: { value: 81, levels: "Normal" }
    },
    respiratory_rate: { value: 19, levels: "Normal" },
    temperature: { value: 98.7, levels: "Normal" },
    heart_rate: { value: 76, levels: "Normal" }
  },

  {
    month: "May",
    blood_pressure: {
      systolic: { value: 118, levels: "Normal" },
      diastolic: { value: 79, levels: "Normal" }
    },
    respiratory_rate: { value: 18, levels: "Normal" },
    temperature: { value: 98.5, levels: "Normal" },
    heart_rate: { value: 74, levels: "Normal" }
  }

],

    diagnostic_list: [
        {
          name: "B.Tech CSE Graduate",
          description:"Software Engineer",
          status: "Completed"
        }
      ],

      lab_results: [
        "Blood Test",
        "ECG",
        "X-Ray"
      ]
    };

    const updatedPatients = [...res.data, myPatient];

    setPatients(updatedPatients);

    setSelectedPatient(myPatient);

    setLoading(false);
  })
    .catch((err) => {
  console.log(err);
  setError("Failed to load patients");
  setLoading(false);
});
}, []);

  const diagnosis = selectedPatient?.diagnosis_history || [];
  const filteredPatients = patients.filter((p) =>
  p.name.toLowerCase().includes(search.toLowerCase())
);

const latestDiagnosis =
  diagnosis.length > 0 ? diagnosis[0] : null;

const chartData = {
  labels: diagnosis
    .slice()
    .reverse()
    .map((item) => item.month.substring(0, 3)),

datasets: [
  {
    label: "Systolic",
    data: diagnosis
      .slice()
      .reverse()
      .map((item) => item.blood_pressure.systolic.value),

    borderColor: "#E66FD2",
    backgroundColor: "#E66FD2",
    tension: 0.4,
  },

  {
    label: "Diastolic",
    data: diagnosis
      .slice()
      .reverse()
      .map((item) => item.blood_pressure.diastolic.value),

    borderColor: "#7B61FF",
    backgroundColor: "#7B61FF",
    tension: 0.4,
  },
],
};
if (loading) {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <ClipLoader size={60} color="#00cfc8" />
    </div>
  );
}

if (error) {
  return (
    <h2 style={{ textAlign: "center", color: "red" }}>
      {error}
    </h2>
  );
}

return (
  
  <>
      <div
  style={{
    background: "#fff",
    height: "80px",
    padding: "0 30px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    borderRadius: "20px",
    marginBottom: "20px",
    boxShadow: "0 2px 10px rgba(0,0,0,0.08)",
  }}
>
  {/* Logo */}
  <div style={{ display: "flex", alignItems: "center" }}>
    <img src={logo} alt="TechCare" width="180" />
  </div>

  {/* Menu */}
  <div
    style={{
      display: "flex",
      gap: "35px",
      alignItems: "center",
      fontWeight: "600",
      fontSize: "15px",
    }}
  >
    <span><FaHome /> Overview</span>

    <span
      style={{
        background: "#01F0D0",
        padding: "10px 20px",
        borderRadius: "30px",
      }}
    >
      <FaUsers /> Patients
    </span>

    <span><FaCalendarAlt /> Schedule</span>

    <span><FaComments /> Message</span>

    <span><FaCreditCard /> Transactions</span>
  </div>

  {/* Doctor */}
  <div
    style={{
      display: "flex",
      alignItems: "center",
      gap: "15px",
    }}
  >
    <img
      src={selectedPatient?.profile_picture}
      alt=""
      width="50"
      height="50"
      style={{
        borderRadius: "50%",
        objectFit: "cover",
      }}
    />

    <div>
      <b>Dr. Jose Simmons</b>
      <br />
      <small>General Practitioner</small>
    </div>

    <FaCog size={22} />
    <button
  onClick={() => setDarkMode(!darkMode)}
  style={{
    padding: "8px 16px",
    borderRadius: "8px",
    cursor: "pointer",
    border: "1px solid #ccc",
    background: "#fff",
  }}
>
  🌙 Dark
</button>

  </div>
</div>
    <button
      onClick={() => setDarkMode(!darkMode)}
      style={{
        position: "fixed",
        top: 20,
        right: 20,
        zIndex: 999,
        padding: "10px 15px",
        cursor: "pointer",
      }}
    >
      {darkMode ? "☀ Light" : "🌙 Dark"}
    </button>

    <div
      style={{
        display: "grid",
        gridTemplateColumns:
          window.innerWidth < 900
            ? "1fr"
            : "300px 1fr 320px",
        gap: "20px",
        padding: window.innerWidth < 900 ? "10px" : "20px",
        background: darkMode ? "#121212" : "#f5f7fb",
      }}
    >

      {/* Left Panel */}

      <div
        style={{
          background: darkMode ? "#1f1f1f" : "#fff",
          borderRadius: "15px",
          padding: "20px",
          height: window.innerWidth < 900 ? "auto" : "90vh",
          overflowY: "auto",
        }}
      >
        <div
  style={{
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "20px",
  }}
>
  <h2>Patients</h2>
  <FaSearch size={20} />
</div>
        <input
  type="text"
  placeholder="Search Patient..."
  value={search}
  onChange={(e) => setSearch(e.target.value)}
  style={{
    width: "100%",
    padding: "10px",
    marginBottom: "15px",
    borderRadius: "8px",
    border: "1px solid #ccc",
  }}
/>

        {filteredPatients.map((p, index) => (
          <div
            key={index}
            onClick={() => setSelectedPatient(p)}
            style={{
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  background:
  selectedPatient?.name === p.name
    ? "#D8FCF7"
    : darkMode
    ? "#1f1f1f"
    : "#fff",
  alignItems: "center",
  marginBottom: "15px",
  cursor: "pointer",
  padding: "8px",
  borderRadius: "10px",
}}
          >
            <img
              src={p.profile_picture}
              alt=""
              width="55"
              height="55"
              style={{
                borderRadius: "50%",
                marginRight: "10px",
              }}
            />

            <div>
              <b>{p.name}</b>
              <br />
              {p.gender}, {p.age}
            </div>
            <FaEllipsisH
  size={18}
  style={{
    color: "#666",
    cursor: "pointer",
  }}
/>
          </div>
        ))}
      </div>

      {/* Center */}

      <div
        style={{
          background: darkMode ? "#1f1f1f" : "#fff",
          borderRadius: "15px",
          padding: "20px",
        }}
      >
        <div
  style={{
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "20px",
  }}
>
  <h2>Diagnosis History</h2>

  <select
    style={{
      padding: "8px 12px",
      borderRadius: "8px",
      border: "1px solid #ddd",
    }}
  >
    <option>Last 6 Months</option>
  </select>
</div>

<div
  style={{
    display: "flex",
    gap: "20px",
    alignItems: "flex-start",
  }}
>
    <div style={{ flex: 1 }}>
        <Line data={chartData} />
    </div>

    <div
      style={{
        width: "250px",
        paddingLeft: "10px",
      }}
    >

        <div
  style={{
    background: "#fff",
padding: "15px",
borderRadius: "15px",
boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
  }}
>
  <h3 style={{ marginBottom: "15px" }}>Summary</h3>

  <div style={{ marginBottom: "12px" }}>
    <strong style={{ display: "flex", alignItems: "center", gap: "6px" }}>
  <FaTint color="red" />
  Blood Pressure
</strong>
    <br />
    Systolic:
    {latestDiagnosis?.blood_pressure?.systolic?.value}
    {" "}
    ({latestDiagnosis?.blood_pressure?.systolic?.levels})
    <br />
    Diastolic:
    {latestDiagnosis?.blood_pressure?.diastolic?.value}
    {" "}
    ({latestDiagnosis?.blood_pressure?.diastolic?.levels})
  </div>

  <div style={{ marginBottom: "12px" }}>
    <strong style={{ display: "flex", alignItems: "center", gap: "6px" }}>
  <FaLungs color="skyblue" />
  Respiratory Rate
</strong>
    <br />
    {latestDiagnosis?.respiratory_rate?.value}
    {" "}
    ({latestDiagnosis?.respiratory_rate?.levels})
  </div>

  <div style={{ marginBottom: "12px" }}>
    <strong style={{ display: "flex", alignItems: "center", gap: "6px" }}>
  <FaThermometerHalf color="orange" />
  Temperature
</strong>
    <br />
    {latestDiagnosis?.temperature?.value}
    {" "}
    ({latestDiagnosis?.temperature?.levels})
  </div>

  <div>
    <strong style={{ display: "flex", alignItems: "center", gap: "6px" }}>
  <FaHeart color="crimson" />
  Heart Rate
</strong>
    <br />
    {latestDiagnosis?.heart_rate?.value}
    {" "}
    ({latestDiagnosis?.heart_rate?.levels})
  </div>
</div>

    </div>
</div>
    
     <div
  style={{
    display: "flex",
    justifyContent: "space-between",
    gap: "15px",
    marginTop: "20px",
    marginBottom: "20px",
  }}
>
  <div
    style={{
      flex: 1,
      background: "#E0F7FA",
      padding: "15px",
      borderRadius: "12px",
      textAlign: "center",
    }}
  >
    <h4>Respiratory Rate</h4>
    <h2>{latestDiagnosis?.respiratory_rate?.value}</h2>
    <p>{latestDiagnosis?.respiratory_rate?.levels}</p>
  </div>

  <div
    style={{
      flex: 1,
      background: "#FFE0B2",
      padding: "15px",
      borderRadius: "12px",
      textAlign: "center",
    }}
  >
    <h4>Temperature</h4>
    <h2>{latestDiagnosis?.temperature?.value}</h2>
    <p>{latestDiagnosis?.temperature?.levels}</p>
  </div>

  <div
    style={{
      flex: 1,
      background: "#F8BBD0",
      padding: "15px",
      borderRadius: "12px",
      textAlign: "center",
    }}
  >
    <h4>Heart Rate</h4>
    <h2>{latestDiagnosis?.heart_rate?.value}</h2>
    <p>{latestDiagnosis?.heart_rate?.levels}</p>
  </div>
</div>

        <table
  style={{
    width: "100%",
    marginTop: "30px",
    borderCollapse: "collapse",
  }}
>
  <thead>
    <tr style={{ background: "#f3f3f3" }}>
      <th style={{ padding: "10px" }}>Problem</th>
      <th style={{ padding: "10px" }}>Description</th>
      <th style={{ padding: "10px" }}>Status</th>
    </tr>
  </thead>

  <tbody>
    {selectedPatient?.diagnostic_list?.map((item, index) => (
      <tr key={index}>
        <td style={{ padding: "10px" }}>{item.name}</td>
        <td>{item.description}</td>
        <td>{item.status}</td>
      </tr>
    ))}
  </tbody>
</table>
      </div>

      {/* Right */}

      <div
        style={{
          background: darkMode ? "#1f1f1f" : "#fff",
          borderRadius: "15px",
          padding: "20px",
        }}
      >
        <h2>Patient Details</h2>

        {selectedPatient && (
          <>
            <img
              src={selectedPatient.profile_picture}
              alt=""
              width="180"
              style={{
                display: "block",
                margin: "20px auto",
                borderRadius: "50%",
              }}
            />

            <h2 style={{ textAlign: "center" }}>
              {selectedPatient.name}
            </h2>

            <p>
              <b>Age:</b> {selectedPatient.age}
            </p>

            <p>
              <b>Gender:</b> {selectedPatient.gender}
            </p>

            <p>
              <b>Phone:</b> {selectedPatient.phone_number}
            </p>

            <p>
              <b>Emergency:</b> {selectedPatient.emergency_contact}
            </p>

            <p>
              <b>Insurance:</b> {selectedPatient.insurance_type}
            </p>
            <p>
  <b>Date of Birth:</b> {selectedPatient.date_of_birth}
</p>

            <h3 style={{ marginTop: "30px" }}>Lab Results</h3>

<ul>
  {selectedPatient?.lab_results?.map((item, index) => (
    <li key={index} style={{ marginBottom: "8px" }}>
      {item}
    </li>
  ))}
</ul>
          </>
        )}
      </div>
        </div>
  </>
);
}

export default Dashboard;