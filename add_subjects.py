import os
import json
import random

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

def get_sem_value(end_date):
    if end_date <= 2020:
        sem_value = 8
    elif end_date == 2021:
        sem_value = 7
    elif end_date == 2022:
        sem_value = 5
    elif end_date == 2023:
        sem_value = 3
    elif end_date == 2024:
        sem_value = 1
    else:
        sem_value = None

    return sem_value

input_dir = 'DATA/Students'
output_dir = 'DATA/New_Students'

degree_acceptable = ['btech', 'b.tech', 'bach', 'b tech']

with open('subjects.json', "r") as read_it:
    subjects = json.load(read_it)


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

        bachelor_flag = False
        currently_studying = False
        completed_college_courses = dict()
        current_courses = dict()
        for edu in data['experiences']['education']:
            if 'veermata' not in edu['name'].lower():
                continue

            if not (edu['degree'] and edu['field_of_study'] and edu['date_range']):
                print("[INFO] {} - Not enough Educational details\n".format(data['personal_info']['name']))
                break

            date_range = edu['date_range']
            date_range.replace(' ', '')
            start_date, end_date = date_range.split('\u2013')
            start_date, end_date = int(start_date), int(end_date)

            # Degree bachelors
            if any(sub in edu['degree'].lower() for sub in degree_acceptable):
                field = edu['field_of_study']
                if not field:
                    continue

                bachelor_flag = True
                field = get_field_value(field)
                sem_value = get_sem_value(end_date)
                if not (field and sem_value):
                    print("[INFO]No field/sem_value \n")
                    continue

                for sem_id in range(1, sem_value+1):
                    if sem_id == sem_value:
                        if (1 <= sem_id <= 2):
                            current_courses["sem{}".format(sem_id)] = subjects["sem{}".format(sem_id)]
                        else:
                            sem_sub = subjects["sem{}".format(sem_id)][field]
                            if sem_id == 6:
                                for i,s in enumerate(sem_sub):
                                    if 'elective' in s['name'].lower():
                                        topic = random.choice(sem_sub[s]['topics'])
                                        sem_sub[i] = {'name':topic, 'credits':s['credits'] }
                                        break

                            current_courses["sem{}".format(sem_id)] = sem_sub

                    else:
                        if (1 <= sem_id <= 2):
                            completed_college_courses["sem{}".format(sem_id)] = subjects["sem{}".format(sem_id)]
                        else:
                            sem_sub = subjects["sem{}".format(sem_id)][field]
                            if sem_id == 6:
                                for i,s in enumerate(sem_sub):
                                    if 'elective' in s['name'].lower():
                                        topic = random.choice(s['topics'])
                                        sem_sub[i] = {'name':topic, 'credits':s['credits'] }
                                        break

                            completed_college_courses["sem{}".format(sem_id)] = sem_sub
            
            if end_date > 2020:
                currently_studying = True

        data['currently_studying'] = currently_studying
        data['completed_college_courses'] = completed_college_courses
        data['current_courses'] = current_courses

        if bachelor_flag:
            out_path = os.path.join(output_dir, "Bachelors")
            if not os.path.isdir(out_path):
                os.mkdir(out_path)
            with open('{}/{}.json'.format(out_path, filename_wo_ext), 'w') as fp:
                json.dump(data, fp, indent=4)

        else:
            with open('{}/{}.json'.format(output_dir, filename_wo_ext), 'w') as fp:
                json.dump(data, fp, indent=4)


            