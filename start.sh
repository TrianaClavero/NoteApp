#!/bin/bash

set -e

echo "🔧 Initializing Notes App..."

check_command() {
  if ! command -v $1 &> /dev/null; then
    echo "❌ $1 is not installed. Please install it and run the script again."
    exit 1
  fi
}

check_command python3
check_command pip
check_command mysql
check_command npm

if [ ! -d "venv" ]; then
    echo "🐍 Creating virtual environment..."
    python3 -m venv venv
fi

source venv/bin/activate

echo "📦 Installing Python dependencies..."
pip install -r requirements.txt

if [ ! -f "backend/.env" ]; then
    echo "🗄️ Configuring MySQL database..."

    read -p "👉 Enter MySQL root user: " MYSQL_USER
    read -s -p "🔑 Enter MySQL password: " MYSQL_PASS
    echo ""

    DB_NAME="notes_app"
    DB_USER="notes_user"
    DB_PASS="notes_user0"

    export MYSQL_ROOT_USER="$MYSQL_USER"
    export MYSQL_ROOT_PASSWORD="$MYSQL_PASS"
    export APP_DB_NAME="$DB_NAME"
    export APP_DB_USER="$DB_USER"
    export APP_DB_PASSWORD="$DB_PASS"

    echo "⚙️ Running commands in MySQL..."
    echo "🛠️ Configuring database schema..."
    python3 backend/setup_db.py || { echo "❌ Error configuring DB. ExitingError configuring DB. Exiting..."; exit 1; }

    echo "📝 Creating .env file..."
    cat > backend/.env <<EOF
DB_HOST=localhost
DB_USER=$DB_USER
DB_PASSWORD=$DB_PASS
DB_NAME=$DB_NAME
EOF
else
    echo "ℹ️ .env file already exists, database configuration skipped."
fi

echo "🔐 Loading environment variables from backend/.env"
export $(grep -v '^#' backend/.env | xargs)

if lsof -i :5000 &> /dev/null; then
    echo "⚠️ Port 5000 is already in use. Either Flask is already running or another process is using it."
else
    echo "🚀 Starting Flask backend..."
    PYTHONPATH=. python backend/app.py &
    BACKEND_PID=$!
fi

echo "🌐 Setting up React frontend..."
if [ ! -f "frontend/.env" ]; then
    echo "📝 Creating frontend/.env file..."
    echo "VITE_REACT_APP_API_URL=http://localhost:5000" > frontend/.env
else
    echo "ℹ️ File frontend/.env already exists."
fi
cd frontend
npm install
echo "⚡ Starting React dev server..."
npm run dev

if [ ! -z "$BACKEND_PID" ]; then
    kill $BACKEND_PID
fi
