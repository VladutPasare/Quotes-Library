from flask import Flask, jsonify
from flask_restful import Api
from resources import *
from flask_cors import CORS
from flask_jwt_extended import JWTManager, jwt_required, create_access_token, get_jwt_identity

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///store.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SECRET_KEY'] = 'bad_secret_key'
app.config['JWT_SECRET_KEY'] = 'bad_jwt_secret_key'
app.config['JWT_TOKEN_LOCATION'] = ['headers']
app.config['JWT_HEADER_NAME'] = 'Authorization'
app.config['JWT_HEADER_TYPE'] = 'Bearer'

api = Api(app)
CORS(app)

db.init_app(app)

with app.app_context():
    db.create_all()

#api.add_resource(None, '/auth/')
api.add_resource(QuoteListResource, '/quotes/')
api.add_resource(QuoteResource, '/quote/<id>')
api.add_resource(BookListResource, '/books/')
api.add_resource(BookResource, '/book/<id>')
api.add_resource(PingResource, '/ping')

jwt = JWTManager(app)


#@app.route('userPassword', methods=['GET'])
#@jwt_required()
#def getUserCreationDate():
#    id = get_jwt_identity()
#    user = db.session.scalars(db.select(Book).where(Book.id == id)).first()
#    response = jsonify()


if __name__ == '__main__':
    app.run(debug=True, port=6001)
