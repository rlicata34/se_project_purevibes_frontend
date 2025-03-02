import { request, checkResponse, baseUrl } from "./auth";

export function getBookmarkedEvents(token) {
  return request(`${baseUrl}/events`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}

export function bookmarkEvent(eventId, token) {
  return request(`${baseUrl}/events/${eventId}/bookmarks`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  }).then((data) => {
    console.log("Event bookmark response:", data);
    return data;
  });
}

export function removeBookmark(eventId, token) {
  return request(`${baseUrl}/events/${eventId}/bookmarks`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  }).then((data) => {
    console.log("Event remove bookmark response:", data);
    return data;
  });
}

export function addEvent(
  image,
  name,
  startDateTime,
  venue,
  url,
  eventId,
  token
) {
  return request(`${baseUrl}/events`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      image: image,
      name: name,
      startDateTime: startDateTime,
      venue: venue,
      url: url,
      eventId: eventId,
    }),
  });
}

export function removeEvent(eventId, token) {
  return request(`${baseUrl}/events/${eventId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
}
