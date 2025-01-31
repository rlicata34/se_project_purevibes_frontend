const baseUrl =
  process.env.NODE_ENV === "production"
    ? "https://api.purevibes.mindhackers.org" // Production VM URL
    : "http://localhost:3001"; // Local development URL

function checkResponse(res) {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Error: ${res.status}, ${error.message}`);
}

export const getEvents = ({ artist, genre, city, startDate, endDate }) => {
  const url = new URL(`${baseUrl}/api/events`);

  // Add query parameters dynamically
  url.searchParams.append("artist", artist || "");
  url.searchParams.append("genre", genre || "");
  url.searchParams.append("city", city || "");
  url.searchParams.append("startDate", startDate || "");
  url.searchParams.append("endDate", endDate || "");

  return fetch(url.toString()).then(checkResponse);
};

export const filterEventsData = (data) => {
  // Ensure the data has events
  if (!data || !data._embedded || !data._embedded.events) {
    return [];
  }

  // Map the events to extract the desired fields
  return data._embedded.events.map((event) => ({
    _id: event.id,
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
