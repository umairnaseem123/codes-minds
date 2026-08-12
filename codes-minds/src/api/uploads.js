import http from "./http";

async function getSignature(resourceType) {
  const response = await http.post("/uploads/signature", { resourceType }, { auth: true });
  return response.data;
}

export async function uploadToCloudinary(file, resourceType) {
  const signature = await getSignature(resourceType);
  const formData = new FormData();
  formData.append("file", file);
  formData.append("api_key", signature.apiKey);
  formData.append("timestamp", String(signature.timestamp));
  formData.append("folder", signature.folder);
  formData.append("signature", signature.signature);

  const response = await fetch(
    `https://api.cloudinary.com/v1_1/${signature.cloudName}/${signature.resourceType}/upload`,
    { method: "POST", body: formData },
  );
  const data = await response.json();

  if (!response.ok || !data.secure_url) {
    throw new Error(data.error?.message || "Cloudinary could not upload the file.");
  }

  return data.secure_url;
}
