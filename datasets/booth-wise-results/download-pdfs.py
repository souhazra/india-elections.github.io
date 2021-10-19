from pathlib import Path
import requests
import os
path="C:/Users/USER/Documents/wb assembly report 2021/wb-cpim.github.io/datasets/booth-wise-results/"
os.chdir(path)

files = {}
for i in range(1,295):
    files[i] = str(i)+"_Form20.pdf"

for k, v in files.items():
    filename = Path(v)
    url = 'http://ceowestbengal.nic.in/UploadFiles/AE2021/Form20/'+v
    response = requests.get(url)
    filename.write_bytes(response.content)
