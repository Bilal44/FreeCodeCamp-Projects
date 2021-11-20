class Category:
    def __init__(self, name):
        self.ledger = []
        self.name = name
    
    def deposit(self, amount, description = ""):
        self.ledger.append({"amount": amount, "description": description})

    def withdraw(self, amount, description = ""):
        funds_available = self.check_funds(amount)
        if funds_available:
            self.ledger.append({"amount": -amount, "description": description})
            return True
        else:
            return False
    
    def get_balance(self):
        funds = 0
        for item in self.ledger:
            funds += item["amount"]
        return funds

    def check_funds(self, amount):
        return self.get_balance() >= amount

    def transfer(self, amount, category):
        if self.check_funds(amount):
            self.withdraw(amount, "Transfer to " + category.name)
            category.deposit(amount, "Transfer from " + self.name)
            return True
        else:
            return False

    def __str__(self):
        header = f"{self.name:*^30}\n"
        items = ""
        total = 0

        for item in self.ledger:
            items += f"{item['description'][0:23]:23}" + f"{item['amount']:>7.2f}\n"
            total += item["amount"]
        return header + items + "Total: " + str(total)

def create_spend_chart(categories):
    return categories
