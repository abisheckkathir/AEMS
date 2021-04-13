from selenium import webdriver
import time

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
time.sleep(10)
driver.get('http://localhost:3000/app/courses')
add_course=driver.find_element_by_xpath('//*[@id="root"]/div/div/div/div/div/div/div/div[1]/div[1]/button[1]')
add_course.click()
time.sleep(2)
course_code=driver.find_element_by_xpath('//*[@id="courseCode"]')
course_code.send_keys('555')
course_name=driver.find_element_by_xpath('//*[@id="courseName"]')
course_name.send_keys('Software Engineering')
course_submit=driver.find_element_by_xpath('/html/body/div[2]/div[3]/div/div[3]/button[2]')
course_submit.click()
time.sleep(5)
delete_checkbox=driver.find_element_by_xpath('//*[@id="root"]/div/div/div/div/div/div/div/div[2]/div/div/div[1]/div/div[2]/div[2]/div/div/div/div/div/div[5]/div[1]/span/span[1]/input')
delete_checkbox.click()
time.sleep(2)
delete_button=driver.find_element_by_xpath('//*[@id="root"]/div/div/div/div/div/div/div/div[1]/div[1]/button[2]')
delete_button.click()