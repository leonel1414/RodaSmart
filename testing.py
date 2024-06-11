from selenium import webdriver
import time
import json
import variables
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.common.by import By


try:
    driver = webdriver.Chrome()
    driver.get("http://127.0.0.1:5505/index.html")
    driver.maximize_window()
    time.sleep(5)

    btn_IniciarSesion = driver.find_element(By.CSS_SELECTOR,variables.iniciarSesion)
    
    time.sleep(2)
    
    btn_IniciarSesion.click()
    time.sleep(3)
    
    archivo = "datos.json"
    
    with open(archivo,'r') as mi_archivo:
        lector = json.load(mi_archivo)
        #print(lector)
        for renglon in lector :
            usuario = renglon['_nombre']
            apellido = renglon['_apellido']
            mail = renglon['_email']
            password = renglon['_password']
            confirmPassword = renglon['_confirmPassword']
            
            #print(usuario)
            time.sleep(2)
            
            txt_usuario = driver.find_element(By.CSS_SELECTOR,"#_nombre")
            txt_apellido = driver.find_element(By.CSS_SELECTOR,"#_apellido")
            txt_email = driver.find_element(By.CSS_SELECTOR,"#_email")
            txt_password = driver.find_element(By.CSS_SELECTOR,"#_password")
            txt_confirmPassword = driver.find_element(By.CSS_SELECTOR,"#_confirmPassword")
            #print("LLego aca", usuario)
            time.sleep(2)
            
            txt_usuario.send_keys(usuario)
            txt_apellido.send_keys(apellido)
            txt_email.send_keys(mail)
            txt_password.send_keys(password)
            txt_confirmPassword.send_keys(confirmPassword)
            
            time.sleep(2)
            registrar = driver.find_element(By.CSS_SELECTOR,variables.registrarse)
            registrar.click()
            
            time.sleep(3)    
            
            ok = driver.find_element(By.CSS_SELECTOR,variables.ok)
            time.sleep(5)
            ok.click()
            
            
            ##Ingresar al login
            
            email = renglon['_email']
            pas = renglon['_password']
            
            time.sleep(2)
            
            sesion_email = driver.find_element(By.ID,"email")
            sesion_pass = driver.find_element(By.ID,"password")
            
            sesion_email.send_keys(email)
            sesion_pass.send_keys(pas)
            
            time.sleep(2)
            
            login = driver.find_element(By.CSS_SELECTOR,variables.btn_iniciarSesion)
            login.click()
            
            time.sleep(3)
    
    print("Iniciamos Sesion en el Login")
    driver.quit()
except:
    print("Error al Ingresar datos")
    driver.quit()
finally:
    print("Llegamos al final")
    driver.quit()