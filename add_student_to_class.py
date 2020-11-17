import os
import json
import random
import math

def get_field_value(field):
    if 'comp' in field.lower() or 'programming' in field.lower():
        field = "Computer Engineering"
    elif 'information' in field.lower() or 'it' in field.lower():
        field = "Information Technology"
    elif 'elec' in field.lower() or 'extc' in field.lower():
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

input_dir = 'DATA/AB_AUR_NAHI/Final_Students'
output_dir = 'DATA/FinalStudentsWithClass'
batches = ['FY', 'SY', 'TY', 'FINAL_Y']
class_stats = {
    'Computer Engineering':{'FY':0, 'SY':0, 'TY':0, 'FINAL_Y':0},
    'Information Technology':{'FY':0, 'SY':0, 'TY':0, 'FINAL_Y':0},
    'Electrical Engineering':{'FY':0, 'SY':0, 'TY':0, 'FINAL_Y':0},
    'Mechanical Engineering':{'FY':0, 'SY':0, 'TY':0, 'FINAL_Y':0},
    'Production Engineering':{'FY':0, 'SY':0, 'TY':0, 'FINAL_Y':0},
    'Civil Engineering':{'FY':0, 'SY':0, 'TY':0, 'FINAL_Y':0},
    'Textile Engineering':{'FY':0, 'SY':0, 'TY':0, 'FINAL_Y':0}
}
if __name__ == "__main__":
    count = 0
    
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

        if data["currently_studying"]:
            completed_sem = len(data["completed_college_courses"])
            batch = batches[math.floor(completed_sem/2)]
            
            field = ''
            for edu in data['experiences']['education']:
                if ('veermata' not in edu['name'].lower()) and ('vjti' not in edu['name'].lower()):
                    continue

                field = edu['field_of_study']
                break

            field = get_field_value(field)

            if not field:
                print("NO FIELD")
                with open('{}/{}.json'.format(output_dir, filename_wo_ext), 'w') as fp:
                    json.dump(data, fp, indent=4)
                continue

            class_name = '{}-{}'.format(batch, field)

            # for statistics
            class_stats[field][batch] += 1

            data['class_name'] = class_name

        with open('{}/{}.json'.format(output_dir, filename_wo_ext), 'w') as fp:
            json.dump(data, fp, indent=4)

    print(class_stats)