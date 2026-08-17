import os

base_dir = r"C:\Users\vaish\.gemini\antigravity\scratch\finguard-ai"

services = [
    "gateway",
    "auth-service",
    "user-service",
    "fraud-service",
    "llm-service",
    "rag-service",
    "ocr-service",
    "recommendation-service",
    "analytics-service",
    "notification-service",
    "admin-service",
    "audit-service",
    "frontend",
    "terraform",
    "kubernetes",
    "docs",
    "research",
    "datasets",
    ".github/workflows"
]

for service in services:
    path = os.path.join(base_dir, service)
    os.makedirs(path, exist_ok=True)
    # Write a quick description file inside each
    readme_content = f"# {service.replace('-', ' ').title()}\n\nThis directory contains the code and configuration for the {service} component.\n"
    with open(os.path.join(path, "README.md"), "w", encoding="utf-8") as f:
        f.write(readme_content)

print("Folder structure created successfully.")
