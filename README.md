# Facial Emotion Recognition with Recommendation System

## Overview

This project aims to develop a Facial Emotion Recognition system that identifies the emotional state of users through their facial expressions and provides personalized recommendations based on the detected emotions. The system utilizes machine learning models for emotion detection and a recommendation engine to suggest relevant content.

## Features

- Real-time facial emotion detection
- Emotion classification into categories such as happy, sad, angry, surprised, etc.
- Personalized recommendations based on detected emotions
- Interactive user interface

## Table of Contents

- [Demo](#demo)
- [Installation](#installation)
- [Usage](#usage)



## Installation

### Prerequisites

- Python 3.7 or higher
- Node.js and npm (for the frontend)
- pip (Python package installer)

### Backend Setup

1. Clone the repository:

    ```sh
    git clone https://github.com/Deltan2002/Facial-emotion-recognition-with-recommendation-system-with-mobilenet.git
    cd Facial-emotion-recognition-with-recommendation-system-with-mobilenet
    ```

2. Create a virtual environment and activate it:

    ```sh
    python -m venv venv
    source venv/bin/activate  # On Windows use `venv\Scripts\activate`
    ```

3. Install the required Python packages:

    ```sh
    pip install -r requirements.txt
    ```

## Usage

### Starting the Backend Server

1. Navigate to the root directory of the project.
2. Start the backend flask server:

    ```sh
    python app.py
    ```

3. Alternatively you can use nodemon to start the application:

    ```sh
    nodemon --exec python3 app.py
    ```

4. Open your browser and navigate to `http://localhost:5000`.


