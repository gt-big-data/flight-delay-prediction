# ✈️ Flight Delay Prediction API

This is a Flask-based REST API that serves our trained machine learning model (`model.pkl`) to predict flight delays.

It is containerized using Docker and designed to be run locally or deployed via Google Cloud Run.

---

## 🚀 Features

- Predicts flight delays using a pre-trained ML model
- Accepts batch input via JSON
- Runs via Docker (no need to install Python dependencies locally)
- Returns predictions as JSON

---

## 🧱 Prerequisites

Make sure you have the following installed:

- [Docker](https://www.docker.com/products/docker-desktop)

---

## 🐳 How to Run the API Locally (Using Docker)

### 1. Navigate to folder

cd flight-delay-api

### 2. Build Docker Image

Open up the Docker application
Run this command in terminal: 'docker build -t flight-delay-api .'

### 3. Run the API

Run this command in terminal: 'docker run -p 8080:8080 flight-delay-api'

### 4. Testing the API is working (optional)

In a new terminal window, run the following command:
curl -X POST http://localhost:8080/predict \
  -H "Content-Type: application/json" \
  -d @input.json

This should give you a output of '{"prediction":[0]}'
