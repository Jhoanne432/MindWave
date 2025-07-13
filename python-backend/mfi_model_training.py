import pandas as pd
import numpy as np
from sklearn.preprocessing import StandardScaler
from sklearn.model_selection import train_test_split
from tensorflow.keras.models import Model
from tensorflow.keras.layers import Input, Conv1D, Flatten, Concatenate, Reshape, LSTM, Dense
from tensorflow.keras.utils import to_categorical
from imblearn.over_sampling import SMOTE

df = pd.read_csv("Stop_Watch_Health_Dataset_Cleaned.csv")
cols = ["Heart Rate (BPM)", "Blood Oxygen Level (%)", "Step Count", "Sleep Duration (hours)"]
df = df[cols].copy()

def label_fatigue(row):
  score = 0
  if row["Sleep Duration (hours)"] < 6: score += 1
  if row["Heart Rate (BPM)"] > 90: score += 1
  if row["Blood Oxygen Level (%)"] < 95: score += 1
  if score == 3: return 2
  elif score == 2: return 1
  else: return 0

df["Fatigue Label"] = df.apply(label_fatigue, axis=1)

X_raw = df[cols].values

window_size = 10
X_seq, y_flat = [], []
for i in range(len(X_raw) - window_size + 1):
    X_seq.append(X_raw[i:i+window_size])
    y_flat.append(df["Fatigue Label"].iloc[i + window_size - 1])

X_seq = np.array(X_seq)
y_flat = np.array(y_flat)

n_windows, w, f = X_seq.shape
X_flat = X_seq.reshape(n_windows, w * f)
medium_count = np.sum(y_flat == 1)
sm = SMOTE(sampling_strategy={2: medium_count}, random_state=42)
X_res, y_res = sm.fit_resample(X_flat, y_flat)

unique, counts = np.unique(y_res, return_counts=True)
print("Resampled class distribution:")
for cls, count in zip(unique, counts):
    print(f"Class {cls}: {count} samples")

X_seq = X_res.reshape(-1, w, f)
y_flat = y_res
y_seq = to_categorical(y_flat, num_classes=3)

X_tr, X_te, y_tr, y_te = train_test_split(
  X_seq, y_seq,
  test_size=0.2,
  random_state=42,
  stratify=y_flat
)
X_train_split = [X_tr[:, :, i:i+1].astype(np.float32) for i in range(f)]
X_test_split = [X_te[:, :, i:i+1].astype(np.float32) for i in range(f)]
y_tr = y_tr.astype(np.float32)
y_te = y_te.astype(np.float32)

inputs, towers = [], []
for _ in range(f):
  inp = Input(shape=(window_size, 1))
  x = Conv1D(16, 3, activation="relu")(inp)
  # x = Flatten()(x)
  inputs.append(inp)
  towers.append(x)
merged = Concatenate(axis=-1)(towers)
# reshaped = Reshape((1, merged.shape[1]))(merged)
lstm_out = LSTM(32)(merged)
output = Dense(3, activation="softmax")(lstm_out)
model = Model(inputs=inputs, outputs=output)
model.compile(optimizer="adam", loss="categorical_crossentropy", metrics=["accuracy"])

class_weights = {0: 1.0, 1: 1.5, 2: 5.0}
model.fit(
  X_train_split, y_tr,
  validation_data=(X_test_split, y_te),
  epochs=10,
  batch_size=64,
  class_weight=class_weights
)

model.save("MFI_MODEL.keras")