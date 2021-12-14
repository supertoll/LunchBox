var id = 0;
var locations;
var theme;
var location;
var offers;
var providers;

const global = {
    setId: (i) =>{
        id = i;
    },
    getId: () =>{
        return id;
    },
    initLocation: () =>{
        https.get('http://lunchboxdev.ddns.net/getLocations/index.php', res => {
            let data = [];

            res.on('data', chunk => {
            data.push(chunk);
            });

            res.on('end', () => {
                locations = JSON.parse(Buffer.concat(data).toString());
            });
        })
        .on('error', err => {
            console.log('Error: ', err.message);
        });
    },
    getLocations: () =>{
        return locations;
    },
    getTheme: () => {
        return theme;
    },
    setTheme: (t) => {
        theme = t;
    },
    getLocation: () =>{
        return location;
    },
    setLocation: (l) => {
        location = l;
    },
    initOffers: (d) =>{
        https.get('http://127.0.0.1/api/getOffer/?date=' + d, res => {
            let data = [];

            res.on('data', chunk => {
            data.push(chunk);
            });

            res.on('end', () => {
                offers = JSON.parse(Buffer.concat(data).toString());
            });
        })
        .on('error', err => {
            console.log('Error: ', err.message);
        });
    },
    initProviders: (l) => {
        https.get('http://127.0.0.1/api/getProvider?location=["' + l + '"]', res => {
            let data = [];

            res.on('data', chunk => {
            data.push(chunk);
            });

            res.on('end', () => {
                providers = JSON.parse(Buffer.concat(data).toString());
            });
        })
        .on('error', err => {
            console.log('Error: ', err.message);
        });

    },
    getLocations: () => {
        return locations;
    },
    getOffers: () => {
        return offers;
    }

}
export default global;