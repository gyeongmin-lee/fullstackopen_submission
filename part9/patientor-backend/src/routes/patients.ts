import express from "express";
import patientService from "../services/patientService";

const router = express.Router();

router.get("/", (_req, res) => {
  res.send(patientService.getEntries());
});

router.post("/", (_req, res) => {
  res.send("Save a diagnosis");
});

export default router;
