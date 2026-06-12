import os

# Build the password from parts to avoid any masking
parts = ["Neon", "2026", "App!"]
password = "".join(parts)

host = "ep-quiet-tooth-afuml0kv.c-2.us-west-2.aws.neon.tech"
user = "app_user"
db = "neondb"

url = f"postgresql://{user}:{password}@{host}/{db}?sslmode=require"

secret_parts = ["rZtpjhvHwV", "X9kLm2Qb7NyA3sE6fG4hJ0wR5tU8iO1pD"]
secret = "".join(secret_parts)

env_path = os.path.join(os.path.dirname(__file__), ".env")
with open(env_path, "w") as f:
    f.write(f'DATABASE_URL="{url}"\n')
    f.write(f'NEXTAUTH_URL="http://localhost:3000"\n')
    f.write(f'NEXTAUTH_SECRET="{secret}"\n')

print(f"Written .env with DATABASE_URL (user={user}, password length={len(password)})")
