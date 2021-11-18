"""
Rules

The function will return the correct conversion if the supplied problems are properly formatted, otherwise, it will return a string that describes an error that is meaningful to the user.

    Situations that will return an error:
        E1. If there are too many problems supplied to the function. The limit is five, anything more will return: Error: Too many problems.
        E2. The appropriate operators the function will accept are addition and subtraction. Multiplication and division will return an error. Other operators not mentioned in this bullet point will not need to be tested. The error returned will be: Error: Operator must be '+' or '-'.
        E3. Each number (operand) should only contain digits. Otherwise, the function will return: Error: Numbers must only contain digits.
        E4. Each operand (aka number on each side of the operator) has a max of four digits in width. Otherwise, the error string returned will be: Error: Numbers cannot be more than four digits.
    
    If the user supplied the correct format of problems, the conversion you return will follow these rules:
        R1. There should be a single space between the operator and the longest of the two operands, the operator will be on the same line as the second operand, both operands will be in the same order as provided (the first will be the top one and the second will be the bottom.
        R2. Numbers should be right-aligned.
        R3. There should be four spaces between each problem.
        R4. There should be dashes at the bottom of each problem. The dashes should run along the entire length of each problem individually. (The example above shows what this should look like.)
"""

import re
def arithmetic_arranger(problems, display_answer = False):
  # E1 validation
  if len(problems) > 5:
    return "Error: Too many problems."
  
  arranged_problems = ""
  first_row = ""
  second_row = ""
  third_row = ""
  last_row = ""
  # Extract individual equation items
  for problem in problems:
    # E3 validation
    if(re.search("[^\s0-9.+-]", problem)):
      # E2 validation
      if(re.search("[/|*]", problem)):
        return "Error: Operator must be '+' or '-'."
      return "Error: Numbers must only contain digits."

    # R1 confirmation
    problemElements = problem.split(" ")
    if len(problemElements) != 3:
      return "Error: Invalid format."

    # Extract operands and operator
    leftOperand = problemElements[0]
    operator = problemElements[1]
    rightOperand = problemElements[2]

    # E4 validation
    if len(leftOperand) > 4 or len(rightOperand) > 4:
      return "Error: Numbers cannot be more than four digits."

    answer = calculate(leftOperand, operator, rightOperand)
    if answer == "Error: Invalid format or operator.":
      return answer   
    
    length = max(len(leftOperand), len(rightOperand)) + 2
    if problem != problems[-1]:
      first_row += leftOperand.rjust(length) + '    '
      second_row += operator + rightOperand.rjust(length - 1) + '    '
      third_row += "-" * length + '    '
      last_row += answer.rjust(length) + '    '
    else:
      first_row += leftOperand.rjust(length)
      second_row += operator + rightOperand.rjust(length - 1)
      third_row += "-" * length
      last_row += answer.rjust(length)

  arranged_problems = first_row + "\n" + second_row + "\n" + third_row 
  arranged_problems = arranged_problems + "\n" + last_row if display_answer else arranged_problems
  return arranged_problems

def calculate(firstNumber, operator, secondNumber):
  if operator == "+":
    return str(int(firstNumber) + int(secondNumber))
  elif operator == "-":
    return str(int(firstNumber) - int(secondNumber))
  else:
    return "Error: Invalid format or operator."