import pandas as pd
import joblib

from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import accuracy_score


# reading dataset

df = pd.read_csv("dataset/ai4i2020.csv")


# removing useless columns

df = df.drop(
    [
        "UDI",
        "Product ID",
        "Type"
    ],
    axis=1
)


# input columns

X = df.drop(
    [
        "Machine failure",
        "TWF",
        "HDF",
        "PWF",
        "OSF",
        "RNF"
    ],
    axis=1
)


# output column

y = df["Machine failure"]


# splitting data

X_train, X_test, y_train, y_test = train_test_split(
    X,
    y,
    test_size=0.2,
    random_state=42
)


# scaling

scaler = StandardScaler()

X_train = scaler.fit_transform(X_train)

X_test = scaler.transform(X_test)



# model

model = RandomForestClassifier(
    n_estimators=200,
    random_state=42
)


model.fit(
    X_train,
    y_train
)



# testing

prediction = model.predict(X_test)


accuracy = accuracy_score(
    y_test,
    prediction
)


print(
    "Accuracy:",
    accuracy
)



# saving files

joblib.dump(
    model,
    "model.pkl"
)


joblib.dump(
    scaler,
    "scaler.pkl"
)


print(
    "Training Completed Successfully"
)