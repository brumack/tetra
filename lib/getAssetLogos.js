const Axios = require('axios')
const https = require('https')
const fs = require('fs')
const path = require('path')

const getAssetData = async () => {
    const options = {
        headers: { 'authorization': `Apikey 32410066-a834-4d00-a379-8128f5af772a` }
    }
    
    try {
        const response = await Axios.get('https://min-api.cryptocompare.com/data/all/coinlist', options)
        const assets = response.data.Data
        Object.keys(assets).forEach((asset, i) => {
            const { IsTrading, Symbol, ImageUrl } = assets[asset]
            if (IsTrading) {
                const extension = ImageUrl.split('.').pop()
                const logoExists = fs.existsSync(path.join(__dirname, '..', 'logos', `${Symbol}.${extension}`))
                !logoExists ? downloadImage(assets[asset]) : console.log(`${Symbol} logo exists!`)
            }
        })
    } catch (e) {
        console.log('Error retrieving asset data:', e)
    }
}

const downloadImage = async asset => {
    const { ImageUrl, Symbol } = asset
    const extension = ImageUrl.split('.').pop()
    const url = `https://www.cryptocompare.com${ImageUrl}`
    const dest = path.join(__dirname, '..', 'logos', `${Symbol}.${extension}`)
    
    const file = fs.createWriteStream(dest)

    https.get(url, res => {
        res.pipe(file)
        file.on('error', err => console.log(err))
        file.on('finish', file.close)
    }).on('error', err => { 
        fs.unlink(dest) 
        if (cb) cb(err.message)
    })
}

getAssetData()
    
// export default getAssetData