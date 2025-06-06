# 📝 Notes App - Full Stack

A full-stack note-taking application that supports creating, editing, and organizing notes with features like tags, archive functionality, color customization, and dynamic filtering for an enhanced user experience.

The application is structured in two main folders:

- `backend`: A RESTful API built with Flask and MySQL.
- `frontend`: A React application with a clean, minimalist interface.

---

## ✨ Features

### Core Functionality
- ✅ **CRUD Operations**: Create, read, update, and delete notes
- ✅ **Archive System**: Archive/unarchive notes for better organization
- ✅ **Tag Management**: Add multiple tags to notes for categorization
- ✅ **Color Customization**: Choose from 8 predefined background colors
- ✅ **Search**: Real-time search through note titles and content
- ✅ **Filter by Tags**: Filter notes by one or multiple tags
- ✅ **Responsive Design**: Works on desktop, tablet, and mobile devices

### User Interface
- 🎨 **Minimalist Design**: Clean, distraction-free interface
- 🌈 **Color-coded Notes**: Visual organization with background colors
- 📱 **Mobile-friendly**: Responsive grid layout
- 🔍 **Advanced Filtering**: Separate views for active and archived notes
- ⚡ **Real-time Updates**: Instant UI updates after operations

---

## 🔧 Requirements

### Runtimes and Tools

| Tool              | Recommended Version |
|-------------------|---------------------|
| Python            | 3.12.x              |
| pip               | 23.x or later       |
| MySQL             | 8.x                 |
| Node.js           | 18.x or later       |
| npm               | 9.x or later        |
| bash or zsh       | Compatible with Unix/Linux/macOS |

---

## ⚙️ Installation and Execution

### 1. Clone the repository

```bash
git clone https://github.com/TrianaClavero/NoteApp.git
cd NoteApp
```

### 2. Backend and Frontend Setup

#### Automatic Setup (Linux/macOS)
Run the setup script. It will:
- Create a Python virtual environment
- Install backend and frontend dependencies
- Prompt you for MySQL root credentials if not already configured
- Create the MySQL database and user if they don't exist
- Generate a .env file in backend/ with your credentials
- Generate a .env file in frontend/ with the API URL
- Start the Flask backend and React frontend

```bash
./start.sh
```

#### Default Configuration
By default, the setup script expects:
- MySQL installed and running
- You can connect as root with a password (for local development only)


## 🏗️ Project Structure

```
notes-app/
├── backend/
│   ├── app.py                 # Flask application entry point
│   ├── init_db.py            # Database initialization script
│   ├── requirements.txt       # Python dependencies
│   ├── .env                  # Environment variables
│   ├── models/
│   │   └── note.py           # Note data model
│   ├── repositories/
│   │   └── note_repository.py # Database operations
│   ├── services/
│   │   └── note_service.py   # Business logic
│   └── routes/
│       └── note_routes.py    # API endpoints
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   │   ├── ui/           # Reusable UI components
│   │   │   └── notes/        # Note-specific components
│   │   ├── pages/
│   │   │   └── NotesPage.jsx # Main application page
│   │   ├── services/
│   │   │   ├── notesApi.js   # API communication
│   │   │   ├── useNotes.js   # Custom React hook
│   │   │   └── constants.js  # Application constants
│   │   ├── App.jsx           # React app entry point
│   │   ├── main.jsx          # React DOM rendering
│   │   └── index.css         # Global styles
│   ├── package.json          # Node.js dependencies
│   └── .env                  # Environment variables
└── start.sh                  # Automated setup script
```

