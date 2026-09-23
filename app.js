(() => {
  'use strict';

  const storageKey = 'mgt3745.availability.v1';

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

  let availabilityEntries = loadAvailability();

  function loadAvailability() {
    try {
      const storedText = window.localStorage.getItem(storageKey);
      const parsed = storedText === null ? [] : JSON.parse(storedText);

      if (!Array.isArray(parsed)) {
        throw new Error('Unexpected stored data');
      }

      return parsed;
    } catch {
      saveStatus.textContent =
        'Saved availability could not be read. Original storage was left unchanged.';
      return [];
    }
  }

  function saveAvailability(nextEntries) {
    try {
      if (simulateFailedSave) {
        throw new Error('Simulated write failure');
      }

      window.localStorage.setItem(storageKey, JSON.stringify(nextEntries));
      return true;
    } catch {
      formError.textContent =
        'Could not save. Your information is still here. Try again when storage is available.';
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

  availabilityForm.addEventListener('submit', event => {
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

    const nextEntries = [...availabilityEntries, nextEntry];

    if (!saveAvailability(nextEntries)) {
      return;
    }

    availabilityEntries = nextEntries;
    renderAvailability();

    availabilityForm.reset();
    dateInput.focus();
    saveStatus.textContent = 'Availability saved in this browser.';
  });

  renderAvailability();
})();
