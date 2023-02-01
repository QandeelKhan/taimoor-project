import os
import subprocess
import time
import requests
import json

# Get GitHub username and personal access token from environment variables
username = os.environ["GH_USERNAME"]
token = os.environ["GH_TOKEN"]
email = os.environ["GH_EMAIL"]
api_base_url = "https://api.github.com"

# installing npm packages
print("...Installing npm dependencies")
time.sleep(1)
subprocess.run(["npm", "install"])

# Remove the current origin
print("...removing the current origin")
time.sleep(1)
subprocess.run(["git", "remote", "remove", "origin"])


# -----------CREATING NEW ORIGIN

# Prompt the user for the repository name
repo_name = input("Enter the name of the repository you want to create: ")
repo_description = input(
    "Please enter the description of the repository you want to create: ")

# Define the API endpoint
# endpoint = f"https://api.github.com/user/{username}/repos"

# Set up authentication headers
headers = {
    "Authorization": f"Bearer {token}"
}

# Define the request data
data = {
    "name": repo_name,
    "description": repo_description,
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
    time.sleep(2)
else:
    print(f"Failed to create repository: {repo_name}")
    print(f"Response status code: {response.status_code}")
    try:
        response_json = response.json()
        print(f"Response message: {response_json['message']}")
    except:
        print(f"Response: {response.text}")

# Self-destruct after 1 seconds
# -----------CREATING NEW ORIGIN END


# -----------ADD NEW ORIGIN START
# Ask for new origin
# origin_url = input("Enter the new origin URL: ")

# Add the new origin
subprocess.run(["git", "remote", "add", "origin", repo_origin])
print("new repository origin added successfully!")
time.sleep(2)
print(f"...pushing changes to newly added repository: {repo_origin}")
time.sleep(2)
subprocess.run(["git", "add", "."])
subprocess.run(["git", "commit", "-m", "'initial commit'"])
subprocess.run(["git", "push", "-u", "origin", "main"])
print(f"...changes pushed successfully")
time.sleep(3)


# -------adding collaborator

# Prompt the user to confirm if they have collaborators to add
add_collaborators = input(
    "Do you have any collaborators to add? (yes/no): ").lower()


# Add each collaborator
while add_collaborators in ["yes", "y"]:
    # Prompt the user for the collaborator username
    collaborator_username = input("Enter the username of the collaborator: ")

    # Define the API endpoint
    endpoint = f"{api_base_url}/repos/{username}/{repo_name}/collaborators/{collaborator_username}"

    # Make the API request to add the collaborator
    response = requests.put(endpoint, headers=headers)

    # Check the response status code
    if response.status_code == 204:
        print(f"Successfully added collaborator: {collaborator_username}")
        time.sleep(2)
    else:
        print(f"Failed to add collaborator: {collaborator_username}")
        print(f"Response: {response.text}")
        time.sleep(2)

    # Prompt the user to confirm if they have another collaborator to add
    add_collaborators = input(
        "Do you have another collaborator to add? (yes/no): ").lower()

if add_collaborators in ["no", "n"]:
    print(f"No more collaborators added other then {collaborator_username}.")
# -------ADDING COLLABORATOR END


# -------CHANGING THE NAME PROPERTY OF Package.json and package-lock.json
# -----package.json
with open("package.json", "r") as file:
    package = json.load(file)

# Update the name field
package["name"] = "new-name"

# Write the updated contents back to the package.json file
with open("package.json", "w") as file:
    json.dump(package, file, indent=2)
# -----package-lock.json
# Load the contents of the package-lock.json file
with open("package-lock.json", "r") as file:
    package_lock = json.load(file)

# Update the name field
package_lock["name"] = "new-name"

# Write the updated contents back to the package-lock.json file
with open("package-lock.json", "w") as file:
    json.dump(package_lock, file, indent=2)
# -------CHANGING THE NAME PROPERTY OF Package.json and package-lock.json END

# Confirm completion
print("Self destroying the script: initial script has been done")

# Remove the script
time.sleep(1)
# os.remove(__file__)
