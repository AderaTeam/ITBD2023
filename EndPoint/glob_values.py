import re
import nltk
from nltk.corpus import stopwords
from string import punctuation
import torch
from transformers import AutoTokenizer, AutoModel
import json


rus_stop_words = stopwords.words("russian")
symbols = list(punctuation) + ['\t', '\n', '\r',
                               '№', '#', '@', '^', '%', '*', '»', '«', '×', 'ń', '√', 'а́']
emojy = [
    '\xeb',
    '\ufffc',
    '\xbf',
    '\u2011',
    '\u200b',
    '\u203c'
]

emoj = re.compile('['
                  u'\U0001F600-\U0001F64F'
                  u'\U0001F300-\U0001F5FF'
                  u'\U0001F680-\U0001F6FF'
                  u'\U0001F1E0-\U0001F1FF'
                  u'\U00002500-\U00002BEF'
                  u'\U00002702-\U000027B0'
                  u'\U000024C2-\U0001F251'
                  u'\U0001f926-\U0001f937'
                  u'\U00010000-\U0010ffff'
                  u'\u2640-\u2642'
                  u'\u2600-\u2B55'
                  u'\u200d'
                  u'\u23cf'
                  u'\u23e9'
                  u'\u231a'
                  u'\ufe0f'
                  u'\u3030'
                  ']', re.UNICODE)


def bad_patterns_to_tags_replaser(text: str):
    text = re.sub(r'[\n\.\,\?\(\)\[\]\'\"\*\{\}\|\\\$\^\&\!\<\>\:\;«»-]', ' ', text)
    text = re.sub(r'\w+@\w?mail', ' ', text)
    text = re.sub(r'\w+@\w?mail.\w+', ' ', text)
    text = re.sub(r'\d+\:\d+\:\d+', ' ', text)
    text = re.sub(r'\d+\:\d+', ' ', text)
    text = re.sub(r'\+{,1}\d{1,3}\({,1}[\-\s]{,1}\d{3}\){,1}[\-\s]{,1}\d{3}[\-\s]{,1}\d{2}[\-\s]{,1}\d{2}', ' ', text)
    text = re.sub('\d+/\d+/\d+', ' ', text)
    text = re.sub('\d+-\d+-\d+', ' ', text)
    text = re.sub('\d+th', ' ', text)
    text = re.sub('\d+rd', ' ', text)
    text = re.sub('\d+st', ' ', text)
    text = re.sub('[\+\-]?\d+.\d+', ' ', text)
    text = re.sub('[\+\-]?\d+,\d+', ' ', text)
    text = re.sub('\d+', ' ', text)
    # text = re.sub(r'\w+\.', '<SHORT>', text[0:-1]) + '.'
    for i in emojy:
        text = text.replace(i, ' ')
    text = re.sub(emoj, ' ', text)
    text = re.sub(r'\s+', ' ', text)
    return text

exe_classes = {'АО ПРО ТКО': 0,
 'Александровский муниципальный округ Пермского края': 1,
 'Бардымский муниципальный округ Пермского края': 2,
 'Город Пермь': 3,
 'Губахинский городской округ': 4,
 'ИГЖН ПК': 5,
 'Лысьвенский городской округ': 6,
 'Министерство здравоохранения': 7,
 'Министерство образования': 8,
 'Министерство социального развития ПК': 9}

theme_classes = {'Безопасность': 0,
 'Благоустройство': 1,
 'Дороги': 2,
 'ЖКХ': 3,
 'Здравоохранение/Медицина': 4,
 'Коронавирус': 5,
 'Мусор/Свалки/ТКО': 6,
 'Образование': 7,
 'Общественный транспорт': 8,
 'Социальное обслуживание и защита': 9}

exe_nums = {exe_classes[i]: i for i in exe_classes}
theme_group_nums = {theme_classes[i]: i for i in theme_classes}
with open('./t.json', 'r') as f:
    themes_num = json.load(f)

tokenizer = AutoTokenizer.from_pretrained("sentence-transformers/all-MiniLM-L6-v2")
sentence_vectorizer = AutoModel.from_pretrained("sentence-transformers/all-MiniLM-L6-v2")

def mean_pooling(model_output, attention_mask):
    token_embeddings = model_output[0]
    k = torch.cat([token_embeddings, torch.zeros(token_embeddings.shape[0], 128 - token_embeddings.shape[1], token_embeddings.shape[2])], 1)
    return k

def processing(pair):
    with torch.no_grad():
        e = tokenizer(pair[0], padding=True, truncation=True, max_length=128, return_tensors='pt')
        k = sentence_vectorizer(**e)
    return mean_pooling(k, e['attention_mask'])[0]


class RecGRUExample(torch.nn.Module):
    def __init__(
        self,
        size_of_sample: int,
        num_of_samples: int,
        output_size_of_input_layer: int,
        output_layer_size: int,
        alpha: float = 5
    ):
        
        super(RecGRUExample, self).__init__()
        self.alpha = alpha
        self.input_size_of_input_layer = size_of_sample
        self.output_size_of_input_layer = output_size_of_input_layer
        self.num_layers_of_input_layer = int(num_of_samples / (alpha * (self.input_size_of_input_layer + self.output_size_of_input_layer)))+1
        self.output_layer_size = output_layer_size
        self.num_of_samples = num_of_samples

        self.input_layer = torch.nn.GRU(
            input_size=self.input_size_of_input_layer,
            hidden_size=self.output_size_of_input_layer,
            num_layers=self.num_layers_of_input_layer,
            # bidirectional = True
        )
        self.output_layer = torch.nn.Conv1d(
            self.num_of_samples,
            self.output_layer_size,
            self.output_size_of_input_layer,
        )

        self.input_activation = torch.nn.Tanh()
        self.h1 = torch.zeros(self.num_layers_of_input_layer, self.num_of_samples, self.output_size_of_input_layer).double().to('cuda')

    def forward(self, x):
        y, h_r = self.input_layer(x, self.h1)
        # print(y.shape)
        y = self.input_activation(y)
        y = self.output_layer(y)
        return y.view(y.shape[0], y.shape[1])



# model_exe2 = torch.load('./Models/my_model_gru_exe22222.pt')
model_exe = model_GRU = RecGRUExample(
    size_of_sample=384,
    num_of_samples=128,
    output_size_of_input_layer=50,
    output_layer_size=10,
    alpha=0.07
).double().to('cuda')
model_exe.load_state_dict(torch.load('./Models/my_model_gru_exe22222.pt'), strict=False)
model_exe.eval()
model_theme_group = model_GRU = RecGRUExample(
    size_of_sample=384,
    num_of_samples=128,
    output_size_of_input_layer=50,
    output_layer_size=10,
    alpha=0.07
).double().to('cuda')
model_theme_group.load_state_dict(torch.load('./Models/my_model_gru_group_theme22222.pt'), strict=False)
model_theme_group.eval()

model_theme = model_GRU = RecGRUExample(
    size_of_sample=384,
    num_of_samples=128,
    output_size_of_input_layer=50,
    output_layer_size=195,
    alpha=0.07
).double().to('cuda')
# model_exe.load_state_dict(torch.load('./Models/my_model_gru_exe.bin'))
# model_exe.eval()