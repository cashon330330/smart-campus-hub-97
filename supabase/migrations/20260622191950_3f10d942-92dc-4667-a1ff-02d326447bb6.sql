
-- Seed realistic demo data for school management system
DO $$
DECLARE
  admin_id uuid := '11111111-1111-1111-1111-111111111111';
  t1 uuid := '22222222-0000-0000-0000-000000000001';
  t2 uuid := '22222222-0000-0000-0000-000000000002';
  t3 uuid := '22222222-0000-0000-0000-000000000003';
  t4 uuid := '22222222-0000-0000-0000-000000000004';
  t5 uuid := '22222222-0000-0000-0000-000000000005';
  c1 uuid := '33333333-0000-0000-0000-000000000001';
  c2 uuid := '33333333-0000-0000-0000-000000000002';
  c3 uuid := '33333333-0000-0000-0000-000000000003';
  c4 uuid := '33333333-0000-0000-0000-000000000004';
  c5 uuid := '33333333-0000-0000-0000-000000000005';
  c6 uuid := '33333333-0000-0000-0000-000000000006';
  students uuid[] := ARRAY[
    '44444444-0000-0000-0000-000000000001','44444444-0000-0000-0000-000000000002',
    '44444444-0000-0000-0000-000000000003','44444444-0000-0000-0000-000000000004',
    '44444444-0000-0000-0000-000000000005','44444444-0000-0000-0000-000000000006',
    '44444444-0000-0000-0000-000000000007','44444444-0000-0000-0000-000000000008',
    '44444444-0000-0000-0000-000000000009','44444444-0000-0000-0000-000000000010',
    '44444444-0000-0000-0000-000000000011','44444444-0000-0000-0000-000000000012',
    '44444444-0000-0000-0000-000000000013','44444444-0000-0000-0000-000000000014',
    '44444444-0000-0000-0000-000000000015','44444444-0000-0000-0000-000000000016',
    '44444444-0000-0000-0000-000000000017','44444444-0000-0000-0000-000000000018',
    '44444444-0000-0000-0000-000000000019','44444444-0000-0000-0000-000000000020'
  ]::uuid[];
  student_names text[] := ARRAY[
    'Aarav Sharma','Isabella Rossi','Liam O''Connor','Mei Tanaka','Noah Anderson',
    'Sofia Hernandez','Ethan Kim','Amara Okafor','Lucas Müller','Zara Patel',
    'Oliver Schmidt','Layla Hassan','Mateo Silva','Nia Williams','Hiroshi Sato',
    'Elena Petrova','Caleb Johnson','Priya Iyer','Diego Morales','Anya Volkov'
  ];
  teacher_names text[] := ARRAY[
    'Dr. Margaret Hale','Prof. Samuel Whitfield','Dr. Aisha Rahman','Prof. Daniel Vega','Dr. Yuki Nakamura'
  ];
  teachers uuid[];
  i int;
  s uuid;
  cid uuid;
  courses_arr uuid[];
BEGIN
  teachers := ARRAY[t1,t2,t3,t4,t5]::uuid[];
  courses_arr := ARRAY[c1,c2,c3,c4,c5,c6]::uuid[];

  -- Insert auth.users (admin + teachers + students)
  INSERT INTO auth.users (instance_id, id, aud, role, email, encrypted_password, email_confirmed_at, raw_app_meta_data, raw_user_meta_data, created_at, updated_at, confirmation_token, email_change, email_change_token_new, recovery_token)
  VALUES ('00000000-0000-0000-0000-000000000000', admin_id, 'authenticated','authenticated','admin@campusconnect.demo', crypt('Password123!', gen_salt('bf')), now(), '{"provider":"email","providers":["email"]}','{"full_name":"Admin User"}', now(), now(),'','','','')
  ON CONFLICT (id) DO NOTHING;

  FOR i IN 1..5 LOOP
    INSERT INTO auth.users (instance_id, id, aud, role, email, encrypted_password, email_confirmed_at, raw_app_meta_data, raw_user_meta_data, created_at, updated_at, confirmation_token, email_change, email_change_token_new, recovery_token)
    VALUES ('00000000-0000-0000-0000-000000000000', teachers[i], 'authenticated','authenticated','teacher'||i||'@campusconnect.demo', crypt('Password123!', gen_salt('bf')), now(), '{"provider":"email","providers":["email"]}', jsonb_build_object('full_name', teacher_names[i]), now(), now(),'','','','')
    ON CONFLICT (id) DO NOTHING;
  END LOOP;

  FOR i IN 1..20 LOOP
    INSERT INTO auth.users (instance_id, id, aud, role, email, encrypted_password, email_confirmed_at, raw_app_meta_data, raw_user_meta_data, created_at, updated_at, confirmation_token, email_change, email_change_token_new, recovery_token)
    VALUES ('00000000-0000-0000-0000-000000000000', students[i], 'authenticated','authenticated','student'||i||'@campusconnect.demo', crypt('Password123!', gen_salt('bf')), now(), '{"provider":"email","providers":["email"]}', jsonb_build_object('full_name', student_names[i]), now(), now(),'','','','')
    ON CONFLICT (id) DO NOTHING;
  END LOOP;

  -- Ensure profiles exist (trigger handles new ones; upsert for safety)
  INSERT INTO public.profiles (id, full_name, email)
  VALUES (admin_id,'Admin User','admin@campusconnect.demo')
  ON CONFLICT (id) DO UPDATE SET full_name=EXCLUDED.full_name, email=EXCLUDED.email;

  FOR i IN 1..5 LOOP
    INSERT INTO public.profiles (id, full_name, email)
    VALUES (teachers[i], teacher_names[i], 'teacher'||i||'@campusconnect.demo')
    ON CONFLICT (id) DO UPDATE SET full_name=EXCLUDED.full_name, email=EXCLUDED.email;
  END LOOP;

  FOR i IN 1..20 LOOP
    INSERT INTO public.profiles (id, full_name, email)
    VALUES (students[i], student_names[i], 'student'||i||'@campusconnect.demo')
    ON CONFLICT (id) DO UPDATE SET full_name=EXCLUDED.full_name, email=EXCLUDED.email;
  END LOOP;

  -- Roles: clear and assign correctly
  DELETE FROM public.user_roles WHERE user_id = ANY(admin_id || teachers || students);
  INSERT INTO public.user_roles(user_id, role) VALUES (admin_id, 'admin');
  FOR i IN 1..5 LOOP
    INSERT INTO public.user_roles(user_id, role) VALUES (teachers[i], 'teacher');
  END LOOP;
  FOR i IN 1..20 LOOP
    INSERT INTO public.user_roles(user_id, role) VALUES (students[i], 'student');
  END LOOP;

  -- Courses
  INSERT INTO public.courses (id, code, title, teacher_id, term) VALUES
    (c1,'CS101','Introduction to Computer Science', t1,'Spring 2026'),
    (c2,'MATH201','Calculus II', t2,'Spring 2026'),
    (c3,'ENG110','Academic Writing', t3,'Spring 2026'),
    (c4,'PHY150','Physics Fundamentals', t4,'Spring 2026'),
    (c5,'HIST220','World History', t5,'Spring 2026'),
    (c6,'BIO130','Cell Biology', t1,'Spring 2026')
  ON CONFLICT (id) DO NOTHING;

  -- Enrollments: each student in 3 courses (rotating)
  FOR i IN 1..20 LOOP
    s := students[i];
    INSERT INTO public.enrollments(student_id, course_id) VALUES
      (s, courses_arr[1 + ((i-1) % 6)]),
      (s, courses_arr[1 + (i % 6)]),
      (s, courses_arr[1 + ((i+1) % 6)])
    ON CONFLICT DO NOTHING;
  END LOOP;

  -- Attendance: last 10 weekdays for each enrollment
  INSERT INTO public.attendance(student_id, course_id, date, status)
  SELECT e.student_id, e.course_id, d::date,
    CASE WHEN random() < 0.85 THEN 'present' WHEN random() < 0.5 THEN 'late' ELSE 'absent' END
  FROM public.enrollments e
  CROSS JOIN generate_series(current_date - 14, current_date - 1, interval '1 day') d
  WHERE extract(dow from d) NOT IN (0,6)
  ON CONFLICT DO NOTHING;

  -- Results: one per enrollment
  INSERT INTO public.results(student_id, course_id, marks, total, grade, term)
  SELECT e.student_id, e.course_id,
    m, 100,
    CASE WHEN m>=90 THEN 'A' WHEN m>=80 THEN 'B' WHEN m>=70 THEN 'C' WHEN m>=60 THEN 'D' ELSE 'F' END,
    'Spring 2026'
  FROM (
    SELECT student_id, course_id, (60 + floor(random()*40))::numeric AS m FROM public.enrollments
  ) e;

  -- Fees: 2 terms per student
  FOR i IN 1..20 LOOP
    s := students[i];
    INSERT INTO public.fees(student_id, term, amount, paid_amount, status, due_date) VALUES
      (s,'Fall 2025', 2500, 2500, 'paid', '2025-09-15'),
      (s,'Spring 2026', 2500, CASE WHEN i%3=0 THEN 2500 WHEN i%3=1 THEN 1500 ELSE 0 END,
        CASE WHEN i%3=0 THEN 'paid' WHEN i%3=1 THEN 'partial' ELSE 'pending' END, '2026-02-15');
  END LOOP;
END $$;
