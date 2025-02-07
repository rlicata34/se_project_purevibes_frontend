import { savedEvents } from "./config";

export function getBookmarkedEvents() {
  return new Promise((resolve) => resolve(savedEvents));
}

export function bookmarkEvent(event) {
  return new Promise((resolve) => {
    resolve(event);
  });
}

export function removeBookmarkEvent(event) {
  return new Promise((resolve) => {
    resolve(event);
  });
}
