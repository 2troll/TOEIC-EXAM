/**
 * The mandatory 3-Tier Professional Feedback panel, shown after a question is
 * graded:
 *   1. Correct Answer Analysis
 *   2. Distractor Breakdown
 *   3. Time-Hack Strategy
 */
export default function FeedbackPanel({ feedback }) {
  if (!feedback) return null;
  return (
    <div className="feedback">
      <div className="feedback-tier tier-1">
        <span className="tier-badge">1 · Correct Answer Analysis</span>
        <p>{feedback.correct}</p>
      </div>
      <div className="feedback-tier tier-2">
        <span className="tier-badge">2 · Distractor Breakdown</span>
        <p>{feedback.distractors}</p>
      </div>
      <div className="feedback-tier tier-3">
        <span className="tier-badge">3 · Time-Hack Strategy ⚡</span>
        <p>{feedback.timeHack}</p>
      </div>
    </div>
  );
}
