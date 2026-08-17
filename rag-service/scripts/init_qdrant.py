# init_qdrant.py
# Qdrant Vector Database collection setup script

import os
from qdrant_client import QdrantClient
from qdrant_client.http.models import Distance, VectorParams

def init_db():
    host = os.environ.get("QDRANT_HOST", "localhost")
    port = int(os.environ.get("QDRANT_PORT", 6333))
    client = QdrantClient(host=host, port=port)
    
    collection_name = "finguard_knowledge"
    
    # 1536 is standard for openai text-embedding-3-small or text-embedding-ada-002
    vector_size = int(os.environ.get("VECTOR_SIZE", 1536))
    
    print(f"Connecting to Qdrant at {host}:{port}...")
    try:
        collections = client.get_collections().collections
        exists = any(c.name == collection_name for c in collections)
        
        if not exists:
            print(f"Creating collection '{collection_name}' with vector size {vector_size}...")
            client.create_collection(
                collection_name=collection_name,
                vectors_config=VectorParams(size=vector_size, distance=Distance.COSINE),
            )
            print("Collection created successfully.")
        else:
            print(f"Collection '{collection_name}' already exists.")
            
    except Exception as e:
        print(f"Error connecting to Qdrant or setting up collection: {e}")

if __name__ == "__main__":
    init_db()
