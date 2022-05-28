import { firebaseConfig } from '../utils/firebaseConfigs.js';

export const getFirebaseConfig = (req, res) => {
	res.status(200).json(firebaseConfig);
};
