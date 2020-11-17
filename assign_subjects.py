import os
import json
import random
from geopy.geocoders import Nominatim

def get_field_value(field):
    if 'computer' in field.lower() or 'programming' in field.lower():
        field = "Computer Engineering"
    elif 'information' in field.lower() or 'it' in field.lower():
        field = "Information Technology"
    elif 'elec' in field.lower():
        field = "Electrical Engineering"
    elif 'mech' in field.lower():
        field = "Mechanical Engineering"
    elif 'prod' in field.lower():
        field = "Production Engineering"
    elif 'civil' in field.lower():
        field = "Civil Engineering"
    elif 'textile' in field.lower():
        field = "Textile Engineering"
    else:
        field = None
    
    return field


input_dir = 'DATA/Faculty'
output_dir = 'DATA/Final_Faculty'
class_stats = {
    'Computer Engineering':0,
    'Information Technology':0,
    'Electrical Engineering':0,
    'Mechanical Engineering':0,
    'Production Engineering':0,
    'Civil Engineering':0,
    'Textile Engineering':0
}
if __name__ == "__main__":
    count = 0
    geolocator = Nominatim(user_agent="Your_Name")

    with open('subjects.json', "r") as read_it:
        subjects = json.load(read_it)

    with open('indian_cities.json', "r") as read_it:
        city = json.load(read_it)
    
    options = [subjects['sem1'], subjects['sem2']]
    fields = ['Computer Engineering', 'Information Technology', 'Electrical Engineering', 'Mechanical Engineering', 'Production Engineering', 'Civil Engineering', 'Textile Engineering']

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

        to_teach = []
        
        opt = random.randint(0, 3)
        if opt == 1:
            for sub in subjects["sem1"]:
                to_teach.append(sub['name'])
        elif opt == 2:
            for sub in subjects["sem2"]:
                to_teach.append(sub['name'])

        # ''' # Based on Field + Random
        field = None
        for edu in data['experiences']['education']:
            f = edu['field_of_study']
            if f:
                field = get_field_value(f)
            if field:
                break
        
        if not field:
            field = fields[count%7]

        class_stats[field] += 1
        # '''

        for s_id in range(3, 9):
            for sub in subjects["sem{}".format(s_id)][field]:
                if 'elective' not in sub['name']:
                    to_teach.append(sub['name'])

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
        data['field_of_teaching'] = field
        data['subjects_teaching'] = to_teach

        # add job location's address
        for i, job in enumerate(data['experiences']['jobs']):
            location = None
            while not location:
                address = random.choice(city)
                location = geolocator.geocode(address)
            data['experiences']['jobs'][i]['fake_address'] = location.address
            data['experiences']['jobs'][i]['latitude'] = location.latitude
            data['experiences']['jobs'][i]['longitude'] = location.longitude


        with open('{}/{}.json'.format(output_dir, filename_wo_ext), 'w') as fp:
            json.dump(data, fp, indent=4)

    print(class_stats)