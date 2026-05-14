# setup_database.py
import pandas as pd
import sqlite3
import os

EXCEL_PATH = "engineering_colleges_complete_contacts.xlsx"
DB_PATH = "app/eduai.db"

def setup():
    conn = sqlite3.connect(DB_PATH)
    cursor = conn.cursor()

    # --- Create Tables ---
    cursor.executescript("""
        CREATE TABLE IF NOT EXISTS colleges (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT UNIQUE NOT NULL
        );

        CREATE TABLE IF NOT EXISTS principals (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            email TEXT UNIQUE NOT NULL,
            phone TEXT,
            password TEXT DEFAULT 'password123',
            college_id INTEGER,
            FOREIGN KEY (college_id) REFERENCES colleges(id)
        );

        CREATE TABLE IF NOT EXISTS hods (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            email TEXT UNIQUE NOT NULL,
            phone TEXT,
            branch TEXT,
            password TEXT DEFAULT 'password123',
            college_id INTEGER,
            FOREIGN KEY (college_id) REFERENCES colleges(id)
        );

        CREATE TABLE IF NOT EXISTS students (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            student_id TEXT UNIQUE NOT NULL,
            name TEXT NOT NULL,
            email TEXT UNIQUE NOT NULL,
            phone TEXT,
            branch TEXT,
            year INTEGER,
            cgpa REAL,
            password TEXT DEFAULT 'password123',
            streak INTEGER DEFAULT 0,
            college_id INTEGER,
            hod_id INTEGER,
            FOREIGN KEY (college_id) REFERENCES colleges(id),
            FOREIGN KEY (hod_id) REFERENCES hods(id)
        );

        CREATE TABLE IF NOT EXISTS attendance (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            student_id INTEGER,
            date TEXT,
            status TEXT DEFAULT 'present',
            subject TEXT,
            FOREIGN KEY (student_id) REFERENCES students(id)
        );

        CREATE TABLE IF NOT EXISTS tests (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            title TEXT NOT NULL,
            subject TEXT,
            date TEXT,
            college_id INTEGER,
            branch TEXT,
            FOREIGN KEY (college_id) REFERENCES colleges(id)
        );

        CREATE TABLE IF NOT EXISTS test_results (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            student_id INTEGER,
            test_id INTEGER,
            score REAL,
            FOREIGN KEY (student_id) REFERENCES students(id),
            FOREIGN KEY (test_id) REFERENCES tests(id)
        );

        CREATE TABLE IF NOT EXISTS events (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            title TEXT,
            date TEXT,
            description TEXT,
            college_id INTEGER,
            FOREIGN KEY (college_id) REFERENCES colleges(id)
        );

        CREATE TABLE IF NOT EXISTS chat_history (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            student_id INTEGER,
            role TEXT,
            message TEXT,
            timestamp TEXT DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (student_id) REFERENCES students(id)
        );
    """)

    # --- Load Excel Data ---
    xl = pd.ExcelFile(EXCEL_PATH)
    directory = xl.parse("College_HOD_Directory")

    college_map = {}
    hod_map = {}

    for _, row in directory.iterrows():
        college_name = str(row["College"]).strip()

        # Insert college
        cursor.execute("INSERT OR IGNORE INTO colleges (name) VALUES (?)", (college_name,))
        cursor.execute("SELECT id FROM colleges WHERE name = ?", (college_name,))
        college_id = cursor.fetchone()[0]
        college_map[college_name] = college_id

        # Insert principal
        cursor.execute("""
            INSERT OR IGNORE INTO principals (name, email, phone, college_id)
            VALUES (?, ?, ?, ?)
        """, (
            str(row["Principal"]).strip(),
            str(row["Principal Email"]).strip(),
            str(row["Principal Phone"]).strip(),
            college_id
        ))

        # Insert HOD
        hod_email = str(row["HOD Email"]).strip()
        cursor.execute("""
            INSERT OR IGNORE INTO hods (name, email, phone, branch, college_id)
            VALUES (?, ?, ?, ?, ?)
        """, (
            str(row["HOD Name"]).strip(),
            hod_email,
            str(row["HOD Phone"]).strip(),
            str(row["Branch"]).strip(),
            college_id
        ))
        cursor.execute("SELECT id FROM hods WHERE email = ?", (hod_email,))
        result = cursor.fetchone()
        if result:
            hod_map[str(row["HOD Name"]).strip()] = result[0]

    # --- Load Students from each college sheet ---
    college_sheets = [s for s in xl.sheet_names if s != "College_HOD_Directory"]

    for sheet in college_sheets:
        df = xl.parse(sheet)
        college_name = sheet.strip()
        college_id = None

        # Match college name (partial match)
        for name, cid in college_map.items():
            if college_name.lower() in name.lower() or name.lower() in college_name.lower():
                college_id = cid
                break

        if not college_id:
            print(f"Warning: College not found for sheet '{sheet}'")
            continue

        for _, row in df.iterrows():
            hod_name = str(row["HOD"]).strip()
            hod_id = hod_map.get(hod_name)

            # Use Email ID column (first one)
            email = str(row["Email ID"]).strip()

            cursor.execute("""
                INSERT OR IGNORE INTO students
                (student_id, name, email, phone, branch, year, cgpa, college_id, hod_id)
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
            """, (
                str(row["Student ID"]).strip(),
                str(row["Student Name"]).strip(),
                email,
                str(row["Phone Number"]).strip(),
                str(row["Branch"]).strip(),
                int(row["Year"]),
                float(row["CGPA"]),
                college_id,
                hod_id
            ))

    conn.commit()
    conn.close()
    print("✅ Database created successfully at app/eduai.db")
    print(f"   Colleges: {len(college_map)}")
    print(f"   HODs: {len(hod_map)}")

if __name__ == "__main__":
    setup()