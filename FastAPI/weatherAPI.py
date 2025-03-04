#Accessing the weather API

import http.client
import json

try:
    from credentials import rapid_api_key
except ImportError:
    raise ImportError("Failed to import rapid_api_key from credentials. Please ensure the credentials.py file exists and contains the rapid_api_key variable.")

def getCurrentWeather(city): 
    try:
        conn = http.client.HTTPSConnection("weatherapi-com.p.rapidapi.com")
        headers = {
            'x-rapidapi-key': rapid_api_key,
            'x-rapidapi-host': "weatherapi-com.p.rapidapi.com"
        }
        conn.request("GET", f"/current.json?q={city}", headers=headers)
        res = conn.getresponse()
        data = res.read()
        
        if res.status != 200:
            raise Exception(f"API call failed with status code {res.status}: {data.decode('utf-8')}")
        
        output = json.loads(data.decode("utf-8"))

        return output
    except Exception as e:
        output = {"error": str(e)}