const baseUrl =
  process.env.NODE_ENV === "production"
    ? "https://api.purevibes.mindhackers.org"
    : "http://localhost:3001";

function checkResponse(res) {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Error: ${res.status}, ${error.message}`);
}

export const getArtistSuggestions = (query) => {
  const q = (query || "").trim();

  // guard clause: don’t hit backend for tiny input
  if (q.length < 3) {
    return Promise.resolve([]);
  }

  const url = new URL(`${baseUrl}/api/suggestions/artists`);
  url.searchParams.append("query", q);

  return fetch(url.toString()).then(checkResponse);
};

export const getEvents = ({ artist, genre, stateCode, startDate, endDate }) => {
  const url = new URL(`${baseUrl}/api/events`);

  url.searchParams.append("artist", artist || "");
  url.searchParams.append("genre", genre || "");
  url.searchParams.append("stateCode", stateCode || "");
  url.searchParams.append("startDate", startDate || "");
  url.searchParams.append("endDate", endDate || "");

  console.log("Fetching events from:", url.toString());

  return fetch(url.toString()).then(checkResponse);
};

export const filterEventsData = (data) => {
  if (!data || !data._embedded || !data._embedded.events) {
    return [];
  }

  return data._embedded.events.map((event) => ({
    eventId: event.id,
    name: event.name,
    startDateTime: event.dates?.start?.dateTime || "N/A",
    endDateTime: event.dates?.end?.dateTime || "N/A",
    stateCode: event._embedded?.venues[0]?.state?.stateCode || "N/A",
    venue: event._embedded?.venues[0]?.name || "N/A",
    url: event.url,
    genre: event.classifications?.[0]?.genre?.name || "N/A",
    image: event.images?.[0]?.url || "https://via.placeholder.com/150",
  }));
};
