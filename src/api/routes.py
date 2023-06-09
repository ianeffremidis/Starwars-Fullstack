"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User, Character, Planet, Vehicle, Fav_char, Fav_planet, Fav_veh
from api.utils import generate_sitemap, APIException
import json
from flask_jwt_extended import create_access_token
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import jwt_required
from flask_jwt_extended import JWTManager


api = Blueprint('api', __name__)

@api.route("/register", methods=["POST"])
def register():
    request_body = request.json
    if (request_body["email"] == None):
        return "The email is missing", 404
    if (request_body["password"] == None):
        return "The password name is missing", 404
    if (request_body["name"] == None):
        return "The name name is missing", 404
    if (request_body["last_name"] == None):
        return "The last name is missing", 404
    if (request_body["phone"] == None):
        return "The pnone number is missing", 404        
    
    user = User(request_body["name"], request_body["last_name"],request_body["email"], request_body["password"], request_body["phone"])
    
    db.session.add(user)
    db.session.commit()

    
    
    return jsonify({"user": user.serialize()}), 200

@api.route("/login", methods=["POST"])
def login():
    email = request.json.get("email", None)
    password = request.json.get("password", None)
    if email == None:
        return "The email is missing", 404
    if password == None:
        return "The last password is missing", 404
    user = User.query.filter_by(email=email).first()
    if (user == None):
        return "user does not exist", 404
    if user.password != password:
        return jsonify("wrong password"), 404
    access_token = create_access_token(identity=email)
    return jsonify(access_token=access_token, user_id=user.id)

@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():

    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }

    return jsonify(response_body), 200

@api.route('/all_users', methods=['GET'])
def all_users():

    use = User.query.all()
    use_list =  list(map(lambda x: x.serialize(), use))
    response = jsonify(use_list)
    
    return response


@api.route('/all_characters', methods=['GET'])
def all_characters():

    char = Character.query.all()
    char_list =  list(map(lambda x: x.serialize(), char))
    response = jsonify(char_list)
    
    return response

@api.route('/all_planets', methods=['GET'])
def all_planets():

    plan = Planet.query.all()
    plan_list =  list(map(lambda x: x.serialize(), plan))
    response = jsonify(plan_list)
    
    return response

@api.route('/all_vehicles', methods=['GET'])
def all_vehicles():

    veh = Vehicle.query.all()
    veh_list =  list(map(lambda x: x.serialize(), veh))
    response = jsonify(veh_list)
    
    return response

@api.route('/character/<int:position>', methods=['GET'])
def specific_char(position):

    char = Character.query.filter_by(id=position).first()
    return jsonify(char.serialize())

@api.route('/planet/<int:position>', methods=['GET'])
def specific_planet(position):

    plan = Planet.query.filter_by(id=position).first()
    return jsonify(plan.serialize())

@api.route('/vehicle/<int:position>', methods=['GET'])
def specific_veh(position):

    veh = Vehicle.query.filter_by(id=position).first()
    return jsonify(veh.serialize())

@api.route('/add_fav_char', methods=['POST'])
def add_fav_char():

    request_body = request.json
    favourite_char = Fav_char(request_body["user_id"], request_body["char_id"])
    db.session.add(favourite_char)
    db.session.commit()

    resp = "The character has been added to your favourites"
    response = jsonify(resp)
    
    return response

@api.route('/add_fav_planet', methods=['POST'])
def add_fav_planet():

    request_body = request.json
    favourite_planet = Fav_planet(request_body["user_id"], request_body["planet_id"])
    db.session.add(favourite_planet)
    db.session.commit()

    resp = "The planet has been added to your favourites"
    response = jsonify(resp)
    
    return response

@api.route('/add_fav_veh', methods=['POST'])
def add_fav_veh():

    request_body = request.json
    favourite_veh = Fav_veh(request_body["user_id"], request_body["veh_id"])
    db.session.add(favourite_veh)
    db.session.commit()

    resp = "The vehicle has been added to your favourites"
    response = jsonify(resp)
    
    return response

@api.route('/get_all_fav', methods=['POST'])
def get_all_fav():

    user = request.json.get("user_id", None)
    fav_veh = Fav_veh.query.filter_by(user_id=user).all()
    fav_list_veh =  list(map(lambda x: x.serialize(), fav_veh))
    find_veh = [Vehicle.query.filter_by(id=x["veh_id"]).first().serialize() for x in fav_list_veh]
    find_veh = list(map(lambda x: {**x, "type" : "vehicle"}, find_veh))
   
    fav_char = Fav_char.query.filter_by(user_id=user).all()
    fav_list_char =  list(map(lambda x: x.serialize(), fav_char))
    find_char = [Character.query.filter_by(id=x["char_id"]).first().serialize() for x in fav_list_char]
    find_char = list(map(lambda x: {**x, "type" : "character"}, find_char))

    fav_planet = Fav_planet.query.filter_by(user_id=user).all()
    fav_list_planet =  list(map(lambda x: x.serialize(), fav_planet))
    find_planet = [Planet.query.filter_by(id=x["planet_id"]).first().serialize() for x in fav_list_planet]
    find_planet = list(map(lambda x: {**x, "type" : "planet"}, find_planet))

    print(find_char)
    print(find_veh)
    print(find_planet)
    return find_veh + find_char + find_planet, 200

@api.route('/favorite/planet/delete', methods=['DELETE'])
#@jwt_required()
def delete_planet():
    user = request.json.get("user_id", None)
    planet_id = request.json.get("planet_id", None)
    fav_planet_all = Fav_planet.query.filter_by(user_id=user, planet_id=planet_id).first()
   
    if planet_id == None:
        return "Can't find character to delete", 404
    if fav_planet_all == None:
        return "no favorite planet to delete"
    
    db.session.delete(fav_planet_all)
    db.session.commit()
    
    return jsonify({"planet":fav_planet_all.serialize(), "message":"was deleted"}), 200

@api.route('/favorite/char/delete', methods=['DELETE'])
#@jwt_required()
def delete_char():
    user = request.json.get("user_id", None)
    char_id = request.json.get("char_id", None)
    fav_char_all = Fav_char.query.filter_by(user_id=user, char_id=char_id).first()
   
    if char_id == None:
        return "Can't find character to delete", 404
    if fav_char_all == None:
        return "no favorite character to delete"
    
    db.session.delete(fav_char_all)
    db.session.commit()
    
    return jsonify({"character":fav_char_all.serialize(), "message":"was deleted"}), 200

@api.route('/favorite/vehicle/delete', methods=['DELETE'])
#@jwt_required()
def delete_vehicle():
    user = request.json.get("user_id", None)
    veh_id = request.json.get("veh_id", None)
    fav_veh_all = Fav_veh.query.filter_by(user_id=user, veh_id=veh_id).first()
   
    if veh_id == None:
        return "Can't find character to delete", 404
    if fav_veh_all == None:
        return "no favorite vehicle to delete"
    
    db.session.delete(fav_veh_all)
    db.session.commit()
    
    return jsonify({"vehicle":fav_veh_all.serialize(), "message":"was deleted"}), 200