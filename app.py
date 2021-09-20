# flask
from flask import Flask, render_template, jsonify
# matplotlib class
import construct_graphs
# for making histogram data
from make_data import make_data
# initialize
app = Flask(__name__)

# html routing
@app.route('/')
def index():
    return "hello world"

# An API: returns histogram image as base64 in json
@app.route('/get_hist_data')
def get_hist_data():
    hist_data = make_data()
    hist = construct_graphs.Hist1(hist_data=hist_data, bins=100)
    hist.convert_fig_to_base64('svg')
    ret = hist.fig_base64
    del hist
    return jsonify({"img_base64": "data:image/svg+xml;base64," + ret})


if __name__ == '__main__':
    app.run()