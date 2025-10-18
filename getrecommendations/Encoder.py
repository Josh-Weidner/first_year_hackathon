import numpy as np
import pandas as pd
from sklearn.ensemble import RandomForestClassifier
from sklearn.model_selection import train_test_split
from sklearn.metrics import classification_report
from sklearn.preprocessing import OneHotEncoder

# ---------------------------------------------------------------------------
# ENCODER
# ---------------------------------------------------------------------------

class SurveyEncoder:
    """
    General-purpose survey encoder supporting:
        - categorical
        - multi_categorical
        - ordinal
        - numeric
        - 'Don't know' blending toward default vector
    """

    def __init__(self, schema, default_vec=None):
        self.schema = schema
        self.onehot = OneHotEncoder(handle_unknown="ignore")
        self.fitted = False
        self.default_vec = default_vec
        self.cat_cols = [k for k, v in schema.items() if v["type"] in ("categorical", "multi_categorical")]
        self.num_cols = [k for k, v in schema.items() if v["type"] in ("numeric", "ordinal")]

    def _expand_multi(self, val):
        if isinstance(val, list):
            return ",".join(sorted(map(str, val)))
        elif pd.isna(val):
            return "Don't know"
        return str(val)

    def _ordinal_to_float(self, val, order):
        if val == "Don't know":
            return None
        if val not in order:
            return np.nan
        return order.index(val) / (len(order) - 1)

    def fit(self, df):
        cat_df = pd.DataFrame()
        for col in self.cat_cols:
            vals = df[col].apply(lambda x: self._expand_multi(x) if isinstance(x, list) else str(x))
            cat_df[col] = vals
        self.onehot.fit(cat_df)
        self.fitted = True
        return self

    def transform(self, df):
        if not self.fitted:
            raise ValueError("Encoder must be fit first.")
        out_vectors = []
        for _, row in df.iterrows():
            cat_row = pd.DataFrame(
                [{col: self._expand_multi(row[col]) if isinstance(row[col], list) else str(row[col])
                  for col in self.cat_cols}]
            )
            cat_encoded = self.onehot.transform(cat_row).toarray()  # force dense
            num_features = []
            dont_know_count = 0
            for col in self.num_cols:
                spec = self.schema[col]
                val = row[col]
                if val == "Don't know":
                    dont_know_count += 1
                    num_features.append(np.nan)
                    continue
                if spec["type"] == "numeric":
                    num_features.append(float(val))
                elif spec["type"] == "ordinal":
                    num_features.append(self._ordinal_to_float(val, spec["order"]))
            # Convert num_features to a 2D array before stacking
            num_features_array = np.array(num_features).reshape(1, -1)
            vec = np.hstack([cat_encoded, np.nan_to_num(num_features_array, nan=0.5)])
            # 'Don't know' blending toward default vector
            if self.default_vec is not None and dont_know_count > 0:
                weight = 1 - (dont_know_count / len(row))
                vec = weight * vec + (1 - weight) * self.default_vec
            out_vectors.append(vec)
        return np.vstack(out_vectors)

    def fit_transform(self, df):
        self.fit(df)
        return self.transform(df)

