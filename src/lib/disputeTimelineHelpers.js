/**
 * Helper utility for calculating escrow dispute steps and progress tracking.
 */

export const DISPUTE_STAGES = [
  { id: 'filed', label: 'Dispute Filed' },
  { id: 'evidence', label: 'Evidence Submitted' },
  { id: 'review', label: 'Under Review' },
  { id: 'resolved', label: 'Dispute Resolved' },
];

/**
 * Calculates current active step index and step statuses for a dispute.
 */
export function getDisputeTimelineStatus(currentStatus = 'filed') {
  const norm = String(currentStatus || 'filed').toLowerCase();

  let activeIndex = 0;
  if (norm === 'evidence') activeIndex = 1;
  if (norm === 'review' || norm === 'under_review') activeIndex = 2;
  if (norm === 'resolved' || norm === 'refunded') activeIndex = 3;

  const steps = DISPUTE_STAGES.map((stage, idx) => ({
    ...stage,
    isCompleted: idx < activeIndex,
    isCurrent: idx === activeIndex,
    isPending: idx > activeIndex,
  }));

  return {
    activeIndex,
    progressPercentage: Math.round(((activeIndex + 1) / DISPUTE_STAGES.length) * 100),
    steps,
  };
}
