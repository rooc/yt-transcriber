# B1+ Vocabulary Extraction Guidelines

This document provides detailed guidelines for extracting B1+ level vocabulary from Spanish transcripts.

## Output Format

**File:** `vocab/[VIDEO_ID]_vocab.json`

```json
{
  "palabra": {
    "translation": "english meaning",
    "pos": "part of speech",
    "context": "original sentence or phrase"
  }
}
```

## Core Principle

**⚠️ CRITICAL:** You MUST extract multi-word phrases (2-4 words) as the PRIMARY vocabulary. Single words are secondary.

**Extract BOTH single words AND multi-word phrases:**

## Single Words (B1+ LEVEL)

- Individual words at B1 level or higher
- Technical/specialized terms

**⚠️ IMPORTANT:** Vocabulary selection is based on **B1+ GRAMMAR COMPLEXITY**, not just word difficulty. This means:
- **Exclude** simple A1-A2 words when used in basic tenses (present, preterite)
- **INCLUDE** A1-A2 words when they appear in **B1+ grammatical structures** (subjunctive, conditional, compound tenses, etc.)

## Multi-Word Phrases (2-4 words) - HIGH PRIORITY

These are often MORE useful than single words. **Extract phrases that demonstrate B1+ grammar, even if individual words are basic:**

### Complex Verb Phrases (2-3 words) - B1+ GRAMMAR RULE:

Extract 2-3 word phrases containing **complex verb tenses and grammatical structures** EVEN if individual words are A1-A2 level. These demonstrate B1+ grammar and are valuable for learning:

**Include phrases with these B1+ structures:**

- **Subjunctive**: "sin haberla visto" (without having seen her), "que tú digas" (that you say), "cuando vengas" (when you come)
- **Conditional**: "lo haría" (I would do it), "querrías venir" (would you want to come), "me gustaría" (I would like)
- **Future**: "lo haré" (I will do it), "qué será" (what will it be), "dirán que" (they will say that)
- **Imperfect**: "cuando era" (when I was), "lo hacía" (I used to do it), "si tenía" (if I had)
- **Compound tenses**: "había comido" (had eaten), "habría dicho" (would have said), "ha estado" (has been)
- **Imperative + object**: "dime eso" (tell me that), "cuéntame" (tell me), "dámelo" (give it to me)
- **Relative clauses**: "el libro que compré" (the book that I bought), "la persona de quien hablamos" (the person we're talking about)
- **Reflexive pronouns + verbs**: "me acuerdo de" (I remember), "se olvidan de" (they forget)
- **Preposition + infinitive**: "antes de comer" (before eating), "después de llegar" (after arriving), "al entrar" (upon entering)

**Examples to extract (B1+ grammar, even with basic words):**
- "sin haberla visto" - perfect infinitive with pronouns
- "que tú dirás" - future in subordinate clause
- "si hubiera sabido" - past perfect subjunctive
- "me lo estoy diciendo" - present progressive with double pronouns
- "lo he hecho" - present perfect (auxiliary + participle)
- "para que entiendas" - present subjunctive
- "cuando llegué" - preterite in time clause (advanced usage)

**Key principle:** A word like "decir" (A1) in simple present "yo digo" is excluded. But "que dirás" is included because it demonstrates B1+ grammar (future in subordinate clause).

### Verb + Preposition combinations:

- "hacer caso" (to pay attention)
- "tener en cuenta" (to take into account)
- "dar la lata" (to annoy/bother)
- "ponerse a" (to start doing)
- "acabar de" (to have just done)

### Common collocations:

- "muela del juicio" (wisdom tooth)
- "cuenta bancaria" (bank account)
- "tiempo libre" (free time)
- "lugar común" (common place/cliché)

### Idiomatic expressions:

- "hasta la madre" (fed up)
- "en el quinto pino" (in the middle of nowhere)
- "costar un ojo de la cara" (to cost an arm and a leg)

## What to Exclude

### Simple Phrases (DO NOT extract):

- Simple present: "yo digo", "él come", "tú tienes"
- Simple preterite: "yo dije", "él comió", "tú tuviste"
- Basic ser/estar: "es bueno", "está aquí"
- These don't demonstrate B1+ grammar complexity

### Overly Simple Multi-Word Phrases (DO NOT extract):

Even 2-3 word phrases should be excluded if they consist entirely of A1-A2 basic components without B1+ grammatical complexity. These are too simple:

- **Negative + basic verb**: "no entiendo", "no sé", "no creo" - just negation of A1 verbs
- **Pronoun + simple past**: "me dijo", "te vi", "nos contó" - basic preterite with indirect objects
- **Basic verb + preposition**: "voy a", "es para", "tengo que" - A1-level combinations
- **Simple questions/clauses**: "no sé si", "creo que", "dice que" - basic conjunctions with A1 verbs
- **Subject + simple verb**: "tú eres", "yo digo", "él tiene" - elementary sentence structure

**Key rule:** If ALL words in the phrase are A1-A2 basic AND the grammatical structure is elementary (present, preterite, basic word order), **skip it**. Only include multi-word phrases that demonstrate B1+ grammar complexity OR contain at least one B1+ word.

## Categories to Exclude

### 1. Basic A1-A2 Words

Read `data/a1-a2.json` for the complete exclusion list (~680 words). These include:

- Articles: el, la, los, las, un, una, unos, unas
- Pronouns: yo, tú, él, ella, nosotros, vosotros, ellos, me, te, se, nos, os
- Basic verbs: ser, estar, tener, haber, hacer, poder, decir, ir, ver, dar, saber, querer
- Common adjectives: bueno, malo, grande, pequeño, alto, bajo, nuevo, viejo
- Time words: hoy, ayer, mañana, ahora, siempre, nunca, cuando, donde
- Conjunctions: y, o, pero, porque, si, aunque, mientras
- Basic nouns: casa, agua, comida, día, tiempo, año, persona, cosa

### 2. Proper Nouns

Read `data/proper-nouns.json` for exclusions:

- Country names: España, México, Estados Unidos, Argentina, etc.
- Human names: María, Juan, Carlos, Ana, José, etc.
- Place names: Amazonia, Alaska, Arizona, etc.

### 3. Manual Exclusions

Read `data/manual-exclude.json` for additional exclusions:

- podcast, español, okay, tren, mafia, washington, etc.

### 4. English Loanwords

Skip words that are the same or similar in English:

- podcast, internet, chat, online, video, audio
- okay, cool, boom, surprise, obviously, useful, make sense

### 5. Very Short Words

- Skip single words with 3 or fewer letters (unless important)
- Skip verb conjugations of basic verbs (tengo, tienes, tiene → all from "tener")

## Translation Quality Guidelines

**For each vocabulary entry:**

### 1. Translation

Use 1-5 words, lowercase:

- ✅ Good: "masticar" → "to chew"
- ✅ Good: "hacer caso" → "to pay attention"
- ❌ Bad: "masticar" → "chew, masticate, grind food with teeth"

### 2. Part of Speech (pos) - Optional

- "expression" for phrases
- "verb phrase", "noun phrase" for collocations

### 3. Context - Optional

The original Spanish sentence - helps remember the usage.

## Example Vocabulary Entries

```json
{
  "masticar": {
    "translation": "to chew",
    "pos": "verb"
  },
  "muela del juicio": {
    "translation": "wisdom tooth",
    "pos": "noun phrase"
  },
  "hacer caso": {
    "translation": "to pay attention",
    "pos": "verb phrase"
  },
  "hasta la madre": {
    "translation": "fed up / completely full",
    "pos": "expression"
  },
  "en el quinto pino": {
    "translation": "in the middle of nowhere",
    "pos": "expression"
  }
}
```
