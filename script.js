const toggleButton = document.querySelector('.nav-toggle');
const mobileNav = document.querySelector('.mobile-nav');

const openBookingButton = document.querySelector('#open-booking');
const bookingModal = document.querySelector('#booking-modal');
const closeBookingButton = document.querySelector('#close-booking');
const bookingDateInput = document.querySelector('#booking-date');
const bookingTimeSelect = document.querySelector('#booking-time');
const bookingHelper = document.querySelector('#booking-helper');
const bookingForm = document.querySelector('.booking-form');

if (toggleButton && mobileNav) {
  toggleButton.addEventListener('click', () => {
    const isOpen = mobileNav.classList.toggle('is-open');
    toggleButton.setAttribute('aria-expanded', String(isOpen));
  });
}

const setBookingModalOpen = (isOpen) => {
  if (!bookingModal) return;
  bookingModal.classList.toggle('is-open', isOpen);
  bookingModal.setAttribute('aria-hidden', String(!isOpen));
  document.body.style.overflow = isOpen ? 'hidden' : '';
};

const buildTimeOptions = () => {
  if (!bookingTimeSelect) return;
  bookingTimeSelect.innerHTML = '';
  const startMinutes = 9 * 60;
  const endMinutes = 16 * 60 + 30;
  for (let minutes = startMinutes; minutes <= endMinutes; minutes += 30) {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    const label = `${String(hours).padStart(2, '0')}:${String(mins).padStart(2, '0')}`;
    const option = document.createElement('option');
    option.value = label;
    option.textContent = label;
    bookingTimeSelect.appendChild(option);
  }
};

const isWeekday = (dateString) => {
  if (!dateString) return false;
  const date = new Date(`${dateString}T00:00:00`);
  const day = date.getDay();
  return day >= 1 && day <= 5;
};

const updateDateValidity = () => {
  if (!bookingDateInput) return;
  if (!isWeekday(bookingDateInput.value)) {
    bookingDateInput.setCustomValidity('Please choose a weekday.');
    if (bookingHelper) {
      bookingHelper.textContent = 'Please select a Monday–Friday date.';
    }
  } else {
    bookingDateInput.setCustomValidity('');
    if (bookingHelper) {
      bookingHelper.textContent = 'Weekend dates are not available.';
    }
  }
};

if (openBookingButton && bookingModal) {
  openBookingButton.addEventListener('click', () => {
    setBookingModalOpen(true);
  });
}

if (closeBookingButton) {
  closeBookingButton.addEventListener('click', () => {
    setBookingModalOpen(false);
  });
}

if (bookingModal) {
  bookingModal.addEventListener('click', (event) => {
    if (event.target === bookingModal) {
      setBookingModalOpen(false);
    }
  });
}

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') {
    setBookingModalOpen(false);
  }
});

if (bookingDateInput) {
  const today = new Date();
  const yyyy = today.getFullYear();
  const mm = String(today.getMonth() + 1).padStart(2, '0');
  const dd = String(today.getDate()).padStart(2, '0');
  bookingDateInput.min = `${yyyy}-${mm}-${dd}`;
  bookingDateInput.addEventListener('change', updateDateValidity);
  bookingDateInput.addEventListener('blur', updateDateValidity);
}

if (bookingTimeSelect) {
  buildTimeOptions();
}

if (bookingForm) {
  bookingForm.addEventListener('submit', (event) => {
    updateDateValidity();
    if (bookingDateInput && !bookingDateInput.checkValidity()) {
      event.preventDefault();
      bookingDateInput.reportValidity();
      return;
    }
    event.preventDefault();
    if (bookingHelper) {
      bookingHelper.textContent = 'Thanks! We will confirm your appointment shortly.';
    }
  });
}
