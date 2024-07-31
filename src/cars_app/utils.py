import requests

# Replace these with your actual client ID and client secret
client_id = "client5686appraisal"
client_secret = "qgnbMCcWjvqDAfX8x1pO"

# Set the URL for the token request
url = "https://lk.cm.expert/oauth/token"

# Define the payload with the grant type, client ID, and client secret
payload = {
    "grant_type": "client_credentials",
    "client_id": client_id,
    "client_secret": client_secret,
}

# Make the POST request to get the token
response = requests.post(url, data=payload)

# Check if the request was successful
if response.status_code == 200:
    # Print the JSON response
    print(response.json())
else:
    # Print the error
    print(f"Failed to retrieve token: {response.status_code}")
    print(response.text)
