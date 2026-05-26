import gdown
import os

# models folder automatically create hoga
os.makedirs("models", exist_ok=True)

# Google Drive FILE_ID : save path
files = {
    "1k2t4zNcP_PzJtq8zzHiSnJ4LOrcvneli": "models/diabetes_binary_health_indicators_BRFSS2015.csv",
    "1s2bpLyzVNZzTzbvy3GzXvCa-xkwob1a5": "models/diabetes_model1.pkl",
    "1FCksEcTy2GiGKYZ1leWIoiwDYyl56fsT": "models/general_model.pkl",
    "1ZBgvzM-8TdsMiHEjxgXkDXuDko6jocRb": "models/heart_2022_no_nans.csv",
    "1s2bpLyzVNZzTzbvy3GzXvCa-xkwob1a5": "models/heart_model1.pkl",

    "1nHweV7gQAodZzU8JBNwql8ajnHVGxLpi": "models/kidney_disease.csv",
    "1yAlCd-yWWrMjnmV43tWi59dqFARQkpzs": "models/kidney_imputer.pkl",
    "1dCeFJRJ5YNuX4nvTJ_eWDkF0FnSrksgq": "models/kidney_model.pkl",

    "1SlDSg2tJJZl1xw2EIAGBQ1AUMcRFqcoV": "models/tfidf_vectorizer.pkl",
    "17K_K282k5uERLhxMaNrufNRsKUhwPLmx": "models/recommen.csv",
}

# download all files
for file_id, output in files.items():
    url = f"https://drive.google.com/uc?id={file_id}"

    print(f"Downloading {output}...")

    gdown.download(
        url,
        output,
        quiet=False
    )

print("All files downloaded successfully.")
