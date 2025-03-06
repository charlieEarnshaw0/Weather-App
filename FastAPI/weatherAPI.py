#Accessing the weather API

import http.client
import json

try:
    from credentials import rapid_api_key
except ImportError:
    raise ImportError("Failed to import rapid_api_key from credentials. Please ensure the credentials.py file exists and contains the rapid_api_key variable.")

def getCurrentWeather(city): 
    try:
        #replace spaces with dashes
        city = city.replace(" ", "-")

        conn = http.client.HTTPSConnection("weatherapi-com.p.rapidapi.com")
        headers = {
            'x-rapidapi-key': rapid_api_key,
            'x-rapidapi-host': "weatherapi-com.p.rapidapi.com"
        }
        conn.request("GET", f"/current.json?q={city}", headers=headers)
        res = conn.getresponse()
        data = res.read()
        
        output = json.loads(data.decode("utf-8"))

        print(output)

        return output
    except Exception as e:
        output = {"error": str(e)}
        print("EXCEPTION: ", output)