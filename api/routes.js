function routes(app, lms, accounts){

    app.post('/create', async (req, res) => {
        let _playerId = req.body.playerId;
        let _fullName = req.body.fullName;
        let _tokenURI = req.body.tokenURI;

        if(_playerId && _fullName && _tokenURI){
            lms.createPlayer(_playerId, _fullName, _tokenURI,{ from: accounts[0] })
                .then((_hash, _address) => {
                    res.json({"status": "success", _hash, _address})
                })
                .catch(err => {
                    console.log(err);
                    res.status(500).json({"status": "Failed", "reason": "Upload error occured"})
                });
        }else{
            res.status(400).json({"status":"Failed", "reason":"wrong input"})
        }


    })

    app.get('/find', (req,res)=>{
        let _playerId = req.body.playerId;
        if(_playerId){
            lms.getPlayerDetails(_playerId)
                .then((_hash, _address) => {
                    res.json({"status": "success", _hash, _address})
                })
                .catch(err => {
                    console.log(err);
                    res.status(500).json({"status": "Failed", "reason": "Upload error occured"})
                });
        }else{
            res.status(400).json({"status":"Failed", "reason":"wrong input"})
        }
    })

}

module.exports = routes
