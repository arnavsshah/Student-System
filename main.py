# https://github.com/austinoboyle/scrape-linkedin-selenium
import json
import time
import pandas as pd
from tqdm import tqdm
from selenium import webdriver
from scrape_linkedin import ProfileScraper

def get_chromedriver_path():
    with open("config.json", 'r') as cfg:
        content = json.load(cfg)
        return content["chromedriver_path"]

def get_credentials():
    with open("config.json", 'r') as cfg:
        content = json.load(cfg)
        email = content["email"]
        password = content["password"]
        li_at = content["LI_AT"]

    return email, password, li_at

output_directory = 'DATA'
input_csv = 'PROFILE_LINKS/profile_links.csv'
chars_to_replace = ['.', ' ', '-']
DEBUG = True

if __name__ == "__main__":
    email, password, li_at = get_credentials()

    csv_df = pd.read_csv(input_csv)
    # print(csv_df.at[114, 'Link'])   # prints ==> 1st link in csv file

    # with ProfileScraper(cookie=li_at) as scraper:
    #     for index, row in csv_df.iterrows():
    #         try:
    #             # print(row['Link'], row['Anchor Text'])

    #             # Store scraped data in DATA/filename.json
    #             filename = row['Anchor Text']
    #             for char in chars_to_replace:
    #                 filename = filename.replace(char, '')

    #             user_url = row['Link'].split('/')[-1]

    #             if DEBUG:
    #                 print("[{}] - user_url: {:30s} filename: {}".format(index, user_url, filename))

    #             profile = scraper.scrape(user=user_url)
                
    #             profile_dict = profile.to_dict()
    #             # print(profile_dict)

    #             with open('{}/{}.json'.format(output_directory, filename), 'w') as fp:
    #                 json.dump(profile_dict, fp, indent=4)
                
    #             # if index == 2:
    #             #     break

    #             time.sleep(3)

    #         except:
    #             continue

    '''
    From particular index
    '''
    
    offset = 581
    with ProfileScraper(cookie=li_at) as scraper:
        for index in range(len(csv_df)-offset):
            try:
                filename = csv_df.at[offset+index, 'Anchor Text']
                for char in chars_to_replace:
                    filename = filename.replace(char, '')

                user_url = csv_df.at[offset+index, 'Link'].split('/')[-1]

                if DEBUG:
                    print("[{}] - user_url: {:30s} filename: {}".format(index+offset, user_url, filename))

                profile = scraper.scrape(user=user_url)

                profile_dict = profile.to_dict()
                # print(profile_dict)

                with open('{}/{}_{}.json'.format(output_directory, index+offset, filename), 'w') as fp:
                    json.dump(profile_dict, fp, indent=4)

                # if index == 2:
                #     break

                time.sleep(3)
 

            except:
                continue