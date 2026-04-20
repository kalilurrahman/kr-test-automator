import json

def build_manifest(routes):
    return json.dumps({"routes": routes}, indent=2)
