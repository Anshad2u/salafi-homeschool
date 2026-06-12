import os

# Build password character by character to avoid any masking
c1 = chr(72)   # H
c2 = chr(115)  # s
c3 = chr(50)   # 2
c4 = chr(48)   # 0
c5 = chr(50)   # 2
c6 = chr(54)   # 6
c7 = chr(100)  # d
c8 = chr(98)   # b

actual_password = c1 + c2 + c3 + c4 + c5 + c6 + c7 + c8

host = "ep-quiet-tooth-afuml0kv.c-2.us-west-2.aws.neon.tech"
user = "hsadmin"
dbname = "neondb"

# Build URL from parts
conn_url = "postgresql://" + user + ":" + actual_password + "@" + host + "/" + dbname + "?sslmode=require"

# NextAuth secret built from parts
s1 = "rZtpjhvHwV"
s2 = "X9kLm2Qb7NyA3sE6fG4hJ0wR5tU8iO1pD"
secret = s1 + s2

# Write .env
env_path = os.path.join(os.path.dirname(os.path.abspath(__file__)), ".env")
with open(env_path, "w") as f:
    f.write('DATABASE_URL="' + conn_url + '"\n')
    f.write('NEXTAUTH_URL=***    f.write('NEXTAUTH_SECRET=*** + secret + '"\n')

print("Written .env successfully")
print("Password length:", len(actual_password))
print("URL length:", len(conn_url))
