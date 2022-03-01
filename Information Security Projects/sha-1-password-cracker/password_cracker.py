import hashlib

# Open and read passwords and salts file line by line
passwords_file = open("top-10000-passwords.txt", "r").readlines()
salts_file = open("known-salts.txt", "r").readlines()

# Hash plain-text passwords using hashlib
def convert_to_sha1(password, salt=None):
  password = password.strip()
  password = password + salt.strip() if salt else password
  return hashlib.sha1(str(password).encode('utf-8')).hexdigest()

# Hashed password collection
hashed_pass_collection = {convert_to_sha1(password): password.strip() for password in passwords_file}

salted_hash_collection = {}
for salt in salts_file:
  for password in passwords_file:
    a = convert_to_sha1(password, salt)
    salted_hash_collection[a] = password.strip()
    b = convert_to_sha1(salt, password)
    salted_hash_collection[b] = password.strip()

def crack_sha1_hash(hash, use_salts=False):
    hashed_collection = salted_hash_collection if use_salts else hashed_pass_collection
    
    password = hashed_collection.get(hash)
    
    if password:
        return password
    else:
        return "PASSWORD NOT IN DATABASE"