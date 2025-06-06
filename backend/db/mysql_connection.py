import mysql.connector
from dotenv import load_dotenv
import os

load_dotenv()

def get_connection():
    return mysql.connector.connect(
        host=os.getenv('MYSQL_HOST', 'localhost'),
        user=os.getenv('APP_DB_USER'),
        password=os.getenv('APP_DB_PASSWORD'),
        database=os.getenv('APP_DB_NAME')
    )