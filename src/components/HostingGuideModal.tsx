import React, { useState } from 'react';
import {
  X,
  Globe,
  Github,
  Cloud,
  CheckCircle2,
  AlertTriangle,
  FileCode,
  Download,
  Copy,
  Check,
  ExternalLink,
  Laptop,
} from 'lucide-react';
import { exportInquiriesCSV, getStoredInquiries } from '../services/reservationEmail';

interface HostingGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const HostingGuideModal: React.FC<HostingGuideModalProps> = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState<'deployment' | 'features' | 'inquiries'>('deployment');
  const [copiedCmd, setCopiedCmd] = useState<string | null>(null);

  if (!isOpen) return null;

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedCmd(id);
    setTimeout(() => setCopiedCmd(null), 2000);
  };

  const storedInquiries = getStoredInquiries();

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="hosting-guide-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 md:p-6 bg-black/75 backdrop-blur-sm animate-fadeIn"
      onClick={onClose}
    >
      <div
        className="relative max-w-3xl w-full bg-white rounded-3xl overflow-hidden shadow-2xl border border-stone-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-emerald-950 via-teal-900 to-stone-900 text-white p-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center border border-white/20">
              <Globe className="w-5 h-5 text-amber-300" />
            </div>
            <div>
              <h3 id="hosting-guide-title" className="font-serif text-lg font-bold">
                Free Hosting & Project Guide
              </h3>
              <p className="text-xs text-stone-300">
                100% Static Deployment (Zero Google Cloud Billing Required)
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full text-stone-400 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Controls */}
        <div className="flex border-b border-stone-200 bg-stone-50 px-6 pt-3 gap-2">
          <button
            onClick={() => setActiveTab('deployment')}
            className={`pb-3 px-3 text-xs font-bold uppercase tracking-wider border-b-2 transition-all ${
              activeTab === 'deployment'
                ? 'border-teal-700 text-teal-800'
                : 'border-transparent text-stone-500 hover:text-stone-800'
            }`}
          >
            Step-by-Step Free Hosting
          </button>
          <button
            onClick={() => setActiveTab('features')}
            className={`pb-3 px-3 text-xs font-bold uppercase tracking-wider border-b-2 transition-all ${
              activeTab === 'features'
                ? 'border-teal-700 text-teal-800'
                : 'border-transparent text-stone-500 hover:text-stone-800'
            }`}
          >
            Static vs. Backend Explained
          </button>
          <button
            onClick={() => setActiveTab('inquiries')}
            className={`pb-3 px-3 text-xs font-bold uppercase tracking-wider border-b-2 transition-all ${
              activeTab === 'inquiries'
                ? 'border-teal-700 text-teal-800'
                : 'border-transparent text-stone-500 hover:text-stone-800'
            }`}
          >
            Local Inquiries Log ({storedInquiries.length})
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 md:p-8 space-y-6 max-h-[70vh] overflow-y-auto text-xs sm:text-sm">
          {activeTab === 'deployment' && (
            <div className="space-y-6">
              {/* Option 1: Netlify */}
              <div className="p-5 rounded-2xl bg-teal-50/60 border border-teal-200">
                <div className="flex items-center gap-2 mb-2 font-bold text-teal-950 font-serif text-base">
                  <Cloud className="w-5 h-5 text-teal-700" />
                  <span>Option 1: Netlify (Drag & Drop or Git - Free Forever)</span>
                </div>
                <ol className="list-decimal pl-5 space-y-2 text-stone-700 text-xs">
                  <li>
                    Run <code className="bg-teal-100 px-1.5 py-0.5 rounded font-mono">npm run build</code> in your terminal. This creates an optimized <code className="bg-teal-100 px-1.5 py-0.5 rounded font-mono">dist</code> folder.
                  </li>
                  <li>
                    Go to <strong>netlify.com</strong> and create a free account.
                  </li>
                  <li>
                    Under "Sites", simply drag and drop the <code className="bg-teal-100 px-1.5 py-0.5 rounded font-mono">dist</code> folder directly into Netlify.
                  </li>
                  <li>
                    Your site is instantly live with a free custom SSL URL (e.g., <code className="bg-teal-100 px-1.5 py-0.5 rounded font-mono">bikinivalley.netlify.app</code>).
                  </li>
                </ol>
              </div>

              {/* Option 2: GitHub Pages */}
              <div className="p-5 rounded-2xl bg-stone-50 border border-stone-200">
                <div className="flex items-center gap-2 mb-2 font-bold text-stone-900 font-serif text-base">
                  <Github className="w-5 h-5 text-stone-800" />
                  <span>Option 2: GitHub Pages (Free via GitHub Repo)</span>
                </div>
                <ol className="list-decimal pl-5 space-y-2 text-stone-700 text-xs">
                  <li>
                    Push your project code to a GitHub repository (e.g. <code className="bg-stone-200 px-1.5 py-0.5 rounded font-mono">bikini-valley-resort</code>).
                  </li>
                  <li>
                    In your repository, click <strong>Settings &rarr; Pages</strong>.
                  </li>
                  <li>
                    Under "Build and deployment", choose <strong>GitHub Actions &rarr; Static HTML</strong> or configure Vite build workflow.
                  </li>
                  <li>
                    Because our Vite configuration uses relative asset paths (<code className="bg-stone-200 px-1.5 py-0.5 rounded font-mono">base: './'</code>), all images, CSS, and scripts load flawlessly on any sub-path!
                  </li>
                </ol>
              </div>

              {/* Build Commands Cheat Sheet */}
              <div className="p-4 rounded-xl bg-stone-900 text-stone-200 font-mono text-xs space-y-2">
                <div className="flex items-center justify-between text-stone-400 border-b border-stone-800 pb-1">
                  <span>Terminal Command to Build:</span>
                  <button
                    onClick={() => copyToClipboard('npm run build', 'cmd')}
                    className="flex items-center gap-1 text-[11px] text-amber-400 hover:underline"
                  >
                    {copiedCmd === 'cmd' ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedCmd === 'cmd' ? 'Copied' : 'Copy'}</span>
                  </button>
                </div>
                <div className="text-amber-300">npm run build</div>
                <p className="text-[11px] text-stone-400">
                  Outputs complete static HTML/JS/CSS to <code>./dist</code> ready for any free host.
                </p>
              </div>
            </div>
          )}

          {activeTab === 'features' && (
            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-amber-900 text-xs space-y-2">
                <div className="flex items-center gap-2 font-bold text-sm">
                  <AlertTriangle className="w-4 h-4 text-amber-600" />
                  <span>Which Features Cannot Work Without a Paid/Dedicated Backend?</span>
                </div>
                <p>
                  A static website runs 100% inside the user's web browser without a persistent server database. Here is what is replaced or handled through free alternatives:
                </p>
              </div>

              <div className="space-y-3">
                <div className="p-3.5 rounded-xl border border-stone-200 bg-white">
                  <h5 className="font-bold text-stone-900 text-xs flex items-center gap-1.5">
                    <span className="text-rose-600 font-bold">✕</span> Automated Silent Email Server (e.g. SendGrid / NodeMailer)
                  </h5>
                  <p className="text-xs text-stone-600 mt-1">
                    Without a backend server, the browser cannot silently send an email over SMTP without exposing API secrets.
                  </p>
                  <p className="text-xs text-teal-800 font-semibold mt-1">
                    ✓ <strong>Free Solution Used:</strong> Standard <code className="bg-stone-100 px-1 py-0.5 rounded font-mono">mailto:</code> and direct webmail shortcuts (Gmail Web / Outlook Web) pre-fill the entire reservation inquiry to <strong>bikinivalley175@gmail.com</strong> with 1 click. Zero server cost!
                  </p>
                </div>

                <div className="p-3.5 rounded-xl border border-stone-200 bg-white">
                  <h5 className="font-bold text-stone-900 text-xs flex items-center gap-1.5">
                    <span className="text-rose-600 font-bold">✕</span> Server Database (e.g. PostgreSQL / Firebase Firestore)
                  </h5>
                  <p className="text-xs text-stone-600 mt-1">
                    Centralized multi-computer room inventory locking requires a shared server database.
                  </p>
                  <p className="text-xs text-teal-800 font-semibold mt-1">
                    ✓ <strong>Free Solution Used:</strong> Browser LocalStorage stores inquiries locally, with a 1-click <strong>Export to CSV</strong> button for spreadsheets, and front desk inquiry verification.
                  </p>
                </div>

                <div className="p-3.5 rounded-xl border border-stone-200 bg-white">
                  <h5 className="font-bold text-stone-900 text-xs flex items-center gap-1.5">
                    <span className="text-rose-600 font-bold">✕</span> Paid Cloud OAuth APIs
                  </h5>
                  <p className="text-xs text-stone-600 mt-1">
                    Google Workspace API requires GCP project configuration, verified consent screens, or paid Google Workspace plans.
                  </p>
                  <p className="text-xs text-teal-800 font-semibold mt-1">
                    ✓ <strong>Free Solution Used:</strong> Standard offline <strong>.ics iCalendar download</strong>, allowing visitors to add their booking stay to Google Calendar, Apple Calendar, or Outlook for free!
                  </p>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'inquiries' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-bold text-stone-900 text-sm">
                    Inquiries Recorded on this Browser
                  </h4>
                  <p className="text-xs text-stone-500">
                    Stored in local browser storage (no cloud database needed).
                  </p>
                </div>
                <button
                  onClick={exportInquiriesCSV}
                  className="px-3 py-1.5 rounded-lg bg-teal-800 hover:bg-teal-900 text-white text-xs font-semibold flex items-center gap-1.5 shadow-sm"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Export to Excel CSV</span>
                </button>
              </div>

              {storedInquiries.length === 0 ? (
                <div className="text-center py-10 bg-stone-50 rounded-2xl border border-dashed border-stone-300">
                  <p className="text-stone-500 text-xs">No inquiries submitted yet on this device.</p>
                  <p className="text-stone-400 text-[11px] mt-1">
                    Submit the reservation form on the Contact & Reservation page to test local recording.
                  </p>
                </div>
              ) : (
                <div className="space-y-2">
                  {storedInquiries.map((inq) => (
                    <div
                      key={inq.referenceNumber}
                      className="p-3 rounded-xl border border-stone-200 bg-white flex flex-col sm:flex-row justify-between sm:items-center gap-2 text-xs"
                    >
                      <div>
                        <div className="font-bold text-stone-900 flex items-center gap-2">
                          <span className="font-mono text-teal-800">#{inq.referenceNumber}</span>
                          <span>&bull;</span>
                          <span>{inq.fullName}</span>
                          <span className="text-[11px] text-stone-400">({inq.roomName})</span>
                        </div>
                        <div className="text-stone-500 text-[11px] mt-0.5">
                          {inq.checkIn} to {inq.checkOut} ({inq.totalNights} night/s) &bull; {inq.contactNumber}
                        </div>
                      </div>
                      <div className="text-right shrink-0">
                        <span className="font-bold text-stone-800">₱{inq.estimatedTotalPHP.toLocaleString()} PHP</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="bg-stone-50 border-t border-stone-200 px-6 py-4 flex items-center justify-between text-xs text-stone-500">
          <span>Bikini Valley Resort &bull; Samara, Aringay, La Union</span>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-stone-900 hover:bg-stone-800 text-white font-semibold transition-colors"
          >
            Close Guide
          </button>
        </div>
      </div>
    </div>
  );
};
