const router = require('express').Router();
const jwt = require('jsonwebtoken');
const Hospital = require('../../models/hospital.model');
const crypto = require('crypto');

function hashData(data, algorithm = 'sha256') {
  const hash = crypto.createHash(algorithm);
  hash.update(data);
  return hash.digest('hex');
}

router.route('/:city').get((req, res) => {
    Hospital.find({
        city: req.params.city
    })
        .then(hospitals => {
            res.send(hospitals)
        })
        .catch(err => res.status(400).json('Error:' + err));
});

router.route('/login').post((req, res) => {
    const { username, password } = req.body;
    Hospital.findOne({ username })
        .then(hospital => {
            if (!hospital) 
                return res.status(400).json({ msg: 'User does not exist' });
            if (hospital.password != hashData(password)) 
                return res.status(400).json({ msg: 'Invalid Credentials!' });
            const payload = {
                name: hospital.username,
                key: hospital.hospitalpublickey,
            };
            jwt.sign(payload, 'Think=>Code=>Build=>Hack', (err, token) => {
                if (err) throw err;
                res.json({
                    token: token
                });
            })
        })
})

router.route('/profile/:publicKey').get((req, res) => {
    Hospital.findOne({ hospitalpublickey: req.params.publicKey })
        .then(hospital => {
            res.send(hospital)
        })
        .catch(err => res.status(400).json('Error:' + err));
})

module.exports = router;