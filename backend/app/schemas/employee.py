from marshmallow import Schema, fields, validate, ValidationError
from datetime import date

class EmployeeBaseSchema(Schema):
    """Shared fields for create/read/update"""
    employee_id = fields.String(
        required=True,
        validate=validate.Length(min=3, max=20),
        error_messages={"required": "Employee ID is required."}
    )
    full_name = fields.String(
        required=True,
        validate=validate.Length(min=2, max=100),
        error_messages={"required": "Full name is required."}
    )
    email = fields.Email(
        required=True,
        error_messages={"required": "Valid email is required."}
    )
    department = fields.String(
        required=True,
        validate=validate.OneOf(
            ["Engineering", "Marketing", "HR", "Finance", "Operations", "Sales"],
            error="Invalid department"
        )
    )


class EmployeeCreateSchema(EmployeeBaseSchema):
    """Used for POST /employees"""
    pass


class EmployeeReadSchema(EmployeeBaseSchema):
    """Used for GET responses"""
    id = fields.Integer(dump_only=True)
    created_at = fields.DateTime(dump_only=True, format="%Y-%m-%d %H:%M:%S")


class EmployeeListSchema(Schema):
    """Wrapper for list response"""
    employees = fields.List(fields.Nested(EmployeeReadSchema), required=True)