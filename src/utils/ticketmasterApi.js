function checkResponse(res) {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Error: ${res.status}, ${error.message}`);
}

export const getEvents = ({ artist, genre, city, startDate, endDate }) => {
  const url = new URL("https://35.190.152.185:3002/api/events");

  // Add query parameters dynamically
  if (artist) url.searchParams.append("artist", artist);
  if (genre) url.searchParams.append("genre", genre);
  if (city) url.searchParams.append("city", city);
  if (startDate) url.searchParams.append("startDate", `${startDate}T00:00:00Z`); // Format for Ticketmaster API
  if (endDate) url.searchParams.append("endDate", `${endDate}T23:59:59Z`); // Format for Ticketmaster API

  return fetch(url.toString()).then(checkResponse);
};

export const filterEventsData = (data) => {
  // Ensure the data has events
  if (!data || !data._embedded || !data._embedded.events) {
    return [];
  }

  // Map the events to extract the desired fields
  return data._embedded.events.map((event) => ({
    id: event.id,
    name: event.name,
    startDateTime: event.dates?.start?.dateTime || "N/A",
    endDateTime: event.dates?.end?.dateTime || "N/A",
    city: event._embedded?.venues[0]?.city?.name || "N/A",
    venue: event._embedded?.venues[0]?.name || "N/A",
    url: event.url,
    genre: event.classifications?.[0]?.genre?.name || "N/A",
    image: event.images?.[0]?.url || "https://via.placeholder.com/150", // Default image if none provided
  }));
};
