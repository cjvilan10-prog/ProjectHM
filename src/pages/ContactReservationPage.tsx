import React, { useState, useEffect } from 'react';
import { ReservationFormData, ReservationSubmission } from '../types/resort';
import { RESORT_INFO, ROOMS_DATA } from '../data/resortData';
import {
  generateReservationMailto,
  generateWebmailLinks,
  downloadCalendarEvent,
  saveInquiryToLocal,
  buildReservationEmailBody,
} from '../services/reservationEmail';
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  ExternalLink,
  CalendarCheck,
  Send,
  CheckCircle,
  AlertCircle,
  Copy,
  Check,
  Info,
  Calendar as CalendarIcon,
  Printer,
  Share2,
} from 'lucide-react';

interface ContactReservationPageProps {
  preselectedRoomId?: 'standard' | 'deluxe' | 'family';
  onOpenGuideModal: () => void;
}

export const ContactReservationPage: React.FC<ContactReservationPageProps> = ({
  preselectedRoomId,
  onOpenGuideModal,
}) => {
  const today = new Date().toISOString().split('T')[0];
  const tomorrow = new Date(Date.now() + 86400000).toISOString().split('T')[0];

  const [formData, setFormData] = useState<ReservationFormData>({
    fullName: '',
    email: '',
    contactNumber: '',
    roomType: preselectedRoomId || 'standard',
    checkIn: today,
    checkOut: tomorrow,
    guestCount: 2,
    specialRequests: '',
  });

  const [errors, setErrors] = useState<Partial<Record<keyof ReservationFormData, string>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionSuccess, setSubmissionSuccess] = useState<ReservationSubmission | null>(null);
  const [copiedLink, setCopiedLink] = useState(false);

  // Sync preselected room
  useEffect(() => {
    if (preselectedRoomId) {
      setFormData((prev) => ({
        ...prev,
        roomType: preselectedRoomId,
        guestCount: preselectedRoomId === 'family' ? 4 : preselectedRoomId === 'deluxe' ? 2 : 2,
      }));
    }
  }, [preselectedRoomId]);

  const selectedRoom = ROOMS_DATA.find((r) => r.id === formData.roomType) || ROOMS_DATA[0];

  const calculateNights = (inDate: string, outDate: string) => {
    if (!inDate || !outDate) return 1;
    const start = new Date(inDate).getTime();
    const end = new Date(outDate).getTime();
    const diff = Math.ceil((end - start) / (1000 * 60 * 60 * 24));
    return diff > 0 ? diff : 1;
  };

  const currentNights = calculateNights(formData.checkIn, formData.checkOut);
  const estimatedCost = currentNights * selectedRoom.pricePHP;

  const validateForm = (): boolean => {
    const newErrors: Partial<Record<keyof ReservationFormData, string>> = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Please enter your full name.';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = 'Please enter your email address.';
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address (e.g., name@example.com).';
    }

    const phoneRegex = /^[0-9+()-\s]{7,15}$/;
    if (!formData.contactNumber.trim()) {
      newErrors.contactNumber = 'Please enter your contact phone number.';
    } else if (!phoneRegex.test(formData.contactNumber.trim())) {
      newErrors.contactNumber = 'Please enter a valid phone number (e.g. 09123456789).';
    }

    if (!formData.checkIn) {
      newErrors.checkIn = 'Check-in date is required.';
    }

    if (!formData.checkOut) {
      newErrors.checkOut = 'Check-out date is required.';
    } else if (formData.checkIn && formData.checkOut <= formData.checkIn) {
      newErrors.checkOut = 'Check-out date must be later than the check-in date.';
    }

    if (!formData.guestCount || formData.guestCount < 1) {
      newErrors.guestCount = 'At least 1 guest is required.';
    } else if (formData.guestCount > selectedRoom.capacity) {
      newErrors.guestCount = `Maximum capacity for ${selectedRoom.name} is ${selectedRoom.capacity} guests. Please choose a larger room if needed.`;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    const refNum = 'BVR-' + Math.floor(100000 + Math.random() * 900000);
    const submission: ReservationSubmission = {
      ...formData,
      referenceNumber: refNum,
      submittedAt: new Date().toLocaleString(),
      totalNights: currentNights,
      estimatedTotalPHP: estimatedCost,
      roomName: selectedRoom.name,
    };

    // Save to browser LocalStorage for zero-cost offline persistence
    saveInquiryToLocal(submission);

    setTimeout(() => {
      setSubmissionSuccess(submission);
      setIsSubmitting(false);

      // Automatically trigger the mailto to open the visitor's email client
      const mailtoUrl = generateReservationMailto(submission);
      window.location.href = mailtoUrl;

      // Scroll smoothly to the confirmation summary
      window.scrollTo({ top: 380, behavior: 'smooth' });
    }, 400);
  };

  const handleCopySummary = () => {
    if (!submissionSuccess) return;
    const body = buildReservationEmailBody(submissionSuccess);
    navigator.clipboard.writeText(body);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2500);
  };

  const webmail = submissionSuccess ? generateWebmailLinks(submissionSuccess) : null;

  return (
    <div className="space-y-16 pb-20">
      {/* PAGE BANNER */}
      <section className="bg-stone-900 text-white py-16 md:py-20 relative overflow-hidden">
        <div className="absolute inset-0 opacity-25">
          <img
            src="https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1920&q=80"
            alt="Bikini Valley Resort Front Desk & Concierge"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-800/80 text-teal-200 text-xs font-bold uppercase tracking-wider mb-4 border border-teal-700">
            <CalendarCheck className="w-3.5 h-3.5 text-amber-300" />
            Direct Front Desk Assistance
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-4">
            Contact & Reservation
          </h1>
          <p className="text-stone-300 text-sm sm:text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
            Have questions or planning your tropical stay? Reach out to our front desk team 24/7 or submit your booking inquiry below.
          </p>
        </div>
      </section>

      {/* CONTACT INFO CARDS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Card 1: Address */}
          <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-sm flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-xl bg-teal-50 text-teal-800 flex items-center justify-center mb-4">
                <MapPin className="w-5 h-5" />
              </div>
              <h3 className="font-serif text-base font-bold text-stone-900 mb-1">
                Resort Address
              </h3>
              <p className="text-xs text-stone-600 leading-relaxed">
                {RESORT_INFO.location.fullAddress}
              </p>
              <p className="text-[11px] text-teal-800 mt-1">
                Samara, Aringay &bull; Southern La Union
              </p>
            </div>
            <a
              href={RESORT_INFO.maps.directUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 pt-3 border-t border-stone-100 inline-flex items-center gap-1.5 text-xs font-semibold text-teal-800 hover:text-teal-950"
            >
              <span>Open in Google Maps</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>

          {/* Card 2: Phone */}
          <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-sm flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-800 flex items-center justify-center mb-4">
                <Phone className="w-5 h-5" />
              </div>
              <h3 className="font-serif text-base font-bold text-stone-900 mb-1">
                Direct Phone Call
              </h3>
              <p className="text-xs text-stone-600 leading-relaxed">
                24/7 Front Desk Hotline & Inquiries
              </p>
              <p className="text-sm font-bold text-stone-900 mt-2">
                {RESORT_INFO.contact.phoneFormatted}
              </p>
            </div>
            <a
              href={`tel:${RESORT_INFO.contact.phone}`}
              className="mt-4 pt-3 border-t border-stone-100 inline-flex items-center gap-1.5 text-xs font-semibold text-amber-800 hover:text-amber-950"
            >
              <span>Call Front Desk ({RESORT_INFO.contact.phone})</span>
            </a>
          </div>

          {/* Card 3: Email */}
          <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-sm flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-800 flex items-center justify-center mb-4">
                <Mail className="w-5 h-5" />
              </div>
              <h3 className="font-serif text-base font-bold text-stone-900 mb-1">
                Resort Email
              </h3>
              <p className="text-xs text-stone-600 leading-relaxed">
                Send inquiries, event RFPs & requests
              </p>
              <p className="text-xs font-bold text-stone-900 mt-2 break-all">
                {RESORT_INFO.contact.email}
              </p>
            </div>
            <a
              href={`mailto:${RESORT_INFO.contact.email}`}
              className="mt-4 pt-3 border-t border-stone-100 inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-800 hover:text-emerald-950"
            >
              <span>Compose Email Directly</span>
            </a>
          </div>

          {/* Card 4: Operating Hours */}
          <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-sm flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-800 flex items-center justify-center mb-4">
                <Clock className="w-5 h-5" />
              </div>
              <h3 className="font-serif text-base font-bold text-stone-900 mb-1">
                Business & Desk Hours
              </h3>
              <div className="space-y-1 text-xs text-stone-600">
                <p>
                  <strong>Front Desk:</strong> 24 Hours Open
                </p>
                <p>
                  <strong>Check-in:</strong> 2:00 PM
                </p>
                <p>
                  <strong>Check-out:</strong> 12:00 PM
                </p>
                <p>
                  <strong>Reservations:</strong> 8:00 AM – 8:00 PM
                </p>
              </div>
            </div>
            <div className="mt-4 pt-3 border-t border-stone-100 text-[11px] text-stone-500">
              Staff on duty 24/7 for guest safety
            </div>
          </div>
        </div>

        {/* Social Links Row */}
        <div className="mt-6 p-4 rounded-2xl bg-stone-100 border border-stone-200 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-xs text-stone-700">
            <Share2 className="w-4 h-4 text-teal-700" />
            <span>Connect on Official Social Channels:</span>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <a
              href={RESORT_INFO.contact.facebook}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white hover:bg-blue-50 text-blue-700 border border-stone-200 text-xs font-semibold shadow-sm transition-colors"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
              </svg>
              <span>Facebook Official</span>
            </a>

            <a
              href={RESORT_INFO.contact.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white hover:bg-pink-50 text-pink-700 border border-stone-200 text-xs font-semibold shadow-sm transition-colors"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
              </svg>
              <span>Instagram (@bikinivalley)</span>
            </a>
          </div>
        </div>
      </section>

      {/* RESERVATION FORM & SUBMISSION SUCCESS */}
      <section id="reservation-form-section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left Column: Form or Confirmation Summary */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-10 border border-stone-200 shadow-md">
            {submissionSuccess ? (
              /* SUBMISSION CONFIRMATION MESSAGE */
              <div className="space-y-6 animate-fadeIn">
                <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-serif text-lg font-bold text-emerald-950">
                      Inquiry Ready & Recorded!
                    </h3>
                    <p className="text-xs text-emerald-800 mt-1">
                      Your reservation request has been prepared and your email app has been opened with all details pre-filled to{' '}
                      <strong>{RESORT_INFO.contact.email}</strong>.
                    </p>
                  </div>
                </div>

                {/* Status Notice */}
                <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-xs text-amber-900">
                  <div className="flex items-center gap-2 font-bold mb-1">
                    <AlertCircle className="w-4 h-4 text-amber-700" />
                    <span>Inquiry / Reservation Request Notice</span>
                  </div>
                  <p>
                    Please note that this submission is an <strong>inquiry and reservation request</strong>. Final room reservation is confirmed once verified by our front desk. We will contact you at <strong>{submissionSuccess.contactNumber}</strong> or <strong>{submissionSuccess.email}</strong>.
                  </p>
                </div>

                {/* Summary Details Card */}
                <div className="bg-stone-50 rounded-2xl p-6 border border-stone-200 space-y-4 text-xs sm:text-sm">
                  <div className="flex items-center justify-between pb-3 border-b border-stone-200">
                    <span className="font-semibold text-stone-500">Inquiry Reference:</span>
                    <span className="font-mono font-bold text-teal-800 bg-teal-100/70 px-2.5 py-1 rounded-md">
                      #{submissionSuccess.referenceNumber}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <span className="text-stone-500 block">Guest Name:</span>
                      <strong className="text-stone-900">{submissionSuccess.fullName}</strong>
                    </div>
                    <div>
                      <span className="text-stone-500 block">Contact Phone:</span>
                      <strong className="text-stone-900">{submissionSuccess.contactNumber}</strong>
                    </div>
                    <div>
                      <span className="text-stone-500 block">Email Address:</span>
                      <strong className="text-stone-900 break-all">{submissionSuccess.email}</strong>
                    </div>
                    <div>
                      <span className="text-stone-500 block">Selected Room:</span>
                      <strong className="text-stone-900">{submissionSuccess.roomName}</strong>
                    </div>
                    <div>
                      <span className="text-stone-500 block">Check-in:</span>
                      <strong className="text-stone-900">
                        {submissionSuccess.checkIn} (From {RESORT_INFO.hours.checkIn})
                      </strong>
                    </div>
                    <div>
                      <span className="text-stone-500 block">Check-out:</span>
                      <strong className="text-stone-900">
                        {submissionSuccess.checkOut} (Until {RESORT_INFO.hours.checkOut})
                      </strong>
                    </div>
                    <div>
                      <span className="text-stone-500 block">Stay Duration:</span>
                      <strong className="text-stone-900">
                        {submissionSuccess.totalNights} Night(s) &bull; {submissionSuccess.guestCount} Guest(s)
                      </strong>
                    </div>
                    <div>
                      <span className="text-stone-500 block">Estimated Cost:</span>
                      <strong className="text-teal-800 font-serif text-base">
                        ₱{submissionSuccess.estimatedTotalPHP.toLocaleString()} PHP
                      </strong>
                      <span className="text-[10px] text-stone-500 block italic">
                        (Sample educational rate)
                      </span>
                    </div>
                  </div>

                  {submissionSuccess.specialRequests && (
                    <div className="pt-3 border-t border-stone-200">
                      <span className="text-stone-500 block">Special Requests:</span>
                      <p className="text-stone-800 italic mt-0.5">
                        "{submissionSuccess.specialRequests}"
                      </p>
                    </div>
                  )}
                </div>

                {/* Primary Free Dispatch Buttons */}
                <div className="space-y-3 pt-2">
                  <div className="text-xs font-bold uppercase tracking-wider text-stone-700">
                    Send Inquiry Options:
                  </div>

                  {/* Mailto launch button */}
                  <a
                    href={generateReservationMailto(submissionSuccess)}
                    className="w-full py-3.5 px-4 rounded-xl bg-teal-800 hover:bg-teal-900 text-white font-bold text-xs uppercase tracking-wider text-center shadow flex items-center justify-center gap-2 transition-colors"
                  >
                    <Mail className="w-4 h-4 text-amber-300" />
                    <span>Open in Default Email App (Mailto)</span>
                  </a>

                  {/* Direct Webmail Links (for browser-only users) */}
                  {webmail && (
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <a
                        href={webmail.gmail}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="py-2.5 px-3 rounded-lg border border-stone-200 bg-white hover:bg-stone-50 text-stone-800 font-semibold flex items-center justify-center gap-2 shadow-sm"
                      >
                        <ExternalLink className="w-3.5 h-3.5 text-red-600" />
                        <span>Open in Gmail Web</span>
                      </a>
                      <a
                        href={webmail.outlook}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="py-2.5 px-3 rounded-lg border border-stone-200 bg-white hover:bg-stone-50 text-stone-800 font-semibold flex items-center justify-center gap-2 shadow-sm"
                      >
                        <ExternalLink className="w-3.5 h-3.5 text-blue-600" />
                        <span>Open in Outlook Web</span>
                      </a>
                    </div>
                  )}

                  {/* Utility Row: Copy & Download ICS */}
                  <div className="flex flex-wrap gap-2 pt-1">
                    <button
                      onClick={handleCopySummary}
                      className="flex-1 py-2.5 px-3 rounded-lg bg-stone-100 hover:bg-stone-200 text-stone-800 font-semibold text-xs transition-colors flex items-center justify-center gap-1.5"
                    >
                      {copiedLink ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{copiedLink ? 'Copied Message' : 'Copy Message Text'}</span>
                    </button>

                    <button
                      onClick={() => downloadCalendarEvent(submissionSuccess)}
                      className="flex-1 py-2.5 px-3 rounded-lg bg-stone-100 hover:bg-stone-200 text-stone-800 font-semibold text-xs transition-colors flex items-center justify-center gap-1.5"
                    >
                      <CalendarIcon className="w-3.5 h-3.5 text-teal-700" />
                      <span>Add to Calendar (.ics)</span>
                    </button>

                    <button
                      onClick={() => window.print()}
                      className="py-2.5 px-3 rounded-lg bg-stone-100 hover:bg-stone-200 text-stone-800 font-semibold text-xs transition-colors flex items-center justify-center gap-1.5"
                    >
                      <Printer className="w-3.5 h-3.5 text-stone-600" />
                      <span>Print Summary</span>
                    </button>
                  </div>

                  <div className="pt-3 text-center">
                    <button
                      onClick={() => setSubmissionSuccess(null)}
                      className="text-xs font-semibold text-teal-800 hover:underline"
                    >
                      &larr; Submit Another Reservation Inquiry
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              /* LIVE RESERVATION & INQUIRY FORM */
              <form onSubmit={handleSubmit} className="space-y-5" noValidate>
                <div className="border-b border-stone-100 pb-3 flex items-start justify-between">
                  <div>
                    <span className="text-teal-800 text-xs font-bold uppercase tracking-wider">
                      Online Booking Request
                    </span>
                    <h2 className="font-serif text-2xl font-bold text-stone-900 mt-1">
                      Reserve Your Stay
                    </h2>
                    <p className="text-stone-500 text-xs sm:text-sm mt-1">
                      Submitting prepares a direct inquiry to{' '}
                      <strong className="text-stone-700">{RESORT_INFO.contact.email}</strong>.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={onOpenGuideModal}
                    className="text-[11px] text-teal-800 hover:underline font-semibold shrink-0"
                  >
                    Hosting Guide &bull; Free
                  </button>
                </div>

                {/* Full Name */}
                <div>
                  <label
                    htmlFor="fullName"
                    className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-1"
                  >
                    Guest Full Name <span className="text-rose-600">*</span>
                  </label>
                  <input
                    type="text"
                    id="fullName"
                    value={formData.fullName}
                    onChange={(e) => {
                      setFormData({ ...formData, fullName: e.target.value });
                      if (errors.fullName) setErrors({ ...errors, fullName: undefined });
                    }}
                    placeholder="e.g., Juan Dela Cruz"
                    className={`w-full px-4 py-2.5 rounded-xl border text-sm transition-all focus:outline-none focus:ring-2 ${
                      errors.fullName
                        ? 'border-rose-400 focus:ring-rose-200 bg-rose-50/30'
                        : 'border-stone-300 focus:ring-teal-200 focus:border-teal-700'
                    }`}
                  />
                  {errors.fullName && (
                    <p className="text-rose-600 text-xs mt-1">{errors.fullName}</p>
                  )}
                </div>

                {/* Email & Contact Number */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-1"
                    >
                      Email Address <span className="text-rose-600">*</span>
                    </label>
                    <input
                      type="email"
                      id="email"
                      value={formData.email}
                      onChange={(e) => {
                        setFormData({ ...formData, email: e.target.value });
                        if (errors.email) setErrors({ ...errors, email: undefined });
                      }}
                      placeholder="e.g., guest@example.com"
                      className={`w-full px-4 py-2.5 rounded-xl border text-sm transition-all focus:outline-none focus:ring-2 ${
                        errors.email
                          ? 'border-rose-400 focus:ring-rose-200 bg-rose-50/30'
                          : 'border-stone-300 focus:ring-teal-200 focus:border-teal-700'
                      }`}
                    />
                    {errors.email && (
                      <p className="text-rose-600 text-xs mt-1">{errors.email}</p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="contactNumber"
                      className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-1"
                    >
                      Contact Phone <span className="text-rose-600">*</span>
                    </label>
                    <input
                      type="tel"
                      id="contactNumber"
                      value={formData.contactNumber}
                      onChange={(e) => {
                        setFormData({ ...formData, contactNumber: e.target.value });
                        if (errors.contactNumber) setErrors({ ...errors, contactNumber: undefined });
                      }}
                      placeholder="e.g., 0912 345 6789"
                      className={`w-full px-4 py-2.5 rounded-xl border text-sm transition-all focus:outline-none focus:ring-2 ${
                        errors.contactNumber
                          ? 'border-rose-400 focus:ring-rose-200 bg-rose-50/30'
                          : 'border-stone-300 focus:ring-teal-200 focus:border-teal-700'
                      }`}
                    />
                    {errors.contactNumber && (
                      <p className="text-rose-600 text-xs mt-1">{errors.contactNumber}</p>
                    )}
                  </div>
                </div>

                {/* Room Type Selector */}
                <div>
                  <label
                    htmlFor="roomType"
                    className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-1"
                  >
                    Select Room Type <span className="text-rose-600">*</span>
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {ROOMS_DATA.map((room) => {
                      const isSelected = formData.roomType === room.id;
                      return (
                        <div
                          key={room.id}
                          onClick={() => {
                            setFormData({
                              ...formData,
                              roomType: room.id,
                              guestCount: Math.min(formData.guestCount, room.capacity),
                            });
                          }}
                          className={`p-3.5 rounded-xl border cursor-pointer transition-all ${
                            isSelected
                              ? 'border-teal-700 bg-teal-50/70 shadow-sm'
                              : 'border-stone-200 hover:border-stone-300 bg-white'
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <span className="font-serif font-bold text-xs text-stone-900">
                              {room.name}
                            </span>
                            {isSelected && <Check className="w-3.5 h-3.5 text-teal-700" />}
                          </div>
                          <div className="mt-1 text-[11px] font-semibold text-stone-800">
                            ₱{room.pricePHP.toLocaleString()} / night
                          </div>
                          <div className="text-[10px] text-stone-500">
                            Max {room.capacity} Guests
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Check-in, Check-out, Number of Guests */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label
                      htmlFor="checkIn"
                      className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-1"
                    >
                      Check-In Date <span className="text-rose-600">*</span>
                    </label>
                    <input
                      type="date"
                      id="checkIn"
                      min={today}
                      value={formData.checkIn}
                      onChange={(e) => {
                        const newIn = e.target.value;
                        setFormData({ ...formData, checkIn: newIn });
                        if (errors.checkIn) setErrors({ ...errors, checkIn: undefined });
                      }}
                      className={`w-full px-3 py-2 rounded-xl border text-xs sm:text-sm focus:outline-none focus:ring-2 ${
                        errors.checkIn
                          ? 'border-rose-400 focus:ring-rose-200'
                          : 'border-stone-300 focus:ring-teal-200'
                      }`}
                    />
                    {errors.checkIn && (
                      <p className="text-rose-600 text-[11px] mt-1">{errors.checkIn}</p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="checkOut"
                      className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-1"
                    >
                      Check-Out Date <span className="text-rose-600">*</span>
                    </label>
                    <input
                      type="date"
                      id="checkOut"
                      min={formData.checkIn || today}
                      value={formData.checkOut}
                      onChange={(e) => {
                        setFormData({ ...formData, checkOut: e.target.value });
                        if (errors.checkOut) setErrors({ ...errors, checkOut: undefined });
                      }}
                      className={`w-full px-3 py-2 rounded-xl border text-xs sm:text-sm focus:outline-none focus:ring-2 ${
                        errors.checkOut
                          ? 'border-rose-400 focus:ring-rose-200'
                          : 'border-stone-300 focus:ring-teal-200'
                      }`}
                    />
                    {errors.checkOut && (
                      <p className="text-rose-600 text-[11px] mt-1">{errors.checkOut}</p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="guestCount"
                      className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-1"
                    >
                      Guests (Max {selectedRoom.capacity}) <span className="text-rose-600">*</span>
                    </label>
                    <input
                      type="number"
                      id="guestCount"
                      min={1}
                      max={selectedRoom.capacity}
                      value={formData.guestCount}
                      onChange={(e) => {
                        const count = parseInt(e.target.value) || 1;
                        setFormData({ ...formData, guestCount: count });
                        if (errors.guestCount) setErrors({ ...errors, guestCount: undefined });
                      }}
                      className={`w-full px-3 py-2 rounded-xl border text-xs sm:text-sm focus:outline-none focus:ring-2 ${
                        errors.guestCount
                          ? 'border-rose-400 focus:ring-rose-200'
                          : 'border-stone-300 focus:ring-teal-200'
                      }`}
                    />
                    {errors.guestCount && (
                      <p className="text-rose-600 text-[11px] mt-1">{errors.guestCount}</p>
                    )}
                  </div>
                </div>

                {/* Special Requests */}
                <div>
                  <label
                    htmlFor="specialRequests"
                    className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-1"
                  >
                    Special Requests / Notes (Optional)
                  </label>
                  <textarea
                    id="specialRequests"
                    rows={3}
                    value={formData.specialRequests}
                    onChange={(e) => setFormData({ ...formData, specialRequests: e.target.value })}
                    placeholder="e.g., Late check-in arrival estimated at 5:00 PM, quiet room preference, extra pillow request..."
                    className="w-full px-4 py-2.5 rounded-xl border border-stone-300 text-sm focus:outline-none focus:ring-2 focus:ring-teal-200 focus:border-teal-700"
                  />
                </div>

                {/* Price Breakdown Preview */}
                <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200/80 flex items-center justify-between">
                  <div>
                    <span className="text-xs text-stone-500 block">
                      Estimated Calculation ({currentNights} night{currentNights > 1 ? 's' : ''} &bull; {formData.guestCount} guest{formData.guestCount > 1 ? 's' : ''})
                    </span>
                    <span className="text-[11px] text-amber-700 font-medium">
                      *Sample educational rate (PHP)
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="text-xl sm:text-2xl font-serif font-extrabold text-stone-900">
                      ₱{estimatedCost.toLocaleString()} PHP
                    </span>
                  </div>
                </div>

                {/* Submit Inquiry Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 rounded-full bg-teal-800 hover:bg-teal-900 text-white font-bold text-xs uppercase tracking-wider shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2 active:scale-98 disabled:opacity-70"
                >
                  {isSubmitting ? (
                    <span>Opening Your Email App...</span>
                  ) : (
                    <>
                      <Send className="w-4 h-4 text-amber-300" />
                      <span>Send Inquiry via Email</span>
                    </>
                  )}
                </button>

                <p className="text-[11px] text-center text-stone-500">
                  Submitting will launch your email client with your inquiry pre-filled to{' '}
                  <span className="text-teal-800 font-semibold">{RESORT_INFO.contact.email}</span>.
                </p>
              </form>
            )}
          </div>

          {/* Right Column: Google Maps & Location Verification */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white rounded-3xl p-6 border border-stone-200 shadow-sm overflow-hidden">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-teal-700" />
                  <h3 className="font-serif text-base font-bold text-stone-900">
                    Resort Location Map
                  </h3>
                </div>
                <a
                  href={RESORT_INFO.maps.directUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-teal-800 hover:underline flex items-center gap-1 font-semibold"
                >
                  <span>Open Full Map</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>

              <p className="text-xs text-stone-500 mb-3">
                <strong>{RESORT_INFO.name}</strong> is situated in Barrio Samara, Municipality of Aringay, La Union, Philippines.
              </p>

              {/* Embedded Google Map Iframe */}
              <div className="relative rounded-2xl overflow-hidden aspect-[4/3] border border-stone-200 bg-stone-100">
                <iframe
                  title="Bikini Valley Resort Location Map - Samara, Aringay, La Union"
                  src={RESORT_INFO.maps.embedUrl}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="w-full h-full"
                />
              </div>

              {/* Verified Location Note */}
              <div className="mt-4 p-3 rounded-xl bg-teal-50/70 border border-teal-200/60 text-xs text-teal-900 flex items-start gap-2">
                <Info className="w-4 h-4 text-teal-700 shrink-0 mt-0.5" />
                <div>
                  <strong>Location Note:</strong> Map display centers on the coastal area of Samara, Aringay, La Union. For turn-by-turn driving directions from Manila or San Fernando, our front desk provides landmark guidance via phone.
                </div>
              </div>
            </div>

            {/* Travel Directions & Tips */}
            <div className="bg-stone-50 rounded-3xl p-6 border border-stone-200 space-y-3 text-xs text-stone-600">
              <h4 className="font-serif text-sm font-bold text-stone-900">
                Getting to Samara, Aringay:
              </h4>
              <ul className="space-y-2 list-disc pl-4">
                <li>
                  <strong>By Private Car:</strong> Take TPLEX to Rosario exit, proceed north along MacArthur Highway through Sto. Tomas to Aringay town proper, then take the coastal road westward to Samara.
                </li>
                <li>
                  <strong>By Public Bus:</strong> Board any northbound bus (Partas, Viron, Dominion) bound for San Fernando or Vigan. Alight at Aringay town center, and take a local tricycle directly to Samara beach.
                </li>
                <li>
                  <strong>Front Desk Assistance:</strong> Call us at <strong>{RESORT_INFO.contact.phoneFormatted}</strong> upon arriving at Aringay for direct arrival assistance.
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
