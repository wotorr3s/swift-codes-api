import express from "express";

import SwiftCodesController from "./controllers/SwiftCodesController";

const router = express.Router();

router.use("/swift-codes", SwiftCodesController);

export default router;