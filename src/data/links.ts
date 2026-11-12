const whatsapp = 'https://wa.me/2348164353633';
const bookingMessage = 'Hello OSEC, I would like to book an appointment. Please assist me with the available dates and next steps. Thank you.';

export const OSEC_LINKS = {
  whatsapp,
  whatsappBooking: whatsapp + '?text=' + encodeURIComponent(bookingMessage),
  instagram: 'https://www.instagram.com/osecmedicals?stkn=cnk4dDBtdTAxajVm&utm_source=qr',
  physicianLinkedIn: 'https://www.linkedin.com/in/dr-taiwo-onabanjo-a190b32a/',
} as const;

export function getServiceBookingUrl(serviceName: string) {
  const message = `Hello OSEC, I would like to book a ${serviceName}. Please assist me with the available dates and next steps. Thank you.`;
  return `${whatsapp}?text=${encodeURIComponent(message)}`;
}

/** Open a draft conversation; sending remains the user's action in WhatsApp. */
export function openWhatsAppBooking() {
  void import('../lib/analytics').then(({ trackEvent }) => {
    trackEvent('book_appointment');
    trackEvent('whatsapp_click');
  });
  window.open(OSEC_LINKS.whatsappBooking, '_blank', 'noopener,noreferrer');
}
