# flask
from flask import Flask, render_template, jsonify, request
# matplotlib class
import construct_graphs
# initialize
app = Flask(__name__)

# html routing
@app.route('/')
def index():
    return render_template('index.html')

# An API: returns histogram image as base64 in json
@app.route('/get_hist_data')
def get_hist_data():
    hist = construct_graphs.Hist1()
    hist.convert_fig_to_base64('svg')
    ret = hist.fig_base64
    del hist
    return jsonify({"img_base64": "data:image/svg+xml;base64," + ret})


if __name__ == '__main__':
    app.debug = True
    app.run(host='0.0.0.0', port=8881)