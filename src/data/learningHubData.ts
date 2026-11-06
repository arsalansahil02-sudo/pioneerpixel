import type { Course, StudentProgressState } from '../types';
import { BRAND_CONFIG } from '../config/branding';

export const LEARNING_HUB_META = {
  welcomeMessage: 'Welcome to Your Learning Hub',
  subtitle: 'Learn. Practice. Improve.',
  demonstrationDisclaimer:
    'Demonstration Content Notice: All curriculums, lesson notes, and practice questions are academic demonstration blueprints for BCA Semester 1 students until institutional verification.',
};

export const INITIAL_PROGRESS_STATE: StudentProgressState = {
  enrolledCourseIds: ['c-programming', 'computer-fundamentals', 'mathematics'],
  completedLessonIds: ['c-intro-1', 'c-intro-2', 'c-vars-1', 'comp-arch-1'],
  bookmarkedCourseIds: ['c-programming', 'python-programming'],
  bookmarkedNoteIds: ['note-c-pointers', 'note-comp-number-systems'],
  submittedAssignmentIds: ['assign-c-syntax'],
  lastStudiedLesson: {
    courseId: 'c-programming',
    chapterId: 'chap-c-pointers',
    lessonId: 'c-ptr-1',
    lessonTitle: 'Pointer Fundamentals & Address-Of (&) Operator',
    courseTitle: 'C Programming & Logic Development',
    timestamp: '2 hours ago',
  },
};

export const COURSES_DATA: Course[] = [
  // 1. C PROGRAMMING (Flagship Deep Dive Course)
  {
    id: 'c-programming',
    title: 'C Programming & Logic Development',
    code: `${BRAND_CONFIG.monogram}-101`,
    shortDescription:
      'Master foundational systems programming, memory pointer mechanics, dynamic allocations, and algorithmic structures in C.',
    fullDescription:
      'The definitive computer science cornerstone for first-year BCA students. This course guides you from your very first main() function through structured programming, condition branching, pointer arithmetic, memory management, and file processing.',
    iconName: 'Code2',
    semester: 1,
    category: 'Programming',
    level: 'Beginner',
    chaptersCount: 8,
    lessonsCount: 24,
    durationHours: 32,
    prerequisites: ['Basic computer literacy', 'Problem-solving inclination'],
    isDemo: true,
    featured: true,
    chapters: [
      {
        id: 'chap-c-intro',
        chapterNumber: 1,
        title: 'Introduction to C',
        description: 'History, ANSI standards, compilation pipeline with GCC, structure of a C program, and standard I/O.',
        lessons: [
          {
            id: 'c-intro-1',
            chapterId: 'chap-c-intro',
            title: 'Anatomy of a C Program & GCC Compilation',
            duration: '14 min',
            type: 'video',
            description: 'Understand preprocessors, header files, the entry point main(), and the 4 stages of GCC compilation.',
            content: `C is a procedural, statically typed language developed by Dennis Ritchie at Bell Labs. 
In this lesson, we break down how source code (.c) undergoes preprocessing (#include, #define), compilation into assembly (.s), assembly into object code (.o), and linking with standard libraries into a binary executable.`,
            videoPlaceholder: {
              title: 'C Architecture & Compilation Pipeline Walkthrough',
              duration: '14:20',
              instructor: 'Department of Computer Science',
              thumbnailBadge: 'Video Lecture 01',
              notice: 'Demo video lecture preview. Authorized university lecture video streams will link here.',
            },
            codeSnippet: {
              title: 'First C Program (Hello, World!)',
              language: 'c',
              code: `#include <stdio.h>

int main(void) {
    // printf prints formatted text to standard output stdout
    printf("Welcome to BCA Skill Hub C Programming!\\n");
    return 0;
}`,
              explanation: '#include <stdio.h> grants access to standard I/O declarations. "return 0;" informs the operating system of clean termination.',
              output: 'Welcome to BCA Skill Hub C Programming!',
            },
            keyTakeaways: [
              'Source code undergoes Preprocessor -> Compiler -> Assembler -> Linker.',
              'main() is the designated runtime entry point.',
              'Header files (.h) provide function prototypes to the compiler.',
            ],
            isDemo: true,
          },
          {
            id: 'c-intro-2',
            chapterId: 'chap-c-intro',
            title: 'Standard Input/Output (printf & scanf)',
            duration: '18 min',
            type: 'interactive',
            description: 'Formatting tokens (%d, %f, %c, %s), escape sequences, and reading keyboard input via memory addresses.',
            content: `Formatted I/O functions in <stdio.h> allow developers to interact with the console. 
We explore conversion specifiers (%d for integers, %f for floats, %c for single characters) and why scanf() requires the memory address-of operator (&).`,
            videoPlaceholder: {
              title: 'Mastering printf and scanf Formatting',
              duration: '18:45',
              instructor: 'Academic Staff',
              thumbnailBadge: 'Video Lecture 02',
              notice: 'Demo video lecture preview. Authorized video stream connects in future phases.',
            },
            codeSnippet: {
              title: 'Reading User Input with scanf()',
              language: 'c',
              code: `#include <stdio.h>

int main(void) {
    int rollNumber;
    printf("Enter student roll number: ");
    // &rollNumber passes memory address to scanf
    if (scanf("%d", &rollNumber) == 1) {
        printf("Recorded roll: %d\\n", rollNumber);
    }
    return 0;
}`,
              explanation: 'Always supply the memory address &variable to scanf. Validate the return value to prevent input stream vulnerabilities.',
              output: 'Enter student roll number: 101\nRecorded roll: 101',
            },
            keyTakeaways: [
              'Conversion specifiers map memory values to human-readable strings.',
              'scanf requires pointers/addresses (&variable) to modify memory in place.',
            ],
            isDemo: true,
          },
        ],
      },
      {
        id: 'chap-c-vars',
        chapterNumber: 2,
        title: 'Variables and Data Types',
        description: 'Fundamental data types (char, int, float, double), type modifiers, sizeof operator, and constants.',
        lessons: [
          {
            id: 'c-vars-1',
            chapterId: 'chap-c-vars',
            title: 'Primitive Types & Memory Storage Representation',
            duration: '16 min',
            type: 'reading',
            description: 'Byte sizes, signed vs unsigned integers, two’s complement representation, and floating point IEEE-754.',
            content: `Variables are named memory storage locations. In C, data types determine how many bytes are allocated and how the bit pattern is interpreted.
Signed integers use two's complement for negative values. Characters occupy 1 byte (ASCII). Floating point values follow IEEE-754 standard.`,
            videoPlaceholder: {
              title: 'Primitive Types in Memory Architecture',
              duration: '16:10',
              instructor: 'Systems Faculty',
              thumbnailBadge: 'Video Lecture 03',
              notice: 'Demo video lecture preview. Ready for streaming service integration.',
            },
            codeSnippet: {
              title: 'Sizeof Operator for Primitive Types',
              language: 'c',
              code: `#include <stdio.h>

int main(void) {
    printf("char:   %zu byte\\n", sizeof(char));
    printf("int:    %zu bytes\\n", sizeof(int));
    printf("float:  %zu bytes\\n", sizeof(float));
    printf("double: %zu bytes\\n", sizeof(double));
    return 0;
}`,
              explanation: 'sizeof is a compile-time operator returning size in bytes as size_t (%zu format specifier).',
              output: 'char:   1 byte\nint:    4 bytes\nfloat:  4 bytes\ndouble: 8 bytes',
            },
            keyTakeaways: [
              'Type sizes are architecture-dependent, verified via sizeof().',
              'unsigned types double the positive range by omitting negative sign bits.',
            ],
            isDemo: true,
          },
        ],
      },
      {
        id: 'chap-c-operators',
        chapterNumber: 3,
        title: 'Operators',
        description: 'Arithmetic, relational, logical, bitwise, assignment, and ternary operators with operator precedence table.',
        lessons: [
          {
            id: 'c-ops-1',
            chapterId: 'chap-c-operators',
            title: 'Arithmetic, Relational & Short-Circuit Logical Operators',
            duration: '20 min',
            type: 'exercise',
            description: 'Master operator precedence, integer division truncation, and short-circuit evaluation in logical AND (&&) / OR (||).',
            content: `Operators dictate computational transformations. In C, integer division (5 / 2) truncates decimals and yields 2.
Logical operators (&& and ||) practice short-circuiting: if the left operand determines the outcome, the right operand is never evaluated.`,
            videoPlaceholder: {
              title: 'Operator Precedence and Short-Circuit Evaluation',
              duration: '19:50',
              instructor: 'Computer Science Lab',
              thumbnailBadge: 'Video Lecture 04',
              notice: 'Demo video lecture preview.',
            },
            codeSnippet: {
              title: 'Short-Circuit Evaluation in C',
              language: 'c',
              code: `#include <stdio.h>

int main(void) {
    int x = 0;
    // (x != 0) is false, so (10 / x) is NEVER executed, preventing divide-by-zero
    if (x != 0 && (10 / x > 1)) {
        printf("Evaluated\\n");
    } else {
        printf("Short-circuit protected from division by zero!\\n");
    }
    return 0;
}`,
              explanation: 'Because the left side (x != 0) is false, C skips evaluating the right side entirely.',
              output: 'Short-circuit protected from division by zero!',
            },
            keyTakeaways: [
              'Integer division discards fractional remainders; use % (modulo) for remainder.',
              'Short-circuiting in && and || prevents dangerous operations like null-dereferencing.',
            ],
            isDemo: true,
          },
        ],
      },
      {
        id: 'chap-c-ifelse',
        chapterNumber: 4,
        title: 'If-Else Statements',
        description: 'Decision making constructs, nested conditionals, dangling else problem, and switch-case jump tables.',
        lessons: [
          {
            id: 'c-if-1',
            chapterId: 'chap-c-ifelse',
            title: 'Conditional Branching & Switch-Case Dispatch',
            duration: '22 min',
            type: 'video',
            description: 'Explore if, else if, nested branches, and compiler-generated jump tables with switch-case break semantics.',
            content: `Decision-making forms the backbone of algorithm flow. Any non-zero numeric expression in C evaluates to true, while zero (0) evaluates to false.
Switch statements evaluate an integral expression and jump directly to matching case labels via internal jump tables.`,
            videoPlaceholder: {
              title: 'Control Flow: If-Else & Switch Case Mechanics',
              duration: '21:30',
              instructor: 'Systems Programming Dept',
              thumbnailBadge: 'Video Lecture 05',
              notice: 'Demo video lecture placeholder.',
            },
            codeSnippet: {
              title: 'Grade Calculator with Switch-Case',
              language: 'c',
              code: `#include <stdio.h>

int main(void) {
    int score = 85;
    char grade;
    switch (score / 10) {
        case 10:
        case 9:  grade = 'O'; break;
        case 8:  grade = 'A'; break;
        case 7:  grade = 'B'; break;
        default: grade = 'C'; break;
    }
    printf("Score %d receives grade %c\\n", score, grade);
    return 0;
}`,
              explanation: 'Fall-through between case 10 and 9 enables multi-value match. The "break;" statement exits the switch block.',
              output: 'Score 85 receives grade A',
            },
            keyTakeaways: [
              'Zero (0) is false; any non-zero integer is evaluated as true.',
              'Always include break; in switch cases unless fall-through is explicitly intentional.',
            ],
            isDemo: true,
          },
        ],
      },
      {
        id: 'chap-c-loops',
        chapterNumber: 5,
        title: 'Loops',
        description: 'Iterative control structures: while, do-while, for loops, nested loops, break, and continue statements.',
        lessons: [
          {
            id: 'c-loop-1',
            chapterId: 'chap-c-loops',
            title: 'Loop Structures: For, While & Do-While Mechanics',
            duration: '25 min',
            type: 'exercise',
            description: 'Entry-controlled vs exit-controlled loops, loop invariant conditions, and avoiding off-by-one errors.',
            content: `Loops execute a code block repeatedly while a condition holds true.
A for loop encapsulates initialization, test condition, and step increment in a single statement.
Do-while is exit-controlled, guaranteeing at least one execution pass before testing.`,
            videoPlaceholder: {
              title: 'Loop Mechanics, Invariants & Tracing',
              duration: '24:15',
              instructor: 'Faculty of Computing',
              thumbnailBadge: 'Video Lecture 06',
              notice: 'Demo video lecture placeholder.',
            },
            codeSnippet: {
              title: 'Computing Fibonacci Series Iteratively',
              language: 'c',
              code: `#include <stdio.h>

int main(void) {
    int n = 6, t1 = 0, t2 = 1, nextTerm;
    printf("Fibonacci Sequence: %d, %d", t1, t2);
    for (int i = 3; i <= n; ++i) {
        nextTerm = t1 + t2;
        printf(", %d", nextTerm);
        t1 = t2;
        t2 = nextTerm;
    }
    printf("\\n");
    return 0;
}`,
              explanation: 'A for loop tracks loop variable i, updating previous terms in O(n) linear time with O(1) auxiliary space.',
              output: 'Fibonacci Sequence: 0, 1, 1, 2, 3, 5',
            },
            keyTakeaways: [
              'For loops are best for predetermined iteration counts.',
              'Do-while guarantees at least 1 iteration.',
              'Break terminates the innermost loop; continue skips to the next step.',
            ],
            isDemo: true,
          },
        ],
      },
      {
        id: 'chap-c-arrays',
        chapterNumber: 6,
        title: 'Arrays',
        description: 'Single and multi-dimensional contiguous memory arrays, array-pointer duality, and string arrays in C.',
        lessons: [
          {
            id: 'c-arr-1',
            chapterId: 'chap-c-arrays',
            title: '1D & 2D Arrays & Contiguous Memory Layout',
            duration: '22 min',
            type: 'video',
            description: 'Zero-indexed elements, boundary checking limitations in C, row-major memory order, and passing arrays to functions.',
            content: `An array is a fixed-size, sequential collection of elements of the same type stored in contiguous memory locations.
C does NOT perform runtime boundary checking: accessing array[10] on a 10-element array causes undefined behavior.`,
            videoPlaceholder: {
              title: 'Array Memory Architecture & Row-Major Order',
              duration: '22:40',
              instructor: 'Systems Programming Staff',
              thumbnailBadge: 'Video Lecture 07',
              notice: 'Demo video lecture placeholder.',
            },
            codeSnippet: {
              title: 'Linear Search Algorithm in C Array',
              language: 'c',
              code: `#include <stdio.h>

int linearSearch(const int arr[], int size, int target) {
    for (int i = 0; i < size; i++) {
        if (arr[i] == target) return i; // Found at index i
    }
    return -1; // Not found
}

int main(void) {
    int marks[] = {78, 92, 65, 88, 95};
    int n = sizeof(marks) / sizeof(marks[0]);
    int pos = linearSearch(marks, n, 88);
    printf("Target 88 found at index: %d\\n", pos);
    return 0;
}`,
              explanation: 'Array size must be explicitly passed into functions because array parameters decay to pointers.',
              output: 'Target 88 found at index: 3',
            },
            keyTakeaways: [
              'Array elements reside in contiguous memory bytes.',
              'C provides no bounds checking; programmers must enforce buffer safety.',
            ],
            isDemo: true,
          },
        ],
      },
      {
        id: 'chap-c-functions',
        chapterNumber: 7,
        title: 'Functions',
        description: 'Function prototypes, call by value vs call by reference, stack call frames, and recursive algorithms.',
        lessons: [
          {
            id: 'c-fn-1',
            chapterId: 'chap-c-functions',
            title: 'Call-Stack Frames & Recursion Mechanics',
            duration: '26 min',
            type: 'video',
            description: 'Stack frame allocation, return addresses, local scope lifetimes, base cases, and recursion trees.',
            content: `Functions modularize code into reusable units. Every function call pushes a stack frame containing arguments, local variables, and the return address.
Recursion occurs when a function calls itself. Every recursive function requires a base condition to halt stack growth and prevent stack overflow.`,
            videoPlaceholder: {
              title: 'Call Stack Visualization & Recursive Functions',
              duration: '26:00',
              instructor: 'Algorithms Department',
              thumbnailBadge: 'Video Lecture 08',
              notice: 'Demo video lecture placeholder.',
            },
            codeSnippet: {
              title: 'Factorial Computation via Recursion',
              language: 'c',
              code: `#include <stdio.h>

long long factorial(int n) {
    if (n <= 1) return 1; // Base case
    return n * factorial(n - 1); // Recursive step
}

int main(void) {
    int val = 5;
    printf("Factorial of %d = %lld\\n", val, factorial(val));
    return 0;
}`,
              explanation: 'Factorial(5) recurses until n <= 1, then unwinds the call stack multiplying intermediate values.',
              output: 'Factorial of 5 = 120',
            },
            keyTakeaways: [
              'Functions isolate scope and support modular unit testing.',
              'Recursive functions must define an unreachable base condition to prevent stack overflow.',
            ],
            isDemo: true,
          },
        ],
      },
      {
        id: 'chap-c-pointers',
        chapterNumber: 8,
        title: 'Pointers',
        description: 'Memory addresses, pointer syntax, dereferencing (*), pointer arithmetic, void pointers, and dynamic memory allocation (malloc/free).',
        lessons: [
          {
            id: 'c-ptr-1',
            chapterId: 'chap-c-pointers',
            title: 'Pointer Fundamentals & Address-Of (&) Operator',
            duration: '28 min',
            type: 'interactive',
            description: 'Memory address representation, pointer declaration, dereference operator (*), and pass-by-reference simulation.',
            content: `A pointer is a variable whose value is the memory address of another variable.
Pointers provide direct memory access, enable efficient dynamic data structures (linked lists, trees), and allow functions to alter caller arguments directly.`,
            videoPlaceholder: {
              title: 'Memory Addresses, Pointers & Indirection Demystified',
              duration: '28:15',
              instructor: 'Systems Architecture Lab',
              thumbnailBadge: 'Video Lecture 09',
              notice: 'Demo video lecture placeholder.',
            },
            codeSnippet: {
              title: 'Swapping Two Values Using Pointers',
              language: 'c',
              code: `#include <stdio.h>

void swap(int *a, int *b) {
    int temp = *a; // Dereference a to get value
    *a = *b;       // Put value at b into address a
    *b = temp;     // Put temp into address b
}

int main(void) {
    int x = 10, y = 20;
    printf("Before swap: x=%d, y=%d\\n", x, y);
    swap(&x, &y); // Pass memory addresses of x and y
    printf("After swap:  x=%d, y=%d\\n", x, y);
    return 0;
}`,
              explanation: 'Passing memory addresses (&x, &y) enables the swap function to directly modify values in the caller frame.',
              output: 'Before swap: x=10, y=20\nAfter swap:  x=20, y=10',
            },
            keyTakeaways: [
              'A pointer stores a 64-bit hexadecimal memory address (on 64-bit systems).',
              '*ptr dereferences the address to access or modify the underlying value.',
              'Pointers enable pass-by-reference semantics in C.',
            ],
            isDemo: true,
          },
          {
            id: 'c-ptr-2',
            chapterId: 'chap-c-pointers',
            title: 'Dynamic Memory Allocation (malloc, calloc, free)',
            duration: '30 min',
            type: 'exercise',
            description: 'Heap vs stack memory, runtime memory requests with malloc(), zero-initialization with calloc(), and avoiding memory leaks.',
            content: `Stack memory is fixed and tied to function lifecycles. Heap memory allows allocation at runtime using malloc(bytes) and calloc(num, size).
Every heap allocation must be paired with free(ptr) when no longer needed to prevent memory leaks and dangling pointer hazards.`,
            videoPlaceholder: {
              title: 'Heap Memory Allocation & Pointer Safety',
              duration: '30:00',
              instructor: 'Systems Programming Dept',
              thumbnailBadge: 'Video Lecture 10',
              notice: 'Demo video lecture placeholder.',
            },
            codeSnippet: {
              title: 'Dynamic Array Allocation with malloc and free',
              language: 'c',
              code: `#include <stdio.h>
#include <stdlib.h>

int main(void) {
    int n = 4;
    int *arr = (int *)malloc(n * sizeof(int));
    if (arr == NULL) {
        printf("Memory allocation failed!\\n");
        return 1;
    }
    for (int i = 0; i < n; i++) arr[i] = (i + 1) * 10;
    printf("Dynamically allocated elements: ");
    for (int i = 0; i < n; i++) printf("%d ", arr[i]);
    printf("\\n");
    free(arr); // Return memory to OS
    arr = NULL; // Defend against dangling pointer
    return 0;
}`,
              explanation: 'Always verify malloc return is not NULL, and set pointers to NULL after calling free().',
              output: 'Dynamically allocated elements: 10 20 30 40',
            },
            keyTakeaways: [
              'Heap memory persists across function calls until free() is explicitly invoked.',
              'Failing to free heap memory leads to memory exhaustion (memory leaks).',
            ],
            isDemo: true,
          },
        ],
      },
    ],
    assignments: [
      {
        id: 'assign-c-syntax',
        courseId: 'c-programming',
        title: 'Assignment 1: Variables, I/O & Arithmetic Expressions',
        instructions:
          'Implement a C program that calculates student grade percentages, applies tax deductions, and prints a formatted terminal receipt. Ensure safe inputs using scanf validation.',
        difficulty: 'Easy',
        dueDate: 'Nov 18, 2026',
        points: 50,
        status: 'Submitted',
        rubric: [
          'Correct usage of format specifiers (%d, %f)',
          'Proper variable naming following camelCase or snake_case',
          'Graceful handling of non-numeric input',
        ],
        sampleQuestions: [],
        isDemo: true,
      },
      {
        id: 'assign-c-loops',
        courseId: 'c-programming',
        title: 'Assignment 2: Loop Patterns & Number Theory Algorithms',
        instructions:
          'Write a program to test whether a given number is prime, compute GCD using Euclidean algorithm, and print a symmetric inverted pyramid number pattern.',
        difficulty: 'Medium',
        dueDate: 'Nov 25, 2026',
        points: 100,
        status: 'In Progress',
        rubric: [
          'Optimal prime checking up to sqrt(n)',
          'Clear indentation and modular comments',
          'Edge case handling for n <= 1',
        ],
        sampleQuestions: [],
        isDemo: true,
      },
      {
        id: 'assign-c-pointers',
        courseId: 'c-programming',
        title: 'Assignment 3: Pointer Arithmetic & Dynamic Array Manager',
        instructions:
          'Create a dynamic integer array using malloc(), implement insertion and deletion functions using pointer arithmetic, and ensure zero memory leaks via Valgrind check.',
        difficulty: 'Hard',
        dueDate: 'Dec 05, 2026',
        points: 150,
        status: 'Not Started',
        rubric: [
          'No array subscript [] syntax in core functions; use pointer math *(ptr + i)',
          'Explicit free() and nullification of deallocated pointers',
          'Dynamic reallocation when capacity is exceeded',
        ],
        sampleQuestions: [],
        isDemo: true,
      },
    ],
    notes: [
      {
        id: 'note-c-pointers',
        courseId: 'c-programming',
        chapterTitle: 'Pointers & Memory Architecture',
        title: 'Comprehensive Pointer Mechanics & Memory Layout Guide',
        description: 'Complete visual breakdowns of the call stack, heap boundaries, pointer arithmetic rules, and double pointers (**ptr).',
        pagesCount: 18,
        fileSize: '1.4 MB',
        topicsCovered: ['Address operator (&)', 'Indirection operator (*)', 'Pointers to Pointers', 'Function Pointers', 'Memory Leaks'],
        previewContent: `Unit 8: Pointer Architecture in C
A pointer holds a memory address. In x86_64 systems, pointers occupy 8 bytes.
- &x evaluates to the hexadecimal address of x.
- *ptr dereferences the pointer to retrieve the lvalue/rvalue.
- Pointer Arithmetic: ptr + 1 advances the address by sizeof(*ptr) bytes.`,
        updatedAt: '2 days ago',
        isDemo: true,
      },
      {
        id: 'note-c-loops-arrays',
        courseId: 'c-programming',
        chapterTitle: 'Arrays & Loop Structures',
        title: 'Arrays, Strings & Loop Invariant Reference Manual',
        description: 'Quick formula sheet for array index calculations, 2D matrix operations, string null termination (\\0), and loop tracing templates.',
        pagesCount: 12,
        fileSize: '950 KB',
        topicsCovered: ['Single-dimensional Arrays', 'Matrix Multiplication in C', 'String Manipulation', 'Off-by-One Traps'],
        previewContent: `Unit 6: Arrays and Row-Major Memory
In C, a 2D array matrix[M][N] is flattened in row-major order:
Address of matrix[i][j] = BaseAddress + (i * N + j) * sizeof(element).`,
        updatedAt: '1 week ago',
        isDemo: true,
      },
    ],
    practiceQuestions: [
      {
        id: 'c-pq-1',
        topic: 'Variables',
        question: 'What is the correct format specifier to print a variable of type double in printf()?',
        type: 'multiple-choice',
        options: ['%d', '%f', '%lf or %f', '%s'],
        correctAnswer: '%lf or %f',
        explanation: 'In printf, both %f and %lf are accepted for double because float arguments are automatically promoted to double in variadic calls.',
        hint: 'Think about default argument promotions in C standard I/O.',
        difficulty: 'Easy',
        isDemo: true,
      },
      {
        id: 'c-pq-2',
        topic: 'Operators',
        question: 'What is the output of the expression: 7 / 2 + 7 % 2 in standard C?',
        type: 'code-output',
        options: ['4.5', '4', '3', '5'],
        correctAnswer: '4',
        explanation: 'Integer division 7 / 2 evaluates to 3 (truncated). Modulo 7 % 2 evaluates to 1. 3 + 1 = 4.',
        hint: 'Integer division discards fractional remainders before addition.',
        difficulty: 'Easy',
        isDemo: true,
      },
      {
        id: 'c-pq-3',
        topic: 'If-Else',
        question: 'What does the following snippet print?\nint x = 5;\nif (x = 0) printf("True"); else printf("False");',
        type: 'code-output',
        options: ['True', 'False', 'Compilation Error', 'Undefined'],
        correctAnswer: 'False',
        explanation: 'The statement uses assignment (=) instead of comparison (==). (x = 0) assigns 0 to x and evaluates to 0 (false), triggering the else branch.',
        hint: 'Notice whether the condition uses = or ==.',
        difficulty: 'Medium',
        isDemo: true,
      },
      {
        id: 'c-pq-4',
        topic: 'Loops',
        question: 'How many times will a "do { count++; } while(count < 0);" loop body execute if count is initially initialized to 0?',
        type: 'multiple-choice',
        options: ['0 times', '1 time', 'Infinite loop', 'Compiler warning error'],
        correctAnswer: '1 time',
        explanation: 'A do-while loop is an exit-controlled loop. Its body is guaranteed to execute at least once before testing the condition.',
        hint: 'Do-while evaluates condition at the bottom.',
        difficulty: 'Easy',
        isDemo: true,
      },
      {
        id: 'c-pq-5',
        topic: 'Arrays',
        question: 'If int arr[5] = {10, 20, 30, 40, 50};, what is the value of *(arr + 3)?',
        type: 'code-output',
        options: ['30', '40', '50', 'Address of arr[3]'],
        correctAnswer: '40',
        explanation: 'arr decays to a pointer to the first element (index 0). arr + 3 points to index 3. Dereferencing *(arr + 3) yields arr[3], which is 40.',
        hint: 'Array indexing arr[i] is syntactically equivalent to *(arr + i).',
        difficulty: 'Medium',
        isDemo: true,
      },
    ],
  },

  // 2. COMPUTER FUNDAMENTALS
  {
    id: 'computer-fundamentals',
    title: 'Computer Fundamentals & IT Architecture',
    code: `${BRAND_CONFIG.monogram}-102`,
    shortDescription:
      'Explore CPU Von Neumann architecture, binary logic gates, cache memory hierarchies, and operating system kernels.',
    fullDescription:
      'Deconstruct the physical and logical architecture of modern computers. Learn how software commands translate into electrical signals across ALU registers, bus lines, and secondary storage controllers.',
    iconName: 'Cpu',
    semester: 1,
    category: 'Core CS',
    level: 'Beginner',
    chaptersCount: 5,
    lessonsCount: 18,
    durationHours: 28,
    prerequisites: ['Basic high school mathematics'],
    isDemo: true,
    chapters: [
      {
        id: 'chap-cf-1',
        chapterNumber: 1,
        title: 'Von Neumann Architecture & System Buses',
        description: 'Stored-program concept, Control Unit, ALU, Program Counter, and Address/Data/Control buses.',
        lessons: [
          {
            id: 'comp-arch-1',
            chapterId: 'chap-cf-1',
            title: 'Von Neumann Architecture & The Fetch-Decode-Execute Cycle',
            duration: '20 min',
            type: 'video',
            description: 'Understanding register-transfer operations, Program Counter incrementation, and memory bottlenecks.',
            content: `The Von Neumann architecture separates processing from memory storage using shared bus lines.
The CPU repeatedly executes the Fetch-Decode-Execute cycle: fetching instructions pointed to by the Program Counter (PC), decoding them via the Control Unit (CU), and executing them inside the Arithmetic Logic Unit (ALU).`,
            videoPlaceholder: {
              title: 'Von Neumann Model & CPU Instruction Cycle',
              duration: '19:40',
              instructor: 'Hardware Architecture Faculty',
              thumbnailBadge: 'CF Lecture 01',
              notice: 'Demo video lecture placeholder.',
            },
            keyTakeaways: [
              'Shared bus architecture creates the Von Neumann bottleneck.',
              'The Program Counter holds the memory address of the next instruction.',
            ],
            isDemo: true,
          },
        ],
      },
    ],
    assignments: [
      {
        id: 'assign-cf-binary',
        courseId: 'computer-fundamentals',
        title: 'Assignment 1: Number Systems & Boolean Gate Synthesis',
        instructions: 'Convert between Decimal, Binary, Hexadecimal, and Octal numbers. Minimize a 4-variable Boolean function using Karnaugh Maps (K-Map).',
        difficulty: 'Medium',
        dueDate: 'Nov 20, 2026',
        points: 50,
        status: 'In Progress',
        rubric: ['Step-by-step Radix conversion proofs', 'Accurate K-Map groupings (quads and octets)'],
        sampleQuestions: [],
        isDemo: true,
      },
    ],
    notes: [
      {
        id: 'note-comp-number-systems',
        courseId: 'computer-fundamentals',
        chapterTitle: 'Number Systems & Boolean Algebra',
        title: 'Binary Math, Radix Conversion & Logic Gates Cheatsheet',
        description: 'Concise reference tables for 2s complement arithmetic, IEEE-754 32-bit floats, and universal NAND/NOR gate implementations.',
        pagesCount: 14,
        fileSize: '1.1 MB',
        topicsCovered: ['Base-2 to Base-16 conversions', 'Two’s Complement', 'De Morgan’s Laws', 'K-Maps'],
        previewContent: `Unit 2: Number Systems & Logic Synthesis
Radix Conversion rules:
- Divide decimal by base r to convert integer portion.
- Multiply fractional portion by r repeatedly.`,
        updatedAt: '3 days ago',
        isDemo: true,
      },
    ],
    practiceQuestions: [
      {
        id: 'cf-pq-1',
        topic: 'Number Systems',
        question: 'What is the binary representation of hexadecimal value 0x2F?',
        type: 'multiple-choice',
        options: ['0010 1111', '0011 1111', '0010 1110', '0001 1111'],
        correctAnswer: '0010 1111',
        explanation: '0x2 = 0010 in 4-bit nibble; 0xF = 15 = 1111 in binary. Combining gives 0010 1111.',
        hint: 'Convert each hex digit into a 4-bit binary group.',
        difficulty: 'Easy',
        isDemo: true,
      },
    ],
  },

  // 3. MATHEMATICS
  {
    id: 'mathematics',
    title: 'Discrete Mathematics for Computing',
    code: `${BRAND_CONFIG.monogram}-103`,
    shortDescription:
      'Set theory, relations, propositional calculus, combinatorics, graph theory, and proof methods critical for computer science.',
    fullDescription:
      'Discrete mathematics provides the theoretical language of computing. You will master formal logic, truth tables, equivalence proofs, mathematical induction, recurrence relations, and graph algorithms.',
    iconName: 'Binary',
    semester: 1,
    category: 'Mathematics',
    level: 'Intermediate',
    chaptersCount: 5,
    lessonsCount: 20,
    durationHours: 36,
    prerequisites: ['High school algebra & coordinate geometry'],
    isDemo: true,
    chapters: [
      {
        id: 'chap-dm-1',
        chapterNumber: 1,
        title: 'Set Theory, Relations & Functions',
        description: 'Venn diagrams, power sets, Cartesian products, equivalence relations, and bijection functions.',
        lessons: [
          {
            id: 'dm-set-1',
            chapterId: 'chap-dm-1',
            title: 'Set Algebra & Cartesian Product Operations',
            duration: '22 min',
            type: 'video',
            description: 'Subset relations, union, intersection, complement, power set cardinality, and Cartesian products.',
            content: `Sets form the basis of all relational data structures.
The cardinality of a power set P(A) for a finite set with n elements is 2^n. Equivalence relations satisfy reflexive, symmetric, and transitive properties.`,
            videoPlaceholder: {
              title: 'Formal Set Theory and Relations Proofs',
              duration: '21:50',
              instructor: 'Department of Mathematics',
              thumbnailBadge: 'Math Lecture 01',
              notice: 'Demo video lecture placeholder.',
            },
            keyTakeaways: [
              'Power set cardinality is 2^|A|.',
              'Equivalence relations partition a set into disjoint equivalence classes.',
            ],
            isDemo: true,
          },
        ],
      },
    ],
    assignments: [
      {
        id: 'assign-dm-logic',
        courseId: 'mathematics',
        title: 'Assignment 1: Truth Tables & Tautology Proofs',
        instructions: 'Prove using Boolean equivalence laws that ~(P -> Q) is logically equivalent to (P ∧ ~Q). Construct complete truth tables for 3-variable compound propositions.',
        difficulty: 'Medium',
        dueDate: 'Nov 22, 2026',
        points: 50,
        status: 'Not Started',
        rubric: ['Step-by-step law citations (De Morgan, Material Implication)', 'Complete truth table truth-value derivations'],
        sampleQuestions: [],
        isDemo: true,
      },
    ],
    notes: [
      {
        id: 'note-dm-logic',
        courseId: 'mathematics',
        chapterTitle: 'Propositional Calculus',
        title: 'Discrete Math Axioms, Laws & Truth Tables Handbook',
        description: 'Formulas and theorems for propositional logic, set identities, Pigeonhole Principle, and Euler graph conditions.',
        pagesCount: 16,
        fileSize: '1.2 MB',
        topicsCovered: ['Propositional Logic', 'Predicates & Quantifiers', 'Principle of Mathematical Induction', 'Graph Trees'],
        previewContent: `Discrete Math Formulas & Laws:
- Material Implication: P -> Q ≡ ~P ∨ Q
- De Morgan: ~(P ∧ Q) ≡ ~P ∨ ~Q`,
        updatedAt: '4 days ago',
        isDemo: true,
      },
    ],
    practiceQuestions: [
      {
        id: 'dm-pq-1',
        topic: 'Set Theory',
        question: 'If set A has 4 elements, what is the total number of subsets in its power set P(A)?',
        type: 'multiple-choice',
        options: ['8', '16', '32', '64'],
        correctAnswer: '16',
        explanation: 'The number of subsets in the power set of a set with n elements is 2^n. For n = 4, 2^4 = 16 subsets.',
        hint: 'Use the formula 2^n.',
        difficulty: 'Easy',
        isDemo: true,
      },
    ],
  },

  // 4. PYTHON PROGRAMMING
  {
    id: 'python-programming',
    title: 'Python for Problem Solving',
    code: `${BRAND_CONFIG.monogram}-104`,
    shortDescription:
      'Learn modern high-level programming: scripting, list comprehensions, data wrangling, OOP principles, and clean automation.',
    fullDescription:
      'Accelerate your problem-solving capabilities with Python. Learn expressive syntax, dynamic data structures, dictionary manipulation, file processing, exception handling, and object-oriented paradigms.',
    iconName: 'TerminalSquare',
    semester: 1,
    category: 'Programming',
    level: 'Beginner',
    chaptersCount: 5,
    lessonsCount: 22,
    durationHours: 30,
    prerequisites: ['Basic logical reasoning'],
    isDemo: true,
    chapters: [
      {
        id: 'chap-py-1',
        chapterNumber: 1,
        title: 'Python Essentials & Data Types',
        description: 'Dynamic typing, numeric types, strings, slicing operations, and built-in interactive REPL.',
        lessons: [
          {
            id: 'py-intro-1',
            chapterId: 'chap-py-1',
            title: 'Python Syntax & Dynamic Type System',
            duration: '18 min',
            type: 'video',
            description: 'Indentation syntax rules, dynamic binding, immutable vs mutable objects, and string formatting.',
            content: `Python is an interpreted, dynamically typed language emphasizing readable syntax.
Indentation defines code blocks instead of curly braces. Everything in Python is an object, categorized into mutable types (lists, dicts) and immutable types (ints, strings, tuples).`,
            videoPlaceholder: {
              title: 'Python Syntax, Indentation & Data Models',
              duration: '17:45',
              instructor: 'Python Software Institute',
              thumbnailBadge: 'Python Lecture 01',
              notice: 'Demo video lecture placeholder.',
            },
            codeSnippet: {
              title: 'List Comprehension and String Formatting',
              language: 'python',
              code: `# List comprehension generates squares of even numbers
numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
even_squares = [x**2 for x in numbers if x % 2 == 0]
print(f"Even squares: {even_squares}")`,
              explanation: 'List comprehensions provide a concise, idiomatic way to transform iterable sequences in Python.',
              output: 'Even squares: [4, 16, 36, 64, 100]',
            },
            keyTakeaways: [
              'Indentation replaces curly braces for code blocks.',
              'f-strings provide clean, readable string interpolation.',
            ],
            isDemo: true,
          },
        ],
      },
    ],
    assignments: [
      {
        id: 'assign-py-data',
        courseId: 'python-programming',
        title: 'Assignment 1: Student Record Processing with Dictionaries',
        instructions: 'Build a Python script that ingests student test scores, computes average GPAs using dictionary lookups, and exports ranked results to a text file.',
        difficulty: 'Easy',
        dueDate: 'Nov 24, 2026',
        points: 50,
        status: 'Not Started',
        rubric: ['Idiomatic list and dictionary operations', 'Safe file I/O with "with open(...)" blocks'],
        sampleQuestions: [],
        isDemo: true,
      },
    ],
    notes: [
      {
        id: 'note-py-data',
        courseId: 'python-programming',
        chapterTitle: 'Python Data Structures',
        title: 'Python Core Syntax, Slicing & Standard Library Guide',
        description: 'Comprehensive quick guide on list slicing [start:stop:step], dictionary comprehension, tuple packing, and lambda expressions.',
        pagesCount: 15,
        fileSize: '1.0 MB',
        topicsCovered: ['Data Structures', 'List Comprehensions', 'File Handling', 'Exception Handling'],
        previewContent: `Python Quick Syntax:
- Slice: seq[start:stop:step]
- Dict: {k: v for k, v in items}`,
        updatedAt: '5 days ago',
        isDemo: true,
      },
    ],
    practiceQuestions: [
      {
        id: 'py-pq-1',
        topic: 'List Slicing',
        question: 'What is the result of letters = ["a", "b", "c", "d", "e"][::-1] in Python?',
        type: 'code-output',
        options: ['["e", "d", "c", "b", "a"]', '["a", "b", "c", "d", "e"]', 'IndexError', 'None'],
        correctAnswer: '["e", "d", "c", "b", "a"]',
        explanation: 'A step size of -1 in Python slicing reverses the iterable sequence.',
        hint: 'Negative step values traverse sequences backwards.',
        difficulty: 'Easy',
        isDemo: true,
      },
    ],
  },

  // 5. ENGLISH (Humanities)
  {
    id: 'english',
    title: 'Professional Communication & Technical English',
    code: `${BRAND_CONFIG.monogram}-105`,
    shortDescription:
      'Master executive technical writing, business email etiquette, documentation clarity, and engineering presentation skills.',
    fullDescription:
      'Engineering excellence requires clear articulation. This course refines technical vocabulary, formal report structuring, email communication with senior stakeholders, and presentation delivery.',
    iconName: 'BookOpen',
    semester: 1,
    category: 'Humanities',
    level: 'Beginner',
    chaptersCount: 4,
    lessonsCount: 14,
    durationHours: 20,
    prerequisites: ['Basic conversational English'],
    isDemo: true,
    chapters: [
      {
        id: 'chap-eng-1',
        chapterNumber: 1,
        title: 'Technical Writing & Documentation Standards',
        description: 'Clarity, conciseness, avoiding jargon, writing READMEs, and technical software bug reports.',
        lessons: [
          {
            id: 'eng-write-1',
            chapterId: 'chap-eng-1',
            title: 'Writing Clear Technical Documentation & Software READMEs',
            duration: '15 min',
            type: 'reading',
            description: 'Structure of developer documentation, active vs passive voice, and unambiguous bug reporting.',
            content: `Technical writing prioritizes clarity, conciseness, and precision over ornate prose.
A developer README must provide immediate answers to three questions: What is this project? How do I install it? How do I run it?`,
            videoPlaceholder: {
              title: 'Effective Technical Communication for Software Engineers',
              duration: '14:30',
              instructor: 'Department of Humanities',
              thumbnailBadge: 'English Lecture 01',
              notice: 'Demo video lecture placeholder.',
            },
            keyTakeaways: [
              'Use active voice and imperative verbs for setup steps.',
              'Bullet points enhance scanning speed for technical reviewers.',
            ],
            isDemo: true,
          },
        ],
      },
    ],
    assignments: [
      {
        id: 'assign-eng-email',
        courseId: 'english',
        title: 'Assignment 1: Executive Email & Bug Report Draft',
        instructions: 'Draft an escalation email to a senior engineering manager regarding a critical deployment delay, and compose a reproducible software bug ticket.',
        difficulty: 'Easy',
        dueDate: 'Nov 28, 2026',
        points: 40,
        status: 'Not Started',
        rubric: ['Professional tone and subject line format', 'Clear steps to reproduce, expected vs actual behavior'],
        sampleQuestions: [],
        isDemo: true,
      },
    ],
    notes: [
      {
        id: 'note-eng-docs',
        courseId: 'english',
        chapterTitle: 'Technical Correspondence',
        title: 'Technical Writing, Email Templates & Presentation Playbook',
        description: 'Ready-to-use business email templates, resume action verbs, and presentation delivery checklists for technical demos.',
        pagesCount: 10,
        fileSize: '750 KB',
        topicsCovered: ['Formal Correspondence', 'Software Bug Reports', 'Active Voice Usage', 'Presentation Techniques'],
        previewContent: `Technical Writing Principles:
1. Be Direct: Put conclusions first.
2. Be Actionable: State next steps clearly.`,
        updatedAt: '1 week ago',
        isDemo: true,
      },
    ],
    practiceQuestions: [
      {
        id: 'eng-pq-1',
        topic: 'Professional Writing',
        question: 'Which of the following sentences correctly utilizes active voice for technical instruction?',
        type: 'multiple-choice',
        options: [
          'The configuration file should be modified by the developer.',
          'Modify the configuration file with your database credentials.',
          'Modification of configuration is recommended.',
          'A change in the file has to be performed.',
        ],
        correctAnswer: 'Modify the configuration file with your database credentials.',
        explanation: 'Active voice with an imperative verb ("Modify...") is direct, concise, and standard in technical documentation.',
        hint: 'Look for the sentence starting with an imperative command verb.',
        difficulty: 'Easy',
        isDemo: true,
      },
    ],
  },

  // 6. PSYCHOLOGY (Humanities)
  {
    id: 'psychology',
    title: 'Introduction to Psychology & Human Behavior',
    code: `${BRAND_CONFIG.monogram}-106`,
    shortDescription:
      'Understand cognitive perception, memory retention, group decision-making, and stress resilience in high-demand tech teams.',
    fullDescription:
      'Gain deep insight into human cognitive faculties. Explore how attention works, how memory consolidates learning, cognitive biases in code debugging, and psychological safety in collaborative software teams.',
    iconName: 'Sparkles',
    semester: 1,
    category: 'Humanities',
    level: 'Beginner',
    chaptersCount: 5,
    lessonsCount: 16,
    durationHours: 24,
    prerequisites: ['Curiosity about human cognition'],
    isDemo: true,
    chapters: [
      {
        id: 'chap-psy-1',
        chapterNumber: 1,
        title: 'Cognitive Architecture: Attention & Perception',
        description: 'Sensory thresholds, selective attention, cognitive load theory, and mental models in software interaction.',
        lessons: [
          {
            id: 'psy-cog-1',
            chapterId: 'chap-psy-1',
            title: 'Cognitive Load Theory & Learning Complex Code',
            duration: '18 min',
            type: 'reading',
            description: 'Working memory limitations (Miller’s Law 7±2), intrinsic vs extraneous cognitive load, and chunking strategies.',
            content: `Cognitive Load Theory explains why learning programming can feel overwhelming.
Working memory can only process approximately 4 to 7 items simultaneously. Chunking small syntax patterns into conceptual schemas frees up mental capacity for architectural problem-solving.`,
            videoPlaceholder: {
              title: 'Cognitive Science of Learning & Programming',
              duration: '17:20',
              instructor: 'Behavioral Sciences Faculty',
              thumbnailBadge: 'Psychology Lecture 01',
              notice: 'Demo video lecture placeholder.',
            },
            keyTakeaways: [
              'Working memory is strictly capacity-constrained.',
              'Chunking concepts into mental models reduces extraneous cognitive load.',
            ],
            isDemo: true,
          },
        ],
      },
    ],
    assignments: [
      {
        id: 'assign-psy-memory',
        courseId: 'psychology',
        title: 'Assignment 1: Case Study on Cognitive Biases in Debugging',
        instructions: 'Analyze confirmation bias during code debugging sessions. Write a 500-word reflective paper proposing systematic checklist methods to counter assumption biases.',
        difficulty: 'Easy',
        dueDate: 'Nov 30, 2026',
        points: 40,
        status: 'Not Started',
        rubric: ['Identification of cognitive bias mechanisms', 'Actionable remediation checklist for software teams'],
        sampleQuestions: [],
        isDemo: true,
      },
    ],
    notes: [
      {
        id: 'note-psy-cognition',
        courseId: 'psychology',
        chapterTitle: 'Cognitive Science & Memory',
        title: 'Cognitive Load Theory, Memory Consolidation & Team Psychology',
        description: 'Short revision guide on sensory registers, spaced repetition techniques, and interpersonal dynamics in agile engineering teams.',
        pagesCount: 12,
        fileSize: '880 KB',
        topicsCovered: ['Working Memory Limits', 'Spaced Repetition', 'Groupthink in Engineering', 'Stress Inoculation'],
        previewContent: `Psychology of Learning:
- Ebbinghaus Forgetting Curve: 50% forgotten within 24 hours without review.
- Solution: Spaced repetition strengthens synaptic consolidation.`,
        updatedAt: '1 week ago',
        isDemo: true,
      },
    ],
    practiceQuestions: [
      {
        id: 'psy-pq-1',
        topic: 'Cognitive Psychology',
        question: 'According to George Miller’s classical paper, what is the typical capacity limit of human short-term working memory?',
        type: 'multiple-choice',
        options: ['7 ± 2 chunks', '15 ± 3 chunks', 'Unlimited capacity', 'Only 1 item'],
        correctAnswer: '7 ± 2 chunks',
        explanation: 'Miller (1956) identified the magical number 7 ± 2 as the information processing bottleneck of conscious human working memory.',
        hint: 'The famous "magical number" in cognitive science.',
        difficulty: 'Easy',
        isDemo: true,
      },
    ],
  },
];

export const RECENTLY_ADDED_LESSONS = [
  {
    courseId: 'c-programming',
    courseTitle: 'C Programming',
    chapterId: 'chap-c-pointers',
    lessonId: 'c-ptr-1',
    title: 'Pointer Fundamentals & Address-Of (&) Operator',
    duration: '28 min',
    type: 'interactive',
    badge: 'Flagship Core',
    addedDate: 'Added today',
  },
  {
    courseId: 'c-programming',
    courseTitle: 'C Programming',
    chapterId: 'chap-c-pointers',
    lessonId: 'c-ptr-2',
    title: 'Dynamic Memory Allocation (malloc, calloc, free)',
    duration: '30 min',
    type: 'exercise',
    badge: 'Lab Focus',
    addedDate: 'Added today',
  },
  {
    courseId: 'computer-fundamentals',
    courseTitle: 'Computer Fundamentals',
    chapterId: 'chap-cf-1',
    lessonId: 'comp-arch-1',
    title: 'Von Neumann Architecture & The Fetch-Decode Cycle',
    duration: '20 min',
    type: 'video',
    badge: 'Core CS',
    addedDate: 'Yesterday',
  },
  {
    courseId: 'python-programming',
    courseTitle: 'Python Programming',
    chapterId: 'chap-py-1',
    lessonId: 'py-intro-1',
    title: 'Python Syntax & Dynamic Type System',
    duration: '18 min',
    type: 'video',
    badge: 'Scripting',
    addedDate: '2 days ago',
  },
];
