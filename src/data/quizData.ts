import type { QuizTopic } from '../types';

export const QUIZ_TOPICS: QuizTopic[] = [
  {
    id: 'c-pointers',
    title: 'C Programming & Pointer Mechanics',
    category: 'Programming Quizzes',
    questionCount: 15,
    durationMinutes: 12,
    difficulty: 'Beginner',
    participantsCount: 382,
    questions: [
      {
        id: 1,
        question: 'What is the output of declaring "int *ptr = NULL;" and checking "if (!ptr)" in C?',
        options: [
          'The condition evaluates to True because NULL is defined as 0',
          'Compilation error due to invalid pointer comparison',
          'Segmentation fault at runtime',
          'The condition evaluates to False',
        ],
        correctIndex: 0,
        explanation: 'In C, NULL is an implementation-defined null pointer constant (often 0 or (void*)0). The logical NOT operator ! negates it, producing true (1).',
      },
      {
        id: 2,
        question: 'Which standard C function is used to release dynamically allocated memory created via malloc()?',
        options: [
          'delete()',
          'free()',
          'dealloc()',
          'release()',
        ],
        correctIndex: 1,
        explanation: 'In C stdlib.h, memory allocated on the heap via malloc, calloc, or realloc must be returned using free(pointer) to prevent memory leaks.',
      },
      {
        id: 3,
        question: 'What is the size of a pointer variable on a standard 64-bit operating system architecture?',
        options: [
          '2 bytes',
          '4 bytes',
          '8 bytes',
          'Depends on the data type it points to',
        ],
        correctIndex: 2,
        explanation: 'On a 64-bit architecture, regardless of what type of data is pointed to (char, int, float, or struct), the pointer itself holds a 64-bit memory address (8 bytes).',
      },
    ],
  },
  {
    id: 'comp-fundamentals',
    title: 'Computer Fundamentals & Architecture',
    category: 'Computer Fundamentals',
    questionCount: 20,
    durationMinutes: 15,
    difficulty: 'Beginner',
    participantsCount: 294,
    questions: [
      {
        id: 1,
        question: 'Which component inside the CPU is primarily responsible for performing arithmetic calculations and logical decisions?',
        options: [
          'Control Unit (CU)',
          'Arithmetic Logic Unit (ALU)',
          'Cache Memory L1',
          'Program Counter (PC)',
        ],
        correctIndex: 1,
        explanation: 'The ALU (Arithmetic Logic Unit) executes mathematical operations (add, subtract, multiply) and logical bitwise evaluations (AND, OR, NOT).',
      },
    ],
  },
  {
    id: 'discrete-math',
    title: 'Discrete Math & Boolean Logic',
    category: 'Mathematics',
    questionCount: 15,
    durationMinutes: 15,
    difficulty: 'Intermediate',
    participantsCount: 215,
    questions: [
      {
        id: 1,
        question: 'According to De Morgan\'s Law, what is the logical equivalence of ~(P ∧ Q)?',
        options: [
          '~P ∧ ~Q',
          '~P ∨ ~Q',
          'P ∨ Q',
          '~(P ∨ Q)',
        ],
        correctIndex: 1,
        explanation: 'De Morgan\'s Law states that the negation of a conjunction is the disjunction of the negations: ~(P ∧ Q) ≡ ~P ∨ ~Q.',
      },
    ],
  },
  {
    id: 'tech-ai',
    title: 'Modern Technology & AI Concepts',
    category: 'Technology and AI',
    questionCount: 12,
    durationMinutes: 10,
    difficulty: 'Beginner',
    participantsCount: 340,
    questions: [
      {
        id: 1,
        question: 'Which version control system command creates a new isolated workspace branch in Git?',
        options: [
          'git split <branch-name>',
          'git checkout -b <branch-name>',
          'git isolate <branch-name>',
          'git new <branch-name>',
        ],
        correctIndex: 1,
        explanation: '"git checkout -b <branch-name>" (or "git switch -c <branch-name>") creates a new branch and checks it out immediately.',
      },
    ],
  },
];
