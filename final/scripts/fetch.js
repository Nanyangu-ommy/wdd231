// fetch.js
// Handles fetching JSON data

export async function loadDementiaData() {
  try {
    const response = await fetch("../data/dementia.json");

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;

  } catch (error) {
    console.error("Error loading dementia JSON data:", error);
    return [];
  }
}
