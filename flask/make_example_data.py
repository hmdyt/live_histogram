import numpy as np
from numpy.core.fromnumeric import size

def make_example_data():
    data = np.random.normal(loc=1, scale=1, size=100)
    return data