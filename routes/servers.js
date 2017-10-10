const { express } = global;
const router = express.Router();
const serverController = require('../controllers/server-controller');

/* GET list server */
router.get('/', (req, res) => serverController.getServerList);

module.exports = router;
