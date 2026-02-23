from flask import Blueprint, request, jsonify, current_app
from app import db
from app.models.employee import Employee
from app.models.attendance import Attendance
from app.schemas.attendance import (
    AttendanceCreateSchema,
    AttendanceReadSchema,
    AttendanceListSchema
)
from marshmallow import ValidationError
from sqlalchemy.exc import IntegrityError
from datetime import date

attendance_bp = Blueprint('attendance', __name__, url_prefix='/attendance')


@attendance_bp.route('/attendance', methods=['POST'])
def mark_attendance():
    """
    POST /api/attendance
    Marks attendance for an employee on a specific date
    """
    schema = AttendanceCreateSchema()
    
    try:
        data = schema.load(request.get_json() or {})
    except ValidationError as err:
        return jsonify({"errors": err.messages}), 400

    employee = Employee.query.get(data['employee_id'])
    if not employee:
        return jsonify({"error": "Employee not found"}), 404

    if data['date'] > date.today():
        return jsonify({"error": "Cannot mark attendance for future dates"}), 400

    try:
        attendance = Attendance(**data)
        db.session.add(attendance)
        db.session.commit()
        
        result = AttendanceReadSchema().dump(attendance)
        return jsonify(result), 201

    except IntegrityError as e:
        db.session.rollback()
        if "unique_employee_date" in str(e.orig):
            return jsonify({"error": f"Attendance already marked for {data['date']}"}), 409
        current_app.logger.error(f"Database error: {e}")
        return jsonify({"error": "Database error occurred"}), 500


@attendance_bp.route('/attendance', methods=['GET'])
def list_attendance():
    """
    GET /api/attendance?employee_id=<id>
    Returns attendance records filtered by employee_id (required)
    """
    employee_id = request.args.get('employee_id')
    
    if not employee_id:
        return jsonify({"error": "employee_id query parameter is required"}), 400

    try:
        employee_id = int(employee_id)
    except ValueError:
        return jsonify({"error": "employee_id must be an integer"}), 400

    employee = Employee.query.get(employee_id)
    if not employee:
        return jsonify({"error": "Employee not found"}), 404

    records = Attendance.query.filter_by(employee_id=employee_id)\
                              .order_by(Attendance.date.desc())\
                              .all()

    if not records:
        return jsonify({"attendance": [], "message": "No attendance records found"}), 200

    schema = AttendanceListSchema()
    return jsonify(schema.dump({"attendance": records})), 200

@attendance_bp.route('/<int:attendance_id>', methods=['DELETE'])
def delete_attendance(attendance_id):
    record = Attendance.query.get(attendance_id)
    if not record:
        return jsonify({"error": "Attendance record not found"}), 404

    try:
        db.session.delete(record)
        db.session.commit()
        return '', 204
    except Exception as e:
        db.session.rollback()
        current_app.logger.error(f"Delete attendance error: {e}")
        return jsonify({"error": "Failed to delete attendance record"}), 500