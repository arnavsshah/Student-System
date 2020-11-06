import os
import shutil
import json

json_directory = 'DATA'
output_directory = 'DATA/Faculty'
MATCH = ['prof', 'lecturer', 'director', 'head', 'teach', 'faculty']

if __name__ == "__main__":
    
    for profile in sorted(os.listdir(json_directory)):
        
        # If not JSON file
        if not profile.endswith('.json'):
            continue

        filepath = os.path.join(json_directory, profile)
        with open(filepath, "r") as read_it:
            data = json.load(read_it)

            # print(data['experiences']['jobs'])
            for job in data['experiences']['jobs']:
                if ('veermata' in job['company'].lower()) and any(sub in job['title'].lower() for sub in MATCH):
                    
                    out = os.path.join(output_directory, profile)

                    shutil.move(filepath, out)
