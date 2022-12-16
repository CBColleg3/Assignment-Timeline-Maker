import os
from flask import Flask, request, jsonify, render_template

# from api.utils import simplify_text

REACT_APP_PATH = "templates"

app = Flask(
    __name__,
    static_url_path="/",
    static_folder=REACT_APP_PATH,
    template_folder=REACT_APP_PATH,
)


@app.route("/")
def index():
    return render_template("index.html")


@app.route("/api/info", methods=["POST"])
def info_type():
    if request.method != "POST":
        return jsonify({})
    if not request.is_json:
        print("INFO CALL NOT JSON")
        return jsonify({"body": "NOTHING"})
    data = request.get_json()
    result = format_response(data["type"])
    print("INFO SUCCESSFULLY RAN:", result)
    return jsonify({"body": result})


@app.route("/api/simplify", methods=["POST"])
def simplify():
    if request.method != "POST":
        return jsonify({})
    if not request.is_json:
        print("INFO CALL NOT JSON")
        return jsonify({"body": ["NOTHING"]})
    data = request.get_json()["text"]

    # converted = simplify_text(data)
    converted = [f"CONVERSION OF: [ {i} ]" for i in data]

    print("SIMPLIFY SUCCESSFULLY RAN:", converted)
    return jsonify({"body": converted})


if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5000))
    app.run(debug=True, host="0.0.0.0", port=port)
