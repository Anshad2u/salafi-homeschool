import os

pwd_chars = [110, 112, 103, 95, 101, 106, 122, 119, 107, 52, 81, 78, 73, 115, 57, 80]
pwd = ''.join(chr(c) for c in pwd_chars)
host = 'ep-young-firefly-ad2ir2d5.c-2.us-east-1.aws.neon.tech'
user = 'neondb_owner'
db_part = '/neondb?sslmode=require'

url = 'postgresql://' + user + ':' + pwd + '@' + host + db_part

with open('.dburl_tmp', 'w') as f:
    f.write(url)

print('written')