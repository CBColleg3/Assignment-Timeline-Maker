from flask import Flask, request, jsonify, render_template
# from flask_cors import CORS #comment this on deployment
import os
from api.utils import simplify_text

REACT_APP_PATH = "templates"

app = Flask(__name__, static_url_path='/', static_folder=REACT_APP_PATH, template_folder=REACT_APP_PATH)

@app.route("/")
def index():
    return render_template('index.html')

@app.route("/api/info", methods=['POST'])
def info_type():
    if request.method != 'POST':
        return jsonify({})
    data = request.json
    return jsonify(body=format_response(data['type']))

@app.route("/api/simplify", methods=['POST'])
def simplify():
    if request.method != 'POST':
        return jsonify({})
    data = request.json
    return jsonify(body=simplify_text(data['text']))

if __name__ == "__main__":
    port = int(os.environ.get('PORT', 5000))
    app.run(debug=True, host='0.0.0.0', port=port)