import torch
import pandas as pd
from transformers import AutoTokenizer, AutoModel
from sentence_transformers import SentenceTransformer, util
import re
from fastapi.responses import JSONResponse
import nltk
from nltk.corpus import stopwords
from string import punctuation
from fastapi import FastAPI, File, UploadFile
from fastapi.responses import FileResponse
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List
import uvicorn
from glob_values import *
import csv
import codecs
from fastapi import Response
from fastapi.encoders import jsonable_encoder
import spacy
nltk.download('stopwords')

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=
    [
        "http://localhost:5173/",
        "http://127.0.0.1:5173/",
        "http://178.170.192.87:8000/",
        "http://localhost:5173",
        "http://127.0.0.1:5173",
        "http://178.170.192.87:8000",
        "http://178.170.192.87:3000",
        "http://178.170.192.87:3000/"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]

)

class Data(BaseModel):
    data: list

class Com(BaseModel):
    comment: str
    place: str
    problem: str
    executor: str
    theme_group: str

# model_themes = torch.load('./Models/my_model_gru_group_theme.bin')
# model_exe = torch.load('./Models/my_model_gru_exe.bin')
nlp_place = spacy.load('./Models/nlp_place')
nlp_prob = spacy.load('./Models/nlp_prob')

@app.post("/items/")
async def create_item(item: Data):
    res = {'data': dict()}
    for i in item.data:
        s = bad_patterns_to_tags_replaser(i)
        # print(1)
        v = processing(s).unsqueeze(0)
        # print(2)
        place = [k.text for k in nlp_place(i).ents]
        # print(3)
        place_c = [k.text for k in nlp_place(s).ents]
        # print(4)
        prob = [k.text for k in nlp_prob(i).ents]
        # print(5)
        prob_c = [k.text for k in nlp_prob(s).ents]
        # print(6)
        exe = exe_nums[torch.argmax(model_exe(v.to('cpu').double())[0]).item()]
        theme_group = theme_group_nums[torch.argmax(model_theme_group(v.to('cpu').double())[0]).item()]
        theme = themes_num[str(torch.argmax(model_theme(v.to('cpu').double())[0]).item())]
        res['data'][i] = {
                'place': place if place else place_c if place_c else [],
                'problem': prob if prob else prob_c if prob_c else [],
                'executor': exe,
                'theme_group': theme_group,
                'theme': theme
            }
    return res