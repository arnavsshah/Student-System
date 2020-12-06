import os
import json
import random
import pandas as pd
from geopy.geocoders import Nominatim
import math

input_dir = 'DATA/Bas_Bhai/Students'
output_dir = 'DATA/Bas_Bhai/Students_with_books'

if __name__ == "__main__":
    count = 0
    geolocator = Nominatim(user_agent="Your_Name")
    with open('maharashtra_cities.json', "r") as read_it:
        city = json.load(read_it)

    book_dataframe = pd.read_csv('Books.txt', index_col='title')
    
    # Book Categories
    categories = book_dataframe.category.unique().tolist()
    
    categories_list = []    # splitting by #
    for cat in categories:
        temp = cat.split('&')
        
        if len(temp) > 1:
            temp[0] = temp[0][0:-1]
            temp[1] = temp[1][1:]

        categories_list.extend(temp)
    # print(categories_list)
    
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

        # Allocate books
        book_to_add = []
        num_of_cat_to_add = random.randint(2, 6)
        chosen_cat_list = [random.choice(categories_list) for i in range(num_of_cat_to_add)]

        for cat_chosen in chosen_cat_list:
            filtered_rows = book_dataframe[(book_dataframe['category'].str.contains(cat_chosen)) & (book_dataframe['count_taken'] < 10)]
            filtered_rows = filtered_rows.sort_values(by = 'count_taken', ascending=False)

            num_of_books_to_add = random.randint(5, 20)
            book_i = 0

            # for book_i in range(num_of_books_to_add):
            #     # row_selected = filtered_rows.sample()     # random row
            #     # row_selected = filtered_rows.iloc[book_i]   # most count_taken (not able to access title)
            for row_i, row_selected in filtered_rows.iterrows():
                b_title = row_i
                try:
                    if math.isnan(row_selected['author']):
                        b_author = "null"
                except:
                    b_author = row_selected['author']
                    
                b_category = row_selected['category'].split('&')
                if len(b_category) > 1:
                    b_category[0] = b_category[0][0:-1]
                    b_category[1] = b_category[1][1:]

                
                book_to_add.append({'title': b_title, 'author': b_author, 'category': b_category})

                book_dataframe.at[row_i, "count_taken"] += 1
                book_i += 1

                if book_i >= num_of_books_to_add:
                    break


        data["books_read"] = book_to_add

        # Arnav ko paani ka location nhi chahiye :)
        if random.randint(0, 1) == 0:
            address = "Mumbai"
        else:
            address = random.choice(city[1:])
        
        location = geolocator.geocode(address)
        data['fake_address'] = location.address
        data['latitude'] = location.latitude
        data['longitude'] = location.longitude


        with open('{}/{}.json'.format(output_dir, filename_wo_ext), 'w') as fp:
            json.dump(data, fp, indent=4)