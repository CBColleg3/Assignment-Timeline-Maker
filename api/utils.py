from muss.simplify import ALLOWED_MODEL_NAMES, simplify_sentences
from muss.utils.helpers import read_lines
from typing import List

def simplify_text(text: str, model_name:str='muss_en_wikilarge_mined') -> List[str]:
    text = text.strip()
    sentences = text.split("\n")
    pred_sentences = simplify_sentences(sentences, model_name)

    return pred_sentences

if __name__ == "__main__":
    result = simplify_text("Have I already been in this cave?")
    print(result)