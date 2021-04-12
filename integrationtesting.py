from selenium import webdriver

def login_faculty(username,password):
    id_input=driver.find_element_by_xpath('//*[@id="root"]/div/div/div/div/div/div/div/form/div/div[2]/div/input')
    id_input.send_keys(username)
    account_type_select=driver.find_element_by_xpath('//*[@id="type"]')
    account_type_select.click()
    faculty_option=driver.find_element_by_xpath('//*[@id="menu-type"]/div[3]/ul/li[2]')
    faculty_option.click()
    password_input=driver.find_element_by_xpath('//*[@id="root"]/div/div/div/div/div/div/div/form/div/div[4]/div/input')
    password_input.send_keys(password)
    submit=driver.find_element_by_xpath('//*[@id="root"]/div/div/div/div/div/div/div/form/div/div[5]/button/span[1]')
    submit.click()

options = webdriver.ChromeOptions()
options.add_experimental_option('excludeSwitches', ['enable-logging'])
driver = webdriver.Chrome(options=options)

driver.get('http://localhost:3000/login')

#Now in login page
login_faculty('faculty1','1234567')

