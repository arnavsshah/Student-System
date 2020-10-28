import pandas as pd
import os

input_csv = 'PROFILE_LINKS/profile_links.csv'
json_directory = 'DATA'
chars_to_replace = ['.', ' ', '-']

if __name__ == "__main__":
    csv_df = pd.read_csv(input_csv)

    for index, row in csv_df.iterrows():
        filename = row['Anchor Text']
        
        for char in chars_to_replace:
            filename = filename.replace(char, '')

        if not os.path.isfile('{}/{}.json'.format(json_directory, filename)):
            print("{:20s}.json does not exist".format(filename))