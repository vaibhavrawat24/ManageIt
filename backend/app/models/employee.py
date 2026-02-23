from app import db
from datetime import datetime

class Employee(db.Model):
    __tablename__ = 'employees'

    id = db.Column(db.Integer, primary_key=True)
    employee_id = db.Column(db.String(20), unique=True, nullable=False, index=True)
    full_name = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False, index=True)
    department = db.Column(db.String(50), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    attendance_records = db.relationship('Attendance', backref='employee', lazy='dynamic', cascade="all, delete-orphan")

    def __repr__(self):
        return f"<Employee {self.employee_id} - {self.full_name}>"