import json
import os

input_dir = 'DATA/Bas_Bhai/Students_with_books'
output_dir = 'DATA/Bas_Bhai/Students_with_books'

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

    books_read = data['books_read']
    
    for i, book in enumerate(books_read):
        new_category = []

        for cat in book['category']:
            temp = cat.split(', ')

            new_category.extend(temp)

        books_read[i]['category'] = new_category

    data['books_read'] = books_read

    with open('{}/{}.json'.format(output_dir, filename_wo_ext), 'w') as fp:
        json.dump(data, fp, indent=4)
