import numpy as np
import pandas as pd
from flask import Flask, request, jsonify
from flask_cors import CORS
import pickle


app = Flask(__name__)
CORS(app)
model = pickle.load(open('model2_lung (1).pkl', 'rb'))
@app.route('/submit', methods=['POST'])
def predict():
    try:
        data = request.get_json()
        print("Received data:", data)
        # Extract features from the 'gold' key in the JSON data
        lung_cancer = data.get('cancer', {})
        PeerPressure = float(lung_cancer.get('Peer', 0))
        Alcohol = float(lung_cancer.get('alcohol', 0))
        Anxiety = float(lung_cancer.get('anxiety', 0))
        Chronic= float(lung_cancer.get('chronic',0))

        input_data = np.array([[Anxiety,PeerPressure, Chronic,Alcohol]])
        print(f"input array {input_data}")

       

# Now use this DataFrame for prediction
        prediction = model.predict(input_data)

        print("Prediction:", prediction)

        return jsonify({'prediction': prediction.tolist()})

    except KeyError as e:
        return jsonify({'error': f'Missing or incorrect data format. Expected JSON object with "cancer" key containing "peer pressure", "alcohol", and "anxiety" and "chronic" keys.'}), 400

    except Exception as e:
        return jsonify({'error': str(e)}), 500
if __name__ == '__main__':

 app.run()
