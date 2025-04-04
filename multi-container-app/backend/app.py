from flask import Flask, jsonify

app = Flask(__name__)

@app.route('/home')
def home():
    return jsonify(message="Home Page")

@app.route('/hello')
def hello():
    return jsonify(message="Hello from Backend!")

@app.route('/goodbye')
def goodbye():
    return jsonify(message="Goodbye from backend.")

@app.route('/first')
def first():
    return jsonify(
        headerMessage="This is the first page using the template.html file.",
        bodyMessage="This is a page"
        )

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)

