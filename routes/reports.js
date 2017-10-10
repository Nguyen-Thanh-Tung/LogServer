const { express } = global;
const router = express.Router();
const reportController = require('../controllers/report-controller');

/* GET list report of one server. */
router.get('/', (req, res) => reportController.getReportByServer(req, res));

/* POST report to server */
router.post('/add-report', (req, res) => reportController.addReportForServer(req, res));

module.exports = router;
