import os
import json
import random
from geopy.geocoders import Nominatim

input_dir = 'DATA/AB_AUR_NAHI/Final_Faculty'
output_dir = 'DATA/Bas_Bhai/Faculty'

if __name__ == "__main__":
    count = 0
    geolocator = Nominatim(user_agent="Your_Name")
    with open('indian_cities.json', "r") as read_it:
        city = json.load(read_it)

    for profile in os.listdir(input_dir):
        
        # If not JSON file
        if not profile.endswith('.json'):
            continue

        filename_wo_ext = os.path.splitext(profile)[0]
        filepath = os.path.join(input_dir, profile)
        with open(filepath, 'r') as read_it:
            data = json.load(read_it)

        print("{:30s} - Count: {}".format(data['personal_info']['name'], count))
        count += 1

        '''
        # ADDRESS, LAT, LONG
        location = None
        while not location:
            address = random.choice(city)
            location = geolocator.geocode(address)
        
        # print(location.address)
        # print((location.latitude, location.longitude))

        data['fake_address'] = location.address
        data['latitude'] = location.latitude
        data['longitude'] = location.longitude
        '''

        # add job location's address
        for i, job in enumerate(data['experiences']['jobs']):
            location = None
            if job['company'] and 'veermata' in job['company'].lower() or 'vjti' in job['company'].lower():
                location = geolocator.geocode('Matunga')

            while not location:
                address = random.choice(city)
                location = geolocator.geocode(address)
            data['experiences']['jobs'][i]['fake_address'] = location.address
            data['experiences']['jobs'][i]['latitude'] = location.latitude
            data['experiences']['jobs'][i]['longitude'] = location.longitude


        # add institute location's address
        for i, edu in enumerate(data['experiences']['education']):
            location = None
            if edu['name'] and 'veermata' in edu['name'].lower() or 'vjti' in edu['name'].lower():
                location = geolocator.geocode('Matunga')

            while not location:
                address = random.choice(city)
                location = geolocator.geocode(address)
            data['experiences']['education'][i]['fake_address'] = location.address
            data['experiences']['education'][i]['latitude'] = location.latitude
            data['experiences']['education'][i]['longitude'] = location.longitude


        with open('{}/{}.json'.format(output_dir, filename_wo_ext), 'w') as fp:
            json.dump(data, fp, indent=4)