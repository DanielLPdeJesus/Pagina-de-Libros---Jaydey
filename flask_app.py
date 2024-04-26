
from features.backend import methods
from features.frontend import views
from flask import Flask, render_template

app = Flask(__name__)
app.secret_key = 'secret'

app.register_blueprint(views.app)
app.register_blueprint(methods.app)


@app.errorhandler(404)
def page_not_found(error):
    return render_template('/views/fail.html', error_message="La página que buscas no se encuentra"), 404

if __name__ == "__main__":
  app.run(debug=True)