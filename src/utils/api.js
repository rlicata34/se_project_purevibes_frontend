import { savedEvents } from "./config";

export function getBookmarkedEvents() {
  return new Promise((resolve, reject) => resolve(savedEvents));
}

export function bookmarkEvent(event) {
  return new Promise((resolve, reject) => {
    const { _id, city, endDateTime, startDateTime, genre, name, image, url } =
      event;
    resolve({
      _id,
      city,
      endDateTime,
      startDateTime,
      genre,
      name,
      image,
      url,
    });
  });
}

export function removeBookmarkEvent(eventId) {
  return new Promise((resolve, reject) => {});
}
