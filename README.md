<p align="center">
  <h1 align="center">Flight Delay Prediction</h1>
  <p align="center">Machine learning, web, and browser tooling for predicting and surfacing flight delay risk</p>
</p>

[![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![Python Version](https://img.shields.io/badge/python-3.8%2B-blue)](https://www.python.org/downloads/)
[![Node.js Version](https://img.shields.io/badge/node-%3E%3D12.0.0-brightgreen)](https://nodejs.org/en/)

## Overview

Flight Delay Prediction is a multi-component project built for Georgia Tech's Big Data Big Impact program. The repository combines model experimentation, API deployment, frontend applications, and a Chrome extension to make flight delay predictions more accessible to end users.

The project explores how machine learning can be used to estimate delay likelihood from structured flight information such as origin, destination, airline, day of week, and departure delay. In addition to prediction, the repo includes user-facing interfaces for interacting with those results through web and browser-based tools.

## What this repository includes

This repository is organized as a full project workspace rather than a single app.

- **Model experimentation** in Jupyter notebooks
- **Flask APIs** for serving trained models
- **React frontends** for user-facing interaction
- **Chrome extension tooling** for in-browser flight context
- **Prototype and legacy app folders** from earlier iterations

## Key Features

- Predicts flight delay outcomes from structured flight inputs
- Includes both notebook-based experimentation and deployable inference services
- Provides multiple frontend surfaces, including a React app and Chrome extension
- Supports user authentication in the newer web experience through Firebase
- Separates modeling, API, visualization, and extension work into modular folders for easier collaboration

## Repository Structure

```bash
flight-delay-prediction/
├── analysis/                  # Modeling notebooks such as RandomForest.ipynb and lstm.ipynb
├── chrome_extension/          # Browser extension for surfacing delay-related information
├── dataviz-react/             # Newer Vite + React frontend with Firebase auth
├── flask_app/                 # Flask prototype using engineered features and airport metadata
├── flight-delay-api/          # Lightweight Flask inference API with Docker support
├── flight-delay-webapp/       # Earlier React web app prototype
├── platform/                  # Supporting notebook assets
├── package.json               # Root-level shared dependency file
└── README.md
