import express from "express";

import SwiftCodesController from "./controllers/SwiftCodesController";
import CSVController from "./controllers/CSVController";

const router = express.Router();

router.use("/swift-codes", SwiftCodesController);
router.use("/csv", CSVController);

export default router;