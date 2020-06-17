module.exports = class Asset {
    constructor(symbol, exchange, balance = 0) {
        this.symbol = symbol 
        this.exchange = exchange
        this.balance = balance
    }

    addAvailableExchange(exchange){
        this.availableExchanges = [...this.availableExchanges, exchange ]
    }

    removeAvailabeExchange(exchange) {
        this.availableExchanges = this.availableExchanges.filter(availableExchange => availablExchange !== exchange)
    }

    addToBalance(amount) {
        this.balance = this.balance + amount
    }

    subtractFromBalance(amount) {
        this.balance = this.balance - amount
    }

    updateBalance(amount) {
        this.balance = amount
    }

}