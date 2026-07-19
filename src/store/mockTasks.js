export const MOCK_TASKS = [
  {
    id: 'TASK-8472',
    category: 'negotiator',
    description: 'Call Comcast (Xfinity) customer service and request a rate reduction. I have been a customer for 2 years and my promo rate just ended, jumping from $50/mo to $85/mo. Try to get it down to $60/mo or less without signing a new 2-year agreement.',
    script: '- Say you are calling on behalf of Alex Mercer\n- State that the bill has become too high and you are considering switching to a local fiber provider\n- Do not accept any upgrade bundles (like mobile or TV) unless they actually lower the overall cost\n- Be polite but firm about cancellation if they can\'t lower the price.',
    proofType: 'screenshot',
    alias: 'User #8472',
    status: 'open',
    createdAt: new Date(Date.now() - 3600000 * 2).toISOString(), // 2 hours ago
  },
  {
    id: 'TASK-3918',
    category: 'secretary',
    description: 'Call "Gusto Pizza Co." and book a table for 4 people this coming Friday at 7:30 PM. If that time slot is unavailable, check if they have 7:00 PM or 8:00 PM.',
    script: '- Book a table for 4 under the name "The Whisper Group"\n- If Friday is fully booked, ask about Saturday evening at the same times\n- Confirm if they have outdoor seating options available.',
    proofType: 'summary',
    alias: 'User #3918',
    status: 'open',
    createdAt: new Date(Date.now() - 3600000 * 4).toISOString(), // 4 hours ago
  },
  {
    id: 'TASK-2104',
    category: 'researcher',
    description: 'Call the local Best Buy (or check inventory) to find out if they have the special edition Zelda controller in stock. I\'ve checked online but it says "check store inventory".',
    script: '- Ask for the electronics department\n- Give them the SKU: 6535546\n- Ask if they have any units on shelves or in the back\n- Ask if they can hold one for 2 hours if they have it.',
    proofType: 'summary',
    alias: 'User #2104',
    status: 'open',
    createdAt: new Date(Date.now() - 3600000 * 24).toISOString(), // 1 day ago
  },
  {
    id: 'TASK-5512',
    category: 'wordsmith',
    description: 'Need a formal, firm complaint email drafted to my landlord regarding the elevator in our building. It has been broken for 6 consecutive days, and I live on the 5th floor. We pay a monthly amenity/maintenance fee.',
    script: '- Mention Apartment 5B\n- Highlight that the broken elevator is a violation of building accessibility standards\n- Request a prorated refund of the maintenance fee for the days the elevator was out of order\n- Keep the tone professional but highly firm.',
    proofType: 'transcript',
    alias: 'User #5512',
    status: 'open',
    createdAt: new Date(Date.now() - 3600000 * 36).toISOString(), // 1.5 days ago
  }
];
