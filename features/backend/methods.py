import pyrebase
from flask import Blueprint, request, session, redirect, render_template, flash
from firebase_admin import credentials

app = Blueprint('sesion', __name__, url_prefix='/sesion')




config = {
    "apiKey": "AIzaSyAUrSWt7t3kwGt0o95AmuZEtNGT48KOj5Q",
    "authDomain": "jaydeybd.firebaseapp.com",
    "databaseURL": "https://jaydeybd-default-rtdb.firebaseio.com",
    "projectId": "jaydeybd",
    "storageBucket": "jaydeybd.appspot.com",
    "messagingSenderId": "442545822718",
    "appId": "1:442545822718:web:dcb893c99bf8a45baabeaf"
}

firebase = pyrebase.initialize_app(config)
auth = firebase.auth()
db = firebase.database()

@app.route('/iniciar', methods=['GET', 'POST'])
def iniciar_sesion():
    if request.method == 'POST':
        email = request.form['email']
        password = request.form['password']

        try:
            user = auth.sign_in_with_email_and_password(email, password)
            user_info = auth.get_account_info(user['idToken'])

            # Verifica si el correo electrónico ha sido verificado
            if user_info['users'][0]['emailVerified']:
                session['usuario'] = email
                
                # Obtener el rol del usuario desde la base de datos
                user_data = db.child('users').child(user['localId']).get().val()
                if user_data.get('role') == 'admin':
                    session['admin'] = email
                    return redirect('/homeadmin') 
                else:
                    session['usuario'] = email
                    return redirect('/homeuser') 
            else:
                flash('¡Verifica tu correo electrónico antes de iniciar sesión!')
                print('verifica tu correo antes de iniciar sesion')
                return redirect('/login')
        except Exception as e:
            print(str(e))
            flash('Error durante el inicio de sesión. Por favor, verifica tus credenciales y vuelve a intentarlo.', 'danger')
            print('error durnate el inicio de sesion')
            return redirect('/login')

    return render_template('login.html')



@app.route('/register', methods=['POST'])
def register():
    name = request.form['name']
    username = request.form['username']
    email = request.form['email']
    password = request.form['password']
    number = request.form['number']

    try:
        user = auth.create_user_with_email_and_password(email, password)
        auth.send_email_verification(user['idToken'])
        datos = {
            "name": name,
            "username": username,
            "email": email,
            "number": number,
            'password': password,
            "role": "user" 
        }
        db.child('users').child(user['localId']).set(datos)
        flash('¡Registro exitoso! Se ha enviado un correo de verificación a tu dirección de correo electrónico.', 'success')
        print('Registro exitoso. Correo de verificación enviado.')
        return redirect('/login')
    except Exception as e:
        print(str(e))
        flash('Error durante el registro. Por favor, inténtalo de nuevo.', 'danger')
        print('error durante el registro')
        return redirect('/register')
    
    
@app.route('/recuperacion', methods=['GET', 'POST'])
def recuperacion():
    if request.method == 'POST':
        email = request.form['email']

        # Envía la solicitud de recuperación de contraseña a Firebase
        try:
            auth.send_password_reset_email(email)
            message = "Se ha enviado un enlace de restablecimiento de contraseña a tu correo electrónico."
        except Exception as e:
            message = "Verifica que has ingresado un correo electrónico válido."
        return render_template('/views/resetpass.html', message=message)
    else:
        return render_template('/views/resetpass.html', message=message)
            
            

@app.route('/contactbook', methods=['POST'])
def contactbook():
        nombre = request.form['nombre']
        correo = request.form['correo']
        asunto = request.form['asunto']
        mensaje = request.form['mensaje']

        # Almacena los datos en Firebase
        datos = {
            "nombre": nombre,
            "correo": correo,
            "asunto": asunto,
            "mensaje": mensaje
        }

        db.child('contac').push(datos)  

        return redirect('/contact') 
    
@app.route('/libros', methods=['POST'])
def libros():
        titulo = request.form['titulo']
        autor = request.form['autor']
        fecha = request.form['fecha']
        descarga = request.form['descarga']
        recomendacion = request.form['recomendacion']
        categoria = request.form['categoria']
        descripcion = request.form['descripcion'],
        file = request.form['file']

        datos = {
            "titulo": titulo,
            "autor": autor,
            "fecha": fecha,
            "descarga": descarga,
            "recomendacion": recomendacion,
            "categoria": categoria,
            "descripcion": descripcion,
            "file": file
            
        }

        db.child('books').push(datos)  

        return redirect('/homeadmin') 
    