import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  createCandidate,
  saveCandidateAttributes,
  uploadFile,
} from "../../api/applications";

interface ApplyPayload {
  jobId: string;
  form: {
    full_name: string;
    dob: string;
    gender: string;
    domicile: string;
    phone: string;
    linkedin: string;
  };
  photoFile: File | null;
}

export const applyJob = createAsyncThunk(
  "apply/submit",
  async (
    { jobId, form, photoFile }: ApplyPayload,
    { rejectWithValue }
  ) => {
    try {
      // 1. Insert candidate ke table candidates
      const candidate = await createCandidate(jobId);
      const candidateId = candidate.id;

      // 2. Upload file
      let photoUrl = "";

      if (photoFile) photoUrl = await uploadFile(photoFile, "photo");

      // 3. Save attributes (key-value)
      await saveCandidateAttributes(candidateId, {
        full_name: form.full_name,
        dob: form.dob,
        gender: form.gender,
        domicile: form.domicile,
        phone: form.phone,
        linkedin: form.linkedin,
        photo_url: photoUrl,
      });

      return true;
    } catch (err: any) {
      return rejectWithValue(err.message);
    }
  }
);
