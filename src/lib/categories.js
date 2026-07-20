import { Lock, FileText, Search, PenTool } from 'lucide-react';

export const categories = [
  {
    id: 'negotiator',
    name: 'The Negotiator',
    description: 'Calls to landlords, billing departments, ISPs, or service providers. Dispute resolution and fee waivers.',
    icon: Lock,
    colorClass: 'bg-primary-50 text-primary-600',
    borderClass: 'border-primary-100',
    hoverClass: 'hover:border-primary-300 hover:bg-primary-50/60',
    iconBg: 'bg-primary-100',
  },
  {
    id: 'secretary',
    name: 'The Secretary',
    description: 'Booking appointments, reservations, or joining waitlists over the phone.',
    icon: FileText,
    colorClass: 'bg-accent-50 text-accent-600',
    borderClass: 'border-accent-100',
    hoverClass: 'hover:border-accent-300 hover:bg-accent-50/60',
    iconBg: 'bg-accent-100',
  },
  {
    id: 'researcher',
    name: 'The Researcher',
    description: 'Quick informational calls — stock checks, business hours, menu questions.',
    icon: Search,
    colorClass: 'bg-amber-50 text-amber-600',
    borderClass: 'border-amber-100',
    hoverClass: 'hover:border-amber-300 hover:bg-amber-50/60',
    iconBg: 'bg-amber-100',
  },
  {
    id: 'wordsmith',
    name: 'The Wordsmith',
    description: 'Drafting difficult emails, formal complaints, awkward follow-ups, or professional replies.',
    icon: PenTool,
    colorClass: 'bg-pink-50 text-pink-600',
    borderClass: 'border-pink-100',
    hoverClass: 'hover:border-pink-300 hover:bg-pink-50/60',
    iconBg: 'bg-pink-100',
  },
];
