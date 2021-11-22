import copy
import random
# Consider using the modules imported above.

# First, create a `Hat` class in `prob_calculator.py`. The class should take a variable number of arguments that specify the number of balls of each color that are in the hat. For example, a class object could be created in any of these ways:
# ```
# hat1 = Hat(yellow=3, blue=2, green=6)
# hat2 = Hat(red=5, orange=4)
# hat3 = Hat(red=5, orange=4, black=1, blue=0, pink=2, striped=9)
# ```

# A hat will always be created with at least one ball. The arguments passed into the hat object upon creation should be converted to a `contents` instance variable. `contents` should be a list of strings containing one item for each ball in the hat. Each item in the list should be a color name representing a single ball of that color. For example, if your hat is `{"red": 2, "blue": 1}`, `contents` should be `["red", "red", "blue"]`.

class Hat:
    def __init__(self, **kwargs):
        self.contents = []
        for k, v in kwargs.items():
            for i in range(v):
                self.contents.append(k)
        print(self.contents)
    
    # The `Hat` class should have a `draw` method that accepts an argument indicating the number of balls to draw from the hat.
    # This method should remove balls at random from `contents` and return those balls as a list of strings. The balls should
    # not go back into the hat during the draw, similar to an urn experiment without replacement. If the number of balls to
    # draw exceeds the available quantity, return all the balls.

    def draw(self, number_of_balls):
        removed_balls = []
        for i in range(number_of_balls):
            random_ball = self.content.pop(int(random.random() * len(self.contents)))
            removed_balls.append(random_ball)
        return removed_balls


# def experiment(hat, expected_balls, num_balls_drawn, num_experiments):
