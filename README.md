# Workit

## What is Workit?

Workit is a web application designed to connect job seekers with potential employers and streamline the recruitment process. It leverages the power of Django for a robust and secure backend and React for a dynamic and user-friendly frontend.

## Technology Stack:
- Django
- React
- Tailwind

## Installation:
1. **Clone the Repository:**
    ``` Bash

    git clone https://github.com/nasergamal/workit
    cd workit

    ```
2. **Set up the backend (Django)**
    - Navigate to the Backend directory 'server'
    - Create a virtual environment:
        ``` Bash

        pipenv shell

        ```

    - Install backend dependencies:
        ``` Bash

        pip install -r requirements.txt

        ```

    - Configure the application:
        - Set up your database connection in settings.py.
        - Configure your environment variables in a `.env` file.

    - Apply database migrations:
        ``` Bash

        python manage.py makemigrations
        python manage.py migrate

        ```
    - Create a superuser account:
        ```Bash

        python manage.py createsuperuser

        ```

3. **Set up the frontend (React)**
    - Navigate to the frontend directory 'client'
    - Install frontend dependencies:
        ```Bash

        npm Install

        ```
        - Start the development server
        ```Bash

        npm start

        ```

4. **Running the Application**
    - Start the Django development server:
        ```Bash

        python manage.py runserver
        
        ```
    - The frontend development server should already be running (step 3)
    - Access the application in your browser at `http://localhost:3000/`
