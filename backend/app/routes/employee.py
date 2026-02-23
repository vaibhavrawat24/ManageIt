from flask import Blueprint, request, jsonify, current_app
from app import db
from app.models.employee import Employee
from app.schemas.employee import (
    EmployeeCreateSchema,
    EmployeeReadSchema,
    EmployeeListSchema
)
from marshmallow import ValidationError
from sqlalchemy.exc import IntegrityError

employee_bp = Blueprint('employee', __name__, url_prefix='/employees')


@employee_bp.route('/employees', methods=['POST'])
def create_employee():
    """
    POST /api/employees
    Creates a new employee
    """
    schema = EmployeeCreateSchema()
    
    try:
        data = schema.load(request.get_json() or {})
    except ValidationError as err:
        return jsonify({"errors": err.messages}), 400

    data['email'] = data['email'].lower().strip()

    try:
        employee = Employee(**data)
        db.session.add(employee)
        db.session.commit()
        
        result = EmployeeReadSchema().dump(employee)
        return jsonify(result), 201

    except IntegrityError as e:
        db.session.rollback()
        if "employee_id" in str(e.orig):
            return jsonify({"error": "Employee ID already exists"}), 409
        if "email" in str(e.orig):
            return jsonify({"error": "Email already exists"}), 409
        current_app.logger.error(f"Database error: {e}")
        return jsonify({"error": "Database error occurred"}), 500


@employee_bp.route('/employees', methods=['GET'])
def list_employees():
    """
    GET /api/employees
    Returns list of all employees
    """
    employees = Employee.query.order_by(Employee.created_at.desc()).all()
    
    if not employees:
        return jsonify({"employees": [], "message": "No employees found"}), 200

    schema = EmployeeListSchema()
    return jsonify(schema.dump({"employees": employees})), 200


@employee_bp.route('/employees/<int:employee_id>', methods=['DELETE'])
def delete_employee(employee_id):
    """
    DELETE /api/employees/:id
    Deletes employee and all related attendance records (cascade)
    """
    employee = Employee.query.get(employee_id)
    
    if not employee:
        return jsonify({"error": "Employee not found"}), 404

    try:
        db.session.delete(employee)
        db.session.commit()
        return '', 204

    except Exception as e:
        db.session.rollback()
        current_app.logger.error(f"Delete error: {e}")
        return jsonify({"error": "Failed to delete employee"}), 500

@employee_bp.route('/employees/<int:employee_id>', methods=['GET'])
def get_employee(employee_id):
    """
    GET /api/employees/:id
    Returns details of a single employee
    """
    employee = Employee.query.get(employee_id)
    
    if not employee:
        return jsonify({"error": "Employee not found"}), 404

    schema = EmployeeReadSchema()
    return jsonify(schema.dump(employee)), 200