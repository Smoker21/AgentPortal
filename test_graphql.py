import requests
import json

try:
    # Test GraphQL endpoint
    response = requests.post(
        'http://localhost:8080/graphql',
        json={'query': '{__typename}'},
        headers={'Content-Type': 'application/json'},
        timeout=5
    )
    print(f"Status: {response.status_code}")
    print(f"Response: {response.text}")
except Exception as e:
    print(f"Error: {e}")
