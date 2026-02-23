from app import db
from datetime import datetime

class Attendance(db.Model):
    __tablename__ = 'attendance'

    id = db.Column(db.Integer, primary_key=True)
    employee_id = db.Column(db.Integer, db.ForeignKey('employees.id'), nullable=False)
    date = db.Column(db.Date, nullable=False)
    status = db.Column(db.Enum('present', 'absent', name='attendance_status'), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    __table_args__ = (
        db.UniqueConstraint('employee_id', 'date', name='unique_employee_date'),
    )

    def __repr__(self):
        return f"<Attendance {self.date} - {self.status}>"