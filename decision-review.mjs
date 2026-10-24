/** A small portfolio example, not Kinplan production code. All examples are fictional. */
export function createReview(participants, questions) {
  for (const [label, list] of [['participants', participants], ['questions', questions]]) {
    if (!Array.isArray(list) || !list.length || list.some(x => typeof x !== 'string' || !x.trim()) || new Set(list).size !== list.length) throw new Error(`Invalid ${label}`);
  }
  return { participants: [...participants], questions: [...questions], revision: 0, answers: {}, confirmations: {} };
}
export function answer(review, participant, question, value) {
  if (!review.participants.includes(participant) || !review.questions.includes(question)) throw new Error('Unknown participant or question');
  if (typeof value !== 'string' || !value.trim()) throw new Error('Use an explicit answer, including undecided');
  const normalized = value.trim();
  if (review.answers[participant]?.[question] === normalized) return review;
  return { ...review, revision: review.revision + 1, answers: { ...review.answers, [participant]: { ...review.answers[participant], [question]: normalized } }, confirmations: {} };
}
export function compare(review) {
  return review.questions.map(question => {
    const responses = review.participants.map(participant => ({ participant, value: review.answers[participant]?.[question] ?? null }));
    const values = responses.map(x => x.value);
    const status = values.includes(null) ? 'incomplete' : values.some(x => x.toLowerCase() === 'undecided') ? 'open' : new Set(values).size === 1 ? 'aligned' : 'different';
    return { question, status, responses };
  });
}
export function confirm(review, participant, expectedRevision) {
  if (!review.participants.includes(participant)) throw new Error('Unknown participant');
  if (expectedRevision !== review.revision) throw new Error('Review changed; read the current revision');
  if (compare(review).some(x => x.status === 'incomplete')) throw new Error('Complete independent answers first');
  return { ...review, confirmations: { ...review.confirmations, [participant]: review.revision } };
}
export function reviewState(review) {
  return { revision: review.revision, questions: compare(review), reviewedByAll: review.participants.every(x => review.confirmations[x] === review.revision) };
}
