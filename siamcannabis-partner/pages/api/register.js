import { registerPartner } from "../../models/Partner";

export default async function handler(req, res) {
  if (req.method === "POST") {
    let _data = JSON.parse(req.body);
    delete _data.accept;

    const registered = await registerPartner(_data);

    if (registered.status) {
      res.status(201).json(registered);
    } else {
      res.status(409).json(registered);
    }
  } else {
    res.status(405).json({ message: "Method not allowed." });
  }
}
