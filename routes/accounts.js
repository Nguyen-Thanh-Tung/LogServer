const { express } = global;
const router = express.Router();
const accountController = require('../controllers/account-controller');

/* GET users listing. */
router.get('/', (req, res) => accountController.getAccountList);

module.exports = router;
