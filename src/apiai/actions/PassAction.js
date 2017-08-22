
//IdentityAction ?

const PassAction = {
    process: (verdict: NluVerdict) => verdict.response
}

module.exports = PassAction