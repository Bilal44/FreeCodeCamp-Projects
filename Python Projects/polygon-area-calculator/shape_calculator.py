#### Rectangle class
# When a Rectangle object is created, it should be initialized with `width` and `height` attributes. The class should also contain the following methods:
# * `set_width`
# * `set_height`
# * `get_area`: Returns area (`width * height`)
# * `get_perimeter`: Returns perimeter (`2 * width + 2 * height`)
# * `get_diagonal`: Returns diagonal (`(width ** 2 + height ** 2) ** .5`)
# * `get_picture`: Returns a string that represents the shape using lines of "\*". The number of lines should be equal to the height and the number of "\*" in each line should be equal to the width. There should be a new line (`\n`) at the end of each line. If the width or height is larger than 50, this should return the string: "Too big for picture.".
# * `get_amount_inside`: Takes another shape (square or rectangle) as an argument. Returns the number of times the passed in shape could fit inside the shape (with no rotations). For instance, a rectangle with a width of 4 and a height of 8 could fit in two squares with sides of 4.

# Additionally, if an instance of a Rectangle is represented as a string, it should look like: `Rectangle(width=5, height=10)`

class Rectangle:
    def __init__(self, width, height):
        self.width = width
        self.height = height
    
    def set_width(self, width):
        self.width = width

    def set_height(self, height):
        self.height = height
    
    def get_area(self):
        return self.width * self.height

    def get_perimeter(self):
        return 2 * self.width + 2 * self.height
    
    def get_diagonal(self):
        return ((self.width ** 2 + self.height ** 2) ** .5)
    
    def get_picture(self):
        if self.width > 50 or self.height > 50:
            return "Too big for picture."
        return ((self.width * "*") + "\n") * self.height
    
    def get_amount_inside(self, shape):
        return int(self.getarea / shape.get_area())

    def __str__(self):
        return f"Rectangle(width={self.width}, height={self.height})"


class Square:
