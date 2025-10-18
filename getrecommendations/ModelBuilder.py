import joblib

from Encoder import *
import pickle

if __name__ == "__main__":
    # ---------------------------------------------------------------------------
    # EXAMPLE PIPELINE
    # ---------------------------------------------------------------------------

    # Define schema for the survey
    # -----------------------------
    # Updated survey schema
    # -----------------------------
    survey_schema = {
        "q1": {"type": "multi_categorical"},  # Enjoyed subjects
        "q2": {"type": "categorical"},  # Structured vs open-ended
        "q3": {"type": "categorical"},  # Day preference
        "q4": {"type": "multi_categorical"},  # Statement feels like you (pick 2)
        "q5": {"type": "categorical"},  # Motivation
        "q6": {"type": "categorical"},  # Career priority
        "q7": {"type": "ordinal", "order": ["Avoid it", "Neutral", "Comfortable", "Love it"]},  # Math-heavy
        "q8": {"type": "ordinal", "order": ["Avoid it", "Neutral", "Comfortable", "Love it"]},  # People-focused
        "q9": {"type": "categorical"},  # Work setting
        "q10": {"type": "ordinal", "order": ["Not important", "Somewhat", "Yes"]},  # Societal impact
        "q11": {"type": "multi_categorical"}  # Coursework to avoid
    }

    # -----------------------------
    # Sample dataset (dummy)
    # -----------------------------
    sample_data = [
        {
            "q1": ["Math", "Computer Science", "Physics"],
            "q2": "Structured",
            "q3": "Solving logic puzzles or programming challenges",
            "q4": ["I like understanding how systems work", "I like analyzing and organizing information"],
            "q5": "Mastering complex problems",
            "q6": "Intellectual challenge",
            "q7": "Love it",
            "q8": "Comfortable",
            "q9": "Independently",
            "q10": "Somewhat",
            "q11": ["Writing"],
            "major": "Computer Science"
        },
        {
            "q1": ["Biology", "Chemistry", "Psychology"],
            "q2": "Open-ended",
            "q3": "Running experiments or collecting data",
            "q4": ["I like understanding people and behavior", "I like analyzing and organizing information"],
            "q5": "Helping others",
            "q6": "Helping others",
            "q7": "Neutral",
            "q8": "Love it",
            "q9": "In small teams",
            "q10": "Yes",
            "q11": ["Coding", "Math"],
            "major": "Psychology"
        },
        {
            "q1": ["Art", "Music", "English"],
            "q2": "Mix",
            "q3": "Designing visual content",
            "q4": ["I like expressing ideas creatively", "I like analyzing and organizing information"],
            "q5": "Creating something new",
            "q6": "Creativity and self-expression",
            "q7": "Avoid it",
            "q8": "Comfortable",
            "q9": "Teaching or mentoring others",
            "q10": "Somewhat",
            "q11": ["Labs", "Math"],
            "major": "Fine Arts"
        },
        {
            "q1": ["Math", "Physics", "Computer Science"],
            "q2": "Structured",
            "q3": "Solving logic puzzles or programming challenges",
            "q4": ["I like understanding how systems work", "I like analyzing and organizing information"],
            "q5": "Mastering complex problems",
            "q6": "Intellectual challenge",
            "q7": "Love it",
            "q8": "Neutral",
            "q9": "Independently",
            "q10": "Yes",
            "q11": ["Writing"],
            "major": "Computer Science"
        },
        {
            "q1": ["Biology", "Chemistry", "Psychology"],
            "q2": "Open-ended",
            "q3": "Running experiments or collecting data",
            "q4": ["I like understanding people and behavior", "I like analyzing and organizing information"],
            "q5": "Helping others",
            "q6": "Helping others",
            "q7": "Neutral",
            "q8": "Love it",
            "q9": "In small teams",
            "q10": "Yes",
            "q11": ["Coding", "Math"],
            "major": "Psychology"
        },
        {
            "q1": ["Art", "Music", "English"],
            "q2": "Mix",
            "q3": "Designing visual content",
            "q4": ["I like expressing ideas creatively", "I like analyzing and organizing information"],
            "q5": "Creating something new",
            "q6": "Creativity and self-expression",
            "q7": "Avoid it",
            "q8": "Comfortable",
            "q9": "Teaching or mentoring others",
            "q10": "Somewhat",
            "q11": ["Labs", "Math"],
            "major": "Fine Arts"
        },
        {
            "q1": ["Economics", "Math", "History"],
            "q2": "Structured",
            "q3": "Solving logic puzzles or programming challenges",
            "q4": ["I like understanding how systems work", "I like analyzing and organizing information"],
            "q5": "Understanding truth or meaning",
            "q6": "High income",
            "q7": "Comfortable",
            "q8": "Neutral",
            "q9": "In large organizations",
            "q10": "Somewhat",
            "q11": ["Writing"],
            "major": "Economics"
        },
        {
            "q1": ["History", "English", "Psychology"],
            "q2": "Open-ended",
            "q3": "Debating social or ethical issues",
            "q4": ["I like understanding people and behavior", "I like expressing ideas creatively"],
            "q5": "Helping others",
            "q6": "Intellectual challenge",
            "q7": "Neutral",
            "q8": "Comfortable",
            "q9": "In small teams",
            "q10": "Yes",
            "q11": ["Coding", "Math"],
            "major": "Psychology"
        },
        {
            "q1": ["Physics", "Math", "Computer Science"],
            "q2": "Structured",
            "q3": "Solving logic puzzles or programming challenges",
            "q4": ["I like understanding how systems work", "I like building or improving physical things"],
            "q5": "Mastering complex problems",
            "q6": "Intellectual challenge",
            "q7": "Love it",
            "q8": "Neutral",
            "q9": "Independently",
            "q10": "Somewhat",
            "q11": ["Writing"],
            "major": "Engineering"
        },
        {
            "q1": ["Art", "Music", "Psychology"],
            "q2": "Mix",
            "q3": "Designing visual content",
            "q4": ["I like expressing ideas creatively", "I like understanding people and behavior"],
            "q5": "Creating something new",
            "q6": "Creativity and self-expression",
            "q7": "Avoid it",
            "q8": "Love it",
            "q9": "Teaching or mentoring others",
            "q10": "Yes",
            "q11": ["Labs", "Coding"],
            "major": "Fine Arts"
        },
        {
            "q1": ["Biology", "Chemistry", "Math"],
            "q2": "Open-ended",
            "q3": "Running experiments or collecting data",
            "q4": ["I like analyzing and organizing information", "I like understanding how systems work"],
            "q5": "Mastering complex problems",
            "q6": "Intellectual challenge",
            "q7": "Comfortable",
            "q8": "Neutral",
            "q9": "In small teams",
            "q10": "Somewhat",
            "q11": ["Writing", "Public speaking"],
            "major": "Biochemistry"
        },
        {
            "q1": ["Economics", "History", "English"],
            "q2": "Structured",
            "q3": "Debating social or ethical issues",
            "q4": ["I like analyzing and organizing information", "I like understanding people and behavior"],
            "q5": "Gaining financial stability",
            "q6": "High income",
            "q7": "Neutral",
            "q8": "Neutral",
            "q9": "In large organizations",
            "q10": "Somewhat",
            "q11": ["Labs", "Coding"],
            "major": "Economics"
        },
        {
            "q1": ["Computer Science", "Math", "Physics"],
            "q2": "Structured",
            "q3": "Solving logic puzzles or programming challenges",
            "q4": ["I like understanding how systems work", "I like analyzing and organizing information"],
            "q5": "Mastering complex problems",
            "q6": "Intellectual challenge",
            "q7": "Don't know",
            "q8": "Comfortable",
            "q9": "Independently",
            "q10": "Yes",
            "q11": ["Writing"],
            "major": "Computer Science"
        }
    ]

    df = pd.DataFrame(sample_data)

    # # Save DataFrame to CSV with multi-categorical options separated by semicolons
    # df_to_save = df.copy()
    # for col in survey_schema:
    #     if survey_schema[col]["type"] == "multi_categorical":
    #         if col in df_to_save.columns:
    #             df_to_save[col] = df_to_save[col].apply(lambda x: ';'.join(map(str, x)) if isinstance(x, list) else x)
    #
    # df_to_save.to_csv('survey_data.csv', index=False)

    # ---------------------------------------------------------------------------
    # Train/test split
    # ---------------------------------------------------------------------------
    X = df.drop(columns=["major"])
    y = df["major"]

    # Compute default vector for blending
    tmp_enc = SurveyEncoder(survey_schema)
    tmp_enc.fit(X)
    default_vec = np.mean(tmp_enc.transform(X), axis=0)

    # Real encoder
    enc = SurveyEncoder(survey_schema, default_vec=default_vec)
    X_encoded = enc.fit_transform(X)

    X_train, X_test, y_train, y_test = train_test_split(X_encoded, y, test_size=0.33, random_state=42)

    # Train the model
    model = RandomForestClassifier(n_estimators=200, random_state=42)
    model.fit(X_train, y_train)

    # Evaluate
    y_pred = model.predict(X_test)
    print("\n=== Evaluation ===")
    print(classification_report(y_test, y_pred))

    # Save the encoder
    with open('encoder.pkl', 'wb') as f:
        pickle.dump(enc, f)

    # Save the model
    with open('model.pkl', 'wb') as f:
        pickle.dump(model, f)

    print("Encoder and model saved successfully.")
