import React, { useState, useEffect } from "react";
import "./styles.css";

import Noty from "noty";
import "noty/lib/noty.css"; // Default CSS
import "noty/lib/themes/sunset.css";

function Active_Recipients(props) {
  const [matchFoundRecipients, setMatchFoundRecipients] = useState([]);

  useEffect(() => {
    const fetchRecipientData = async () => {
      try {
        // Fetch recipient data from the backend API
        const response = await fetch(`${process.env.REACT_APP_API_URL}/api/recipients`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();

        // Assuming the response returns an array of recipients
        const matchFoundRecipientsData = data
          .map((recipient) => ({
            recipientAddress: recipient.recipient_addr,
            organ: recipient.organ,
            bloodgroup: recipient.bloodgroup,
            matchFound: recipient.matchFound
          }));

        setMatchFoundRecipients(matchFoundRecipientsData);
      } catch (error) {
        new Noty({
          theme: 'sunset',
          text: error.message,
          type: "error", // 'alert', 'success', 'error', 'warning', 'info'
          layout: "topRight", // Position on the screen
          timeout: 2000,
        }).show();
        console.error("Error fetching recipient data:", error);
      }
    };

    fetchRecipientData();
  }, []);

  return (
    <div className="section">
      <h2>Active Recipients</h2>
      <table>
        <thead>
          <tr>
            <th>Recipient Address</th>
            <th>Organ</th>
            <th>Blood Group</th>
            <th>Match Found</th>
          </tr>
        </thead>
        <tbody>
          {matchFoundRecipients.length > 0 ? (
            matchFoundRecipients.map((recipient, index) => (
              <tr key={index}>
                <td data-label="Recipient Address">
                  <div className="scrollable-text">{recipient.recipientAddress}</div>
                </td>
                <td data-label="Organ">{recipient.organ}</td>
                <td data-label="Bloodgroup">{recipient.bloodgroup}</td>
                <td data-label="MatchFound">{recipient.matchFound ? "Yes" : "No"}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4">No recipients with match found false</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default Active_Recipients;
