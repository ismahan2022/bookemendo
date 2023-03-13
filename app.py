from flask import Flask, request, redirect, render_template 
import psycopg2 

app = Flask(__name__) 
conn = psycopg2.connect( host="localhost", database="mydatabase", user="postgres", password="mysecretpassword" ) 

@app.route('/') 
def home(): 
    return render_template('home.html') 
    
@app.route('/login', methods=['GET', 'POST']) 
def login(): 
    if request.method == 'POST': 
        username = request.form['username'] 
        password = request.form['password'] 

        
        cursor = conn.cursor() 
        cursor.execute(f"SELECT * FROM users WHERE username='{username}' AND password='{password}'") 
        user = cursor.fetchone() 
        if user: 
            return redirect('/') 
        else: 
            return render_template('login.html', message="Login Failed")
    return render_template('login.html')

@app.route('/signup', methods=['GET', 'POST']) 
def signup(): 
    if request.method == 'POST': 
        username = request.form['username'] 
        password = request.form['password'] 

        
        cursor = conn.cursor() 
        cursor.execute(f"' INSERT INTO users (username, password) VALUES ('user1', 'pass1');'") 
        user = cursor.fetchone() 
        if user: 
            return redirect('/login') 
        else: 
            return render_template('signup.html', message="SignUp Failed")
    return render_template('signup.html')
@app.route('/welcome')
def welcome():
    return 'Welcome!'


if __name__ == '__main__':
    app.run()