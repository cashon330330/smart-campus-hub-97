/**
 * Smart Campus Hub — Supabase Auto Table Creator
 * Run: node setup_supabase_tables.js <SERVICE_ROLE_KEY>
 */

const https = require("https");
const fs = require("fs");
const path = require("path");

const PROJECT_REF = "buhlnghpsgaqufacpwqd";
const SERVICE_KEY = process.argv[2] || process.env.SUPABASE_SERVICE_KEY;

if (!SERVICE_KEY) {
  console.error(`
❌ Service Role Key missing!

Usage:
  node setup_supabase_tables.js YOUR_SERVICE_ROLE_KEY

Get your key from:
  https://supabase.com/dashboard/project/buhlnghpsgaqufacpwqd/settings/api
  → "service_role" key (secret)
`);
  process.exit(1);
}

const SQL = `
CREATE TABLE IF NOT EXISTS departments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL UNIQUE,
  code TEXT NOT NULL UNIQUE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
INSERT INTO departments (name, code) VALUES
  ('Computer Science', 'CS'), ('Mathematics', 'MATH'), ('Physics', 'PH'),
  ('Economics', 'EC'), ('Biology', 'BI'), ('Mechanical Engineering', 'ME'),
  ('History', 'HIS'), ('Finance', 'FIN') ON CONFLICT DO NOTHING;

CREATE TABLE IF NOT EXISTS teachers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  teacher_code TEXT NOT NULL UNIQUE,
  name TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  department TEXT NOT NULL,
  courses_count INTEGER DEFAULT 0,
  students_count INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
INSERT INTO teachers (teacher_code, name, email, department, courses_count, students_count) VALUES
  ('TCH-201', 'Dr. Eleanor Voss',   'eleanor.voss@uni.edu',   'Computer Science', 4, 142),
  ('TCH-202', 'Prof. Rajesh Kumar', 'rajesh.kumar@uni.edu',   'Mathematics',      3,  98),
  ('TCH-203', 'Dr. Hannah Lee',     'hannah.lee@uni.edu',     'Physics',          2,  76),
  ('TCH-204', 'Prof. Marcus Bell',  'marcus.bell@uni.edu',    'Economics',        5, 184),
  ('TCH-205', 'Dr. Sara Muller',    'sara.muller@uni.edu',    'Biology',          3, 120)
ON CONFLICT DO NOTHING;

CREATE TABLE IF NOT EXISTS courses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  code TEXT NOT NULL UNIQUE,
  title TEXT NOT NULL,
  teacher_name TEXT,
  credits INTEGER NOT NULL DEFAULT 3,
  enrolled INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
INSERT INTO courses (code, title, teacher_name, credits, enrolled) VALUES
  ('CS-301', 'Data Structures and Algorithms', 'Dr. Eleanor Voss',   4, 68),
  ('MA-204', 'Linear Algebra',                 'Prof. Rajesh Kumar', 3, 54),
  ('PH-210', 'Quantum Mechanics I',            'Dr. Hannah Lee',     4, 32),
  ('EC-150', 'Microeconomics',                 'Prof. Marcus Bell',  3, 88),
  ('BI-220', 'Molecular Biology',              'Dr. Sara Muller',    4, 47),
  ('EN-101', 'Technical Writing',              'Prof. Marcus Bell',  2, 60)
ON CONFLICT DO NOTHING;

CREATE TABLE IF NOT EXISTS students (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  student_code TEXT NOT NULL UNIQUE,
  name TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  course TEXT NOT NULL,
  year INTEGER NOT NULL DEFAULT 1 CHECK (year BETWEEN 1 AND 6),
  attendance NUMERIC(5,2) DEFAULT 0,
  gpa NUMERIC(3,2) DEFAULT 0,
  fees_status TEXT NOT NULL DEFAULT 'Pending' CHECK (fees_status IN ('Paid', 'Pending', 'Overdue')),
  created_at TIMESTAMPTZ DEFAULT NOW()
);
INSERT INTO students (student_code, name, email, course, year, attendance, gpa, fees_status) VALUES
  ('STU-1024', 'Aarav Sharma',  'aarav@uni.edu',   'B.Sc Computer Science', 2, 94.0, 3.80, 'Paid'),
  ('STU-1025', 'Priya Patel',   'priya@uni.edu',   'B.A Economics',         3, 88.0, 3.60, 'Pending'),
  ('STU-1026', 'Liam Johnson',  'liam@uni.edu',    'B.Eng Mechanical',      1, 76.0, 3.20, 'Paid'),
  ('STU-1027', 'Sofia Garcia',  'sofia@uni.edu',   'B.Sc Mathematics',      4, 96.0, 3.90, 'Paid'),
  ('STU-1028', 'Noah Williams', 'noah@uni.edu',    'B.A History',           2, 82.0, 3.40, 'Overdue'),
  ('STU-1029', 'Mei Chen',      'mei@uni.edu',     'B.Sc Physics',          3, 91.0, 3.70, 'Paid'),
  ('STU-1030', 'Oliver Brown',  'oliver@uni.edu',  'B.Com Finance',         1, 79.0, 3.10, 'Pending'),
  ('STU-1031', 'Ananya Reddy',  'ananya@uni.edu',  'B.Sc Biology',          2, 93.0, 3.80, 'Paid')
ON CONFLICT DO NOTHING;

CREATE TABLE IF NOT EXISTS results (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id UUID NOT NULL REFERENCES students(id) ON DELETE CASCADE,
  course_code TEXT NOT NULL,
  course_name TEXT NOT NULL,
  marks INTEGER NOT NULL CHECK (marks >= 0),
  total_marks INTEGER NOT NULL DEFAULT 100,
  grade TEXT NOT NULL,
  semester TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS fees (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  invoice_no TEXT NOT NULL UNIQUE,
  student_id UUID NOT NULL REFERENCES students(id) ON DELETE CASCADE,
  term TEXT NOT NULL,
  amount NUMERIC(10,2) NOT NULL,
  status TEXT NOT NULL DEFAULT 'Pending' CHECK (status IN ('Paid', 'Pending', 'Overdue')),
  due_date DATE,
  paid_date DATE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS attendance_records (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id UUID NOT NULL REFERENCES students(id) ON DELETE CASCADE,
  course_code TEXT NOT NULL,
  date DATE NOT NULL DEFAULT CURRENT_DATE,
  status TEXT NOT NULL DEFAULT 'present' CHECK (status IN ('present', 'absent', 'late')),
  marked_by TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE (student_id, course_code, date)
);

CREATE TABLE IF NOT EXISTS attendance_trend (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  month TEXT NOT NULL,
  year INTEGER NOT NULL,
  rate NUMERIC(5,2) NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE (month, year)
);
INSERT INTO attendance_trend (month, year, rate) VALUES
  ('Jan', 2024, 88), ('Feb', 2024, 91), ('Mar', 2024, 86),
  ('Apr', 2024, 89), ('May', 2024, 92), ('Jun', 2024, 94)
ON CONFLICT DO NOTHING;

CREATE TABLE IF NOT EXISTS notifications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  type TEXT NOT NULL DEFAULT 'info' CHECK (type IN ('info', 'warning', 'success', 'error')),
  for_role TEXT DEFAULT 'all',
  created_at TIMESTAMPTZ DEFAULT NOW()
);
INSERT INTO notifications (title, type, for_role) VALUES
  ('Mid-term schedule released', 'info',    'all'),
  ('Fee deadline: Nov 30',       'warning', 'student'),
  ('New assignment in CS-301',   'info',    'student'),
  ('Library book due tomorrow',  'warning', 'all')
ON CONFLICT DO NOTHING;
`;

function makeRequest(options, body) {
  return new Promise((resolve, reject) => {
    const req = https.request(options, (res) => {
      let data = "";
      res.on("data", (c) => (data += c));
      res.on("end", () => resolve({ status: res.statusCode, data }));
    });
    req.on("error", reject);
    if (body) req.write(body);
    req.end();
  });
}

async function main() {
  console.log("🚀 Smart Campus Hub — Supabase Table Creator");
  console.log("📡 Project:", PROJECT_REF);
  console.log("🔑 Key:", SERVICE_KEY.substring(0, 20) + "...");
  console.log("");

  // Use Supabase Management API to run SQL
  const body = JSON.stringify({ query: SQL });

  const options = {
    hostname: "api.supabase.com",
    path: `/v1/projects/${PROJECT_REF}/database/query`,
    method: "POST",
    headers: {
      Authorization: `Bearer ${SERVICE_KEY}`,
      "Content-Type": "application/json",
      "Content-Length": Buffer.byteLength(body),
    },
  };

  try {
    console.log("⏳ Running SQL on Supabase...");
    const result = await makeRequest(options, body);
    console.log("📊 Response Status:", result.status);

    if (result.status === 200 || result.status === 201) {
      console.log("✅ SUCCESS! All tables created!");
      console.log(
        "🔗 Check: https://supabase.com/dashboard/project/buhlnghpsgaqufacpwqd/editor"
      );
    } else {
      console.log("⚠️  Response:", result.data.substring(0, 1000));

      // Try alternative endpoint
      console.log("\n🔄 Trying alternative endpoint...");
      const altOptions = {
        hostname: `${PROJECT_REF}.supabase.co`,
        path: "/rest/v1/rpc/exec",
        method: "POST",
        headers: {
          apikey: SERVICE_KEY,
          Authorization: `Bearer ${SERVICE_KEY}`,
          "Content-Type": "application/json",
          "Content-Length": Buffer.byteLength(body),
        },
      };
      const alt = await makeRequest(altOptions, body);
      console.log("Alt Status:", alt.status);
      console.log("Alt Response:", alt.data.substring(0, 500));
    }
  } catch (e) {
    console.error("❌ Error:", e.message);
  }
}

main();
