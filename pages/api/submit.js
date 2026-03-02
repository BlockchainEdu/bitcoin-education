export const config = {
  api: {
    bodyParser: false,
  },
};

async function readFormData(req) {
  const formidable = (await import("formidable")).default;
  return await new Promise((resolve, reject) => {
    const form = formidable({ maxFileSize: 1 * 1024 * 1024 }); // 1MB
    form.parse(req, (err, fields, files) => {
      if (err) return reject(err);
      resolve({ fields, files });
    });
  });
}

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ ok: false });

  try {
    const { fields, files } = await readFormData(req);

    const payloadRaw = Array.isArray(fields.payload)
      ? fields.payload[0]
      : fields.payload;
    const payload = payloadRaw ? JSON.parse(payloadRaw) : {};

    const logo = files.logo;
    if (logo) return res.status(200).json({ ok: true });
  } catch (e) {
    console.error(e);
    return res.status(400).json({ ok: false });
  }
}
