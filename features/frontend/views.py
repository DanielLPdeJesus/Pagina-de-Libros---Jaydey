from flask import Blueprint, redirect, render_template, session, url_for

app = Blueprint('main', __name__, url_prefix='/')

from flask import render_template, session

@app.route('/')
def index():
    if 'usuario' in session:
        return redirect('/homeuser')
    else:
        return render_template('/views/index.html')
    
@app.route('/login')
def login():
    return render_template('/auth/login.html')


@app.route('/register')
def register():
    return render_template('/auth/register.html')


@app.route('/contact')
def contact():
    return render_template('/views/contact.html')

@app.route('/formbook')
def formbook():
    if 'admin' in session:
        return render_template('/views/admin/formbook.html', admin=session['admin'])
    else:
        return redirect('login')

@app.route('/homeadmin')
def homeadmin():
    if 'admin' in session:
        return render_template('/views/admin/usersweb.html', admin=session['admin'])
    else:
        return redirect('/')


@app.route('/resetpass')
def resetpass():
    return render_template('/views/resetpass.html')


@app.route('/books')
def books():
    if 'usuario' not in session:
        return redirect('/login')
    return render_template('/views/books.html')


@app.route('/homeuser')
def homeuser():
    if 'usuario' in session:
        return render_template('/views/userhome.html')
    else:
        return redirect('/')
        


@app.route('/logout')
def cerrar_sesion():
    session.clear()
    return redirect('/login')

