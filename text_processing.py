import re
import string

from nltk import WordNetLemmatizer
from nltk.corpus import stopwords
from nltk.stem import PorterStemmer
from nltk.tag import pos_tag
from nltk.tokenize import word_tokenize

stop_words = set(stopwords.words('english'))
porter_stemmer = PorterStemmer()
_lemmatizer = WordNetLemmatizer()
punt_regex = re.compile('[%s]' % re.escape(string.punctuation))
multi_space_regex = re.compile(' +')

unwanted_characters: list = ['•']


def remove_stop_words(text: str) -> str:
    tokens = word_tokenize(text)
    return ' '.join([i for i in tokens if i not in stop_words])


def stemmer(text: str) -> str:
    words = word_tokenize(text)
    return ' '.join(porter_stemmer.stem(word) for word in words)


def lemmatizer(text: str) -> str:
    words = word_tokenize(text)
    return ' '.join(_lemmatizer.lemmatize(word) for word in words)


def extract_entities(sent) -> list:
    words: list = word_tokenize(sent)
    entities: list = pos_tag(words)
    return entities


def extract_tokens(sent) -> list:
    tokens: list = word_tokenize(sent)
    return tokens


def extract_chunks(sent) -> list:
    words: list = word_tokenize(sent)
    entities: list = pos_tag(words)
    return entities


def extract_pos(sent) -> list:
    words: list = word_tokenize(sent)
    _pos: list = pos_tag(words)
    return _pos


def remove_unicode(text: str) -> str:
    string_decode = text.encode("ascii", "ignore")
    return string_decode.decode()


def has_repeating_chars(token: str) -> bool:
    res = re.search(r'\w+', token)
    if res:
        token = res.group().lower()
        if any(token[i] == token[i - 1] and token[i] == token[i + 1]
               for i in range(1, len(token) - 1)):
            return True
    return False


def validate_word(word: str) -> bool:
    if len(word) <= 12:
        if not re.match(r'[^aeiouy]+$', word):
            if not has_repeating_chars(word):
                return True
    return False


def normalizer(text: str) -> str:
    # to lowercase
    text = text.lower()

    # remove digits
    # text = re.sub(r'\d +', '', text)

    # remove unicode
    text = remove_unicode(text)

    # remove punctuation
    text = punt_regex.sub('', text)

    # remove stop words
    # text = remove_stop_words(text)

    # validate word
    text = ' '.join([word for word in text.split() if validate_word(word)])

    # remove multiple spaces
    text = multi_space_regex.sub(' ', text)

    return text.strip()
