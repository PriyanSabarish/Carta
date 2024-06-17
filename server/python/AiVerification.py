from sentence_transformers import SentenceTransformer
from sklearn.metrics.pairwise import cosine_similarity
import json
import sys
model_name = "all-MiniLM-L6-v2"
sentence_transformer = SentenceTransformer(model_name)



def calculate_similarity(userInput, existing_abstracts):
  # Encode the parameter abstracts
  new_abstract_encoding = sentence_transformer.encode(userInput, convert_to_tensor=True)
  encoded_abstracts = sentence_transformer.encode(existing_abstracts, convert_to_tensor=True)

  # Calculate cosine similarities 
  similarities = cosine_similarity(new_abstract_encoding.reshape(1, -1), encoded_abstracts)[0]

  similarity_threshold = 0.6
  similarity_scores = {int(i): score.item() for i, score in enumerate(similarities) if score.item() > similarity_threshold}

  return similarity_scores


if len(sys.argv) < 3:
  sys.exit(1)

userInput = sys.argv[1]
existing_abstracts = sys.argv[2:]  
similarity_scores = calculate_similarity(userInput,existing_abstracts)


print(json.dumps(similarity_scores))