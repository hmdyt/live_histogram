import numpy as np

def make_rand():
    return np.random.normal(loc=1, size=100, scale=1)

def make_data() -> np.ndarray:
    # write your code
    return make_rand()