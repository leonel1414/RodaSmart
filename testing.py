from selenium import webdriver
import time
import json
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.common.by import By


try:
    driver = webdriver.Chrome()
    driver.get("file:///D:/Practica/index.html")
    driver.maximize_window()
    print("Entramos")

except:
    print("Hola")
finally:
    print("Llegamos al final")