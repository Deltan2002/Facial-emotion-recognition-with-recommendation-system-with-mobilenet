from __future__ import division, print_function
import os
import cv2
import numpy as np
import tensorflow as tf
from tensorflow.keras.models import load_model
from tensorflow.keras.preprocessing import image
from flask import Flask, request, render_template
import time
import statistics as st
from mtcnn import MTCNN
from fer import FER
from flask import jsonify

app = Flask(__name__)

@app.route("/")
def home():
    port = request.environ.get('SERVER_PORT', '5000')
    return render_template("index1.html", port=port)

@app.route('/camera', methods=['GET', 'POST'])
def camera():
    GR_dict = {0: (0, 255, 0), 1: (0, 0, 255)}
    
    detector = FER(mtcnn=True)
    
    cap = cv2.VideoCapture(0)

    if not cap.isOpened():
        print("Error: Failed to open camera.")
        return render_template("error.html")

    output = []  # Initialize the output list
    start_time = time.time()  # Start time

    while time.time() - start_time <= 15:  # Run for 10 seconds
        ret, img = cap.read()
        if not ret:
            print("Error: Failed to capture image from camera")
            break

        # Use FER for face detection and emotion recognition
        result = detector.detect_emotions(img)
        
        for face in result:
            # Extract face region
            x, y, w, h = face["box"]
            face_img = img[y:y+h, x:x+w]
            resized = cv2.resize(face_img, (48, 48))
            
            # Perform emotion prediction
            predictions = detector.top_emotion(resized)
            predicted_emotion = predictions[0]
            output.append(predicted_emotion)

            # Draw bounding box and emotion label
            cv2.rectangle(img, (x, y), (x+w, y+h), GR_dict[1], 2)
            cv2.putText(img, predicted_emotion, (x, y-10), cv2.FONT_HERSHEY_SIMPLEX, 0.8, (255, 255, 255), 2)

        cv2.imshow('LIVE', img)
        key = cv2.waitKey(1)
        if key == 27:
            break

    cap.release()
    cv2.destroyAllWindows()
    
    if output:

        final_output = st.mode(output)
        # # emotions = ["sad", "happy", "angry", "neutral", "surprise"]
        # if final_output in emotions:
        #     # Render the template with the detected emotion
        return render_template("buttons.html", final_output=final_output)
        # else:
        #     return render_template("error.html")
    else:
        return render_template("error.html")

@app.route('/get_emotion/<emotion>')
def get_emotion(emotion):
    return jsonify({"emotion": emotion})


@app.route('/templates/buttons', methods = ['GET','POST'])
def buttons():
    return render_template("buttons.html")

@app.route('/songs/surprise', methods = ['GET', 'POST'])
def songsSurprise():
    return render_template("songsSurprise.html")

@app.route('/songs/angry', methods = ['GET', 'POST'])
def songsAngry():
    return render_template("songsAngry.html")

@app.route('/songs/sad', methods = ['GET', 'POST'])
def songsSad():
    return render_template("songsSad.html")

@app.route('/songs/happy', methods = ['GET', 'POST'])
def songsHappy():
    return render_template("songsHappy.html")

@app.route('/songs/fear', methods = ['GET', 'POST'])
def songsFear():
    return render_template("songsFear.html")

@app.route('/songs/neutral', methods = ['GET', 'POST'])
def songsNeutral():
    return render_template("songsNeutral.html")

@app.route('/templates/join_page', methods = ['GET', 'POST'])
def join():
    return render_template("join_page.html")

if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5000))
    app.run(debug=True, port=port)
