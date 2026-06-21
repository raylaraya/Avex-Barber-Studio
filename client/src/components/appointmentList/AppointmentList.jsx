import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../../context/AuthContext";

const AppointmentList = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const apiUrl = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const fetchAppointments = async () => {
      if (!user) return;

      try {
        setLoading(true);
        const response = await axios.get(`${apiUrl}/appointments`, {
          withCredentials: true,
        });
        setAppointments(response.data);
      } catch (err) {
        console.error("Error fetching appointments:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchAppointments();
  }, [user, apiUrl]);

  if (loading) return <div className="Loading">Loading appointments...</div>;

  return (
    <div>
      <pre>{JSON.stringify(appointments, null, 2)}</pre>
    </div>
  );
};

export default AppointmentList;
