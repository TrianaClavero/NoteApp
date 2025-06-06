from flask import Flask
from flask_cors import CORS
from backend.controllers.note_controller import note_bp

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}}) 
app.register_blueprint(note_bp)

if __name__ == '__main__':
    app.run(debug=True)
