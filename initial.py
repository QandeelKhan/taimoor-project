import requests

# Set up your personal access token and the base URL for the GitHub API
personal_access_token = "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"
api_base_url = "https://api.github.com"

# Create a dictionary to store the data for your new repository
data = {
    "name": "my-new-repository",
    "description": "This is my new repository",
    "private": False
}

# Send a POST request to the API endpoint to create a new repository
response = requests.post(f"{api_base_url}/user/repos", json=data, headers={
    "Authorization": f"Bearer {personal_access_token}"
})

# Check the status code of the response
if response.status_code == 201:
    print("Successfully created repository")
else:
    print("Failed to create repository")

# Set the file path and content for the file you want to add to the repository
# file_path = "path/to/file.txt"
# file_content = "This is the content of the file"

# Send a PUT request to the API endpoint for creating
# or updating a file in the repository
# response = requests.put(f"{api_base_url}/repos/{owner}/{repo}/contents/{file})
