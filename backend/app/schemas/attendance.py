from marshmallow import Schema, fields, validate, ValidationError
from datetime import date

class AttendanceBaseSchema(Schema):
    employee_id = fields.Integer(
        required=True,
        error_messages={"required": "Employee ID is required."}
    )
    date = fields.Date(
        required=True,
        error_messages={"required": "Date is required (YYYY-MM-DD)."}
    )
    status = fields.String(
        required=True,
        validate=validate.OneOf(
            ["present", "absent"],
            error="Status must be 'present' or 'absent'"
        )
    )


class AttendanceCreateSchema(AttendanceBaseSchema):
    """Used for POST /attendance"""
    pass


class AttendanceReadSchema(AttendanceBaseSchema):
    """Used for GET responses"""
    id = fields.Integer(dump_only=True)
    created_at = fields.DateTime(dump_only=True, format="%Y-%m-%d %H:%M:%S")

class AttendanceListSchema(Schema):
    """Wrapper for list response"""
    attendance = fields.List(fields.Nested(AttendanceReadSchema), required=True)