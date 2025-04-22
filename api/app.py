from flask import Flask, jsonify, request
from flask_cors import CORS
import json

app = Flask(__name__)
CORS(app)

LISTINGS_FILE = 'listings.json'

def load_listings():
    with open(LISTINGS_FILE, 'r') as f:
        return json.load(f)

def save_listings(data):
    with open(LISTINGS_FILE, 'w') as f:
        json.dump(data, f, indent=2)

@app.route('/api/listings', methods=['GET'])
def get_listings():
    listings = load_listings()
    return jsonify(listings)

@app.route('/api/listings/<int:listing_id>/status', methods=['POST'])
def update_status(listing_id):
    listings = load_listings()
    listing = next((l for l in listings if l['id'] == listing_id), None)
    if not listing:
        return jsonify({'error': 'Not found'}), 404

    new_status = request.json.get('status')
    listing['status'] = new_status
    save_listings(listings)
    return jsonify(listing)

if __name__ == '__main__':
    app.run(port=5000)