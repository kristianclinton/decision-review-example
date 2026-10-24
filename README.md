# Decision review: preserve perspectives, invalidate stale confirmation

A small, original portfolio example by [Kristian Clinton](https://kristianclinton.com/), founder of [Kinplan](https://kinplan.ca/).

This standalone example was created for the public portfolio. **It is not Kinplan's production source code**, does not contain participant or employer data, and is not a deployed collaboration or consent system. Alex and Sam are fictional.

## The product judgment

Two people can review the same question without giving the same answer. The interface should preserve both perspectives, make missing and undecided answers distinct, and stop treating an old confirmation as current after someone changes an answer.

- `incomplete`: at least one person has not answered.
- `open`: someone explicitly chose `undecided`.
- `different`: complete answers differ; neither perspective is silently overwritten.
- `aligned`: the recorded answers match exactly.
- `reviewedByAll`: everyone confirmed the current revision. This means reviewed, not resolved, agreed, signed or legally effective.

Every meaningful change increments a revision and clears prior confirmations. A stale tab cannot confirm a later revision. Re-saving the same answer preserves confirmations. Returned data is immutable relative to the prior review.

## Run

Requires Node.js 20 or later. No packages or accounts are needed.

```sh
node --test decision-review.test.mjs
```

```js
import {createReview, answer, compare} from './decision-review.mjs';
let review = createReview(['Alex', 'Sam'], ['Updates']);
review = answer(review, 'Alex', 'Updates', 'Monthly');
review = answer(review, 'Sam', 'Updates', 'Weekly');
console.log(compare(review)); // different, with both responses retained
```

## Production considerations

A real multi-user product additionally needs server-side authentication and authorization, atomic revision checks, persistence, access-scoped data handling, audit history, explicit question types, content validation and accessibility testing for its interface. This module intentionally does not claim those capabilities. Matching is exact after trimming whitespace; a production questionnaire should use stable option identifiers rather than infer semantic agreement from free text. Do not use this as a legal-signature or consent mechanism.

## How I work

I connect product direction, design and AI-assisted implementation, then review the behavior against the actual user problem. This example includes tests for conflicting perspectives, explicit uncertainty, stale review, invalidation and immutability.

[Kinplan case study](https://kristianclinton.com/work/kinplan) · [LinkedIn](https://www.linkedin.com/in/kristianclinton/) · [hello@kristianclinton.com](mailto:hello@kristianclinton.com)
