import os
import requests

# Get GitHub username and personal access token from environment variables
username = os.environ["GH_USERNAME"]
token = os.environ["GH_TOKEN"]

# Prompt the user for the repository name
repo_name = input("Enter the name of the repository: ")

# Prompt the user for the branch name
branch_name = input("Enter the name of the branch you want to create: ")

# Set up authentication headers
headers = {
    "Authorization": f"Token {token}"
}

# Define the API endpoint
endpoint = f"https://api.github.com/repos/{username}/{repo_name}/git/refs"

# Define the request data
data = {
    "ref": f"refs/heads/{branch_name}",
    "sha": "HEAD"
}

# Make the API request
response = requests.post(endpoint, headers=headers, json=data)

# Check the response status code
if response.status_code == 201:
    print(f"Successfully created branch: {branch_name}")
else:
    print(f"Failed to create branch: {branch_name}")
    print(f"Response: {response.text}")
