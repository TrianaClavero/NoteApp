import mysql.connector
from mysql.connector import errorcode
from dotenv import load_dotenv
import os

load_dotenv()

ROOT_USER = os.getenv("MYSQL_ROOT_USER")
ROOT_PASSWORD = os.getenv("MYSQL_ROOT_PASSWORD")
DB_NAME = os.getenv("APP_DB_NAME")
DB_USER = os.getenv("APP_DB_USER")
DB_PASSWORD = os.getenv("APP_DB_PASSWORD")

TABLES = {
    "notes": (
        "CREATE TABLE IF NOT EXISTS notes ("
        "  id INT AUTO_INCREMENT PRIMARY KEY,"
        "  title VARCHAR(255) NOT NULL,"
        "  content TEXT,"
        "  is_archived BOOLEAN DEFAULT FALSE,"
        "  tags JSON NOT NULL,"
        "  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,"
        "  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,"
        "  background_color VARCHAR(7) DEFAULT '#ffffff' "
        ") ENGINE=InnoDB;"
    )
}

def create_database_and_user(cursor):
    try:
        cursor.execute(f"CREATE DATABASE IF NOT EXISTS {DB_NAME}")
        cursor.execute(f"""
            CREATE USER IF NOT EXISTS '{DB_USER}'@'localhost' IDENTIFIED BY '{DB_PASSWORD}';
        """)
        cursor.execute(f"""
            GRANT ALL PRIVILEGES ON {DB_NAME}.* TO '{DB_USER}'@'localhost';
        """)
        print("✅ Database and user created correctly.")
    except mysql.connector.Error as err:
        print(f"❌ Error creating database/user: {err}")

def create_tables(cursor):
    cursor.execute(f"USE {DB_NAME}")
    for table_name, ddl in TABLES.items():
        try:
            cursor.execute(ddl)
            print(f"✅ Table '{table_name}' verified.")
        except mysql.connector.Error as err:
            print(f"❌ Error creating table '{table_name}': {err}")

def main():
    try:
        conn = mysql.connector.connect(user=ROOT_USER, password=ROOT_PASSWORD)
        cursor = conn.cursor()
        create_database_and_user(cursor)
        create_tables(cursor)
        cursor.close()
        conn.close()
    except mysql.connector.Error as err:
        print(f"❌ Connection error: {err}")

if __name__ == "__main__":
    main()
