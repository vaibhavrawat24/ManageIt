from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_cors import CORS                   

db = SQLAlchemy()
migrate = Migrate()

def create_app():
    app = Flask(__name__)
    app.config.from_object('config.Config')

    db.init_app(app)
    migrate.init_app(app, db)

    CORS(app, resources={
        r"/api/*": {
            "origins": "*",                 
            "methods": ["GET", "POST", "DELETE", "OPTIONS"],
            "allow_headers": ["Content-Type", "Authorization"]
        }
    })

    from .routes.employee import employee_bp
    from .routes.attendance import attendance_bp

    app.register_blueprint(employee_bp, url_prefix='/api')
    app.register_blueprint(attendance_bp, url_prefix='/api')

    @app.errorhandler(400)
    @app.errorhandler(404)
    @app.errorhandler(409)
    def handle_error(error):
        response = {
            "error": error.description or "Bad Request",
            "status": error.code
        }
        return response, error.code

    @app.errorhandler(Exception)
    def handle_exception(e):
        current_app.logger.error(f"Unhandled exception: {str(e)}", exc_info=True)
        return jsonify({"error": "Internal server error"}), 500

    return app