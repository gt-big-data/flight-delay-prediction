import joblib
import pandas as pd
from flask import Flask, request, jsonify
from flask_cors import CORS
from random import randrange
import geopy.distance
import requests


app = Flask("flask_app")
CORS(app)

# ---- The Model ----
model = joblib.load('model.joblib')
airports = pd.read_csv('airports.csv')

"""
Model parameters:
ORIGIN: Origin airport expressed as 3 letter IATA code
DEST: Destination airport expressed as 3 letter IATA code
DEP_DELAY: Departure Delay in minutes, default to 0 if n/a
AIRLINE: Two letter airline abbreviation (i.e. AA for American Airlines)
DAY_OF_WEEK: Day of the week of the flight (MON, TUE, WED, THU, FRI, SAT, SUN)

Example:
    params = {
        "ORIGIN": "SFO",
        "DEST": "SAN",
        "AIRLINE": "AA",
        "DEP_DELAY": 10.0,
        "DAY_OF_WEEK": "MON",
    }
"""

@app.route("/predict", methods=["POST"])
def predict():
    if request.method == "POST":  
        params = request.json

        df = pd.read_csv('columns.csv')
        df.insert(0, "Unnamed: 0", [randrange(1000000)])
        
        lats = airports.set_index('IATA').to_dict()['LATITUDE']
        longs = airports.set_index('IATA').to_dict()['LONGITUDE']

        df["OLAT"] = lats[params["ORIGIN"]]
        df["OLONG"] = longs[params["ORIGIN"]]
        df["DLAT"] = lats[params["DEST"]]
        df["DLONG"] = longs[params["DEST"]]

        df["DAY_OF_WEEK_" + params["DAY_OF_WEEK"]] = 1
        df["AIRLINE_" + params["AIRLINE"]] = 1
        df["DEP_DELAY"] = [params["DEP_DELAY"]]

        coords_1 = (df["OLAT"][0], df["OLONG"][0])
        coords_2 = (df["DLAT"][0], df["DLONG"][0])

        df["DISTANCE"] = geopy.distance.geodesic(coords_1, coords_2).miles    
        prediction = { "prediction": model.predict(df)[0] }
        response = jsonify(prediction)
        return response
    else:
        return "HTTP Request must be of type POST"

@app.route("/test")
def test():
    params = {
        "ORIGIN": "BOS",
        "DEST": "ATL",
        "AIRLINE": "UA",
        "DEP_DELAY": 99.0,
        "DAY_OF_WEEK": "WED",
    }
    res = requests.post('http://localhost:5000/predict', json=params)
    return res.text

if __name__ == "__main__":
    app.run(host="127.0.0.1", port="5000", debug=False)
