// src/EventListing.js
import React, { useState, useEffect } from "react";
import { Container, Card, Button } from "@material-ui/core";
const API_ENDPOINT = "https://example.com/api/events";

const Event = () => {
  const [events, setEvents] = useState({
    today: [],
    thisWeek: [],
    upcoming: [],
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(API_ENDPOINT);
        const eventData = await response.json();

        const today = [];
        const thisWeek = [];
        const upcoming = [];

        const currentDate = new Date();

        eventData.events.forEach((event) => {
          const eventDate = new Date(event.date);

          if (eventDate.toDateString() === currentDate.toDateString()) {
            today.push(event);
          } else if (
            eventDate > currentDate &&
            eventDate <=
              new Date(currentDate.getTime() + 7 * 24 * 60 * 60 * 1000)
          ) {
            thisWeek.push(event);
          } else if (eventDate > currentDate) {
            upcoming.push(event);
          }
        });

        setEvents({ today, thisWeek, upcoming });
      } catch (error) {
        console.error("Error fetching event data:", error);
      }
    };

    fetchData();
  }, []);
  const renderEventCards = (eventList) => {
    return eventList.map((event) => (
      <Card
        key={event.id}
        style={{
          margin: "8px",
          padding: "16px",
          minWidth: "200px",
          backgroundColor: "#E1F5FE",
        }}
      >
        <h3>{event.name}</h3>
        <p>Date and Time: {new Date(event.date).toLocaleString()}</p>
        <p>Location: {event.location}</p>
        <p>Description: {event.description}</p>
        <Button
          variant="contained"
          color="primary"
          onClick={() => handleEventDetails(event.id)}
        >
          View Details
        </Button>
      </Card>
    ));
  };

  const handleEventDetails = (eventId) => {
    console.log(`Navigate to event details page for event ID: ${eventId}`);
  };

  return (
    <Container style={{ display: "flex", flexDirection: "row", gap: "2rem" }}>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "1rem",
        }}
      >
        <h2>Today</h2>
        <div
          style={{
            display: "flex",
            overflowX: "auto",
            flexDirection: "column",
            gap: "2rem",
          }}
        >
          {renderEventCards(events.today)}
        </div>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",

          alignItems: "center",
          gap: "1rem",
        }}
      >
        <h2>This Week</h2>
        <div
          style={{
            display: "flex",
            overflowX: "auto",
            flexDirection: "column",
            gap: "2rem",
          }}
        >
          {renderEventCards(events.thisWeek)}
        </div>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "1rem",
        }}
      >
        <h2>Upcoming</h2>
        <div
          style={{
            display: "flex",
            overflowX: "auto",
            flexDirection: "column",
            gap: "2rem",
          }}
        >
          {renderEventCards(events.upcoming)}
        </div>
      </div>
    </Container>
  );
};

export default Event;
