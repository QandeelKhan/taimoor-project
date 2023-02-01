import os
import requests
import time

# Get GitHub username and personal access token from environment variables
username = os.environ["GH_USERNAME"]
token = os.environ["GH_TOKEN"]
api_base_url = "https://api.github.com"

# Prompt the user for the repository name
repo_name = input("Enter the name of the repository you want to create: ")

# Define the API endpoint
# endpoint = f"https://api.github.com/users/{username}/repos"

# Set up authentication headers
headers = {
    "Authorization": f"Bearer {token}"
}

# Define the request data
data = {
    "name": repo_name,
    "description": "This is my new repository",
    "private": False
}

# Make the API request
response = requests.post(f"{api_base_url}/user/repos",
                         headers=headers, json=data)

# Check the response status code
if response.status_code == 201:
    print(f"Successfully created repository: {repo_name}")
    repo_origin = f"https://github.com/{username}/{repo_name}"
    print(f"Repository origin address: {repo_origin}")
else:
    print(f"Failed to create repository: {repo_name}")
    print(f"Response status code: {response.status_code}")
    try:
        response_json = response.json()
        print(f"Response message: {response_json['message']}")
    except:
        print(f"Response: {response.text}")

# Self-destruct after 1 seconds
time.sleep(1)
# os.remove(__file__)
