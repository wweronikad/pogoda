import requests
import json
import time

# Wczytaj lokalizacje stacji z pliku geojson
print("Loading station data from 'pollution_xy.geojson'...")
with open('app/public/localizations/pollution/pollution_xy.geojson', 'r', encoding='utf-8') as f:
    stations_data = json.load(f)
print("Station data loaded successfully.")

# Przygotuj listę cech, które uzupełnimy danymi z API
updated_features = []

# Przetwórz każdą stację
for station in stations_data['features']:
    station_id = station['properties']['id']
    print(f"Processing station ID: {station_id}")
    
    # Pobierz dane z API dla danej stacji
    try:
        print(f"Fetching data from API for station {station_id}...")
        response = requests.get(f'https://api.gios.gov.pl/pjp-api/rest/station/sensors/{station_id}')
        response.raise_for_status()  # Sprawdź, czy nie było błędów
        sensor_data = response.json()
        print(f"Data fetched successfully for station {station_id}.")
    except requests.RequestException as e:
        print(f"Error fetching data for station {station_id}: {e}")
        continue  # Pomija stację, dla której nie udało się pobrać danych
    
    # Dodaj dane sensorów do właściwości stacji
    print(f"Adding sensor data to station {station_id} properties.")
    station['properties']['sensors'] = sensor_data
    updated_features.append(station)
    
    # Dodaj opóźnienie, aby uniknąć zbyt szybkich zapytań
    print("Waiting for 0.5 seconds to avoid rapid requests.")
    time.sleep(0.5)

# Zapisz wyniki w nowym pliku geojson
output_data = {
    "type": "FeatureCollection",
    "features": updated_features
}

output_filename = 'app/public/localizations/pollution/pollution_sensors_with_localizations.geojson'
print(f"Saving results to '{output_filename}'...")
with open(output_filename, 'w', encoding='utf-8') as f:
    json.dump(output_data, f, indent=4, ensure_ascii=False)
print(f"Data successfully saved to '{output_filename}'.")
