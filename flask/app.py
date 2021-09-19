# flask
from flask import Flask, render_template, jsonify, request
# matplotlib
import numpy
import matplotlib
matplotlib.use('Agg')
import matplotlib.pyplot as plt
# base64
import base64
from io import BytesIO
# prepare histogram data
import make_example_data

# initialize
app = Flask(__name__)

# html routing
@app.route('/')
def index():
    return render_template('index.html')

# An API: returns histogram image as base64 in json
@app.route('/get_hist_data')
def get_hist_data():
    # prepare histofram data
    hist_data = make_example_data.make_example_data()
    # render histogram
    fig, axis = plt.subplots()
    axis.hist(hist_data)
    # fig -> jpg -> byte -> base64
    # TODO: pack into a function below
    img_byte = BytesIO()
    fig.savefig(img_byte, format='svg')
    img_base64 = base64.b64encode(img_byte.getvalue()).decode()
    return jsonify({"img_base64": "data:image/svg+xml;base64," + img_base64})


if __name__ == '__main__':
    app.debug = True
    app.run(host='0.0.0.0', port=8881)