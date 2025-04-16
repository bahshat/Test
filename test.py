from flask import Flask, jsonify, request

app = Flask(__name__)

# Mock data
suites = [
    {"id": 1, "name": "Suite A"},
    {"id": 2, "name": "Suite B"},
]

tests = {
    1: [
        {"id": 101, "name": "Test A1"},
        {"id": 102, "name": "Test A2"},
    ],
    2: [
        {"id": 201, "name": "Test B1"},
        {"id": 202, "name": "Test B2"},
    ]
}

@app.route('/suites')
def get_suites():
    return jsonify(suites)

@app.route('/tests/<int:suite_id>')
def get_tests(suite_id):
    return jsonify(tests.get(suite_id, []))

@app.route('/execute', methods=['POST'])
def execute_tests():
    test_ids = request.json.get("test_ids", [])
    return jsonify({"status": "execution started", "tests": test_ids})

if __name__ == '__main__':
    app.run(debug=True)