import copy
import random
# Consider using the modules imported above.

class Hat:
    def __init__(self, **kwargs):
        self.contents = []
        for k, v in kwargs.items():
            for i in range(v):
                self.contents.append(k)
        print(self.contents)


# def experiment(hat, expected_balls, num_balls_drawn, num_experiments):
