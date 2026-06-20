export const stats = {
  students: 4280,
  teachers: 186,
  courses: 92,
  departments: 14,
};

export const students = [
  { id: "STU-1024", name: "Aarav Sharma", email: "aarav@uni.edu", course: "B.Sc Computer Science", year: 2, attendance: 94, gpa: 3.8, fees: "Paid" },
  { id: "STU-1025", name: "Priya Patel", email: "priya@uni.edu", course: "B.A Economics", year: 3, attendance: 88, gpa: 3.6, fees: "Pending" },
  { id: "STU-1026", name: "Liam Johnson", email: "liam@uni.edu", course: "B.Eng Mechanical", year: 1, attendance: 76, gpa: 3.2, fees: "Paid" },
  { id: "STU-1027", name: "Sofia Garcia", email: "sofia@uni.edu", course: "B.Sc Mathematics", year: 4, attendance: 96, gpa: 3.9, fees: "Paid" },
  { id: "STU-1028", name: "Noah Williams", email: "noah@uni.edu", course: "B.A History", year: 2, attendance: 82, gpa: 3.4, fees: "Overdue" },
  { id: "STU-1029", name: "Mei Chen", email: "mei@uni.edu", course: "B.Sc Physics", year: 3, attendance: 91, gpa: 3.7, fees: "Paid" },
  { id: "STU-1030", name: "Oliver Brown", email: "oliver@uni.edu", course: "B.Com Finance", year: 1, attendance: 79, gpa: 3.1, fees: "Pending" },
  { id: "STU-1031", name: "Ananya Reddy", email: "ananya@uni.edu", course: "B.Sc Biology", year: 2, attendance: 93, gpa: 3.8, fees: "Paid" },
];

export const teachers = [
  { id: "TCH-201", name: "Dr. Eleanor Voss", dept: "Computer Science", courses: 4, students: 142 },
  { id: "TCH-202", name: "Prof. Rajesh Kumar", dept: "Mathematics", courses: 3, students: 98 },
  { id: "TCH-203", name: "Dr. Hannah Lee", dept: "Physics", courses: 2, students: 76 },
  { id: "TCH-204", name: "Prof. Marcus Bell", dept: "Economics", courses: 5, students: 184 },
  { id: "TCH-205", name: "Dr. Sara Müller", dept: "Biology", courses: 3, students: 120 },
];

export const courses = [
  { code: "CS-301", title: "Data Structures & Algorithms", teacher: "Dr. Eleanor Voss", credits: 4, enrolled: 68 },
  { code: "MA-204", title: "Linear Algebra", teacher: "Prof. Rajesh Kumar", credits: 3, enrolled: 54 },
  { code: "PH-210", title: "Quantum Mechanics I", teacher: "Dr. Hannah Lee", credits: 4, enrolled: 32 },
  { code: "EC-150", title: "Microeconomics", teacher: "Prof. Marcus Bell", credits: 3, enrolled: 88 },
  { code: "BI-220", title: "Molecular Biology", teacher: "Dr. Sara Müller", credits: 4, enrolled: 47 },
];

export const attendanceTrend = [
  { month: "Jan", rate: 88 },
  { month: "Feb", rate: 91 },
  { month: "Mar", rate: 86 },
  { month: "Apr", rate: 89 },
  { month: "May", rate: 92 },
  { month: "Jun", rate: 94 },
];

export const enrollmentByDept = [
  { dept: "CS", students: 820 },
  { dept: "Math", students: 410 },
  { dept: "Physics", students: 280 },
  { dept: "Bio", students: 360 },
  { dept: "Econ", students: 540 },
  { dept: "Eng", students: 690 },
];

export const gradeDistribution = [
  { grade: "A", value: 32 },
  { grade: "B", value: 41 },
  { grade: "C", value: 18 },
  { grade: "D", value: 6 },
  { grade: "F", value: 3 },
];

export const notifications = [
  { id: 1, title: "Mid-term schedule released", time: "2h ago", type: "info" },
  { id: 2, title: "Fee deadline: Nov 30", time: "1d ago", type: "warning" },
  { id: 3, title: "New assignment in CS-301", time: "2d ago", type: "info" },
  { id: 4, title: "Library book due tomorrow", time: "3d ago", type: "warning" },
];

export const results = [
  { course: "CS-301 Data Structures", marks: 88, total: 100, grade: "A" },
  { course: "MA-204 Linear Algebra", marks: 76, total: 100, grade: "B+" },
  { course: "PH-210 Quantum Mechanics", marks: 82, total: 100, grade: "A-" },
  { course: "EC-150 Microeconomics", marks: 71, total: 100, grade: "B" },
  { course: "EN-101 Technical Writing", marks: 91, total: 100, grade: "A+" },
];

export const feeHistory = [
  { id: "INV-2401", term: "Fall 2024", amount: 2400, status: "Paid", date: "2024-08-12" },
  { id: "INV-2402", term: "Spring 2024", amount: 2400, status: "Paid", date: "2024-01-15" },
  { id: "INV-2403", term: "Fall 2023", amount: 2300, status: "Paid", date: "2023-08-10" },
  { id: "INV-2404", term: "Spring 2025", amount: 2500, status: "Pending", date: "2025-01-20" },
];

export const testimonials = [
  {
    name: "Dr. Anjali Mehta",
    role: "Dean of Academics, Crestwood University",
    quote:
      "SMS replaced four legacy systems. Our faculty saves 12 hours every week, and parents finally trust our data.",
  },
  {
    name: "James O'Connor",
    role: "Registrar, Northbridge College",
    quote:
      "The dashboards are genuinely beautiful, and the role-based access just works. Onboarding 4,000 students was painless.",
  },
  {
    name: "Yuki Tanaka",
    role: "Student, Class of 2026",
    quote:
      "I can see my attendance, grades, and fees in one place — on my phone. It feels like a real product, not a school portal.",
  },
];
