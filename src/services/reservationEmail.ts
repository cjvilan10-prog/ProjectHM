import { ReservationSubmission } from '../types/resort';
import { RESORT_INFO } from '../data/resortData';

/**
 * Builds the pre-formatted inquiry text body for email dispatch
 */
export function buildReservationEmailBody(submission: ReservationSubmission): string {
  return `Dear Bikini Valley Resort Reservations Team,

I would like to submit a formal reservation inquiry for a stay at Bikini Valley Resort. Below are my inquiry details:

==========================================
RESERVATION INQUIRY SUMMARY
==========================================
Reference ID: #${submission.referenceNumber}
Room Selected: ${submission.roomName}
Guest Full Name: ${submission.fullName}
Contact Phone: ${submission.contactNumber}
Email Address: ${submission.email}

Check-in Date: ${submission.checkIn} (Standard check-in: ${RESORT_INFO.hours.checkIn})
Check-out Date: ${submission.checkOut} (Standard check-out: ${RESORT_INFO.hours.checkOut})
Stay Duration: ${submission.totalNights} night(s)
Number of Guests: ${submission.guestCount} guest(s)
Estimated Total: ₱${submission.estimatedTotalPHP.toLocaleString()} PHP (Sample rate)

Special Requests / Notes:
${submission.specialRequests?.trim() ? submission.specialRequests : 'None specified.'}

==========================================
Please let me know if this room is available on my requested dates and the steps required to finalize confirmation.

Thank you very much!

Warm regards,
${submission.fullName}
${submission.contactNumber}
${submission.email}`;
}

/**
 * Standard mailto: URI - opens the visitor's default installed email client (Apple Mail, Outlook, Thunderbird, mobile Mail app)
 */
export function generateReservationMailto(submission: ReservationSubmission): string {
  const subject = encodeURIComponent(
    `[Resort Inquiry #${submission.referenceNumber}] - ${submission.fullName} (${submission.roomName})`
  );
  const body = encodeURIComponent(buildReservationEmailBody(submission));
  return `mailto:${RESORT_INFO.contact.email}?subject=${subject}&body=${body}`;
}

/**
 * Webmail direct compose URLs (convenient when visitors don't have a desktop email client configured)
 */
export function generateWebmailLinks(submission: ReservationSubmission) {
  const subject = encodeURIComponent(
    `[Resort Inquiry #${submission.referenceNumber}] - ${submission.fullName} (${submission.roomName})`
  );
  const body = encodeURIComponent(buildReservationEmailBody(submission));

  return {
    gmail: `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(
      RESORT_INFO.contact.email
    )}&su=${subject}&body=${body}`,
    outlook: `https://outlook.live.com/mail/0/deeplink/compose?to=${encodeURIComponent(
      RESORT_INFO.contact.email
    )}&subject=${subject}&body=${body}`,
    yahoo: `https://compose.mail.yahoo.com/?to=${encodeURIComponent(
      RESORT_INFO.contact.email
    )}&subj=${subject}&body=${body}`,
  };
}

/**
 * Generates an iCalendar (.ics) file content string for 100% offline, zero-API calendar export
 */
export function generateICSContent(submission: ReservationSubmission): string {
  // Format YYYY-MM-DD to YYYYMMDD
  const formatDateICS = (d: string) => d.replace(/-/g, '');
  const startDate = formatDateICS(submission.checkIn);
  const endDate = formatDateICS(submission.checkOut);

  return [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Bikini Valley Resort//Reservation Inquiry//EN',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
    'BEGIN:VEVENT',
    `UID:bvr-${submission.referenceNumber}-${Date.now()}@bikinivalley.local`,
    `DTSTAMP:${formatDateICS(new Date().toISOString().split('T')[0])}T000000Z`,
    `DTSTART;VALUE=DATE:${startDate}`,
    `DTEND;VALUE=DATE:${endDate}`,
    `SUMMARY:Stay at Bikini Valley Resort (${submission.roomName})`,
    `LOCATION:${RESORT_INFO.name}, ${RESORT_INFO.location.fullAddress}`,
    `DESCRIPTION:Reservation Inquiry #${submission.referenceNumber}\\nRoom: ${submission.roomName}\\nGuests: ${submission.guestCount}\\nEst. Cost: PHP ${submission.estimatedTotalPHP}\\nContact: ${RESORT_INFO.contact.phoneFormatted} | ${RESORT_INFO.contact.email}`,
    'STATUS:CONFIRMED',
    'END:VEVENT',
    'END:VCALENDAR',
  ].join('\r\n');
}

/**
 * Downloads the .ics calendar file directly in the browser
 */
export function downloadCalendarEvent(submission: ReservationSubmission) {
  const icsData = generateICSContent(submission);
  const blob = new Blob([icsData], { type: 'text/calendar;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', `BikiniValley-Stay-${submission.referenceNumber}.ics`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

/**
 * LocalStorage inquiry manager for free front-end persistence
 */
const STORAGE_KEY = 'bvr_inquiries_log';

export function saveInquiryToLocal(submission: ReservationSubmission) {
  try {
    const existing = getStoredInquiries();
    const updated = [submission, ...existing.filter((i) => i.referenceNumber !== submission.referenceNumber)];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated.slice(0, 50)));
  } catch (e) {
    console.warn('LocalStorage error:', e);
  }
}

export function getStoredInquiries(): ReservationSubmission[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    return [];
  }
}

export function exportInquiriesCSV() {
  const inquiries = getStoredInquiries();
  if (!inquiries.length) {
    alert('No inquiries saved yet. Submit a reservation form first.');
    return;
  }

  const headers = ['Reference', 'Date Submitted', 'Guest Name', 'Email', 'Phone', 'Room', 'Check-In', 'Check-Out', 'Nights', 'Guests', 'Estimated PHP', 'Special Requests'];
  const rows = inquiries.map((i) => [
    i.referenceNumber,
    `"${i.submittedAt}"`,
    `"${i.fullName.replace(/"/g, '""')}"`,
    `"${i.email}"`,
    `"${i.contactNumber}"`,
    `"${i.roomName}"`,
    i.checkIn,
    i.checkOut,
    i.totalNights,
    i.guestCount,
    i.estimatedTotalPHP,
    `"${(i.specialRequests || '').replace(/"/g, '""')}"`,
  ]);

  const csvContent = [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', `Bikini-Valley-Inquiries-${new Date().toISOString().split('T')[0]}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
