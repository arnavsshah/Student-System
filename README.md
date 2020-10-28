# Scraping Students Profile from Linkedin

**Requirements**: _python3, pip_

* ```
  git clone https://github.com/CaptainArnav/Student-System.git
  cd Student-System/
  git checkout scraping-linkedin
  pip install -r requirements.txt #NotTested
  ```
  
* Make a `PROFILE_LINKS/profile_links.csv` file containing columns - `Link` and `Anchor Text`
  * Can use [Link Klipper](https://chrome.google.com/webstore/detail/link-klipper-extract-all/fahollcgofmpnehocdgofnhkkchiekoo?hl=en) extension for getting links from search section of linkedin
  * Use regex - `https://www.linkedin.com/in/[a-z][-a-zA-Z0-9]*`
  
* Make `config.json`
  * ```
    {
        "chromedriver_path":"/path/to/chromedriver/if/neccessary",
        "email":"user@gmail.com",
        "password":"password",
        "LI_AT":""
    }
    ```
  * Can keep `chromedriver_path` as blank
  * Enter you linkedin account's `email` and `password`
  * For `LI_AT` - 
    * login to linkedin on chrome
    * Right click and Select `Inspect`
    * Go to Applications tab
    * Select `Cookies` from left hand side panel
    * Copy and paste the `li_at` field
    
* Make a empty directory named `DATA`

* Change [offset](https://github.com/CaptainArnav/Student-System/blob/93b858e87210192f210dfa733139ee8765d7d560/main.py#L69) variable in `main.py` denoting the row number in csv to start from

* ```
  python main.py
  ```
  
* At the end scraped profiles will be stored inside `DATA/` in json format
