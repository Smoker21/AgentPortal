import csv
import uuid
import random
import datetime
import os

# Configuration
OUTPUT_DIR = "neo4j/test/data"
os.makedirs(OUTPUT_DIR, exist_ok=True)
count = 100

# Helpers
def get_date():
    return datetime.datetime.now().isoformat()

def write_csv(filename, headers, rows):
    filepath = os.path.join(OUTPUT_DIR, filename)
    with open(filepath, 'w', newline='', encoding='utf-8') as f:
        writer = csv.writer(f)
        writer.writerow(headers)
        writer.writerows(rows)
    print(f"Generated {filepath} with {len(rows)} rows.")

# 1. Users
users = []
roles = ['Employee', 'Manager', 'Admin', 'Knowledge Expert']
for i in range(20):
    uid = str(uuid.uuid4())
    users.append({
        "id": uid,
        "accountId": f"u{1000+i}",
        "name": f"User_{i}",
        "email": f"user{i}@example.com",
        "role": random.choice(roles)
    })

write_csv("users.csv", ["id", "accountId", "name", "email", "role"], [[u['id'], u['accountId'], u['name'], u['email'], u['role']] for u in users])

# 2. Applications & Categories (REALISTIC ENTERPRISE DATA)
# Define a rich dictionary of realistic enterprise data
enterprise_data = {
    "HR": {
        "apps": [
            {"name": "Workday", "status": "Production"},
            {"name": "SuccessFactors", "status": "Production"}
        ],
        "functions": [
            {"name": "Submit Leave Request", "url": "/api/v1/leaves/request", "intent": "I want to take time off", "risk": "Low"},
            {"name": "View Payslip", "url": "/api/payroll/payslip/latest", "intent": "Show my latest salary slip", "risk": "High"},
            {"name": "Update Emergency Contact", "url": "/api/profile/contact/emergency", "intent": "Change my emergency contact number", "risk": "Medium"},
            {"name": "Team Calendar", "url": "/api/calendar/team/view", "intent": "Who is on leave today?", "risk": "Low"}
        ]
    },
    "IT": {
        "apps": [
            {"name": "ServiceNow", "status": "Production"},
            {"name": "Jira Service Desk", "status": "Production"}
        ],
        "functions": [
            {"name": "Reset Password", "url": "/api/security/password/reset", "intent": "I forgot my password", "risk": "High"},
            {"name": "Report Issue", "url": "/api/ticket/create", "intent": "My computer is not working", "risk": "Low"},
            {"name": "Check Ticket Status", "url": "/api/ticket/status/{id}", "intent": "What is the status of my ticket?", "risk": "Low"},
            {"name": "Request Software", "url": "/api/catalog/software/request", "intent": "I need to install VS Code", "risk": "Medium"}
        ]
    },
    "Finance": {
        "apps": [
            {"name": "SAP Concur", "status": "Production"},
            {"name": "Oracle NetSuite", "status": "Production"}
        ],
        "functions": [
            {"name": "Submit Expense", "url": "/api/expense/submit", "intent": "I need to file an expense report", "risk": "Medium"},
            {"name": "Approve Invoice", "url": "/api/invoice/approval/list", "intent": "Show invoices waiting for my approval", "risk": "High"},
            {"name": "Check Budget", "url": "/api/budget/dept/summary", "intent": "How much budget is left for my department?", "risk": "High"}
        ]
    },
    "Sales": {
        "apps": [
            {"name": "Salesforce", "status": "Production"},
            {"name": "HubSpot", "status": "Production"}
        ],
        "functions": [
            {"name": "Create Lead", "url": "/api/crm/lead/create", "intent": "Add a new sales lead", "risk": "Low"},
            {"name": "Pipeline Review", "url": "/api/crm/pipeline/dashboard", "intent": "Show me the sales pipeline", "risk": "Low"},
            {"name": "Customer Lookup", "url": "/api/crm/customer/search", "intent": "Find details for client Acme Corp", "risk": "Low"}
        ]
    },
    "Manufacturing": {
        "apps": [
            {"name": "Siemens Opcenter", "status": "Production"},
            {"name": "FabGuard", "status": "Production"}
        ],
        "functions": [
            {"name": "Check Lot Status", "url": "/api/mes/lot/status/{lot_id}", "intent": "Check my lot status", "risk": "Low"},
            {"name": "Check Tool Status", "url": "/api/fms/tool/status/{tool_id}", "intent": "What is current tool status", "risk": "Medium"},
            {"name": "View Digital Twin", "url": "/api/iot/digitaltwin/view", "intent": "Show me the equipment digital twin", "risk": "Low"},
            {"name": "Manufacturing Dashboard", "url": "/api/dashboard/plant/overview", "intent": "Check my current dashboards", "risk": "Low"},
            {"name": "Yield Analysis", "url": "/api/qa/yield/report/daily", "intent": "Show me today's yield report", "risk": "Medium"}
        ]
    }
}

apps = []
functions = []
intents = []
apis = []

# Generate Data from Dictionary
for category, data in enterprise_data.items():
    # Create Apps for this category
    for app_info in data["apps"]:
        aid = str(uuid.uuid4())
        apps.append({
            "id": aid,
            "name": app_info["name"],
            "category": category,
            "status": app_info["status"]
        })
        
        # Distribute functions across apps in this category randomly, or distinct subsets
        # For simplicity, assign ALL domain functions to EACH app to simulate overlap or just pick a few random ones
        # Let's pick 3 random functions from the domain for this specific app to vary it slightly
        app_funcs = random.sample(data["functions"], min(len(data["functions"]), 3))
        
        for func_info in app_funcs:
            fid = str(uuid.uuid4())
            fname = func_info["name"]
            
            functions.append({
                "id": fid,
                "name": fname,
                "app_id": aid,
                "description": f"Function to {fname.lower()} in {app_info['name']}",
                "riskLevel": func_info["risk"]
            })

            # Intent
            iid = str(uuid.uuid4())
            intents.append({
                "id": iid,
                "name": f"Intent_{fname.replace(' ', '')}",
                "func_id": fid,
                "sampleUtterance": func_info["intent"],
                "domain": category
            })

            # API
            api_id = str(uuid.uuid4())
            # Construct a realistic full URL
            base_url = f"https://api.{app_info['name'].lower().replace(' ', '')}.com"
            full_url = base_url + func_info["url"]
            
            apis.append({
                "id": api_id,
                "name": f"API_{fname.replace(' ', '_')}",
                "func_id": fid,
                "url": full_url,
                "method": random.choice(["GET", "POST"])
            })

write_csv("applications.csv", ["id", "name", "category", "status"], [[a['id'], a['name'], a['category'], a['status']] for a in apps])

write_csv("functions.csv", ["id", "app_id", "name", "description", "riskLevel"], [[f['id'], f['app_id'], f['name'], f['description'], f['riskLevel']] for f in functions])
write_csv("intents.csv", ["id", "func_id", "name", "sampleUtterance", "domain"], [[i['id'], i['func_id'], i['name'], i['sampleUtterance'], i['domain']] for i in intents])
write_csv("apis.csv", ["id", "func_id", "name", "url", "method"], [[a['id'], a['func_id'], a['name'], a['url'], a['method']] for a in apis])

# 4. Denormalized "Graph RAG Import" View
# Simulating a source file that might be used to teach the LLM/Importer
# Format: App, Category, Function, Description, Intent, API_Url
rag_rows = []
for f in functions:
    # Find related
    app = next(a for a in apps if a['id'] == f['app_id'])
    intent = next(i for i in intents if i['func_id'] == f['id'])
    api = next(a for a in apis if a['func_id'] == f['id'])
    
    rag_rows.append([
        app['name'],
        app['category'],
        f['name'],
        f['description'],
        intent['sampleUtterance'],
        api['url']
    ])

write_csv("master_import_source.csv", ["Application", "Category", "Function", "Description", "SampleUtterance", "API_Url"], rag_rows)

print("Done. Generated test data including a master import source file.")
