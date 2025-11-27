# Deliberate vulnerabilities for Snyk Code PR Check testing

# Hardcoded secret (Snyk will detect this)
TEST_SECRET = "SNYK_TEST_SECRET_ABC123456"

# Command injection (Snyk will detect this)
import os
user_input = "ls"
os.system(user_input)

# Dangerous eval usage (Snyk will detect this)
data = "3 * 3"
eval(data)

print("vulnerable code executed")
