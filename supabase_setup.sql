-- ============================================================
-- SMART CAMPUS HUB — SUPABASE DATABASE SETUP
-- Paste this entire file into Supabase → SQL Editor → Run
-- ============================================================

-- ========================
-- 1. DEPARTMENTS TABLE
-- ========================
CREATE TABLE IF NOT EXISTS departments (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name        TEXT NOT NULL UNIQUE,
  code        TEXT NOT NULL UNIQUE,
  created_at  TIMESTAMPTZ DEFAULT NOW()
);

INSERT INTO departments (name, code) VALUES
  ('Computer Science', 'CS'),
  ('Mathematics', 'MATH'),
  ('Physics', 'PH'),
  ('Economics', 'EC'),
  ('Biology', 'BI'),
  ('Mechanical Engineering', 'ME'),
  ('History', 'HIS'),
  ('Finance', 'FIN')
ON CONFLICT DO NOTHING;

-- ========================
-- 2. TEACHERS TABLE
-- ========================
CREATE TABLE IF NOT EXISTS teachers (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  teacher_code  TEXT NOT NULL UNIQUE,   -- e.g. TCH-201
  name          TEXT NOT NULL,
  email         TEXT NOT NULL UNIQUE,
  department    TEXT NOT NULL,
  courses_count INTEGER DEFAULT 0,
  students_count INTEGER DEFAULT 0,
  created_at    TIMESTAMPTZ DEFAULT NOW()
);

INSERT INTO teachers (teacher_code, name, email, department, courses_count, students_count) VALUES
  ('TCH-201', 'Dr. Eleanor Voss',   'eleanor.voss@uni.edu',   'Computer Science', 4, 142),
  ('TCH-202', 'Prof. Rajesh Kumar', 'rajesh.kumar@uni.edu',   'Mathematics',      3,  98),
  ('TCH-203', 'Dr. Hannah Lee',     'hannah.lee@uni.edu',     'Physics',          2,  76),
  ('TCH-204', 'Prof. Marcus Bell',  'marcus.bell@uni.edu',    'Economics',        5, 184),
  ('TCH-205', 'Dr. Sara Müller',    'sara.muller@uni.edu',    'Biology',          3, 120)
ON CONFLICT DO NOTHING;

-- ========================
-- 3. COURSES TABLE
-- ========================
CREATE TABLE IF NOT EXISTS courses (
  id           UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  code         TEXT NOT NULL UNIQUE,   -- e.g. CS-301
  title        TEXT NOT NULL,
  teacher_id   UUID REFERENCES teachers(id) ON DELETE SET NULL,
  teacher_name TEXT,                   -- denormalised for quick reads
  credits      INTEGER NOT NULL DEFAULT 3,
  enrolled     INTEGER NOT NULL DEFAULT 0,
  created_at   TIMESTAMPTZ DEFAULT NOW()
);

INSERT INTO courses (code, title, teacher_name, credits, enrolled) VALUES
  ('CS-301', 'Data Structures & Algorithms', 'Dr. Eleanor Voss',   4, 68),
  ('MA-204', 'Linear Algebra',               'Prof. Rajesh Kumar', 3, 54),
  ('PH-210', 'Quantum Mechanics I',          'Dr. Hannah Lee',     4, 32),
  ('EC-150', 'Microeconomics',               'Prof. Marcus Bell',  3, 88),
  ('BI-220', 'Molecular Biology',            'Dr. Sara Müller',    4, 47),
  ('EN-101', 'Technical Writing',            'Prof. Marcus Bell',  2, 60)
ON CONFLICT DO NOTHING;

-- ========================
-- 4. STUDENTS TABLE
-- ========================
CREATE TABLE IF NOT EXISTS students (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  student_code  TEXT NOT NULL UNIQUE,   -- e.g. STU-1024
  name          TEXT NOT NULL,
  email         TEXT NOT NULL UNIQUE,
  course        TEXT NOT NULL,          -- programme name
  year          INTEGER NOT NULL DEFAULT 1 CHECK (year BETWEEN 1 AND 6),
  attendance    NUMERIC(5,2) DEFAULT 0, -- percentage 0–100
  gpa           NUMERIC(3,2) DEFAULT 0,
  fees_status   TEXT NOT NULL DEFAULT 'Pending'
                  CHECK (fees_status IN ('Paid', 'Pending', 'Overdue')),
  created_at    TIMESTAMPTZ DEFAULT NOW()
);

INSERT INTO students (student_code, name, email, course, year, attendance, gpa, fees_status) VALUES
  ('STU-1024', 'Aarav Sharma',   'aarav@uni.edu',   'B.Sc Computer Science',    2, 94.0, 3.80, 'Paid'),
  ('STU-1025', 'Priya Patel',    'priya@uni.edu',   'B.A Economics',            3, 88.0, 3.60, 'Pending'),
  ('STU-1026', 'Liam Johnson',   'liam@uni.edu',    'B.Eng Mechanical',         1, 76.0, 3.20, 'Paid'),
  ('STU-1027', 'Sofia Garcia',   'sofia@uni.edu',   'B.Sc Mathematics',         4, 96.0, 3.90, 'Paid'),
  ('STU-1028', 'Noah Williams',  'noah@uni.edu',    'B.A History',              2, 82.0, 3.40, 'Overdue'),
  ('STU-1029', 'Mei Chen',       'mei@uni.edu',     'B.Sc Physics',             3, 91.0, 3.70, 'Paid'),
  ('STU-1030', 'Oliver Brown',   'oliver@uni.edu',  'B.Com Finance',            1, 79.0, 3.10, 'Pending'),
  ('STU-1031', 'Ananya Reddy',   'ananya@uni.edu',  'B.Sc Biology',             2, 93.0, 3.80, 'Paid')
ON CONFLICT DO NOTHING;

-- ========================
-- 5. RESULTS TABLE
-- ========================
CREATE TABLE IF NOT EXISTS results (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id  UUID NOT NULL REFERENCES students(id) ON DELETE CASCADE,
  course_code TEXT NOT NULL,
  course_name TEXT NOT NULL,
  marks       INTEGER NOT NULL CHECK (marks >= 0),
  total_marks INTEGER NOT NULL DEFAULT 100,
  grade       TEXT NOT NULL,
  semester    TEXT,                -- e.g. 'Fall 2024'
  created_at  TIMESTAMPTZ DEFAULT NOW()
);

-- Insert results linked to STU-1024 (Aarav Sharma)
INSERT INTO results (student_id, course_code, course_name, marks, total_marks, grade, semester)
SELECT
  s.id,
  r.course_code,
  r.course_name,
  r.marks,
  r.total_marks,
  r.grade,
  r.semester
FROM students s,
(VALUES
  ('CS-301', 'CS-301 Data Structures',  88, 100, 'A',  'Fall 2024'),
  ('MA-204', 'MA-204 Linear Algebra',   76, 100, 'B+', 'Fall 2024'),
  ('PH-210', 'PH-210 Quantum Mechanics',82, 100, 'A-', 'Fall 2024'),
  ('EC-150', 'EC-150 Microeconomics',   71, 100, 'B',  'Fall 2024'),
  ('EN-101', 'EN-101 Technical Writing',91, 100, 'A+', 'Fall 2024')
) AS r(course_code, course_name, marks, total_marks, grade, semester)
WHERE s.student_code = 'STU-1024'
ON CONFLICT DO NOTHING;

-- ========================
-- 6. FEES TABLE
-- ========================
CREATE TABLE IF NOT EXISTS fees (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  invoice_no  TEXT NOT NULL UNIQUE,   -- e.g. INV-2401
  student_id  UUID NOT NULL REFERENCES students(id) ON DELETE CASCADE,
  term        TEXT NOT NULL,          -- e.g. 'Fall 2024'
  amount      NUMERIC(10,2) NOT NULL,
  status      TEXT NOT NULL DEFAULT 'Pending'
                CHECK (status IN ('Paid', 'Pending', 'Overdue')),
  due_date    DATE,
  paid_date   DATE,
  created_at  TIMESTAMPTZ DEFAULT NOW()
);

INSERT INTO fees (invoice_no, student_id, term, amount, status, due_date, paid_date)
SELECT
  f.invoice_no,
  s.id,
  f.term,
  f.amount,
  f.status,
  f.due_date::DATE,
  f.paid_date::DATE
FROM students s,
(VALUES
  ('INV-2401', 'Fall 2024',   2400.00, 'Paid',    '2024-08-12', '2024-08-12'),
  ('INV-2402', 'Spring 2024', 2400.00, 'Paid',    '2024-01-15', '2024-01-15'),
  ('INV-2403', 'Fall 2023',   2300.00, 'Paid',    '2023-08-10', '2023-08-10'),
  ('INV-2404', 'Spring 2025', 2500.00, 'Pending', '2025-01-20', NULL)
) AS f(invoice_no, term, amount, status, due_date, paid_date)
WHERE s.student_code = 'STU-1024'
ON CONFLICT DO NOTHING;

-- ========================
-- 7. ATTENDANCE RECORDS TABLE
-- ========================
CREATE TABLE IF NOT EXISTS attendance_records (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id  UUID NOT NULL REFERENCES students(id) ON DELETE CASCADE,
  course_code TEXT NOT NULL,
  date        DATE NOT NULL DEFAULT CURRENT_DATE,
  status      TEXT NOT NULL DEFAULT 'present'
                CHECK (status IN ('present', 'absent', 'late')),
  marked_by   TEXT,                  -- teacher name/email
  created_at  TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE (student_id, course_code, date)
);

-- ========================
-- 8. ATTENDANCE TREND TABLE
-- ========================
CREATE TABLE IF NOT EXISTS attendance_trend (
  id         UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  month      TEXT NOT NULL,          -- e.g. 'Jan'
  year       INTEGER NOT NULL,
  rate       NUMERIC(5,2) NOT NULL,  -- percentage
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE (month, year)
);

INSERT INTO attendance_trend (month, year, rate) VALUES
  ('Jan', 2024, 88),
  ('Feb', 2024, 91),
  ('Mar', 2024, 86),
  ('Apr', 2024, 89),
  ('May', 2024, 92),
  ('Jun', 2024, 94)
ON CONFLICT DO NOTHING;

-- ========================
-- 9. NOTIFICATIONS TABLE
-- ========================
CREATE TABLE IF NOT EXISTS notifications (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title       TEXT NOT NULL,
  type        TEXT NOT NULL DEFAULT 'info'
                CHECK (type IN ('info', 'warning', 'success', 'error')),
  for_role    TEXT DEFAULT 'all',    -- 'all', 'student', 'teacher', 'admin'
  created_at  TIMESTAMPTZ DEFAULT NOW()
);

INSERT INTO notifications (title, type, for_role) VALUES
  ('Mid-term schedule released', 'info',    'all'),
  ('Fee deadline: Nov 30',       'warning', 'student'),
  ('New assignment in CS-301',   'info',    'student'),
  ('Library book due tomorrow',  'warning', 'all')
ON CONFLICT DO NOTHING;

-- ========================
-- 10. ENABLE ROW LEVEL SECURITY
-- ========================
ALTER TABLE departments         ENABLE ROW LEVEL SECURITY;
ALTER TABLE teachers            ENABLE ROW LEVEL SECURITY;
ALTER TABLE courses             ENABLE ROW LEVEL SECURITY;
ALTER TABLE students            ENABLE ROW LEVEL SECURITY;
ALTER TABLE results             ENABLE ROW LEVEL SECURITY;
ALTER TABLE fees                ENABLE ROW LEVEL SECURITY;
ALTER TABLE attendance_records  ENABLE ROW LEVEL SECURITY;
ALTER TABLE attendance_trend    ENABLE ROW LEVEL SECURITY;
ALTER TABLE notifications       ENABLE ROW LEVEL SECURITY;

-- Allow anyone to READ all tables (anon key is enough for this demo)
CREATE POLICY "Public read departments"        ON departments        FOR SELECT USING (true);
CREATE POLICY "Public read teachers"           ON teachers           FOR SELECT USING (true);
CREATE POLICY "Public read courses"            ON courses            FOR SELECT USING (true);
CREATE POLICY "Public read students"           ON students           FOR SELECT USING (true);
CREATE POLICY "Public read results"            ON results            FOR SELECT USING (true);
CREATE POLICY "Public read fees"               ON fees               FOR SELECT USING (true);
CREATE POLICY "Public read attendance_records" ON attendance_records  FOR SELECT USING (true);
CREATE POLICY "Public read attendance_trend"   ON attendance_trend   FOR SELECT USING (true);
CREATE POLICY "Public read notifications"      ON notifications      FOR SELECT USING (true);

-- Allow authenticated users to INSERT/UPDATE/DELETE
CREATE POLICY "Auth insert students"    ON students    FOR INSERT WITH CHECK (true);
CREATE POLICY "Auth update students"    ON students    FOR UPDATE USING (true);
CREATE POLICY "Auth delete students"    ON students    FOR DELETE USING (true);
CREATE POLICY "Auth insert results"     ON results     FOR INSERT WITH CHECK (true);
CREATE POLICY "Auth update results"     ON results     FOR UPDATE USING (true);
CREATE POLICY "Auth insert fees"        ON fees        FOR INSERT WITH CHECK (true);
CREATE POLICY "Auth update fees"        ON fees        FOR UPDATE USING (true);
CREATE POLICY "Auth insert attendance"  ON attendance_records FOR INSERT WITH CHECK (true);
CREATE POLICY "Auth update attendance"  ON attendance_records FOR UPDATE USING (true);

-- ============================================================
-- DONE! All 9 tables created with sample data.
-- ============================================================
