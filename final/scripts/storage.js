// storage.js

export function saveLastViewed(id) {
  localStorage.setItem("lastViewedItem", id);
}

export function getLastViewed() {
  return localStorage.getItem("lastViewedItem");
}
