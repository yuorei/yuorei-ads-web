"use client";

import { useEffect, useState } from "react";
import { TextField, Button, MenuItem } from "@mui/material";
import { clientOrganization } from "@/app/client";

const categories = [
  "アプリケーション広告",
  "商品広告",
  "趣味",
  // TODO: Add more categories
];

const OrganizationForm = () => {
  const [organizationID, setOrganizationID] = useState("");
  const [organizationName, setOrganizationName] = useState("");
  const [purpose, setPurpose] = useState("");
  const [category, setCategory] = useState("");
  const [clientSecret, setClientSecret] = useState("");
  const [clientSecretConfirm, setClientSecretConfirm] = useState("");
  const [token, setToken] = useState("");
  const [clientID, setClientID] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedToken = localStorage.getItem("token") || "";
      setToken(storedToken);

      let storedClientID = localStorage.getItem("clientID") || "";
      if (!storedClientID) {
        storedClientID = "client" + "_" + crypto.randomUUID();
        localStorage.setItem("clientID", storedClientID);
      }
      setClientID(storedClientID);
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (clientSecret !== clientSecretConfirm) {
      alert("クライアントシークレットが一致しません");
      return;
    }

    clientOrganization
      .createTmpOrganization(
        {
          organizationId: organizationID,
          organizationName: organizationName,
          purpose: purpose,
          category: category,
          clientId: clientID,
          clientSecret: clientSecret,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      )
      .then((res) => {
        console.log(res);
        window.location.href = `/register/organization/${res.organizationId}/account/admin`;
      })
      .catch((error) => {
        console.error("Error creating organization:", error);
        alert("組織の登録に失敗しました。");
      });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="p-6 max-w-lg mx-auto bg-white shadow-md rounded-md"
    >
      <h2 className="text-2xl font-bold mb-6 text-black">組織の登録</h2>
      <div className="mb-4">
        <TextField
          label="組織ID"
          variant="outlined"
          fullWidth
          value={organizationID}
          onChange={(e) => setOrganizationID(e.target.value)}
          required
        />
      </div>
      <div className="mb-4">
        <TextField
          label="組織名"
          variant="outlined"
          fullWidth
          value={organizationName}
          onChange={(e) => setOrganizationName(e.target.value)}
          required
        />
      </div>
      <div className="mb-4">
        <TextField
          label="目的"
          variant="outlined"
          fullWidth
          value={purpose}
          onChange={(e) => setPurpose(e.target.value)}
        />
      </div>
      <div className="mb-4">
        <TextField
          select
          label="カテゴリー"
          variant="outlined"
          fullWidth
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          required
        >
          {categories.map((option) => (
            <MenuItem key={option} value={option}>
              {option}
            </MenuItem>
          ))}
        </TextField>
      </div>
      <div className="mb-4">
        <TextField
          label="クライアントシークレット"
          variant="outlined"
          fullWidth
          type="password"
          value={clientSecret}
          onChange={(e) => setClientSecret(e.target.value)}
          required
        />
      </div>
      <div className="mb-4">
        <TextField
          label="クライアントシークレット確認"
          variant="outlined"
          fullWidth
          type="password"
          value={clientSecretConfirm}
          onChange={(e) => setClientSecretConfirm(e.target.value)}
          required
        />
      </div>
      <Button type="submit" variant="contained" color="primary" fullWidth>
        登録
      </Button>
    </form>
  );
};

export default OrganizationForm;
