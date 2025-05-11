# DiseaseDetector
This is a submission for IPCC project for MVJ22CS61 and MVJ22CS62

# IMPORTANT NOTICE. PLEASE READ

health risk predictor 
*1. ui stuff (what’s done rn)*
- made with nextjs + tailwind (dark theme)
- theme uses css vars under /app/globals.css
- uses theme-provider comp in /components/theme-provider.tsx
- home page has a button that links to /general-info
- everything styled w tailwind + hsl vars from tailwind.config.ts
- all buttons use shadcn/ui comps
- minimal, mobile responsive, centered layout
- default font is inter from google fonts
- no motion or animation yet except some shadow

*2. models (what works, whats left)*
heart disease
~done, works fine~
- use /general-info → then enter form
- form sends attrs to backend like:
1.age
2.sex
3.chest pain type (cp)
4.resting bp
5.cholesterol
6.fasting blood sugar
7.resting ecg
8.max hr
9.exercise angina\
10.oldpeak
11.slope
12.ca
13.thal

make sure these exact keys are expected in the backend model (or api input)

diabetes (not done rn)
- make a sklearn or keras model
- attrs u need to use (already in form):

1.pregnancies
2.glucose
3/bp
4.skinthickness
5.insulin
6.bmi
7.diabetes pedigree fn
8.age

- dump the model using joblib or pickle
-should load on backend same way as heart one
-name the route like /predict-diabetes

*3. flask api stuff*
-backend uses flask, need to make sure version is 2.3.2 (or below), higher breaks routing
-use python 3.10 (anything higher can break deps)
-install reqs using pip install -r requirements.txt
-backend folder structure:

/models → keep .pkl or .joblib files

/routes → define each model’s route (predict_heart.py, predict_diabetes.py)

/main.py → flask app starter

-make sure cors is enabled for local dev

*4. linking frontend to backend*
- all forms post to backend using fetch
- you need to add correct url in fetch like:

-less
-Copy
-Edit
-fetch("http://localhost:5000/predict-heart", { ... })

- make sure both front and backend running for it to work
- handle .json() properly in frontend (already handled rn)
- results get displayed in a toast or below form (depends on route logic)

- already that forms.html and results.html is there in /src/resources/templates, that is not there (not being used), so change endpoints accordingly so /ui is called.




*everything needed is in this readme. only ping me if you want to change ui components or design, not for backend/api/model bugs. no requirements.txt included. if you're working on the backend side, you should know what dependencies you need by checking code, figuring out the imports, and building your own reqs file. look at the imports in the flask api and the models. you’ll get a good idea. if you're stuck, pls feel free to google, youtube, or chatgpt.*
