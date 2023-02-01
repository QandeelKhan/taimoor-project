import os
import requests

# Get GitHub username and personal access token from environment variables
username = os.environ["GH_USERNAME"]
token = os.environ["GH_TOKEN"]

# Prompt the user for the repository name
repo_name = input("Enter the name of the repository: ")

# Set up authentication headers
headers = {
    "Authorization": f"Token {token}"
}

# Prompt the user to confirm if they have collaborators to add
add_collaborators = input(
    "Do you have any collaborators to add? (yes/no): ").lower()

# Add each collaborator
while add_collaborators in ["yes", "y"]:
    # Prompt the user for the collaborator username
    collaborator_username = input("Enter the username of the collaborator: ")

    # Define the API endpoint
    endpoint = f"https://api.github.com/repos/{username}/{repo_name}/collaborators/{collaborator_username}"

    # Make the API request to add the collaborator
    response = requests.put(endpoint, headers=headers)

    # Check the response status code
    if response.status_code == 204:
        print(f"Successfully added collaborator: {collaborator_username}")
    else:
        print(f"Failed to add collaborator: {collaborator_username}")
        print(f"Response: {response.text}")

    # Prompt the user to confirm if they have another collaborator to add
    add_collaborators = input(
        "Do you have another collaborator to add? (yes/no): ").lower()

if add_collaborators in ["no", "n"]:
    print("No collaborators added.")
