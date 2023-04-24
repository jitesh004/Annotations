import React, { useState } from "react";
import ReactDOM from "react-dom";

const style = {
  table: {
    borderCollapse: "collapse",
  },
  tableCell: {
    border: "1px solid gray",
    margin: 0,
    padding: "5px 10px",
    width: "max-content",
    minWidth: "150px",
  },
  form: {
    container: {
      padding: "20px",
      border: "1px solid #F0F8FF",
      borderRadius: "15px",
      width: "max-content",
      marginBottom: "40px",
    },
    inputs: {
      marginBottom: "5px",
    },
    submitBtn: {
      marginTop: "10px",
      padding: "10px 15px",
      border: "none",
      backgroundColor: "lightseagreen",
      fontSize: "14px",
      borderRadius: "5px",
      cursor: "pointer",
    },
  },
};

function PhoneBookForm(props) {
  const [firstName, setFirstName] = useState("Coder");
  const [lastName, setLastName] = useState("Byte");
  const [phone, setPhone] = useState("8885559999");

  return (
    <form style={style.form.container}>
      <label>First name:</label>
      <br />
      <input
        style={style.form.inputs}
        className="userFirstname"
        name="userFirstname"
        type="text"
        value={firstName}
        onChange={(e) => {
          setFirstName(e.target.value);
        }}
      />
      <br />
      <label>Last name:</label>
      <br />
      <input
        style={style.form.inputs}
        className="userLastname"
        name="userLastname"
        type="text"
        value={lastName}
        onChange={(e) => {
          setLastName(e.target.value);
        }}
      />
      <br />
      <label>Phone:</label>
      <br />
      <input
        style={style.form.inputs}
        className="userPhone"
        name="userPhone"
        type="text"
        value={phone}
        onChange={(e) => {
          setPhone(e.target.value);
        }}
      />
      <br />
      <input
        style={style.form.submitBtn}
        className="submitButton"
        type="button"
        value="Add User"
        onClick={() => props.addEntryToPhoneBook(firstName, lastName, phone)}
      />
    </form>
  );
}

function InformationTable(props) {
  const { infoArray } = props;
  return (
    <table style={style.table} className="informationTable">
      <thead>
        <tr>
          <th style={style.tableCell}>First name</th>
          <th style={style.tableCell}>Last name</th>
          <th style={style.tableCell}>Phone</th>
        </tr>
      </thead>
      <tbody>
        {infoArray.map((info) => (
          <tr key={info.firstName}>
            <th style={style.tableCell}>{info.firstName}</th>
            <th style={style.tableCell}>{info.lastName}</th>
            <th style={style.tableCell}>{info.phone}</th>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

function Application() {
  const [infoArray, setInfoArray] = useState([]);
  const addEntryToPhoneBook = (firstName, lastName, phone) => {
    setInfoArray((arr) => [...arr, { firstName, lastName, phone }]);
  };
  return (
    <section>
      <PhoneBookForm
        addEntryToPhoneBook={(firstName, lastName, phone) =>
          addEntryToPhoneBook(firstName, lastName, phone)
        }
      />
      <InformationTable infoArray={infoArray} />
    </section>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Application />
  </React.StrictMode>
);
