import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error(
    "Missing Supabase environment variables. Please set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in your .env file."
  );
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// ─── Type definitions matching our DB tables ───────────────────────────────

export type Student = {
  id: string;
  student_code: string;
  name: string;
  email: string;
  course: string;
  year: number;
  attendance: number;
  gpa: number;
  fees_status: "Paid" | "Pending" | "Overdue";
  created_at: string;
};

export type Teacher = {
  id: string;
  teacher_code: string;
  name: string;
  email: string;
  department: string;
  courses_count: number;
  students_count: number;
  created_at: string;
};

export type Course = {
  id: string;
  code: string;
  title: string;
  teacher_name: string;
  credits: number;
  enrolled: number;
  created_at: string;
};

export type Result = {
  id: string;
  student_id: string;
  course_code: string;
  course_name: string;
  marks: number;
  total_marks: number;
  grade: string;
  semester: string;
  created_at: string;
};

export type Fee = {
  id: string;
  invoice_no: string;
  student_id: string;
  term: string;
  amount: number;
  status: "Paid" | "Pending" | "Overdue";
  due_date: string | null;
  paid_date: string | null;
  created_at: string;
};

export type AttendanceTrend = {
  id: string;
  month: string;
  year: number;
  rate: number;
};

export type Notification = {
  id: string;
  title: string;
  type: "info" | "warning" | "success" | "error";
  for_role: string;
  created_at: string;
};

// ─── Helper fetch functions ─────────────────────────────────────────────────

export async function fetchStudents(): Promise<Student[]> {
  const { data, error } = await supabase
    .from("students")
    .select("*")
    .order("created_at", { ascending: true });
  if (error) throw error;
  return data ?? [];
}

export async function fetchTeachers(): Promise<Teacher[]> {
  const { data, error } = await supabase
    .from("teachers")
    .select("*")
    .order("name");
  if (error) throw error;
  return data ?? [];
}

export async function fetchCourses(): Promise<Course[]> {
  const { data, error } = await supabase
    .from("courses")
    .select("*")
    .order("code");
  if (error) throw error;
  return data ?? [];
}

export async function fetchResultsForStudent(studentId: string): Promise<Result[]> {
  const { data, error } = await supabase
    .from("results")
    .select("*")
    .eq("student_id", studentId)
    .order("course_code");
  if (error) throw error;
  return data ?? [];
}

export async function fetchFeesForStudent(studentId: string): Promise<Fee[]> {
  const { data, error } = await supabase
    .from("fees")
    .select("*")
    .eq("student_id", studentId)
    .order("created_at", { ascending: false });
  if (error) throw error;
  return data ?? [];
}

export async function fetchAttendanceTrend(): Promise<AttendanceTrend[]> {
  const { data, error } = await supabase
    .from("attendance_trend")
    .select("*")
    .order("year")
    .order("month");
  if (error) throw error;
  return data ?? [];
}

export async function fetchNotifications(): Promise<Notification[]> {
  const { data, error } = await supabase
    .from("notifications")
    .select("*")
    .order("created_at", { ascending: false });
  if (error) throw error;
  return data ?? [];
}
