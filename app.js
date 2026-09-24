(() => {
  'use strict';

  const workerUrl = 'https://mgt3745-hw4.rishia10.workers.dev';

  const availabilityForm = document.querySelector('#availability-form');
  const dateInput = document.querySelector('#date-input');
  const startTimeInput = document.querySelector('#start-time-input');
  const endTimeInput = document.querySelector('#end-time-input');
  const reasonInput = document.querySelector('#reason-input');
  const availabilityList = document.querySelector('#availability-list');
  const formError = document.querySelector('#form-error');
  const saveStatus = document.querySelector('#save-status');
  const emptyState = document.querySelector('#empty-state');

  const simulateFailedSave = new URLSearchParams(window.location.search).has('failSave');

  let availabilityEntries = [];

  async function loadAvailability() {
  try {
    const response = await fetch(`${workerUrl}/entries`);

    if (!response.ok) {
      throw new Error(`Server returned ${response.status}`);
    }

    const entries = await response.json();

    if (!Array.isArray(entries)) {
      throw new Error('Unexpected server data');
    }

    availabilityEntries = entries;
    renderAvailability();
  } catch {
    availabilityEntries = [];
    renderAvailability();
    saveStatus.textContent =
      'Could not load saved availability. Try again when the server is available.';
  }
}

  async function saveAvailability(entry) {
  try {
    if (simulateFailedSave) {
      throw new Error('Simulated network failure');
    }

    const response = await fetch(`${workerUrl}/entries`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(entry)
    });

    if (!response.ok) {
      const message = await response.text();
      throw new Error(message || `Server returned ${response.status}`);
    }

    return true;
  } catch {
    formError.textContent =
      'Could not save. Your information is still here. Try again when the server is available.';
    saveStatus.textContent = '';
    return false;
  }
}

  function renderAvailability() {
    availabilityList.replaceChildren();
    emptyState.hidden = availabilityEntries.length > 0;

    availabilityEntries.forEach(entry => {
      const listItem = document.createElement('li');

      const dateText = document.createElement('strong');
      dateText.textContent = entry.date;

      const timeText = document.createElement('span');
      timeText.textContent = ` — ${entry.startTime} to ${entry.endTime}`;

      listItem.append(dateText, timeText);

      if (entry.reason) {
        const reasonText = document.createElement('span');
        reasonText.textContent = ` — ${entry.reason}`;
        listItem.append(reasonText);
      }

      availabilityList.append(listItem);
    });
  }

  availabilityForm.addEventListener('submit', async event => {
    event.preventDefault();

    const date = dateInput.value;
    const startTime = startTimeInput.value;
    const endTime = endTimeInput.value;
    const reason = reasonInput.value.trim();

    formError.textContent = '';
    saveStatus.textContent = '';

    if (!date || !startTime || !endTime) {
      formError.textContent = 'Enter a date, start time, and end time.';
      return;
    }

    if (endTime <= startTime) {
      formError.textContent = 'End time must be later than start time.';
      return;
    }

    const nextEntry = {
      date,
      startTime,
      endTime,
      reason
    };

    const saved = await saveAvailability(nextEntry);

    if (!saved) {
      return;
    }

    availabilityEntries = [...availabilityEntries, nextEntry];
    renderAvailability();

    availabilityForm.reset();
    dateInput.focus();
    saveStatus.textContent = 'Availability saved.';
  });

  loadAvailability();
})();
