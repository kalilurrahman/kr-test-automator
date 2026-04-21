import re

with open("README.md", "r") as f:
    readme = f.read()

react_pages = [
    ("Home", "home"),
    ("Dashboard", "dashboard"),
    ("About", "about"),
    ("Feedback", "feedback"),
    ("Templates", "templates"),
    ("History", "history"),
    ("Collections", "collections"),
    ("Profile", "profile"),
    ("Compare", "compare"),
    ("Settings", "settings"),
    ("SAP", "sap_react"),
    ("Salesforce", "salesforce_react")
]

static_portals = [
    ("SAP Phase II", "sap_phii"),
    ("Salesforce", "salesforce_static"),
    ("Workday", "workday"),
    ("ServiceNow", "servicenow"),
    ("Veeva", "veeva"),
    ("Dynamics 365", "dynamics365"),
    ("Oracle Apps", "oracleapps"),
    ("API", "api"),
    ("iOS", "ios"),
    ("Android", "android"),
    ("AWS", "aws"),
    ("GCP", "gcp"),
    ("Azure", "azure"),
    ("WebApps", "webapps"),
    ("TopProducts", "topproducts")
]

def generate_section(items):
    out = ""
    for title, key in items:
        out += f"### {title}\n"
        # Desktop
        out += f"**Desktop**\n"
        out += f"![{title} Desktop Dark](docs/assets/screenshots/auto/{key}_desktop_dark_top.png)\n"
        out += f"![{title} Desktop Light](docs/assets/screenshots/auto/{key}_desktop_light_top.png)\n\n"

        # Mobile
        out += f"**Mobile**\n"
        out += f"![{title} Mobile Dark](docs/assets/screenshots/auto/{key}_mobile_dark_top.png)\n"
        out += f"![{title} Mobile Light](docs/assets/screenshots/auto/{key}_mobile_light_top.png)\n\n"

        # Scrolled Desktop
        out += f"**Scrolled Desktop**\n"
        out += f"![{title} Scrolled Desktop Dark](docs/assets/screenshots/auto/{key}_desktop_dark_scroll.png)\n"
        out += f"![{title} Scrolled Desktop Light](docs/assets/screenshots/auto/{key}_desktop_light_scroll.png)\n\n"

        # Scrolled Mobile
        out += f"**Scrolled Mobile**\n"
        out += f"![{title} Scrolled Mobile Dark](docs/assets/screenshots/auto/{key}_mobile_dark_scroll.png)\n"
        out += f"![{title} Scrolled Mobile Light](docs/assets/screenshots/auto/{key}_mobile_light_scroll.png)\n\n"
    return out

replacement = "## 📸 Comprehensive Screenshots Gallery\n\n### React Application Pages\n\n" + generate_section(react_pages) + "### Static HTML Portals\n\n" + generate_section(static_portals)

# Ensure GIF/Video at the top: the existing README already has:
# ![Showcase GIF](docs/assets/media/showcase.gif)
# [View Showcase Video](docs/assets/media/showcase.mp4)
# So we only need to replace the gallery section.

new_readme = re.sub(r"## 📸 Comprehensive Screenshots Gallery.*?(?=## 🌐 Enterprise Test Hub|$)", replacement, readme, flags=re.DOTALL)

with open("README.md", "w") as f:
    f.write(new_readme)
