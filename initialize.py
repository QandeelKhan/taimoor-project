import os
import subprocess

# Remove the current origin
subprocess.run(["git", "remote", "remove", "origin"])

# Ask for new origin
origin_url = input("Enter the new origin URL: ")

# Add the new origin
subprocess.run(["git", "remote", "add", "origin", origin_url])

# Confirm completion
print("Self destroying the script: initial script has been done")

# Remove the script
os.remove(__file__)
