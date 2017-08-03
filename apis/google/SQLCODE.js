const request = require('request');

class SQLCODE {

    constructor(funcIsContains, google_token, google_cx_token, txt_sqlcode) {
        this.isContains = funcIsContains;
        this.txt_sqlcode =txt_sqlcode;
        this.url = `https://www.googleapis.com/customsearch/v1?key=${google_token}&cx=${google_cx_token}&q=${txt_sqlcode}`;
    }

    find(callback) {
        request.get(this.url, (err, result) => {
            if (err) {
                callback(err, null)
            } else {
                const descricao = JSON.parse(result.body);
                if (descricao == null) {
                    callback(new Error('Nao foi possivel obter o sqlcode'), null)
                } else if (!this.isContains(descricao, "snippet")) {
                    callback(new Error('Nao foi possivel obter o sqlcode'), null)
                } else {
                    let snippet = descricao.items[0].snippet;
                    snippet = snippet.split('of \n').pop();
                    callback(null, snippet);
                }
            }
        })
    }
}

module.exports = function () {
    return SQLCODE;
}


