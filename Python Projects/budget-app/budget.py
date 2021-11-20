# Category class contains an instance variable called `ledger` that is a list
# along with deposit, withdraw, get_balance, transfer and check_funds methods
class Category:
    # Custom constructor setting category name and ledger
    def __init__(self, name):
        self.ledger = []
        self.name = name
    
    # deposit method accepts an amount and description. If no description is given, it should default to an empty string.
    # The method should append an object to the ledger list in the form of `{"amount": amount, "description": description}`.
    def deposit(self, amount, description = ""):
        self.ledger.append({"amount": amount, "description": description})
    
    # withdraw method is similar to the `deposit` method, but the amount passed in should be stored in the ledger as a negative number.
    # If there are not enough funds, nothing should be added to the ledger.
    # This method should return `True` if the withdrawal took place, and `False` otherwise.
    def withdraw(self, amount, description = ""):
        funds_available = self.check_funds(amount)
        if funds_available:
            self.ledger.append({"amount": -amount, "description": description})
            return True
        else:
            return False
    
    # get_balance method returns the current balance of the budget category based on the deposits and withdrawals that have occurred
    def get_balance(self):
        funds = 0
        for item in self.ledger:
            funds += item["amount"]
        return funds
    
    # transfer method accepts an amount and another budget category as arguments. The method should add a withdrawal with the amount
    # and the description "Transfer to [Destination Budget Category]". The method should then add a deposit to the other budget category 
    # with the amount and the description "Transfer from [Source Budget Category]". If there are not enough funds, nothing should be
    # added to either ledgers. This method should return `True` if the transfer took place, and `False` otherwise.
    def transfer(self, amount, category):
        if self.check_funds(amount):
            self.withdraw(amount, "Transfer to " + category.name)
            category.deposit(amount, "Transfer from " + self.name)
            return True
        else:
            return False
    
    # check_funds method accepts an amount as an argument. It returns `False` if the amount is greater than the balance of the
    # budget category and returns `True` otherwise. This method should be used by both the `withdraw` method and `transfer` method.
    def check_funds(self, amount):
        return self.get_balance() >= amount

    # When the budget object is printed it displays:
    # > A title line of 30 characters where the name of the category is centered in a line of `*` characters.
    # > A list of the items in the ledger. Each line should show the description and amount. The first 23 characters of the description
    # should be displayed, then the amount. The amount should be right aligned, contain two decimal places, and display a maximum of 7 characters.
    # > A line displaying the category total.
    def __str__(self):
        header = f"{self.name:*^30}\n"
        items = ""
        total = 0

        for item in self.ledger:
            items += f"{item['description'][0:23]:23}" + f"{item['amount']:>7.2f}\n"
            total += item["amount"]
        return header + items + "Total: " + str(total)


# create_spend_chart takes a list of categories as an argument. It should return a string that is a bar chart.
# The chart should show the percentage spent in each category passed in to the function. The percentage spent should be calculated only with withdrawals
# and not with deposits. Down the left side of the chart should be labels 0 - 100. The "bars" in the bar chart should be made out of the "o" character.
# The height of each bar should be rounded down to the nearest 10. The horizontal line below the bars should go two spaces past the final bar. Each
# category name should be written vertically below the bar. There should be a title at the top that says "Percentage spent by category".
def create_spend_chart(categories):
    amount_spent = []

    # Get total spent in each category
    for category in categories:
        amount = 0
        for item in category.ledger:
            if item["amount"] < 0:
                amount += abs(item["amount"])
        amount_spent.append(amount)

    # Calculate percentage rounded down to the nearest 10
    total = sum(amount_spent)
    percentage = list(map(lambda amount: int((((amount / total) * 10) // 1) * 10), amount_spent))

    # Create the bar chart substrings
    header = "Percentage spent by category\n"

    chart = ""
    for value in reversed(range(0, 101, 10)):
        chart += str(value).rjust(3) + '|'
        for percent in percentage:
            if percent >= value:
                chart += " o "
            else:
                chart += "   "
        chart += " \n"

    footer = "    " + "-" * ((3 * len(categories)) + 1) + "\n"
    names = list(map(lambda category: category.name, categories))
    max_length = max(map(lambda name: len(name), names))
    names = list(map(lambda name: name.ljust(max_length), names))
    for x in zip(*names):
        footer += "    " + "".join(map(lambda s: s.center(3), x)) + " \n"

    return (header + chart + footer).rstrip("\n")
