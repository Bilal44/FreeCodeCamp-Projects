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
    
    # The `Hat` class should have a `draw` method that accepts an argument indicating the number of balls to draw from the hat.
    # This method should remove balls at random from `contents` and return those balls as a list of strings. The balls should
    # not go back into the hat during the draw, similar to an urn experiment without replacement. If the number of balls to
    # draw exceeds the available quantity, return all the balls.

    def draw(self, num_of_balls):
        if num_of_balls > len(self.contents) or len(self.contents) < 2:
            return self.contents

        removed_balls = []
        for i in range(num_of_balls):
            random_ball = self.contents.pop(random.randint(0, len(self.contents) - 1))
            removed_balls.append(random_ball)
        return removed_balls


# Next, create an `experiment` function in `prob_calculator.py` (not inside the `Hat` class). This function should accept the following arguments:
# * `hat`: A hat object containing balls that should be copied inside the function.
# * `expected_balls`: An object indicating the exact group of balls to attempt to draw from the hat for the experiment. For example, to determine the probability of drawing 2 blue balls and 1 red ball from the hat, set `expected_balls` to `{"blue":2, "red":1}`.
# * `num_balls_drawn`: The number of balls to draw out of the hat in each experiment.
# * `num_experiments`: The number of experiments to perform. (The more experiments performed, the more accurate the approximate probability will be.)

# The `experiment` function should return a probability. 

# For example, let's say that you want to determine the probability of getting at least 2 red balls and 1 green ball when you draw
# 5 balls from a hat containing 6 black, 4 red, and 3 green. To do this, we perform `N` experiments, count how many times `M` we
# get at least 2 red balls and 1 green ball, and estimate the probability as `M/N`. Each experiment consists of starting with a hat
# containing the specified balls, drawing a number of balls, and checking if we got the balls we were attempting to draw.

def experiment(hat, expected_balls, num_balls_drawn, num_experiments):
    count = 0

    # Loop through creating new hats and drawing balls as indicated by num_experiments
    for i in range(num_experiments):
        hat_copy = copy.deepcopy(hat)
        expected_balls_copy = copy.deepcopy(expected_balls)
        actual_balls = hat_copy.draw(num_balls_drawn)

        # Compare expected and actual results
        for ball in actual_balls:
            if ball in expected_balls_copy and expected_balls_copy[ball] > 0:
                 expected_balls_copy[ball] -= 1

        # Increase count if actual_balls completely match the expected results
        count += 1 if all(num == 0 for num in expected_balls_copy.values()) else 0
    
    return count / num_experiments
