/**
 * Fetch UK bank holidays data using promise
 * @returns {Promise} Promise object representing the UK bank holidays data
 */
const fetchBankHolidays = () => {
  return new Promise((resolve, reject) => {
    fetch("https://www.gov.uk/bank-holidays.json")
      .then((response) => {
        if (!response.ok) {
          reject("Failed to fetch UK bank holidays");
        }
        return response.json();
      })
      .then((data) => {
        // Log the data to check the structure
        console.log("API Response:", data);
        // Assuming we are interested in the "england-and-wales" region
        if (data["england-and-wales"] && data["england-and-wales"].events) {
          resolve(data["england-and-wales"].events);
        } else {
          reject("No events found in the response");
        }
      })
      .catch((error) => {
        reject(error.message);
      });
  });
};

/**
 * Display UK bank holidays on the webpage
 * @param {Array} holidays - Array of holiday objects
 */
const displayBankHolidays = (holidays) => {
  const holidaysContainer = document.getElementById("holidaysContainer");
  holidaysContainer.innerHTML = "";

  holidays.forEach((holiday) => {
    const card = document.createElement("div");
    card.classList.add("col-md-4");

    const cardContent = `
            <div class="card">
                <div class="card-body">
                    <h5 class="card-title">${holiday.title}</h5>
                    <p class="card-text"><strong>Date:</strong> ${
                      holiday.date
                    }</p>
                    <p class="card-text"><strong>Notes:</strong> ${
                      holiday.notes || "N/A"
                    }</p>
                </div>
            </div>
        `;

    card.innerHTML = cardContent;
    holidaysContainer.appendChild(card);
  });
};

// Handle bank holidays retrieval and display
document.addEventListener("DOMContentLoaded", () => {
  fetchBankHolidays()
    .then((holidays) => {
      displayBankHolidays(holidays);
    })
    .catch((error) => {
      console.error("Error:", error);
      const holidaysContainer = document.getElementById("holidaysContainer");
      holidaysContainer.innerHTML = `<div class="alert alert-danger">${error}</div>`;
    });
});
