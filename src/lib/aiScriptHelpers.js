/**
 * AI Script & Template Generator Helper Module
 */

export const CATEGORY_TEMPLATES = {
  negotiator: [
    {
      title: 'Subscription Cancellation Negotiation',
      script: `Hello, I'm calling on behalf of a subscriber regarding account cancellation.\n\nKey talking points:\n1. State desire to cancel account immediately.\n2. Decline initial retention discount unless it exceeds 40%.\n3. Request confirmation email and cancellation code.`,
    },
    {
      title: 'Bill Discount Request',
      script: `Hi, I am reaching out regarding the monthly utility/service rate.\n\nKey talking points:\n1. Mention long-standing account history.\n2. Compare pricing with local competitor rate.\n3. Ask for a promotional discount or loyalty credit.`,
    },
  ],
  secretary: [
    {
      title: 'Appointment Scheduling',
      script: `Hello, I need to schedule an appointment for an upcoming availability window.\n\nDetails to confirm:\n1. Preferred dates: Next Tuesday or Thursday afternoon.\n2. Request confirmation of location and provider name.\n3. Ask about any intake forms required in advance.`,
    },
  ],
  researcher: [
    {
      title: 'Service Availability Inquiry',
      script: `Hi, I'm calling to inquire about specific service availability and lead times.\n\nQuestions to ask:\n1. Is service available in zipcode [Zipcode]?\n2. What is the current estimated wait time?\n3. Are consultations or quotes free of charge?`,
    },
  ],
  wordsmith: [
    {
      title: 'Polite Complaint & Resolution',
      script: `Dear Support Team,\n\nI am writing regarding order/issue #[ID]. The service delivered did not meet expected quality guidelines.\n\nRequested Outcome:\n- Full replacement or refund of original charges.\n- Written confirmation of resolution.`,
    },
  ],
};

/**
 * Returns pre-built template options for a given category
 */
export function getScriptTemplates(category = 'negotiator') {
  return CATEGORY_TEMPLATES[category] || CATEGORY_TEMPLATES.negotiator;
}

/**
 * Generates an AI-suggested prompt draft from category and description text
 */
export function generateScriptDraft(category = 'negotiator', description = '') {
  const templates = getScriptTemplates(category);
  const base = templates[0]?.script || '';
  if (!description.trim()) return base;
  return `${base}\n\nSpecific Task Details:\n${description.trim()}`;
}
