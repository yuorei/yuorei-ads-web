"use client";
import { useState } from "react";
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
  const [representativeName, setRepresentativeName] = useState("");
  const [representativeEmail, setRepresentativeEmail] = useState("");
  const [purpose, setPurpose] = useState("");
  const [category, setCategory] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    clientOrganization
      .createTmpOrganization({
        organizationId: organizationID,
        organizationName: organizationName,
        representativeName: representativeName,
        representativeEmail: representativeEmail,
        purpose: purpose,
        category: category,
      })
      .then((res) => {
        console.log(res);
        window.location.href = `/register/${res.organizationId}/account/admin`;
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
          label="代表者名"
          variant="outlined"
          fullWidth
          value={representativeName}
          onChange={(e) => setRepresentativeName(e.target.value)}
          required
        />
      </div>
      <div className="mb-4">
        <TextField
          label="代表者メールアドレス"
          variant="outlined"
          fullWidth
          type="email"
          value={representativeEmail}
          onChange={(e) => setRepresentativeEmail(e.target.value)}
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
      <Button type="submit" variant="contained" color="primary" fullWidth>
        登録
      </Button>
    </form>
  );
};

export default OrganizationForm;
