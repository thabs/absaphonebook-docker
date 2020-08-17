import React, { useState, useContext, useEffect } from "react";
import { useHistory } from "react-router-dom";
import MaterialTable from "material-table";
//! Context
import { Context as DashboardContext } from "./state/DashboardContext";

const Dashboard = () => {
  //! Context
  const { state, fetchProfiles, updateProfile, deleteProfile } = useContext(
    DashboardContext
  );
  const { loading, error, profiles } = state;
  //! State
  const [table] = useState([
    { title: "First name", field: "firstName" },
    { title: "Last name", field: "lastName" },
    { title: "Email", field: "email" },
    { title: "Mobile", field: "mobileNum" },
    { title: "Create", field: "createdAt" },
    { title: "Update", field: "updatedAt" },
  ]);

  useEffect(() => {
    fetchProfiles();
  }, []);

  return (
    <MaterialTable
      title="Phonebook"
      columns={table}
      data={profiles.length ? profiles : []}
      editable={{
        onRowUpdate: (newData, oldData) =>
          new Promise((resolve, reject) => {
            updateProfile(oldData._id, newData);
            resolve();
          }),
        onRowDelete: (oldData) =>
          new Promise((resolve, reject) => {
            deleteProfile(oldData._id);
            resolve();
          }),
      }}
    />
  );
};

export default Dashboard;
