# matplotlib
import numpy as np
import matplotlib
matplotlib.use('Agg')
import matplotlib.pyplot as plt
# base64
import base64
from io import BytesIO

class Hist1:
    def __init__(self, hist_data = np.array([1,2,3]), bins = 10) -> None:
        # make hist
        self.fig, self.ax = plt.subplots()
        self.ax.hist(hist_data, bins=bins)
        # base64
        self.fig_base64 = ""

    def __del__(self) -> None:
        plt.clf()
        plt.close()

    def convert_fig_to_base64(self, format) -> None:
        img_byte = BytesIO()
        self.fig.savefig(img_byte, format=format)
        self.fig_base64 = base64.b64encode(img_byte.getvalue()).decode()