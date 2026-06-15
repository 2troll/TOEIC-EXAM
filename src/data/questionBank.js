/**
 * TOEIC Mastery Simulator — Built-in Question Bank
 *
 * Authentic-style TOEIC Listening (Parts 1–4) and Reading (Parts 5–7) items,
 * written to mirror the current TOEIC L&R format: authentic corporate and
 * professional vocabulary (procurement, logistics, HR, corporate travel,
 * finance, marketing) and the same trap structures used on the real exam.
 *
 * Data model
 * ----------
 * Every part is a list of "blocks". A block bundles an optional stimulus
 * (an audio script for Listening, or one/more passages for Reading) with one
 * or more questions that share it. Single-question parts (1, 2, 5) simply use
 * one question per block.
 *
 * question = {
 *   id, prompt, options: string[], answer: number (0-based),
 *   feedback: { correct, distractors, timeHack }
 * }
 *
 * Each feedback object powers the mandatory 3-tier professional review:
 *   1. correct      — why the key fits (grammatical / contextual analysis)
 *   2. distractors  — why each other option is wrong / structurally flawed
 *   3. timeHack     — a <15-second pattern-recognition shortcut
 */

export const PART_META = {
  1: {
    part: 1,
    section: 'listening',
    title: 'Part 1 — Photographs',
    short: 'Photographs',
    instructions:
      'You will read a description of a photograph. Read the [AUDIO SCRIPT] once, simulating a single audio feed, then select the statement that best describes what is shown. Do not scroll back to the script while answering — this trains auditory memory retention.',
    optionCount: 4,
  },
  2: {
    part: 2,
    section: 'listening',
    title: 'Part 2 — Question–Response',
    short: 'Question–Response',
    instructions:
      'You will hear a question or statement followed by three responses. Read the [AUDIO SCRIPT] once, then choose the response that most naturally answers or follows it. Beware of audio distractors: repeated words and similar sounds.',
    optionCount: 3,
  },
  3: {
    part: 3,
    section: 'listening',
    title: 'Part 3 — Conversations',
    short: 'Conversations',
    instructions:
      'You will read a short conversation between two or more speakers, then answer questions about it. Read the [AUDIO SCRIPT] once as if listening, then answer from memory.',
    optionCount: 4,
  },
  4: {
    part: 4,
    section: 'listening',
    title: 'Part 4 — Talks',
    short: 'Talks',
    instructions:
      'You will read a short talk given by a single speaker (announcement, voicemail, broadcast), then answer questions about it. Read the [AUDIO SCRIPT] once, then answer from memory.',
    optionCount: 4,
  },
  5: {
    part: 5,
    section: 'reading',
    title: 'Part 5 — Incomplete Sentences',
    short: 'Incomplete Sentences',
    instructions:
      'Select the word or phrase that best completes each sentence. First categorize the item: a GRAMMAR item (decide by the parts of speech immediately around the blank) or a VOCABULARY item (decide by contextual collocation).',
    optionCount: 4,
  },
  6: {
    part: 6,
    section: 'reading',
    title: 'Part 6 — Text Completion',
    short: 'Text Completion',
    instructions:
      'Read the passage and select the word, phrase, or sentence that best fits each numbered blank. One blank per set requires a full sentence — use the surrounding context to maintain cohesion.',
    optionCount: 4,
  },
  7: {
    part: 7,
    section: 'reading',
    title: 'Part 7 — Reading Comprehension',
    short: 'Reading Comprehension',
    instructions:
      'Read each text (single, double, or triple passage) and answer the questions. Workflow: read the question stems first, extract keywords, then scan the passage for the matching information before committing.',
    optionCount: 4,
  },
};

// ─────────────────────────────────────────────────────────────────────────
// PART 1 — Photographs (scene rendered as text in lieu of an image)
// ─────────────────────────────────────────────────────────────────────────
const part1 = [
  {
    id: 'p1-001',
    stimulus: {
      kind: 'photo',
      accent: 'American',
      photo: {
        url: 'https://images.rawpixel.com/editor_1024/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDIzLTAzL2ZsNTI2MjA0NDU0MjUtaW1hZ2UuanBn.jpg',
        title: 'Warehouse forklift moving boxes',
        license: 'cc0',
        source: 'https://www.rawpixel.com/image/11073059/photo-image-face-person-public-domain',
      },
      photoDescription: 'A forklift is being used to move boxes inside a warehouse.',
      audioScript:
        '(A) A forklift is being used to move boxes.\n(B) The shelves are completely empty.\n(C) A man is sweeping the floor.\n(D) Boxes are being unpacked by hand.',
    },
    questions: [
      {
        id: 'p1-001-q1',
        prompt: 'Select the statement that best describes the photograph.',
        options: [
          '(A) A forklift is being used to move boxes.',
          '(B) The shelves are completely empty.',
          '(C) A man is sweeping the floor.',
          '(D) Boxes are being unpacked by hand.',
        ],
        answer: 0,
        feedback: {
          correct:
            '(A) is correct: a forklift moving boxes is the main action and subject in the photo.',
          distractors:
            '(B) the shelves are not empty. (C) no one is sweeping. (D) the boxes are moved by the forklift, not unpacked by hand.',
          timeHack:
            'Identify the main subject + action (forklift moving boxes) and pick the option that names it. Reject options with actions or objects you cannot see.',
        },
      },
    ],
  },
  {
    id: 'p1-002',
    stimulus: {
      kind: 'photo',
      accent: 'British',
      photo: {
        url: 'https://images.rawpixel.com/editor_1024/czNmcy1wcml2YXRlL3Jhd3BpeGVsX2ltYWdlcy93ZWJzaXRlX2NvbnRlbnQvbHIvZmw0OTUwOTExMjc0Ny1pbWFnZS1reWJlZnFtdS5qcGc.jpg',
        title: 'Barista making coffee',
        license: 'cc0',
        source: 'https://images.rawpixel.com',
      },
      photoDescription: 'A barista is preparing a cup of coffee at a café.',
      audioScript:
        '(A) A barista is preparing coffee.\n(B) The café is being painted.\n(C) Customers are washing dishes.\n(D) The shelves are being stocked with books.',
    },
    questions: [
      {
        id: 'p1-002-q1',
        prompt: 'Select the statement that best describes the photograph.',
        options: [
          '(A) A barista is preparing coffee.',
          '(B) The café is being painted.',
          '(C) Customers are washing dishes.',
          '(D) The shelves are being stocked with books.',
        ],
        answer: 0,
        feedback: {
          correct: '(A) is correct: the person is preparing coffee, the main action in the photo.',
          distractors:
            '(B) no one is painting. (C) customers are not washing dishes. (D) there are no books being stocked.',
          timeHack:
            'Match the person to the clear action (preparing coffee). Eliminate options with unseen actions or objects.',
        },
      },
    ],
  },
  {
    id: 'p1-003',
    stimulus: {
      kind: 'photo',
      accent: 'Australian',
      photo: {
        url: 'https://live.staticflickr.com/65535/54880213598_a08ee4b766_b.jpg',
        title: 'Delivery van',
        license: 'pdm',
        source: 'https://www.flickr.com',
      },
      photoDescription: 'A delivery van is on a street.',
      audioScript:
        '(A) A delivery van is on the street.\n(B) A plane is taking off.\n(C) The van is being repaired in a garage.\n(D) People are boarding a train.',
    },
    questions: [
      {
        id: 'p1-003-q1',
        prompt: 'Select the statement that best describes the photograph.',
        options: [
          '(A) A delivery van is on the street.',
          '(B) A plane is taking off.',
          '(C) The van is being repaired in a garage.',
          '(D) People are boarding a train.',
        ],
        answer: 0,
        feedback: {
          correct: '(A) is correct: the photo shows a delivery van on the street.',
          distractors:
            '(B) there is no plane. (C) the van is not in a garage being repaired. (D) no train or passengers are shown.',
          timeHack:
            'Name the main object (van) and its setting (street). Reject options that introduce a different vehicle or place.',
        },
      },
    ],
  },
  {
    id: 'p1-004',
    stimulus: {
      kind: 'photo',
      accent: 'Canadian',
      photo: {
        url: 'https://live.staticflickr.com/1630/25943625961_82f5afeb30_b.jpg',
        title: 'Construction site',
        license: 'cc0',
        source: 'https://www.flickr.com',
      },
      photoDescription: 'A concrete structure is being built at a construction site.',
      audioScript:
        '(A) A structure is under construction.\n(B) The building is being demolished.\n(C) The area is covered with snow.\n(D) A garden is being planted.',
    },
    questions: [
      {
        id: 'p1-004-q1',
        prompt: 'Select the statement that best describes the photograph.',
        options: [
          '(A) A structure is under construction.',
          '(B) The building is being demolished.',
          '(C) The area is covered with snow.',
          '(D) A garden is being planted.',
        ],
        answer: 0,
        feedback: {
          correct: '(A) is correct: the photo shows a structure being built at a construction site.',
          distractors:
            '(B) the structure is being built, not demolished. (C) there is no snow. (D) no garden is being planted.',
          timeHack:
            'Distinguish "under construction" (being built) from "being demolished" (torn down). Match the state to what you see.',
        },
      },
    ],
  },
  {
    id: 'p1-005',
    stimulus: {
      kind: 'photo',
      accent: 'American',
      photo: {
        url: 'https://images.rawpixel.com/editor_1024/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDIyLTExL2ZsNTE0MjAxMjcyMDMtaW1hZ2UuanBn.jpg',
        title: 'A person talking on the phone',
        license: 'cc0',
        source: 'https://images.rawpixel.com',
      },
      photoDescription: 'A person is talking on a telephone.',
      audioScript:
        '(A) A person is talking on the phone.\n(B) A man is cooking a meal.\n(C) Someone is riding a bicycle.\n(D) A woman is painting a wall.',
    },
    questions: [
      {
        id: 'p1-005-q1',
        prompt: 'Select the statement that best describes the photograph.',
        options: [
          '(A) A person is talking on the phone.',
          '(B) A man is cooking a meal.',
          '(C) Someone is riding a bicycle.',
          '(D) A woman is painting a wall.',
        ],
        answer: 0,
        feedback: {
          correct: '(A) is correct: the person is talking on the phone — the main action shown.',
          distractors:
            '(B) cooking, (C) cycling, and (D) painting are actions not shown in the photo.',
          timeHack:
            'Lock onto the visible action (on the phone) and reject options describing entirely different activities.',
        },
      },
    ],
  },
  {
    id: 'p1-006',
    stimulus: {
      kind: 'photo',
      accent: 'British',
      photo: {
        url: 'https://images.rawpixel.com/editor_1024/czNmcy1wcml2YXRlL3Jhd3BpeGVsX2ltYWdlcy93ZWJzaXRlX2NvbnRlbnQvbHIvaXMyMzEyNC1pbWFnZS1rd3lzN25hcy5qcGc.jpg',
        title: 'Woman working on a computer',
        license: 'cc0',
        source: 'https://www.rawpixel.com/image/5968487/woman-computer-work',
      },
      photoDescription: 'A person is working at a laptop computer at a desk.',
      audioScript:
        '(A) A person is working on a laptop.\n(B) The computer screen is broken.\n(C) Someone is watering plants.\n(D) The desk has been cleared.',
    },
    questions: [
      {
        id: 'p1-006-q1',
        prompt: 'Select the statement that best describes the photograph.',
        options: [
          '(A) A person is working on a laptop.',
          '(B) The computer screen is broken.',
          '(C) Someone is watering plants.',
          '(D) The desk has been cleared.',
        ],
        answer: 0,
        feedback: {
          correct: '(A) is correct: the person is working at a laptop — the main subject and action.',
          distractors:
            '(B) the screen is in use, not broken. (C) no one is watering plants. (D) the desk is in use, not cleared.',
          timeHack:
            'Pick the option matching the clear subject + action (working on a laptop). Reject unseen states and actions.',
        },
      },
    ],
  },
];

// ─────────────────────────────────────────────────────────────────────────
// PART 2 — Question–Response (3 options)
// ─────────────────────────────────────────────────────────────────────────
const part2 = [
  {
    id: 'p2-001',
    stimulus: {
      kind: 'qr',
      accent: 'American',
      audioScript:
        'Where should I submit the reimbursement form for my business trip?\n(A) About three hundred dollars.\n(B) To the finance department on the fourth floor.\n(C) Yes, it was a productive trip.',
    },
    questions: [
      {
        id: 'p2-001-q1',
        prompt: 'Choose the best response to the question.',
        options: [
          '(A) About three hundred dollars.',
          '(B) To the finance department on the fourth floor.',
          '(C) Yes, it was a productive trip.',
        ],
        answer: 1,
        feedback: {
          correct:
            '(B) is correct: the question begins with "Where," so it requires a location. "To the finance department on the fourth floor" directly answers where to submit the form.',
          distractors:
            '(A) gives an amount — that answers "How much," not "Where." (C) is a Yes/No answer, but "Where" questions cannot be answered with Yes/No; it also echoes "trip" to bait you.',
          timeHack:
            'Lock onto the first word. "Where" → demand a place. Reject any amount, time, or Yes/No answer instantly, and distrust options that merely repeat a word ("trip") from the prompt.',
        },
      },
    ],
  },
  {
    id: 'p2-002',
    stimulus: {
      kind: 'qr',
      accent: 'British',
      audioScript:
        "Why has the shipment from our supplier been delayed?\n(A) Because of a customs inspection at the port.\n(B) The shop closes at six.\n(C) She shipped it yesterday.",
    },
    questions: [
      {
        id: 'p2-002-q1',
        prompt: 'Choose the best response to the question.',
        options: [
          '(A) Because of a customs inspection at the port.',
          '(B) The shop closes at six.',
          '(C) She shipped it yesterday.',
        ],
        answer: 0,
        feedback: {
          correct:
            '(A) is correct: a "Why" question expects a reason. "Because of a customs inspection at the port" supplies the cause of the delay.',
          distractors:
            '(B) "The shop closes at six" uses the similar sound "shop / shipment" and answers a time question instead of a reason. (C) "She shipped it yesterday" repeats the root "ship-" and gives a time, not a reason.',
          timeHack:
            '"Why" → look for "Because / Due to / To + verb." Two of the three options here are phonetic-similarity traps (shop, shipped). When you hear/see a word that sounds like the prompt, suspect a distractor rather than the answer.',
        },
      },
    ],
  },
  {
    id: 'p2-003',
    stimulus: {
      kind: 'qr',
      accent: 'Canadian',
      audioScript:
        "Would you like me to book the conference room for Tuesday or Wednesday?\n(A) Wednesday works better for the whole team.\n(B) I read the report already.\n(C) It's a very large room.",
    },
    questions: [
      {
        id: 'p2-003-q1',
        prompt: 'Choose the best response to the question.',
        options: [
          '(A) Wednesday works better for the whole team.',
          '(B) I read the report already.',
          '(C) It is a very large room.',
        ],
        answer: 0,
        feedback: {
          correct:
            '(A) is correct: this is an "A or B" alternative question. The natural reply selects one of the two options offered — "Wednesday works better."',
          distractors:
            '(B) "I read the report already" is unrelated to the choice of day. (C) "It is a very large room" echoes "room" from the prompt but does not pick a day.',
          timeHack:
            'For "X or Y" questions, the answer almost always names X or Y (or rejects both). Scan the three options for the one that selects a choice; ignore any that merely repeat a noun ("room").',
        },
      },
    ],
  },
  {
    id: 'p2-004',
    stimulus: {
      kind: 'qr',
      accent: 'Australian',
      audioScript:
        "The quarterly sales figures look stronger than expected, don't they?\n(A) Yes, marketing did an excellent job this quarter.\n(B) On the third floor.\n(C) No, I haven't sold my car.",
    },
    questions: [
      {
        id: 'p2-004-q1',
        prompt: 'Choose the best response to the statement.',
        options: [
          '(A) Yes, marketing did an excellent job this quarter.',
          '(B) On the third floor.',
          '(C) No, I have not sold my car.',
        ],
        answer: 0,
        feedback: {
          correct:
            '(A) is correct: the tag question "don\'t they?" invites agreement or disagreement. "Yes, marketing did an excellent job this quarter" agrees and adds a relevant reason.',
          distractors:
            '(B) "On the third floor" answers a "Where" question, not a tag question. (C) "No, I haven\'t sold my car" plays on "sales / sold" — a similar-sound trap — and is off-topic.',
          timeHack:
            'Tag questions ("…, don\'t they?") usually take a Yes/No answer plus supporting detail. Reject location/time answers, and watch for word-form traps (sales → sold).',
        },
      },
    ],
  },
  {
    id: 'p2-005',
    stimulus: {
      kind: 'qr',
      accent: 'American',
      audioScript:
        "Who is responsible for approving the new procurement budget?\n(A) It needs to be approved by Friday.\n(B) The chief financial officer, Ms. Tanaka.\n(C) We purchased new equipment.",
    },
    questions: [
      {
        id: 'p2-005-q1',
        prompt: 'Choose the best response to the question.',
        options: [
          '(A) It needs to be approved by Friday.',
          '(B) The chief financial officer, Ms. Tanaka.',
          '(C) We purchased new equipment.',
        ],
        answer: 1,
        feedback: {
          correct:
            '(B) is correct: "Who" asks for a person. "The chief financial officer, Ms. Tanaka" names the responsible individual.',
          distractors:
            '(A) "approved by Friday" repeats "approv-" but answers "When." (C) "purchased new equipment" relates loosely to "procurement" but names no person.',
          timeHack:
            '"Who" → a person, name, or job title. Eliminate time answers and topic-echo answers. The option containing a name or title is your fastest signal.',
        },
      },
    ],
  },
  {
    id: 'p2-006',
    stimulus: {
      kind: 'qr',
      accent: 'British',
      audioScript:
        "How soon can the IT team migrate our data to the new server?\n(A) By the end of next week.\n(B) The server room is locked.\n(C) Because the system crashed.",
    },
    questions: [
      {
        id: 'p2-006-q1',
        prompt: 'Choose the best response to the question.',
        options: [
          '(A) By the end of next week.',
          '(B) The server room is locked.',
          '(C) Because the system crashed.',
        ],
        answer: 0,
        feedback: {
          correct:
            '(A) is correct: "How soon" asks about time/duration. "By the end of next week" gives a deadline.',
          distractors:
            '(B) "The server room is locked" repeats "server" but answers neither when nor how. (C) "Because the system crashed" gives a reason, which answers "Why," not "How soon."',
          timeHack:
            '"How soon / How long / When" → a time phrase ("by," "in," "within," "next week"). Spot the time expression and confirm; treat the repeated noun "server" as bait.',
        },
      },
    ],
  },
];

// ─────────────────────────────────────────────────────────────────────────
// PART 3 — Conversations (shared audio script, multiple questions)
// ─────────────────────────────────────────────────────────────────────────
const part3 = [
  {
    id: 'p3-001',
    stimulus: {
      kind: 'conversation',
      accent: 'American / British',
      audioScript:
        'W: Hi, David. I wanted to check in about the office relocation. Have we confirmed the moving company for the fifteenth?\n' +
        "M: Almost. I've received two quotes — one is significantly cheaper, but they can't guarantee the weekend slot we need. The other is about fifteen percent more expensive but available Saturday.\n" +
        'W: Given that we cannot disrupt the workweek, let\'s prioritize availability over cost. Go with the Saturday option.\n' +
        "M: Understood. I'll send them the deposit today and forward you the inventory list so facilities can label the equipment.",
    },
    questions: [
      {
        id: 'p3-001-q1',
        prompt: 'What are the speakers mainly discussing?',
        options: [
          '(A) Hiring additional facilities staff',
          '(B) Arranging an office move',
          '(C) Purchasing new office equipment',
          '(D) Scheduling a client presentation',
        ],
        answer: 1,
        feedback: {
          correct:
            '(B) is correct: the opening line ("the office relocation") and the discussion of a moving company and a moving date establish the topic as arranging an office move.',
          distractors:
            '(A) "facilities staff" is mentioned only at the end and is not the topic. (C) "equipment" is referenced for labeling, not purchasing. (D) "client presentation" is never mentioned.',
          timeHack:
            'Gist questions are answered by the FIRST exchange. The woman names "the office relocation" immediately — answer the main-idea question from the opening two lines and move on.',
        },
      },
      {
        id: 'p3-001-q2',
        prompt: 'Why does the woman choose the more expensive option?',
        options: [
          '(A) It includes free packing materials.',
          '(B) It is available on the required day.',
          '(C) It has better customer reviews.',
          '(D) It offers a long-term contract.',
        ],
        answer: 1,
        feedback: {
          correct:
            '(B) is correct: she says "prioritize availability over cost" because the cheaper firm "can\'t guarantee the weekend slot." The deciding factor is Saturday availability.',
          distractors:
            '(A), (C), and (D) introduce reasons (packing materials, reviews, contract length) that the conversation never mentions.',
          timeHack:
            'For "Why" detail questions, find the explicit reason word — here "prioritize availability over cost." The answer paraphrases the speaker\'s stated reason, never an unstated benefit.',
        },
      },
      {
        id: 'p3-001-q3',
        prompt: 'What does the man say he will do next?',
        options: [
          '(A) Cancel the cheaper quote',
          '(B) Reschedule the move',
          '(C) Send a deposit and an inventory list',
          '(D) Contact the building manager',
        ],
        answer: 2,
        feedback: {
          correct:
            '(C) is correct: the man\'s final line states "I\'ll send them the deposit today and forward you the inventory list."',
          distractors:
            '(A) canceling the cheaper quote is implied as rejected but not stated as his next action. (B) the move is being confirmed, not rescheduled. (D) "building manager" is not mentioned ("facilities" is, but not a manager).',
          timeHack:
            '"What will the man do next?" is answered in the LAST line. Read the closing turn for a future-tense verb ("I\'ll send…") and match it.',
        },
      },
    ],
  },
  {
    id: 'p3-002',
    stimulus: {
      kind: 'conversation',
      accent: 'Canadian / Australian',
      audioScript:
        "M: Thanks for calling Brightline Logistics. I understand there's an issue with your recent delivery?\n" +
        'W: Yes, the order arrived this morning, but two of the twelve cartons were damaged in transit. The contents are unusable.\n' +
        "M: I'm very sorry about that. I can arrange a replacement shipment at no charge, and it should reach you within forty-eight hours. Could you email photos of the damaged cartons so I can process the claim?\n" +
        "W: Of course. I'll send them right after this call. Will I need the original invoice number?\n" +
        'M: Yes, please include it in the email — that lets us expedite the refund on the freight portion.',
    },
    questions: [
      {
        id: 'p3-002-q1',
        prompt: 'What is the problem the woman reports?',
        options: [
          '(A) An order was delivered to the wrong address.',
          '(B) Part of a shipment arrived damaged.',
          '(C) An invoice contained an error.',
          '(D) A delivery was never received.',
        ],
        answer: 1,
        feedback: {
          correct:
            '(B) is correct: "two of the twelve cartons were damaged in transit" identifies damaged goods as the problem.',
          distractors:
            '(A) wrong address is not mentioned. (C) the invoice is referenced only for processing the claim. (D) the order did arrive — it was not "never received."',
          timeHack:
            'Problem questions are answered right after the agent\'s opening offer to help. Listen for the customer\'s first complaint — "two cartons were damaged" — and stop.',
        },
      },
      {
        id: 'p3-002-q2',
        prompt: 'What does the man offer to do?',
        options: [
          '(A) Issue a store credit',
          '(B) Send a replacement shipment for free',
          '(C) Schedule a technician visit',
          '(D) Extend the warranty',
        ],
        answer: 1,
        feedback: {
          correct:
            '(B) is correct: "I can arrange a replacement shipment at no charge" is the offer. "At no charge" = for free.',
          distractors:
            '(A) "store credit" is not offered (a freight refund is, but that is different). (C) and (D) — technician visit and warranty are never mentioned.',
          timeHack:
            'Offers use "I can / I\'ll / Let me." Find the agent\'s "I can arrange…" line and match the paraphrase. "At no charge" → "for free" is a frequent synonym swap.',
        },
      },
      {
        id: 'p3-002-q3',
        prompt: 'What does the man ask the woman to include in her email?',
        options: [
          '(A) Her account password',
          '(B) The delivery driver’s name',
          '(C) The original invoice number',
          '(D) A signed contract',
        ],
        answer: 2,
        feedback: {
          correct:
            '(C) is correct: he confirms "please include it in the email," referring to the original invoice number she asked about.',
          distractors:
            '(A), (B), and (D) — password, driver\'s name, and a contract are never requested.',
          timeHack:
            'When a speaker asks a yes/no question ("Will I need the invoice number?") and the other says "Yes, please include it," the referenced item is the answer. Track the pronoun "it" back one line.',
        },
      },
    ],
  },
];

// ─────────────────────────────────────────────────────────────────────────
// PART 4 — Talks (single speaker)
// ─────────────────────────────────────────────────────────────────────────
const part4 = [
  {
    id: 'p4-001',
    stimulus: {
      kind: 'talk',
      accent: 'American',
      audioScript:
        "Good morning, everyone, and welcome to the orientation for new hires in the operations division. I'm Carla Mendes, head of Human Resources. " +
        "This morning we'll cover company policies and your benefits package; after lunch, your department managers will walk you through your specific responsibilities. " +
        "Before we begin, please make sure you've collected your security badge from the front desk — you'll need it to access the building and the parking garage. " +
        "If you haven't yet submitted your direct-deposit form, please see me during the break so we can ensure your first paycheck is processed on time.",
    },
    questions: [
      {
        id: 'p4-001-q1',
        prompt: 'Who most likely is the audience for this talk?',
        options: [
          '(A) Visiting clients',
          '(B) Newly hired employees',
          '(C) Department managers',
          '(D) Job applicants',
        ],
        answer: 1,
        feedback: {
          correct:
            '(B) is correct: "welcome to the orientation for new hires" identifies the audience as newly hired employees.',
          distractors:
            '(A) clients are not addressed. (C) managers are mentioned as presenters later, not the audience. (D) "applicants" have not yet been hired; these are confirmed new hires receiving badges and paychecks.',
          timeHack:
            'Audience/speaker questions are answered in the first sentence. "Orientation for new hires" → new employees. Don\'t over-think it; the greeting names the group.',
        },
      },
      {
        id: 'p4-001-q2',
        prompt: 'What will happen after lunch?',
        options: [
          '(A) A benefits seminar will be held.',
          '(B) Security badges will be distributed.',
          '(C) Managers will explain job responsibilities.',
          '(D) A building tour will take place.',
        ],
        answer: 2,
        feedback: {
          correct:
            '(C) is correct: "after lunch, your department managers will walk you through your specific responsibilities."',
          distractors:
            '(A) the benefits discussion happens in the morning, before lunch. (B) badges are collected from the front desk beforehand, not distributed after lunch. (D) a tour is not mentioned.',
          timeHack:
            'Listen for the time signal in the question ("after lunch") and find the same signal in the talk. The clause attached to that time marker is the answer.',
        },
      },
      {
        id: 'p4-001-q3',
        prompt: 'Why might a listener need to see the speaker during the break?',
        options: [
          '(A) To request a parking permit',
          '(B) To submit a direct-deposit form',
          '(C) To sign an employment contract',
          '(D) To schedule a performance review',
        ],
        answer: 1,
        feedback: {
          correct:
            '(B) is correct: "If you haven\'t yet submitted your direct-deposit form, please see me during the break."',
          distractors:
            '(A) parking is mentioned only in connection with the badge. (C) and (D) — contract signing and performance reviews are not discussed.',
          timeHack:
            'Conditional instructions ("If you haven\'t… please see me") signal a likely question. The action in the if-clause is the reason — match it directly.',
        },
      },
    ],
  },
  {
    id: 'p4-002',
    stimulus: {
      kind: 'talk',
      accent: 'British',
      audioScript:
        "You're listening to the midday business report on Radio Metro. In corporate news, Halcyon Beverages announced today that it will acquire the regional distributor Coastal Drinks for an undisclosed sum. " +
        "Analysts say the deal will expand Halcyon's footprint into three new markets and could create up to two hundred logistics jobs over the next year. " +
        "The acquisition is still subject to regulatory approval, which is expected by the end of the quarter. " +
        "We'll have a full interview with Halcyon's chief executive on tomorrow's programme. Stay tuned after the break for the latest market figures.",
    },
    questions: [
      {
        id: 'p4-002-q1',
        prompt: 'What is the main subject of the report?',
        options: [
          '(A) A company merger and acquisition',
          '(B) A new advertising campaign',
          '(C) A product recall',
          '(D) A change in interest rates',
        ],
        answer: 0,
        feedback: {
          correct:
            '(A) is correct: "Halcyon Beverages… will acquire the regional distributor Coastal Drinks" describes a corporate acquisition.',
          distractors:
            '(B) advertising is not mentioned. (C) there is no recall. (D) market figures are teased for later but are not the subject.',
          timeHack:
            'In news/broadcast talks, the headline is the first content sentence after the station ID. "Will acquire… Coastal Drinks" = an acquisition. Answer immediately.',
        },
      },
      {
        id: 'p4-002-q2',
        prompt: 'According to the speaker, what could the deal create?',
        options: [
          '(A) A new product line',
          '(B) Up to two hundred logistics jobs',
          '(C) A research facility',
          '(D) Lower consumer prices',
        ],
        answer: 1,
        feedback: {
          correct:
            '(B) is correct: "could create up to two hundred logistics jobs over the next year."',
          distractors:
            '(A), (C), (D) — product line, research facility, and lower prices are not stated as outcomes of the deal.',
          timeHack:
            'Detail questions hinge on numbers. Scan for the figure ("two hundred") and confirm what it counts ("logistics jobs"). The option repeating that exact noun phrase is the key.',
        },
      },
      {
        id: 'p4-002-q3',
        prompt: 'What does the speaker say listeners can expect tomorrow?',
        options: [
          '(A) A live concert broadcast',
          '(B) Updated weather information',
          '(C) An interview with a chief executive',
          '(D) A traffic report',
        ],
        answer: 2,
        feedback: {
          correct:
            '(C) is correct: "We\'ll have a full interview with Halcyon\'s chief executive on tomorrow\'s programme."',
          distractors:
            '(A), (B), (D) — concert, weather, and traffic are never mentioned.',
          timeHack:
            'Future-plan questions ("tomorrow," "next week") map to a future-tense clause near the end of the talk ("We\'ll have…"). Read the closing announcements for the match.',
        },
      },
    ],
  },
];

// ─────────────────────────────────────────────────────────────────────────
// PART 5 — Incomplete Sentences
// Each item is tagged internally as grammar-based or vocabulary-based.
// ─────────────────────────────────────────────────────────────────────────
const part5 = [
  {
    id: 'p5-001',
    stimulus: { kind: 'sentence', drillType: 'Grammar (word form)' },
    questions: [
      {
        id: 'p5-001-q1',
        prompt:
          'The board of directors will review the proposal ______ before making a final investment decision.',
        options: ['(A) thorough', '(B) thoroughly', '(C) thoroughness', '(D) thoroughest'],
        answer: 1,
        feedback: {
          correct:
            '(B) "thoroughly" is correct: the blank modifies the verb "review," so an adverb is required. "Review thoroughly" = review in a thorough manner.',
          distractors:
            '(A) "thorough" is an adjective (modifies nouns, not verbs). (C) "thoroughness" is a noun and cannot modify a verb. (D) "thoroughest" is not a standard form ("most thorough" would be the superlative).',
          timeHack:
            'GRAMMAR item: look only at what touches the blank. A verb ("review") before the blank → choose the adverb (–ly). You never need to translate the whole sentence.',
        },
      },
    ],
  },
  {
    id: 'p5-002',
    stimulus: { kind: 'sentence', drillType: 'Grammar (preposition)' },
    questions: [
      {
        id: 'p5-002-q1',
        prompt:
          'All expense reports must be submitted ______ the last business day of the month.',
        options: ['(A) by', '(B) until', '(C) during', '(D) among'],
        answer: 0,
        feedback: {
          correct:
            '(A) "by" is correct: "by + deadline" means no later than that point. Reports submitted by the last business day meet the deadline.',
          distractors:
            '(B) "until" describes a continuous action up to a point ("wait until"), not a deadline for a one-time action. (C) "during" needs a period, not a single day-point used as a cutoff. (D) "among" is used with three or more items, not time.',
          timeHack:
            'GRAMMAR item: "submit ______ [deadline]" → "by" signals a deadline; "until" signals duration. Memorize the by/until split and decide in seconds.',
        },
      },
    ],
  },
  {
    id: 'p5-003',
    stimulus: { kind: 'sentence', drillType: 'Vocabulary (collocation)' },
    questions: [
      {
        id: 'p5-003-q1',
        prompt:
          'The marketing team conducted extensive research to better understand consumer ______ before launching the product.',
        options: ['(A) behavior', '(B) building', '(C) balance', '(D) boundary'],
        answer: 0,
        feedback: {
          correct:
            '(A) "behavior" is correct: "consumer behavior" is a fixed marketing collocation meaning how customers act and decide.',
          distractors:
            '(B) "consumer building," (C) "consumer balance," and (D) "consumer boundary" are not natural collocations and carry no relevant meaning here.',
          timeHack:
            'VOCABULARY item: when all four options are the same part of speech (nouns), it is a meaning test. Scan for the collocation partner — "consumer ______" → "behavior." Trust common business word-pairs.',
        },
      },
    ],
  },
  {
    id: 'p5-004',
    stimulus: { kind: 'sentence', drillType: 'Grammar (verb tense)' },
    questions: [
      {
        id: 'p5-004-q1',
        prompt:
          'By the time the auditors arrive next week, the finance team ______ all of the quarterly statements.',
        options: [
          '(A) completes',
          '(B) will have completed',
          '(C) had completed',
          '(D) is completing',
        ],
        answer: 1,
        feedback: {
          correct:
            '(B) "will have completed" is correct: "By the time + [future event]" requires the future perfect to show an action finished before that future moment.',
          distractors:
            '(A) simple present does not express completion before a future point. (C) past perfect is for the past, but "next week" is future. (D) present continuous shows an ongoing action, not a completed one.',
          timeHack:
            'GRAMMAR item: the time clue "By the time … next week" forces future perfect ("will have + p.p."). Match the time signal to the tense — no full translation needed.',
        },
      },
    ],
  },
  {
    id: 'p5-005',
    stimulus: { kind: 'sentence', drillType: 'Vocabulary (word choice)' },
    questions: [
      {
        id: 'p5-005-q1',
        prompt:
          'Because the supplier consistently meets its deadlines, the procurement manager considers it a highly ______ partner.',
        options: ['(A) reliable', '(B) readable', '(C) reasonable', '(D) renewable'],
        answer: 0,
        feedback: {
          correct:
            '(A) "reliable" is correct: a supplier that "consistently meets its deadlines" is dependable, i.e., reliable. The context clause defines the meaning.',
          distractors:
            '(B) "readable" applies to text. (C) "reasonable" usually describes prices or requests, not deadline performance. (D) "renewable" describes resources/contracts. All sound similar but fit different contexts.',
          timeHack:
            'VOCABULARY item: read the cause clause ("consistently meets its deadlines") — it defines the missing adjective. Pick the synonym (reliable). Reject look-alike words (readable, renewable).',
        },
      },
    ],
  },
  {
    id: 'p5-006',
    stimulus: { kind: 'sentence', drillType: 'Grammar (pronoun)' },
    questions: [
      {
        id: 'p5-006-q1',
        prompt:
          'Employees who wish to enroll in the training program should register ______ through the online portal.',
        options: ['(A) they', '(B) them', '(C) themselves', '(D) their'],
        answer: 2,
        feedback: {
          correct:
            '(C) "themselves" is correct: "register themselves" uses the reflexive pronoun because the subject (employees) and object are the same people.',
          distractors:
            '(A) "they" is a subject pronoun and cannot follow the verb as an object. (B) "them" would refer to different people, breaking the self-reference. (D) "their" is possessive and cannot stand as the object of "register."',
          timeHack:
            'GRAMMAR item: subject and object are the same → reflexive (–self/–selves). When the doer acts on the doer, choose "themselves."',
        },
      },
    ],
  },
  {
    id: 'p5-007',
    stimulus: { kind: 'sentence', drillType: 'Grammar (conjunction)' },
    questions: [
      {
        id: 'p5-007-q1',
        prompt:
          '______ the renovation is complete, the customer service center will reopen with extended hours.',
        options: ['(A) Despite', '(B) Once', '(C) During', '(D) In spite of'],
        answer: 1,
        feedback: {
          correct:
            '(B) "Once" is correct: it is a conjunction meaning "as soon as," correctly joining the two clauses ("the renovation is complete" / "the center will reopen").',
          distractors:
            '(A) "Despite" and (D) "In spite of" are prepositions that take a noun, not a full clause. (C) "During" is also a preposition needing a noun phrase, not a clause with a verb.',
          timeHack:
            'GRAMMAR item: is the blank followed by a full clause (subject + verb) or a noun? Clause → use a conjunction ("Once"); noun → use a preposition. Check what follows the blank first.',
        },
      },
    ],
  },
  {
    id: 'p5-008',
    stimulus: { kind: 'sentence', drillType: 'Vocabulary (verb collocation)' },
    questions: [
      {
        id: 'p5-008-q1',
        prompt:
          'The new compliance guidelines ______ all departments to document their data-handling procedures.',
        options: ['(A) require', '(B) inquire', '(C) acquire', '(D) admire'],
        answer: 0,
        feedback: {
          correct:
            '(A) "require" is correct: "require + [someone] + to + verb" means to make something mandatory. Guidelines require departments to document procedures.',
          distractors:
            '(B) "inquire" means to ask and does not take this structure. (C) "acquire" means to obtain. (D) "admire" means to regard highly. All rhyme with the key but carry unrelated meanings.',
          timeHack:
            'VOCABULARY item: the structure "______ [someone] to [verb]" only fits verbs like require/ask/allow. Use the grammatical pattern plus meaning; ignore the rhyming distractors.',
        },
      },
    ],
  },
  {
    id: 'p5-009',
    stimulus: { kind: 'sentence', drillType: 'Grammar (comparative)' },
    questions: [
      {
        id: 'p5-009-q1',
        prompt:
          'This year’s logistics costs were considerably ______ than the figures projected in the original budget.',
        options: ['(A) high', '(B) higher', '(C) highest', '(D) highly'],
        answer: 1,
        feedback: {
          correct:
            '(B) "higher" is correct: the word "than" signals a comparison between two things, which requires the comparative form "higher."',
          distractors:
            '(A) "high" is the base form, used with no comparison. (C) "highest" is the superlative (three or more) and does not pair with "than." (D) "highly" is an adverb meaning "very," not a comparison.',
          timeHack:
            'GRAMMAR item: spot "than." "than" = comparative (–er / more). The presence of "than" alone tells you the answer before reading the sentence.',
        },
      },
    ],
  },
  {
    id: 'p5-010',
    stimulus: { kind: 'sentence', drillType: 'Vocabulary (noun choice)' },
    questions: [
      {
        id: 'p5-010-q1',
        prompt:
          'Due to an unexpected ______ in demand, the factory had to add a second production shift.',
        options: ['(A) surge', '(B) source', '(C) search', '(D) surface'],
        answer: 0,
        feedback: {
          correct:
            '(A) "surge" is correct: a "surge in demand" is a sudden sharp increase — exactly what would force an extra shift.',
          distractors:
            '(B) "source," (C) "search," and (D) "surface" are phonetically similar but do not collocate with "in demand" to mean an increase.',
          timeHack:
            'VOCABULARY item: the effect ("add a second shift") implies the cause is rising demand. "Surge in demand" is the standard collocation; reject the sound-alikes.',
        },
      },
    ],
  },
  {
    id: 'p5-011',
    stimulus: { kind: 'sentence', drillType: 'Grammar (relative pronoun)' },
    questions: [
      {
        id: 'p5-011-q1',
        prompt:
          'The keynote speaker, ______ presentation on supply-chain resilience drew a standing ovation, will return next year.',
        options: ['(A) who', '(B) whose', '(C) which', '(D) whom'],
        answer: 1,
        feedback: {
          correct:
            '(B) "whose" is correct: it shows possession — the presentation belongs to the speaker. "whose presentation" links the noun to its owner.',
          distractors:
            '(A) "who" is a subject pronoun, not possessive, and cannot directly precede the noun "presentation." (C) "which" refers to things and is not possessive. (D) "whom" is an object pronoun and cannot show possession.',
          timeHack:
            'GRAMMAR item: blank directly followed by a NOUN ("presentation") with a possession relationship → "whose." The noun-after-blank pattern is the giveaway.',
        },
      },
    ],
  },
  {
    id: 'p5-012',
    stimulus: { kind: 'sentence', drillType: 'Vocabulary (adverb choice)' },
    questions: [
      {
        id: 'p5-012-q1',
        prompt:
          'The merger negotiations are proceeding ______, and both parties expect to sign within the month.',
        options: ['(A) smoothly', '(B) hardly', '(C) rarely', '(D) barely'],
        answer: 0,
        feedback: {
          correct:
            '(A) "smoothly" is correct: the positive context ("expect to sign within the month") signals that negotiations are going well — proceeding smoothly.',
          distractors:
            '(B) "hardly," (C) "rarely," and (D) "barely" are negative/frequency adverbs that contradict the optimistic outcome described in the second clause.',
          timeHack:
            'VOCABULARY item: read the second clause for tone. A positive result ("expect to sign soon") needs a positive adverb. Eliminate negative adverbs (hardly/barely/rarely) at a glance.',
        },
      },
    ],
  },
];

// ─────────────────────────────────────────────────────────────────────────
// PART 6 — Text Completion (passage with 4 blanks; one requires a sentence)
// ─────────────────────────────────────────────────────────────────────────
const part6 = [
  {
    id: 'p6-001',
    stimulus: {
      kind: 'passage',
      passages: [
        {
          type: 'Email',
          heading: 'To: All Staff — From: Facilities Management — Subject: Parking Garage Closure',
          text:
            'Please be advised that the east parking garage will be temporarily closed for resurfacing from June 3 to June 7. During this period, employees are encouraged to use the west garage, which has ample capacity. [1] We apologize for any inconvenience this may [2].\n\n' +
            'To help manage the increased volume, the shuttle service between the west garage and the main lobby will run [3] every ten minutes during peak hours. Employees who require accessible parking should contact Facilities in [4], and reserved spaces will be arranged in the west garage.',
        },
      ],
    },
    questions: [
      {
        id: 'p6-001-q1',
        prompt: 'Blank [1]',
        options: [
          '(A) The new café will open on the ground floor.',
          '(B) Additional bicycle racks have also been installed there for your convenience.',
          '(C) The annual audit will begin next quarter.',
          '(D) Visitors must register at the front desk.',
        ],
        answer: 1,
        feedback: {
          correct:
            '(B) is correct: this is the sentence-insertion blank. It maintains cohesion by adding more information about the west garage ("there"), supporting the instruction to use it.',
          distractors:
            '(A) a café opening is off-topic. (C) an audit is unrelated to parking. (D) visitor registration does not connect to the garage-closure context or the pronoun chain.',
          timeHack:
            'SENTENCE blank: choose the option whose pronoun/reference ("there") points back to the topic just mentioned (the west garage). Cohesion with the previous sentence beats stand-alone plausibility.',
        },
      },
      {
        id: 'p6-001-q2',
        prompt: 'Blank [2]',
        options: ['(A) cause', '(B) causes', '(C) caused', '(D) causing'],
        answer: 0,
        feedback: {
          correct:
            '(A) "cause" is correct: after the modal "may," the base form of the verb is required ("may cause").',
          distractors:
            '(B) "causes" is third-person singular present, not used after a modal. (C) "caused" is past/participle. (D) "causing" is the –ing form, also wrong after "may."',
          timeHack:
            'GRAMMAR blank: modal ("may") + ______ → base verb. Confirm in two seconds without reading the whole sentence.',
        },
      },
      {
        id: 'p6-001-q3',
        prompt: 'Blank [3]',
        options: ['(A) rarely', '(B) frequently', '(C) reluctantly', '(D) previously'],
        answer: 1,
        feedback: {
          correct:
            '(B) "frequently" is correct: "every ten minutes during peak hours" describes a high frequency, so "run frequently" fits the context logically.',
          distractors:
            '(A) "rarely" contradicts "every ten minutes." (C) "reluctantly" describes attitude, not schedule. (D) "previously" refers to the past, but the shuttle change is current/ongoing.',
          timeHack:
            'VOCABULARY blank: the detail "every ten minutes" defines the adverb — high frequency → "frequently." Let the nearby number set the meaning.',
        },
      },
      {
        id: 'p6-001-q4',
        prompt: 'Blank [4]',
        options: ['(A) advance', '(B) advanced', '(C) advancement', '(D) advancing'],
        answer: 0,
        feedback: {
          correct:
            '(A) "advance" is correct: "in advance" is a fixed prepositional phrase meaning beforehand.',
          distractors:
            '(B) "advanced" is an adjective ("advanced course"). (C) "advancement" means promotion/progress. (D) "advancing" is a verb form. Only the noun "advance" completes the idiom "in advance."',
          timeHack:
            'GRAMMAR/IDIOM blank: recognize the fixed phrase "in ______" → "in advance." Idioms are memorized chunks; don\'t analyze, just match.',
        },
      },
    ],
  },
  {
    id: 'p6-002',
    stimulus: {
      kind: 'passage',
      passages: [
        {
          type: 'Memo',
          heading: 'INTERNAL MEMO — Re: New Expense Reimbursement System',
          text:
            'Beginning next month, the company will transition to a fully digital expense reimbursement system. All employees will be required to submit receipts [1] through the new mobile application rather than by paper form.\n\n' +
            'The finance department believes this change will significantly reduce processing time. [2] Training sessions will be offered twice a week throughout the month so that everyone can become [3] with the platform. If you have questions before the rollout, the help desk is [4] available at extension 4500.',
        },
      ],
    },
    questions: [
      {
        id: 'p6-002-q1',
        prompt: 'Blank [1]',
        options: ['(A) electronics', '(B) electronic', '(C) electronically', '(D) electronical'],
        answer: 2,
        feedback: {
          correct:
            '(C) "electronically" is correct: the blank modifies the verb "submit," so an adverb is needed ("submit electronically").',
          distractors:
            '(A) "electronics" is a noun. (B) "electronic" is an adjective. (D) "electronical" is not a word. Only the adverb modifies the verb.',
          timeHack:
            'GRAMMAR blank: verb before the blank ("submit") → adverb (–ly). Eliminate the noun and adjective instantly.',
        },
      },
      {
        id: 'p6-002-q2',
        prompt: 'Blank [2]',
        options: [
          '(A) Last year’s holiday party was a great success.',
          '(B) It will also create a clear digital record of every transaction.',
          '(C) Parking permits must be renewed annually.',
          '(D) The cafeteria will close for renovations.',
        ],
        answer: 1,
        feedback: {
          correct:
            '(B) is correct: it continues the benefit theme ("reduce processing time" → "also create a clear digital record"), keeping the paragraph cohesive with the additive signal "also."',
          distractors:
            '(A), (C), and (D) introduce unrelated topics (a party, parking, the cafeteria) that break the discussion of the new expense system.',
          timeHack:
            'SENTENCE blank: look for the additive link. The previous sentence states one benefit; the answer with "also" extends the SAME idea. Topic continuity is the test.',
        },
      },
      {
        id: 'p6-002-q3',
        prompt: 'Blank [3]',
        options: ['(A) familiar', '(B) familiarity', '(C) familiarize', '(D) familiarly'],
        answer: 0,
        feedback: {
          correct:
            '(A) "familiar" is correct: "become familiar with" is the standard pattern — a linking verb ("become") takes an adjective complement.',
          distractors:
            '(B) "familiarity" is a noun. (C) "familiarize" is a verb (you familiarize yourself). (D) "familiarly" is an adverb. After "become," use the adjective.',
          timeHack:
            'GRAMMAR blank: linking verb ("become") + ______ + "with" → adjective ("familiar"). Recognize "become familiar with" as a set frame.',
        },
      },
      {
        id: 'p6-002-q4',
        prompt: 'Blank [4]',
        options: ['(A) readily', '(B) ready', '(C) readiness', '(D) readied'],
        answer: 0,
        feedback: {
          correct:
            '(A) "readily" is correct: it is an adverb modifying "available" ("readily available" = easily available).',
          distractors:
            '(B) "ready" is an adjective and would not idiomatically pair here to modify "available." (C) "readiness" is a noun. (D) "readied" is a past-tense verb.',
          timeHack:
            'GRAMMAR blank: "______ available" — an adjective ("available") needs an adverb in front. "Readily available" is also a high-frequency collocation worth memorizing.',
        },
      },
    ],
  },
];

// ─────────────────────────────────────────────────────────────────────────
// PART 7 — Reading Comprehension (single, double, triple passages)
// ─────────────────────────────────────────────────────────────────────────
const part7 = [
  {
    id: 'p7-single-001',
    stimulus: {
      kind: 'reading',
      label: 'Single Passage',
      passages: [
        {
          type: 'Advertisement',
          heading: 'VERTEX COWORKING — Now Open in the Riverside District',
          text:
            'Vertex Coworking offers flexible workspace solutions for freelancers, startups, and established teams. Choose from three membership tiers:\n\n' +
            '• HOT DESK ($150/month): Access to shared open-plan seating, 9 a.m.–6 p.m., Monday to Friday.\n' +
            '• DEDICATED DESK ($280/month): Your own reserved desk with 24/7 building access and a personal locker.\n' +
            '• PRIVATE OFFICE (from $600/month): A lockable room for up to four people, including unlimited meeting-room credits.\n\n' +
            'All memberships include high-speed internet, complimentary coffee, and access to our monthly networking events. Sign up before the end of the month and receive your first two weeks free. Tours are available daily; email tours@vertexcowork.com to book.',
        },
      ],
    },
    questions: [
      {
        id: 'p7-single-001-q1',
        prompt: 'What is indicated about all membership tiers?',
        options: [
          '(A) They provide 24-hour building access.',
          '(B) They include high-speed internet.',
          '(C) They come with a personal locker.',
          '(D) They are limited to four people.',
        ],
        answer: 1,
        feedback: {
          correct:
            '(B) is correct: "All memberships include high-speed internet, complimentary coffee, and access to our monthly networking events." The word "All" makes this true for every tier.',
          distractors:
            '(A) 24/7 access is listed only for Dedicated Desk and Private Office, not the Hot Desk. (C) the locker is a Dedicated Desk feature. (D) the four-person limit applies only to the Private Office.',
          timeHack:
            'For "all/every" questions, scan for the keyword "All" in the passage — the sentence after it lists the universal features. Features attached to a single bullet are traps.',
        },
      },
      {
        id: 'p7-single-001-q2',
        prompt: 'How can a prospective member receive two free weeks?',
        options: [
          '(A) By referring a friend',
          '(B) By signing up before the end of the month',
          '(C) By booking a tour online',
          '(D) By choosing the Private Office tier',
        ],
        answer: 1,
        feedback: {
          correct:
            '(B) is correct: "Sign up before the end of the month and receive your first two weeks free."',
          distractors:
            '(A) referrals are not mentioned. (C) booking a tour is how you visit, not how you get the discount. (D) the offer is not tied to a specific tier.',
          timeHack:
            'Scan for the offer language ("free," "discount," "receive"). The conditional clause right before it ("Sign up before…") is the requirement. Match keywords, don\'t read top to bottom.',
        },
      },
    ],
  },
  {
    id: 'p7-double-001',
    stimulus: {
      kind: 'reading',
      label: 'Double Passage',
      passages: [
        {
          type: 'Email 1',
          heading:
            'To: Priya Nair (Events) — From: Marcus Lee (Sales) — Subject: Annual Client Appreciation Dinner',
          text:
            'Hi Priya,\n\nWe are planning our annual client appreciation dinner for the second week of November. We expect approximately 80 guests this year, up from 60 last year. We will need a venue with a private dining room, audiovisual equipment for a short presentation, and a vegetarian menu option.\n\n' +
            'Our budget is $9,000, which should cover the venue, catering, and AV. Could you shortlist two or three venues and send me availability for the week of November 10? We would prefer a Thursday evening if possible.\n\nThanks,\nMarcus',
        },
        {
          type: 'Email 2',
          heading: 'To: Marcus Lee — From: Priya Nair — Subject: RE: Annual Client Appreciation Dinner',
          text:
            'Hi Marcus,\n\nI have found two strong options for Thursday, November 13:\n\n' +
            '1. The Garden Pavilion — private room for up to 100 guests, in-house AV, full vegetarian menu. Quote: $8,400.\n' +
            '2. Riverside Hall — capacity 90, but AV must be rented separately ($700 extra), vegetarian menu available. Base quote: $7,500.\n\n' +
            'Both are available on the 13th. The Garden Pavilion fits everything within budget without add-ons, so I would recommend it, but let me know your preference and I will confirm by Friday.\n\nBest,\nPriya',
        },
      ],
    },
    questions: [
      {
        id: 'p7-double-001-q1',
        prompt: 'How many guests are expected at this year’s dinner?',
        options: ['(A) 60', '(B) 80', '(C) 90', '(D) 100'],
        answer: 1,
        feedback: {
          correct:
            '(B) 80 is correct: Marcus writes "We expect approximately 80 guests this year, up from 60 last year."',
          distractors:
            '(A) 60 was LAST year\'s figure — a classic number-swap trap. (C) 90 is Riverside Hall\'s capacity. (D) 100 is the Garden Pavilion\'s capacity. The capacities are venue limits, not the guest count.',
          timeHack:
            'Number questions invite swap traps: this year vs. last year, expected vs. capacity. Re-read the clause around the number to confirm WHICH quantity it is before selecting.',
        },
      },
      {
        id: 'p7-double-001-q2',
        prompt: 'Why does Priya recommend the Garden Pavilion?',
        options: [
          '(A) It is the closest to the office.',
          '(B) It fits all requirements within budget without add-ons.',
          '(C) It is available on more dates.',
          '(D) It offers a larger discount.',
        ],
        answer: 1,
        feedback: {
          correct:
            '(B) is correct: "The Garden Pavilion fits everything within budget without add-ons, so I would recommend it."',
          distractors:
            '(A) location/distance is never mentioned. (C) both venues are available on the same date (the 13th). (D) no discount is described — the Pavilion is simply within budget.',
          timeHack:
            'For "why recommend" questions, find the recommendation verb ("I would recommend") and read the clause attached with "because/so/since." The stated reason is the answer.',
        },
      },
      {
        id: 'p7-double-001-q3',
        prompt:
          'According to the emails, what is true about Riverside Hall? (This requires combining information from both messages.)',
        options: [
          '(A) It cannot accommodate the expected number of guests.',
          '(B) Its total cost with AV would still be under the stated budget.',
          '(C) It does not offer a vegetarian menu.',
          '(D) It is unavailable on November 13.',
        ],
        answer: 1,
        feedback: {
          correct:
            '(B) is correct: combining both emails — Riverside Hall\'s base quote is $7,500 plus $700 for AV = $8,200, which is still under Marcus\'s $9,000 budget (Email 1).',
          distractors:
            '(A) its capacity (90) exceeds the 80 expected guests. (C) "vegetarian menu available" is stated. (D) it is available on the 13th. Only (B) survives a cross-passage check.',
          timeHack:
            'Cross-reference questions pull a number from one passage (budget $9,000) and apply it to another ($7,500 + $700). When a question says "according to the emails," expect to add or compare figures across both texts.',
        },
      },
    ],
  },
  {
    id: 'p7-triple-001',
    stimulus: {
      kind: 'reading',
      label: 'Triple Passage',
      passages: [
        {
          type: 'Web Page',
          heading: 'Summit Professional Development — Workshop Catalog (Autumn)',
          text:
            'All workshops run 9:00 a.m.–12:00 p.m. and cost $120 per participant. Members of the Summit Alliance receive a 25% discount.\n\n' +
            '• Oct 5 — Effective Business Writing (Room A)\n' +
            '• Oct 12 — Data Visualization Basics (Room B)\n' +
            '• Oct 19 — Negotiation Skills (Room A)\n' +
            '• Oct 26 — Project Management Fundamentals (Room C)\n\n' +
            'To register, complete the online form. Groups of five or more from the same organization should contact our coordinator for special rates.',
        },
        {
          type: 'Email',
          heading:
            'To: Workshops Coordinator — From: Tomás Rivera (Northwind Inc.) — Subject: Group Registration',
          text:
            'Hello,\n\nI would like to register six employees from Northwind Inc. for the Negotiation Skills workshop. We are not Summit Alliance members. Please let me know whether a group rate applies for six participants and how to proceed with payment.\n\nWe would also like to reserve seating near the front, if possible.\n\nRegards,\nTomás Rivera',
        },
        {
          type: 'Email Reply',
          heading: 'To: Tomás Rivera — From: Workshops Coordinator — Subject: RE: Group Registration',
          text:
            'Dear Mr. Rivera,\n\nThank you for your interest. For groups of five or more, we apply a flat rate of $90 per participant, regardless of membership status. For your six employees, the total would therefore be $540.\n\n' +
            'I have noted your request for front-row seating in Room A and will confirm it once payment is received. You may pay by company invoice or credit card. Please reply with your preferred method.\n\nKind regards,\nDana Cho, Workshops Coordinator',
        },
      ],
    },
    questions: [
      {
        id: 'p7-triple-001-q1',
        prompt: 'On what date will Mr. Rivera’s employees attend their workshop?',
        options: ['(A) October 5', '(B) October 12', '(C) October 19', '(D) October 26'],
        answer: 2,
        feedback: {
          correct:
            '(C) October 19 is correct: Tomás registers for "Negotiation Skills" (Email 2), and the catalog (Web Page) lists Negotiation Skills on Oct 19.',
          distractors:
            '(A) Oct 5 is Business Writing, (B) Oct 12 is Data Visualization, (D) Oct 26 is Project Management — none of which he selected.',
          timeHack:
            'Triple-passage link: the email names the WORKSHOP; the catalog supplies the DATE. Identify the workshop first, then jump to the catalog list to read off the date.',
        },
      },
      {
        id: 'p7-triple-001-q2',
        prompt: 'Why is the group charged $90 per person rather than $120?',
        options: [
          '(A) They are Summit Alliance members.',
          '(B) They registered early.',
          '(C) They qualify for the group rate of five or more.',
          '(D) They paid by company invoice.',
        ],
        answer: 2,
        feedback: {
          correct:
            '(C) is correct: the catalog says groups of five or more get special rates, and Dana confirms "$90 per participant" "regardless of membership status." Six employees meet the five-or-more threshold.',
          distractors:
            '(A) Tomás explicitly says "We are not Summit Alliance members," so the 25% member discount does not apply. (B) early registration is not mentioned. (D) payment method does not affect the rate.',
          timeHack:
            'Beware the member-discount distractor: the passage gives TWO price reductions (member 25% vs. group flat rate). The email rules out membership, so the group rate must be the reason. Eliminate the discount the text explicitly denies.',
        },
      },
      {
        id: 'p7-triple-001-q3',
        prompt: 'What does Dana Cho ask Mr. Rivera to do?',
        options: [
          '(A) Confirm the number of participants',
          '(B) Indicate his preferred payment method',
          '(C) Choose a different workshop',
          '(D) Become a Summit Alliance member',
        ],
        answer: 1,
        feedback: {
          correct:
            '(B) is correct: "You may pay by company invoice or credit card. Please reply with your preferred method."',
          distractors:
            '(A) the count of six is already established. (C) no workshop change is requested. (D) she states the rate applies "regardless of membership," so she does not ask him to join.',
          timeHack:
            'Requests are usually in the final paragraph ("Please reply…"). For "what does X ask," read the closing lines of the relevant message for an imperative or "please" sentence.',
        },
      },
    ],
  },
];

// ─────────────────────────────────────────────────────────────────────────
// EXTRA ORIGINAL CONTENT — additional authentic-style items (all parts)
// ─────────────────────────────────────────────────────────────────────────
const extraPart2 = [
  {
    id: 'p2-007',
    stimulus: {
      kind: 'qr',
      accent: 'Canadian',
      audioScript:
        'Which courier should we use for the international shipment?\n(A) The express service, since it clears customs faster.\n(B) Yes, it arrived on time.\n(C) In the loading dock.',
    },
    questions: [
      {
        id: 'p2-007-q1',
        prompt: 'Choose the best response to the question.',
        options: [
          '(A) The express service, since it clears customs faster.',
          '(B) Yes, it arrived on time.',
          '(C) In the loading dock.',
        ],
        answer: 0,
        feedback: {
          correct:
            '(A) is correct: "Which courier…" asks you to identify one option, and "the express service" names it with a relevant reason (faster customs clearance).',
          distractors:
            '(B) is a Yes/No answer, but "Which" questions cannot be answered with Yes/No. (C) "In the loading dock" answers "Where," not "Which courier."',
          timeHack:
            '"Which + noun" → pick the option that names one of the items. Reject Yes/No and location answers instantly.',
        },
      },
    ],
  },
  {
    id: 'p2-008',
    stimulus: {
      kind: 'qr',
      accent: 'Australian',
      audioScript:
        "Let's postpone the product launch until the marketing materials are ready.\n(A) That sounds sensible — a short delay beats a rushed launch.\n(B) The market was very crowded today.\n(C) They launched the boat last spring.",
    },
    questions: [
      {
        id: 'p2-008-q1',
        prompt: 'Choose the best response to the statement.',
        options: [
          '(A) That sounds sensible — a short delay beats a rushed launch.',
          '(B) The market was very crowded today.',
          '(C) They launched the boat last spring.',
        ],
        answer: 0,
        feedback: {
          correct:
            '(A) is correct: the statement is a suggestion ("Let\'s postpone…"), so the natural reply agrees or disagrees. "That sounds sensible…" agrees and gives a reason.',
          distractors:
            '(B) plays on "marketing / market" (a similar-word trap) and is off-topic. (C) plays on "launch / launched" (a similar-sound trap) and is unrelated.',
          timeHack:
            'For "Let\'s…" suggestions, expect agreement or disagreement. Distrust options that echo a prompt word with a different meaning (market, launched).',
        },
      },
    ],
  },
];

const extraPart3 = [
  {
    id: 'p3-003',
    stimulus: {
      kind: 'conversation',
      accent: 'American / British',
      audioScript:
        'M: Sandra, our contract with the current cleaning vendor expires at the end of the month. Should we renew it?\n' +
        "W: I've had a few complaints from staff about inconsistent service lately, so I'm hesitant. I think we should request quotes from two other providers first.\n" +
        "M: That makes sense. If we do switch, we'll need the new vendor to start with no gap in service.\n" +
        "W: Agreed. I'll send out the requests for quotes today and ask each provider how soon they could begin. Let's review the options at Friday's operations meeting.",
    },
    questions: [
      {
        id: 'p3-003-q1',
        prompt: 'What are the speakers discussing?',
        options: [
          '(A) Whether to renew a service contract',
          '(B) Hiring additional cleaning staff',
          '(C) Relocating their offices',
          '(D) Purchasing cleaning equipment',
        ],
        answer: 0,
        feedback: {
          correct:
            '(A) is correct: the man opens by noting the cleaning vendor\'s contract expires and asks "Should we renew it?" — the topic is whether to renew the contract.',
          distractors:
            '(B) hiring staff is not discussed (they consider outside vendors). (C) relocation and (D) buying equipment are never mentioned.',
          timeHack:
            'The first speaker\'s question sets the topic: "contract… expires… Should we renew it?" Answer the gist from the opening lines.',
        },
      },
      {
        id: 'p3-003-q2',
        prompt: 'Why is the woman hesitant to renew?',
        options: [
          '(A) The vendor raised its prices.',
          '(B) Staff have complained about inconsistent service.',
          '(C) The contract terms are unclear.',
          '(D) The vendor is going out of business.',
        ],
        answer: 1,
        feedback: {
          correct:
            '(B) is correct: she says "I\'ve had a few complaints from staff about inconsistent service lately, so I\'m hesitant."',
          distractors:
            '(A) price increases, (C) unclear terms, and (D) the vendor closing are not mentioned. Her stated reason is service quality.',
          timeHack:
            'Find the reason marker ("so I\'m hesitant") and read the clause before it — the cause the speaker states is the answer.',
        },
      },
      {
        id: 'p3-003-q3',
        prompt: 'What will the woman do today?',
        options: [
          '(A) Sign the renewal',
          '(B) Cancel the current contract',
          '(C) Send out requests for quotes',
          '(D) Interview new employees',
        ],
        answer: 2,
        feedback: {
          correct:
            '(C) is correct: "I\'ll send out the requests for quotes today and ask each provider how soon they could begin."',
          distractors:
            '(A) and (B) — no decision to sign or cancel has been made. (D) interviewing employees is unrelated.',
          timeHack:
            '"What will she do today?" → find the future-tense clause with the marker "today" ("I\'ll send… today").',
        },
      },
    ],
  },
];

const extraPart4 = [
  {
    id: 'p4-003',
    stimulus: {
      kind: 'talk',
      accent: 'Canadian',
      audioScript:
        "Hello, this is a message for the IT department from Datacore Systems, your cloud hosting provider. " +
        "We're calling to inform you of scheduled maintenance on our servers this Saturday, from one to four a.m. Eastern Time. " +
        "During this window, your company's hosted applications may be temporarily unavailable. " +
        "We recommend notifying your staff in advance and avoiding any large data uploads during that period. " +
        "If you have questions or need to request a different maintenance window, please contact your account manager before Thursday. Thank you.",
    },
    questions: [
      {
        id: 'p4-003-q1',
        prompt: 'What is the purpose of the message?',
        options: [
          '(A) To announce scheduled server maintenance',
          '(B) To offer a new hosting plan',
          '(C) To report a security breach',
          '(D) To confirm a payment',
        ],
        answer: 0,
        feedback: {
          correct:
            '(A) is correct: "We\'re calling to inform you of scheduled maintenance on our servers this Saturday."',
          distractors:
            '(B) no new plan is offered. (C) there is no security breach. (D) no payment is mentioned.',
          timeHack:
            'Purpose questions are answered right after the greeting/identification — listen for "We\'re calling to…".',
        },
      },
      {
        id: 'p4-003-q2',
        prompt: 'What does the speaker recommend listeners do?',
        options: [
          '(A) Upgrade their servers',
          '(B) Notify staff and avoid large uploads',
          '(C) Reset their passwords',
          '(D) Back up data to a USB drive',
        ],
        answer: 1,
        feedback: {
          correct:
            '(B) is correct: "We recommend notifying your staff in advance and avoiding any large data uploads during that period."',
          distractors:
            '(A), (C), and (D) — upgrading servers, resetting passwords, and USB backups are not mentioned.',
          timeHack:
            'Listen for the recommendation verb ("We recommend…") and capture the two actions that follow it.',
        },
      },
      {
        id: 'p4-003-q3',
        prompt: 'What should listeners do if they need a different maintenance window?',
        options: [
          '(A) Reply to this voicemail',
          '(B) Visit the company website',
          '(C) Contact their account manager before Thursday',
          '(D) Wait until Saturday',
        ],
        answer: 2,
        feedback: {
          correct:
            '(C) is correct: "please contact your account manager before Thursday."',
          distractors:
            '(A) replying to the voicemail, (B) the website, and (D) waiting are not the instruction given.',
          timeHack:
            'Conditional instructions ("If you need… please contact…") usually appear near the end and signal a question — match the action in the if-clause.',
        },
      },
    ],
  },
];

const extraPart5 = [
  {
    id: 'p5-013',
    stimulus: { kind: 'sentence', drillType: 'Grammar (gerund/infinitive)' },
    questions: [
      {
        id: 'p5-013-q1',
        prompt:
          'The committee recommended ______ the submission deadline to give vendors additional time to prepare their bids.',
        options: ['(A) to extend', '(B) extending', '(C) extend', '(D) extension'],
        answer: 1,
        feedback: {
          correct:
            '(B) "extending" is correct: the verb "recommend" is followed by a gerund (–ing), not an infinitive.',
          distractors:
            '(A) "to extend" — "recommend" does not take a "to"-infinitive object. (C) "extend" is a bare verb. (D) "extension" is a noun and would need an article.',
          timeHack:
            'GRAMMAR item: memorize verbs that take a gerund — recommend / suggest / consider / avoid + –ing. See "recommend" → pick the –ing form.',
        },
      },
    ],
  },
  {
    id: 'p5-014',
    stimulus: { kind: 'sentence', drillType: 'Vocabulary (verb choice)' },
    questions: [
      {
        id: 'p5-014-q1',
        prompt:
          'The firm offers competitive salaries and flexible hours in order to ______ top talent in a crowded labor market.',
        options: ['(A) attract', '(B) attend', '(C) attach', '(D) attempt'],
        answer: 0,
        feedback: {
          correct:
            '(A) "attract" is correct: companies offer good pay and perks to "attract talent" — a standard collocation meaning to draw in skilled people.',
          distractors:
            '(B) "attend" means to be present at. (C) "attach" means to fasten. (D) "attempt" means to try. All begin with "att-" but carry unrelated meanings.',
          timeHack:
            'VOCABULARY item: the purpose ("offers good salaries… in order to") points to drawing people in — "attract talent." Reject the look-alike "att-" words.',
        },
      },
    ],
  },
  {
    id: 'p5-015',
    stimulus: { kind: 'sentence', drillType: 'Grammar (subject–verb agreement)' },
    questions: [
      {
        id: 'p5-015-q1',
        prompt:
          'Each of the job applicants ______ required to complete an online assessment before the interview.',
        options: ['(A) are', '(B) is', '(C) were', '(D) have'],
        answer: 1,
        feedback: {
          correct:
            '(B) "is" is correct: the subject is "Each," which is singular, so it takes the singular verb "is" — the plural "applicants" inside the prepositional phrase does not control the verb.',
          distractors:
            '(A) "are" and (C) "were" are plural. (D) "have" does not fit the passive "______ required."',
          timeHack:
            'GRAMMAR item: "Each / Every / One of the + plural noun" takes a SINGULAR verb. Ignore the plural noun right before the blank — match the real subject "Each."',
        },
      },
    ],
  },
];

const extraPart7 = [
  {
    id: 'p7-single-002',
    stimulus: {
      kind: 'reading',
      label: 'Single Passage',
      passages: [
        {
          type: 'Notice',
          heading: 'NOTICE TO ALL TENANTS — Maple Tower Business Center',
          text:
            "Please be advised that the building's main elevators will undergo their annual safety inspection on Wednesday, March 19. Two of the four elevators will be out of service from 8:00 a.m. to 12:00 p.m., and the remaining two from 1:00 p.m. to 5:00 p.m. At least two elevators will be operating at all times.\n\n" +
            'We anticipate longer-than-usual wait times during these periods and encourage tenants to allow extra time. The freight elevator will remain available for deliveries throughout the day. We apologize for any inconvenience and thank you for your cooperation. For questions, contact Building Management at extension 200.',
        },
      ],
    },
    questions: [
      {
        id: 'p7-single-002-q1',
        prompt: 'What is the main purpose of the notice?',
        options: [
          '(A) To announce an elevator inspection schedule',
          '(B) To advertise office space for rent',
          '(C) To introduce a new building manager',
          '(D) To report a power outage',
        ],
        answer: 0,
        feedback: {
          correct:
            '(A) is correct: the notice informs tenants that the elevators "will undergo their annual safety inspection" and gives the schedule.',
          distractors:
            '(B) no space is advertised. (C) no manager is introduced. (D) there is no power outage.',
          timeHack:
            'The first sentence of a notice states its purpose: "elevators will undergo… inspection" → an inspection announcement.',
        },
      },
      {
        id: 'p7-single-002-q2',
        prompt: 'According to the notice, what will remain available all day?',
        options: [
          '(A) All four passenger elevators',
          '(B) The freight elevator',
          '(C) The parking garage',
          '(D) The building café',
        ],
        answer: 1,
        feedback: {
          correct:
            '(B) is correct: "The freight elevator will remain available for deliveries throughout the day."',
          distractors:
            '(A) only two of the four passenger elevators run at any one time. (C) the garage and (D) a café are not mentioned.',
          timeHack:
            'Scan for the question keyword ("remain available / throughout the day") and match the exact sentence — here, the freight elevator.',
        },
      },
    ],
  },
];

// ─────────────────────────────────────────────────────────────────────────
// EXTRA ORIGINAL CONTENT — BATCH 2 (more practice, all original)
// ─────────────────────────────────────────────────────────────────────────
const extra2Part1 = [
  {
    id: 'p1-005',
    stimulus: {
      kind: 'photo',
      accent: 'Canadian',
      photoQuery: 'businesswoman telephone office desk',
      photoDescription:
        'A woman in business attire sits at a desk in an open-plan office, holding a telephone receiver to her ear while looking at a printed document. A laptop and a coffee mug are on the desk.',
      audioScript:
        '(A) She is typing on a laptop.\n(B) She is speaking on the telephone.\n(C) She is pouring a cup of coffee.\n(D) She is filing documents in a cabinet.',
    },
    questions: [
      {
        id: 'p1-005-q1',
        prompt: 'Select the statement that best describes the photograph.',
        options: [
          '(A) She is typing on a laptop.',
          '(B) She is speaking on the telephone.',
          '(C) She is pouring a cup of coffee.',
          '(D) She is filing documents in a cabinet.',
        ],
        answer: 1,
        feedback: {
          correct:
            '(B) is correct: "is speaking on the telephone" matches the woman holding the receiver to her ear.',
          distractors:
            '(A) the laptop is present but she is not typing on it. (C) a mug is present but she is not pouring. (D) she holds a document but is not filing it in a cabinet. Each uses a visible object with the wrong action.',
          timeHack:
            'Match the VERB to the action. Objects in the photo (laptop, mug, document) are bait when paired with an action that is not happening.',
        },
      },
    ],
  },
  {
    id: 'p1-006',
    stimulus: {
      kind: 'photo',
      accent: 'Australian',
      photoQuery: 'workers loading delivery van boxes',
      photoDescription:
        'Two workers in uniforms are loading cardboard boxes from a wheeled trolley into the back of a delivery van parked at a loading dock.',
      audioScript:
        '(A) A van is being loaded with boxes.\n(B) The workers are unloading a ship.\n(C) A trolley is being repaired.\n(D) The van is being washed.',
    },
    questions: [
      {
        id: 'p1-006-q1',
        prompt: 'Select the statement that best describes the photograph.',
        options: [
          '(A) A van is being loaded with boxes.',
          '(B) The workers are unloading a ship.',
          '(C) A trolley is being repaired.',
          '(D) The van is being washed.',
        ],
        answer: 0,
        feedback: {
          correct:
            '(A) is correct: "A van is being loaded with boxes" accurately describes the workers placing boxes into the van.',
          distractors:
            '(B) "unloading a ship" — there is no ship, and they are loading, not unloading. (C) the trolley is in use, not being repaired. (D) the van is not being washed.',
          timeHack:
            'Passive "is being + p.p." is correct here only because people are clearly performing the action. Verify both the object (van/boxes) and the action (loading) against the image.',
        },
      },
    ],
  },
];

const extra2Part2 = [
  {
    id: 'p2-009',
    stimulus: {
      kind: 'qr',
      accent: 'American',
      audioScript:
        "Where can I find the conference schedule?\n(A) It's posted on the bulletin board near the entrance.\n(B) At nine o'clock.\n(C) Yes, I attended last year.",
    },
    questions: [
      {
        id: 'p2-009-q1',
        prompt: 'Choose the best response to the question.',
        options: [
          "(A) It's posted on the bulletin board near the entrance.",
          "(B) At nine o'clock.",
          '(C) Yes, I attended last year.',
        ],
        answer: 0,
        feedback: {
          correct:
            '(A) is correct: "Where" asks for a location, and "on the bulletin board near the entrance" gives one.',
          distractors:
            '(B) gives a time (answers "When"). (C) is a Yes/No answer, impossible for a "Where" question, and echoes "conference/attended."',
          timeHack:
            '"Where" → a place. Eliminate time answers and Yes/No answers immediately.',
        },
      },
    ],
  },
  {
    id: 'p2-010',
    stimulus: {
      kind: 'qr',
      accent: 'British',
      audioScript:
        "Have you finished reviewing the quarterly report?\n(A) Not yet, but I'll have it done by this afternoon.\n(B) The quarter is just over there.\n(C) On the top shelf.",
    },
    questions: [
      {
        id: 'p2-010-q1',
        prompt: 'Choose the best response to the question.',
        options: [
          "(A) Not yet, but I'll have it done by this afternoon.",
          '(B) The quarter is just over there.',
          '(C) On the top shelf.',
        ],
        answer: 0,
        feedback: {
          correct:
            '(A) is correct: the Yes/No question "Have you finished…?" is answered naturally with "Not yet" plus a relevant follow-up.',
          distractors:
            '(B) plays on "quarterly / quarter" (a similar-word trap) and is meaningless here. (C) "On the top shelf" answers "Where," not whether the task is done.',
          timeHack:
            '"Have you…?" expects Yes/No (often softened to "Not yet"). Distrust options that repeat a root word (quarter) with a different meaning.',
        },
      },
    ],
  },
  {
    id: 'p2-011',
    stimulus: {
      kind: 'qr',
      accent: 'Canadian',
      audioScript:
        'Should I email the client or call them directly?\n(A) A direct call would be faster for an urgent issue.\n(B) Yes, the email was quite long.\n(C) She is a new client.',
    },
    questions: [
      {
        id: 'p2-011-q1',
        prompt: 'Choose the best response to the question.',
        options: [
          '(A) A direct call would be faster for an urgent issue.',
          '(B) Yes, the email was quite long.',
          '(C) She is a new client.',
        ],
        answer: 0,
        feedback: {
          correct:
            '(A) is correct: this is an "A or B" choice ("email… or call"), and "a direct call would be faster" selects one option with a reason.',
          distractors:
            '(B) is a Yes/No answer, which an "or" question rejects, and echoes "email." (C) "She is a new client" repeats "client" but does not pick a method.',
          timeHack:
            'For "X or Y" questions, choose the option that selects X or Y. Ignore Yes/No answers and word-echo distractors (email, client).',
        },
      },
    ],
  },
];

const extra2Part3 = [
  {
    id: 'p3-004',
    stimulus: {
      kind: 'conversation',
      accent: 'American / Canadian',
      audioScript:
        "M: Hi, I'm calling to arrange travel for our sales director to the Chicago trade show next month.\n" +
        'W: Of course. Would she prefer a morning or an evening flight on the fifteenth?\n' +
        'M: Morning, if possible — she has a client dinner that evening. And she will need a hotel within walking distance of the convention center.\n' +
        "W: I can book the seven a.m. flight and reserve a room at the Lakeside Inn, just two blocks away. I'll email you the itinerary to confirm.",
    },
    questions: [
      {
        id: 'p3-004-q1',
        prompt: 'What is the man arranging?',
        options: [
          '(A) A business trip',
          '(B) A client dinner',
          '(C) A product demonstration',
          '(D) A job interview',
        ],
        answer: 0,
        feedback: {
          correct:
            '(A) is correct: "I\'m calling to arrange travel for our sales director to the Chicago trade show" — he is arranging a business trip.',
          distractors:
            '(B) the client dinner is mentioned only as a reason for the flight time. (C) and (D) are never discussed.',
          timeHack:
            'The caller\'s opening line states the purpose ("arrange travel… to the trade show"). Answer the gist from the first sentence.',
        },
      },
      {
        id: 'p3-004-q2',
        prompt: 'Why does the man request a morning flight?',
        options: [
          '(A) It is less expensive.',
          '(B) The director has a dinner that evening.',
          '(C) The afternoon flights are full.',
          '(D) The trade show starts early.',
        ],
        answer: 1,
        feedback: {
          correct:
            '(B) is correct: "Morning, if possible — she has a client dinner that evening."',
          distractors:
            '(A) price, (C) full flights, and (D) an early start are not stated. The reason given is the evening dinner.',
          timeHack:
            'For "Why," find the reason the speaker states next to the request ("Morning… — she has a dinner that evening").',
        },
      },
      {
        id: 'p3-004-q3',
        prompt: 'What does the woman say she will do next?',
        options: [
          '(A) Cancel a reservation',
          '(B) Email the itinerary',
          '(C) Call the convention center',
          '(D) Reschedule the trade show',
        ],
        answer: 1,
        feedback: {
          correct:
            "(B) is correct: \"I'll email you the itinerary to confirm.\"",
          distractors:
            '(A), (C), and (D) — no cancellation, call to the center, or rescheduling is mentioned.',
          timeHack:
            '"What will she do next?" → the final line\'s future-tense verb ("I\'ll email…").',
        },
      },
    ],
  },
];

const extra2Part4 = [
  {
    id: 'p4-004',
    stimulus: {
      kind: 'talk',
      accent: 'British',
      audioScript:
        'Good afternoon, and welcome to the annual Regional Marketing Summit. Before our keynote begins, a few quick reminders. ' +
        'The afternoon breakout sessions have been moved from the second floor to the third floor due to a scheduling conflict. ' +
        'Lunch will be served in the main atrium at half past twelve. ' +
        "And please remember to complete the feedback survey in your welcome packet — attendees who submit it will be entered into a draw for a free pass to next year's summit.",
    },
    questions: [
      {
        id: 'p4-004-q1',
        prompt: 'Where is the announcement most likely taking place?',
        options: [
          '(A) At a marketing conference',
          '(B) In a department store',
          '(C) On a train',
          '(D) At an airport',
        ],
        answer: 0,
        feedback: {
          correct:
            '(A) is correct: "welcome to the annual Regional Marketing Summit" and references to a keynote and breakout sessions indicate a conference.',
          distractors:
            '(B), (C), (D) — a store, train, and airport do not fit the summit/keynote context.',
          timeHack:
            'Setting questions are answered by the greeting. "Marketing Summit… keynote… breakout sessions" → a conference.',
        },
      },
      {
        id: 'p4-004-q2',
        prompt: 'What change does the speaker mention?',
        options: [
          '(A) The keynote was cancelled.',
          '(B) Breakout sessions moved to the third floor.',
          '(C) Lunch was delayed.',
          '(D) The venue changed.',
        ],
        answer: 1,
        feedback: {
          correct:
            '(B) is correct: "The afternoon breakout sessions have been moved from the second floor to the third floor."',
          distractors:
            '(A) the keynote is about to begin, not cancelled. (C) lunch is on schedule (12:30). (D) the venue is unchanged.',
          timeHack:
            'Listen for the change verb ("have been moved") and capture the new location (third floor).',
        },
      },
      {
        id: 'p4-004-q3',
        prompt: 'How can attendees enter a prize draw?',
        options: [
          '(A) By arriving early',
          '(B) By submitting the feedback survey',
          '(C) By visiting a booth',
          '(D) By referring a colleague',
        ],
        answer: 1,
        feedback: {
          correct:
            '(B) is correct: "attendees who submit it [the feedback survey] will be entered into a draw."',
          distractors:
            '(A), (C), and (D) — arriving early, visiting a booth, and referrals are not mentioned.',
          timeHack:
            'Prize/offer questions hinge on a conditional clause ("attendees who submit it will be entered"). Match the action in that clause.',
        },
      },
    ],
  },
];

const extra2Part5 = [
  {
    id: 'p5-016',
    stimulus: { kind: 'sentence', drillType: 'Grammar (quantifier)' },
    questions: [
      {
        id: 'p5-016-q1',
        prompt:
          'The manager asked for ______ information about the delayed order before responding to the customer.',
        options: ['(A) many', '(B) a few', '(C) more', '(D) fewer'],
        answer: 2,
        feedback: {
          correct:
            '(C) "more" is correct: "information" is an uncountable noun, and "more" works with uncountable nouns ("more information").',
          distractors:
            '(A) "many," (B) "a few," and (D) "fewer" are used with countable plural nouns, but "information" is uncountable.',
          timeHack:
            'GRAMMAR item: check if the noun is countable. Uncountable (information, equipment, advice) → use more/much/less, not many/few/fewer.',
        },
      },
    ],
  },
  {
    id: 'p5-017',
    stimulus: { kind: 'sentence', drillType: 'Vocabulary (verb collocation)' },
    questions: [
      {
        id: 'p5-017-q1',
        prompt:
          "Because of the company's rapid expansion, the HR team is struggling to ______ enough qualified candidates.",
        options: ['(A) recruit', '(B) require', '(C) recall', '(D) reduce'],
        answer: 0,
        feedback: {
          correct:
            '(A) "recruit" is correct: HR teams "recruit candidates" — a standard collocation meaning to find and hire people.',
          distractors:
            '(B) "require" means to need. (C) "recall" means to remember or call back. (D) "reduce" means to lessen. All begin with "re-" but do not collocate with "candidates" here.',
          timeHack:
            'VOCABULARY item: HR + "candidates" → "recruit." Reject the look-alike "re-" verbs that do not fit the collocation.',
        },
      },
    ],
  },
  {
    id: 'p5-018',
    stimulus: { kind: 'sentence', drillType: 'Grammar (passive voice)' },
    questions: [
      {
        id: 'p5-018-q1',
        prompt:
          'The annual financial report ______ by an independent auditor before it is presented to shareholders.',
        options: ['(A) reviews', '(B) is reviewed', '(C) reviewing', '(D) has reviewing'],
        answer: 1,
        feedback: {
          correct:
            '(B) "is reviewed" is correct: the report receives the action (it does not review anything), so the passive "is reviewed by…" is required.',
          distractors:
            '(A) "reviews" is active and would mean the report reviews something. (C) "reviewing" and (D) "has reviewing" are not valid passive forms.',
          timeHack:
            'GRAMMAR item: subject + ______ + "by [doer]" → passive ("is/are + past participle"). The word "by" is the giveaway.',
        },
      },
    ],
  },
  {
    id: 'p5-019',
    stimulus: { kind: 'sentence', drillType: 'Grammar (preposition)' },
    questions: [
      {
        id: 'p5-019-q1',
        prompt: 'The store will remain open ______ 9:00 p.m. during the holiday season.',
        options: ['(A) until', '(B) by', '(C) since', '(D) for'],
        answer: 0,
        feedback: {
          correct:
            '(A) "until" is correct: "remain open" is a continuous state lasting up to a point in time, which "until" expresses ("open until 9 p.m.").',
          distractors:
            '(B) "by" marks a deadline for a single action, not a duration. (C) "since" needs a past starting point. (D) "for" needs a length of time, not a clock time.',
          timeHack:
            'GRAMMAR item: continuous state up to a time point → "until." Compare with "by" (deadline) — choose by the verb type (remain = duration).',
        },
      },
    ],
  },
];

const extra2Part6 = [
  {
    id: 'p6-003',
    stimulus: {
      kind: 'passage',
      passages: [
        {
          type: 'Email',
          heading:
            'To: All Staff — From: Human Resources — Subject: New Flexible Work Arrangement',
          text:
            'We are pleased to announce a new flexible work policy that will take effect on the first of next month. Employees may now choose to work from home up to two days per week, [1] their manager approves the schedule in advance.\n\n' +
            'To request a remote-work arrangement, please complete the form on the company intranet. [2] Once submitted, your request will be reviewed within five business days. We believe this change will improve work-life balance and [3] productivity. If you have any questions about how the policy [4] you, please contact your HR representative.',
        },
      ],
    },
    questions: [
      {
        id: 'p6-003-q1',
        prompt: 'Blank [1]',
        options: ['(A) provided that', '(B) despite', '(C) in addition to', '(D) such as'],
        answer: 0,
        feedback: {
          correct:
            '(A) "provided that" is correct: it is a conjunction meaning "only if," correctly introducing the condition clause "their manager approves the schedule."',
          distractors:
            '(B) "despite" and (C) "in addition to" are prepositions that take a noun, not a clause. (D) "such as" introduces examples, not a condition.',
          timeHack:
            'GRAMMAR blank: a full clause follows → use a conjunction. "provided that" = "only if," which fits the approval condition.',
        },
      },
      {
        id: 'p6-003-q2',
        prompt: 'Blank [2]',
        options: [
          '(A) The annual picnic will be held in July.',
          '(B) Be sure to include your preferred work-from-home days.',
          '(C) The parking lot will be resurfaced next week.',
          '(D) Our new logo was unveiled yesterday.',
        ],
        answer: 1,
        feedback: {
          correct:
            '(B) is correct: this sentence-insertion blank continues the instructions about the request form ("complete the form… Be sure to include your preferred work-from-home days").',
          distractors:
            '(A), (C), and (D) introduce unrelated topics (picnic, parking, logo) that break the flow of the request process.',
          timeHack:
            'SENTENCE blank: pick the option that continues the SAME topic as the surrounding sentences (the remote-work request), not a new subject.',
        },
      },
      {
        id: 'p6-003-q3',
        prompt: 'Blank [3]',
        options: ['(A) reduce', '(B) boost', '(C) delay', '(D) ignore'],
        answer: 1,
        feedback: {
          correct:
            '(B) "boost" is correct: the positive context ("improve work-life balance and ______ productivity") calls for a positive verb — "boost productivity."',
          distractors:
            '(A) "reduce," (C) "delay," and (D) "ignore" are negative and contradict the improvement the policy is said to bring.',
          timeHack:
            'VOCABULARY blank: parallel structure with a positive word ("improve") signals another positive word — "boost."',
        },
      },
      {
        id: 'p6-003-q4',
        prompt: 'Blank [4]',
        options: ['(A) affect', '(B) affects', '(C) affecting', '(D) affected'],
        answer: 1,
        feedback: {
          correct:
            '(B) "affects" is correct: the subject "the policy" is third-person singular, so the present-simple verb takes "-s" ("how the policy affects you").',
          distractors:
            '(A) "affect" is the plural/base form. (C) "affecting" and (D) "affected" do not fit the present-simple statement after "how the policy."',
          timeHack:
            'GRAMMAR blank: singular subject ("the policy") + present simple → verb + "-s." Match the verb to the subject.',
        },
      },
    ],
  },
];

const extra2Part7 = [
  {
    id: 'p7-double-002',
    stimulus: {
      kind: 'reading',
      label: 'Double Passage',
      passages: [
        {
          type: 'Job Posting',
          heading: 'Now Hiring: Logistics Coordinator — Brightway Distribution',
          text:
            'Brightway Distribution is seeking a full-time Logistics Coordinator for our Riverside warehouse. Responsibilities include scheduling shipments, tracking inventory, and liaising with carriers.\n\n' +
            'Requirements:\n' +
            '• At least three years of experience in logistics or supply-chain operations\n' +
            '• Proficiency with inventory-management software\n' +
            '• A valid forklift certification (preferred but not required)\n\n' +
            'We offer a competitive salary, health benefits, and paid training. To apply, send your résumé and a brief cover letter to careers@brightway.example by April 30.',
        },
        {
          type: 'Email',
          heading:
            'To: careers@brightway.example — From: Daniel Ortiz — Subject: Logistics Coordinator Application',
          text:
            'Dear Hiring Manager,\n\n' +
            'I am writing to apply for the Logistics Coordinator position. I have four years of experience coordinating shipments for a regional distributor, where I managed inventory using WarehousePro software. I also hold a valid forklift certification.\n\n' +
            'I am available to start immediately and would welcome the opportunity to interview. My résumé is attached.\n\nSincerely,\nDaniel Ortiz',
        },
      ],
    },
    questions: [
      {
        id: 'p7-double-002-q1',
        prompt: 'What is one requirement listed for the position?',
        options: [
          '(A) A university degree in business',
          '(B) At least three years of logistics experience',
          '(C) Fluency in two languages',
          '(D) Five years of management experience',
        ],
        answer: 1,
        feedback: {
          correct:
            '(B) is correct: the posting lists "At least three years of experience in logistics or supply-chain operations."',
          distractors:
            '(A) a degree, (C) language fluency, and (D) five years of management are not required by the posting.',
          timeHack:
            'Detail questions follow passage order — scan the bulleted "Requirements" list for the matching item.',
        },
      },
      {
        id: 'p7-double-002-q2',
        prompt:
          'Which preferred-but-not-required qualification does Daniel have? (Combine both texts.)',
        options: [
          '(A) A forklift certification',
          "(B) A driver's license",
          '(C) A degree in engineering',
          '(D) Experience working abroad',
        ],
        answer: 0,
        feedback: {
          correct:
            '(A) is correct: the posting marks the forklift certification as "preferred but not required," and Daniel\'s email states "I also hold a valid forklift certification." Linking both passages gives the answer.',
          distractors:
            "(B), (C), and (D) — a driver's license, engineering degree, and overseas experience are not mentioned in either text.",
          timeHack:
            'Cross-reference questions: one passage labels a qualification "preferred," the other says the applicant has it. Match the shared item across both texts.',
        },
      },
      {
        id: 'p7-double-002-q3',
        prompt: 'According to the email, when can Daniel begin working?',
        options: ['(A) After April 30', '(B) Immediately', '(C) In three years', '(D) After training'],
        answer: 1,
        feedback: {
          correct:
            '(B) is correct: "I am available to start immediately."',
          distractors:
            '(A) April 30 is the application deadline, not his start date. (C) and (D) — three years and after training are not stated.',
          timeHack:
            'Availability questions: scan the email for "available to start." Do not confuse the application deadline (April 30) with the start date.',
        },
      },
    ],
  },
];

// ─────────────────────────────────────────────────────────────────────────
// EXTRA ORIGINAL CONTENT — BATCH 3 (more practice, all original)
// ─────────────────────────────────────────────────────────────────────────
const extra3Part1 = [
  {
    id: 'p1-007',
    stimulus: {
      kind: 'photo',
      accent: 'American',
      photoQuery: 'business meeting boardroom colleagues table',
      photoDescription:
        'Several colleagues in business attire are seated around a boardroom table, looking at printed documents. A laptop is open in front of one of them.',
      audioScript:
        '(A) The colleagues are seated around a table.\n(B) They are painting the walls.\n(C) A man is locking the door.\n(D) The room is empty.',
    },
    questions: [
      {
        id: 'p1-007-q1',
        prompt: 'Select the statement that best describes the photograph.',
        options: [
          '(A) The colleagues are seated around a table.',
          '(B) They are painting the walls.',
          '(C) A man is locking the door.',
          '(D) The room is empty.',
        ],
        answer: 0,
        feedback: {
          correct:
            '(A) is correct: "are seated around a table" matches the colleagues sitting at the boardroom table.',
          distractors:
            '(B) painting the walls and (C) locking the door describe actions no one is doing. (D) "the room is empty" contradicts the people present.',
          timeHack:
            'Choose the option whose verb matches the clear, visible action (seated). Reject invented actions and statements that contradict what you see.',
        },
      },
    ],
  },
  {
    id: 'p1-008',
    stimulus: {
      kind: 'photo',
      accent: 'British',
      photoQuery: 'waiter restaurant serving food customers',
      photoDescription:
        'A waiter in an apron is placing a plate of food on a table where two customers are seated in a restaurant.',
      audioScript:
        '(A) A waiter is serving food to customers.\n(B) The customers are washing dishes.\n(C) A chef is chopping vegetables.\n(D) The tables are being stacked.',
    },
    questions: [
      {
        id: 'p1-008-q1',
        prompt: 'Select the statement that best describes the photograph.',
        options: [
          '(A) A waiter is serving food to customers.',
          '(B) The customers are washing dishes.',
          '(C) A chef is chopping vegetables.',
          '(D) The tables are being stacked.',
        ],
        answer: 0,
        feedback: {
          correct:
            '(A) is correct: "is serving food to customers" matches the waiter placing a plate on the table.',
          distractors:
            '(B) washing dishes, (C) chopping vegetables, and (D) stacking tables are actions not shown in the scene.',
          timeHack:
            'Match the main person (waiter) to the main action (serving). Discard options with actors or actions you cannot see.',
        },
      },
    ],
  },
];

const extra3Part2 = [
  {
    id: 'p2-012',
    stimulus: {
      kind: 'qr',
      accent: 'American',
      audioScript:
        "When does the new branch officially open?\n(A) On the first of March.\n(B) In the downtown area.\n(C) Yes, it's a large branch.",
    },
    questions: [
      {
        id: 'p2-012-q1',
        prompt: 'Choose the best response to the question.',
        options: [
          '(A) On the first of March.',
          '(B) In the downtown area.',
          "(C) Yes, it's a large branch.",
        ],
        answer: 0,
        feedback: {
          correct:
            '(A) is correct: "When" asks for a time, and "On the first of March" gives a date.',
          distractors:
            '(B) "In the downtown area" answers "Where." (C) is a Yes/No answer (impossible for "When") and echoes "branch."',
          timeHack: '"When" → a time/date. Eliminate location and Yes/No answers immediately.',
        },
      },
    ],
  },
  {
    id: 'p2-013',
    stimulus: {
      kind: 'qr',
      accent: 'British',
      audioScript:
        "Could you help me set up the projector for the presentation?\n(A) Sure, I'll be right there.\n(B) The projection was very accurate.\n(C) It was a long presentation.",
    },
    questions: [
      {
        id: 'p2-013-q1',
        prompt: 'Choose the best response to the question.',
        options: [
          "(A) Sure, I'll be right there.",
          '(B) The projection was very accurate.',
          '(C) It was a long presentation.',
        ],
        answer: 0,
        feedback: {
          correct:
            '(A) is correct: "Could you help me…?" is a request, and "Sure, I\'ll be right there" agrees to help.',
          distractors:
            '(B) plays on "projector / projection" (a similar-word trap). (C) repeats "presentation" but does not respond to the request.',
          timeHack:
            'Requests ("Could you…?") take an agreement or refusal. Distrust word-echo and similar-sound options.',
        },
      },
    ],
  },
];

const extra3Part3 = [
  {
    id: 'p3-005',
    stimulus: {
      kind: 'conversation',
      accent: 'British / American',
      audioScript:
        'W: Tom, we need to schedule the onboarding training for the three new hires starting Monday.\n' +
        "M: Right. The training room is booked on Tuesday, but it's free Wednesday morning. Would that work?\n" +
        'W: Wednesday morning is fine. Could you also prepare the welcome packets and arrange for IT to set up their accounts?\n' +
        "M: I'll put the packets together today and email IT to have the accounts ready before Wednesday.",
    },
    questions: [
      {
        id: 'p3-005-q1',
        prompt: 'What are the speakers planning?',
        options: [
          '(A) A training session for new employees',
          '(B) A company anniversary party',
          '(C) A product launch',
          '(D) A budget review',
        ],
        answer: 0,
        feedback: {
          correct:
            '(A) is correct: "schedule the onboarding training for the three new hires" identifies a training session for new employees.',
          distractors: '(B), (C), (D) — a party, product launch, and budget review are not discussed.',
          timeHack:
            'The opening line sets the topic ("schedule the onboarding training"). Answer the gist from the first exchange.',
        },
      },
      {
        id: 'p3-005-q2',
        prompt: 'When will the training take place?',
        options: ['(A) Monday', '(B) Tuesday', '(C) Wednesday morning', '(D) Friday afternoon'],
        answer: 2,
        feedback: {
          correct:
            '(C) is correct: the room is booked Tuesday but free Wednesday morning, and the woman says "Wednesday morning is fine."',
          distractors:
            '(A) Monday is when the new hires start. (B) Tuesday the room is already booked. (D) Friday is not mentioned.',
          timeHack:
            'Watch the day swaps: start day (Monday) vs booked day (Tuesday) vs agreed day (Wednesday). Confirm the day both speakers accept.',
        },
      },
      {
        id: 'p3-005-q3',
        prompt: 'What does the man agree to do?',
        options: [
          '(A) Cancel the training',
          '(B) Prepare welcome packets and contact IT',
          '(C) Interview the new hires',
          '(D) Reserve a hotel',
        ],
        answer: 1,
        feedback: {
          correct:
            "(B) is correct: \"I'll put the packets together today and email IT to have the accounts ready.\"",
          distractors: '(A), (C), (D) — cancelling, interviewing, and booking a hotel are not mentioned.',
          timeHack:
            'The closing line lists the man\'s next actions ("I\'ll put the packets together… and email IT"). Match both tasks.',
        },
      },
    ],
  },
];

const extra3Part4 = [
  {
    id: 'p4-005',
    stimulus: {
      kind: 'talk',
      accent: 'Australian',
      audioScript:
        'Attention passengers on flight BA294 to Singapore. We will begin boarding in approximately fifteen minutes at Gate 22. ' +
        'We will board by zone, starting with passengers requiring assistance and those travelling with young children, followed by business class. ' +
        'Please have your boarding pass and passport ready for inspection. Due to a high number of passengers today, we kindly ask that you keep your carry-on luggage to one item to speed up boarding. Thank you for your cooperation.',
    },
    questions: [
      {
        id: 'p4-005-q1',
        prompt: 'Where is this announcement being made?',
        options: [
          '(A) At an airport gate',
          '(B) On a train platform',
          '(C) In a hotel lobby',
          '(D) At a bus station',
        ],
        answer: 0,
        feedback: {
          correct:
            '(A) is correct: "boarding… at Gate 22," "boarding pass and passport," and "flight BA294" indicate an airport gate.',
          distractors: '(B), (C), (D) — a train platform, hotel, and bus station do not fit "flight" and "boarding pass."',
          timeHack:
            'Setting clues cluster early: "flight," "Gate," "boarding pass" → airport. Decide from the first sentences.',
        },
      },
      {
        id: 'p4-005-q2',
        prompt: 'Who will board first?',
        options: [
          '(A) Business-class passengers',
          '(B) Passengers requiring assistance and families with young children',
          '(C) Passengers in the last row',
          '(D) Frequent flyers',
        ],
        answer: 1,
        feedback: {
          correct:
            '(B) is correct: "starting with passengers requiring assistance and those travelling with young children."',
          distractors: '(A) business class boards after them. (C) and (D) are not mentioned.',
          timeHack:
            'Order words ("starting with…, followed by…") signal sequence. The group after "starting with" is first.',
        },
      },
      {
        id: 'p4-005-q3',
        prompt: 'What are passengers asked to do?',
        options: [
          '(A) Limit carry-on luggage to one item',
          '(B) Check in online',
          '(C) Pay an extra fee',
          '(D) Change their seats',
        ],
        answer: 0,
        feedback: {
          correct:
            '(A) is correct: "we kindly ask that you keep your carry-on luggage to one item."',
          distractors: '(B), (C), (D) — online check-in, fees, and seat changes are not requested.',
          timeHack: 'Requests use "we ask that…/please." Capture the action that follows it (one carry-on item).',
        },
      },
    ],
  },
];

const extra3Part5 = [
  {
    id: 'p5-020',
    stimulus: { kind: 'sentence', drillType: 'Grammar (purpose)' },
    questions: [
      {
        id: 'p5-020-q1',
        prompt:
          'The company installed new accounting software ______ streamline its invoicing process.',
        options: ['(A) so that', '(B) in order to', '(C) due to', '(D) because'],
        answer: 1,
        feedback: {
          correct:
            '(B) "in order to" is correct: it introduces a purpose followed by a base verb ("in order to streamline").',
          distractors:
            '(A) "so that" needs a full clause with a modal. (C) "due to" takes a noun. (D) "because" needs a full clause, not a bare verb.',
          timeHack:
            'GRAMMAR item: a bare verb after the blank ("streamline") → "in order to / to" (purpose). A full clause → "so that / because."',
        },
      },
    ],
  },
  {
    id: 'p5-021',
    stimulus: { kind: 'sentence', drillType: 'Vocabulary (verb + preposition)' },
    questions: [
      {
        id: 'p5-021-q1',
        prompt: "All employees are expected to ______ to the company's code of conduct.",
        options: ['(A) adhere', '(B) attach', '(C) attend', '(D) adjust'],
        answer: 0,
        feedback: {
          correct:
            '(A) "adhere" is correct: "adhere to (a rule/policy)" means to follow it strictly — the standard collocation.',
          distractors:
            '(B) "attach to," (C) "attend to," and (D) "adjust to" exist but do not mean to follow a code of conduct.',
          timeHack:
            'VOCABULARY item: "______ to [a policy]" → "adhere." Learn the verb+preposition pair (adhere to = comply with).',
        },
      },
    ],
  },
  {
    id: 'p5-022',
    stimulus: { kind: 'sentence', drillType: 'Grammar (quantifier)' },
    questions: [
      {
        id: 'p5-022-q1',
        prompt: 'The renovation was completed without ______ disruption to daily operations.',
        options: ['(A) many', '(B) much', '(C) few', '(D) several'],
        answer: 1,
        feedback: {
          correct:
            '(B) "much" is correct: "disruption" is uncountable, so it takes "much," not the countable quantifiers.',
          distractors: '(A) "many," (C) "few," and (D) "several" are used with countable plural nouns.',
          timeHack:
            'GRAMMAR item: uncountable noun (disruption, traffic, progress) → much/less; countable plural → many/few.',
        },
      },
    ],
  },
  {
    id: 'p5-023',
    stimulus: { kind: 'sentence', drillType: 'Grammar (word form)' },
    questions: [
      {
        id: 'p5-023-q1',
        prompt: 'The assembly instructions were so ______ that no one needed to ask for help.',
        options: ['(A) clear', '(B) clearance', '(C) clearly', '(D) cleared'],
        answer: 0,
        feedback: {
          correct:
            '(A) "clear" is correct: after the linking verb "were," an adjective is required ("were so clear").',
          distractors:
            '(B) "clearance" is a noun. (C) "clearly" is an adverb. (D) "cleared" is a past-tense verb. Only the adjective follows "were."',
          timeHack:
            'GRAMMAR item: linking verb ("were") + "so ______ that" → adjective. Eliminate the noun, adverb, and verb forms.',
        },
      },
    ],
  },
];

const extra3Part7 = [
  {
    id: 'p7-double-003',
    stimulus: {
      kind: 'reading',
      label: 'Double Passage',
      passages: [
        {
          type: 'Confirmation Email',
          heading: 'To: Helen Park — From: Grandview Hotel — Subject: Booking Confirmation #4471',
          text:
            'Dear Ms. Park,\n\nThank you for booking with the Grandview Hotel. Your reservation is confirmed for two nights, from June 10 to June 12, in a Deluxe King room at a rate of $180 per night. Check-in begins at 3:00 p.m. and check-out is at 11:00 a.m.\n\n' +
            'Your booking includes complimentary breakfast and access to the fitness center. If you need to modify or cancel your reservation, please do so at least 48 hours before arrival to avoid a charge.\n\nWe look forward to welcoming you.',
        },
        {
          type: 'Email',
          heading: 'To: Grandview Hotel — From: Helen Park — Subject: RE: Booking Confirmation #4471',
          text:
            'Hello,\n\nThank you for the confirmation. I would like to request a late check-out, if possible, as my flight does not depart until the evening of June 12. Would 2:00 p.m. be acceptable?\n\n' +
            'Also, could you confirm whether the hotel offers airport shuttle service? Thank you.\n\nBest regards,\nHelen Park',
        },
      ],
    },
    questions: [
      {
        id: 'p7-double-003-q1',
        prompt: 'How much will Ms. Park pay per night?',
        options: ['(A) $48', '(B) $110', '(C) $180', '(D) $360'],
        answer: 2,
        feedback: {
          correct: '(C) $180 is correct: "a Deluxe King room at a rate of $180 per night."',
          distractors:
            '(A) $48 echoes the 48-hour cancellation window. (D) $360 is the two-night total, not the per-night rate. (B) is not mentioned.',
          timeHack:
            'Number traps: per-night vs total vs an unrelated number (48 hours). Re-read the clause to confirm which quantity is asked.',
        },
      },
      {
        id: 'p7-double-003-q2',
        prompt: 'What is included with the booking?',
        options: [
          '(A) Free breakfast and fitness center access',
          '(B) A free room upgrade',
          '(C) Airport shuttle service',
          '(D) A late check-out',
        ],
        answer: 0,
        feedback: {
          correct:
            '(A) is correct: "Your booking includes complimentary breakfast and access to the fitness center."',
          distractors:
            '(B) no upgrade is mentioned. (C) the shuttle is what Ms. Park asks about — not confirmed. (D) the late check-out is a request, not an included feature.',
          timeHack: 'Scan for "includes/complimentary." Separate confirmed inclusions from the guest\'s later requests.',
        },
      },
      {
        id: 'p7-double-003-q3',
        prompt: 'Why does Ms. Park request a late check-out?',
        options: [
          '(A) Her flight departs in the evening',
          '(B) She wants to use the fitness center',
          '(C) She is arriving late',
          '(D) She booked an extra night',
        ],
        answer: 0,
        feedback: {
          correct:
            '(A) is correct: "I would like to request a late check-out… as my flight does not depart until the evening of June 12."',
          distractors: '(B), (C), (D) — the fitness center, a late arrival, and an extra night are not her stated reason.',
          timeHack: 'For "why," find the reason marker ("as / because"): "as my flight does not depart until the evening."',
        },
      },
    ],
  },
];

export const questionBank = {
  1: [...part1],
  2: [...part2, ...extraPart2, ...extra2Part2, ...extra3Part2],
  3: [...part3, ...extraPart3, ...extra2Part3, ...extra3Part3],
  4: [...part4, ...extraPart4, ...extra2Part4, ...extra3Part4],
  5: [...part5, ...extraPart5, ...extra2Part5, ...extra3Part5],
  6: [...part6, ...extra2Part6],
  7: [...part7, ...extraPart7, ...extra2Part7, ...extra3Part7],
};

/** Count of individual questions in a list of blocks. */
export function countQuestions(blocks) {
  return blocks.reduce((total, block) => total + block.questions.length, 0);
}

/** A representative cross-section used by the Full Simulation Diagnostic. */
export const DIAGNOSTIC_BLUEPRINT = [
  { part: 1, blocks: 2 },
  { part: 2, blocks: 3 },
  { part: 3, blocks: 1 },
  { part: 4, blocks: 1 },
  { part: 5, blocks: 5 },
  { part: 6, blocks: 1 },
  { part: 7, blocks: 1 },
];
