const path = require('path');

const firebaseConfig = require(path.join(__dirname, '..', 'utils', 'firebaseConfigs.js'));

exports.getFirebaseConfig = (req, res) => {
  res.status(200).json({
    status: 'success',
    data: {
      firebaseConfig,
    },
  });
};
