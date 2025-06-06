from flask import Blueprint, request, jsonify
import backend.services.note_service as service

note_bp = Blueprint('note_bp', __name__)

@note_bp.route('/')
def home():
    return "API Notes is running!"

@note_bp.route('/notes', methods=['GET'])
def list_all_notes():
    archived = request.args.get('archived', 'false').lower() == 'true'
    notes = service.get_notes(archived)
    return jsonify([note.to_dict() for note in notes])

@note_bp.route('/notes', methods=['POST'])
def create_note():
    data = request.json
    try:
        tags = data.get('tags', [])
        background_color = data.get('background_color', '#ffffff')
        new_id = service.create_note(data['title'], data['content'], tags, background_color)
        return jsonify({"message": "Note created", "id": new_id}), 201
    except Exception as e:
        return jsonify({"error": str(e)}), 400

@note_bp.route('/notes/<int:note_id>', methods=['GET'])
def get_note(note_id):
    note = service.get_note(note_id)
    if note:
        return jsonify(note.__dict__), 200
    return jsonify({"message": "Note not found"}), 404

@note_bp.route('/notes/<int:note_id>', methods=['PUT'])
def update_note(note_id):
    data = request.json
    tags = data.get('tags', [])
    background_color = data.get('background_color', '#ffffff')
    success = service.edit_note(
        note_id,
        data.get('title', ''),
        data.get('content', ''),
        data.get('is_archived', False),
        tags,
        background_color
    )
    if success:
        return jsonify({"message": "Note updated"}), 200
    return jsonify({"message": "Note not found"}), 404

@note_bp.route('/notes/<int:note_id>', methods=['DELETE'])
def delete_note(note_id):
    success = service.remove_note(note_id)
    if success:
        return jsonify({"message": "Note deleted"}), 200
    return jsonify({"message": "Note not found"}), 404

@note_bp.route('/notes/active', methods=['GET'])
def list_active_notes():
    notes = service.get_notes(archived=False)
    return jsonify([note.__dict__ for note in notes])

@note_bp.route('/notes/archived', methods=['GET'])
def list_archived_notes():
    notes = service.get_notes(archived=True)
    return jsonify([note.__dict__ for note in notes])
