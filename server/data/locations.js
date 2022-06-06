const locations = [
    {
        id: 1,
        ownerId: 1,
        position: {
            lat: 47.157214,
            lng: 27.586982
        },
        title: 'Palatul culturii',
        imgSrc: 'https://palatulculturii.ro/web/img/og_image.jpg',
        imgAlt: 'Palatul culturii',
        address: 'Bulevardul Ștefan cel Mare și Sfânt 1, Iași 700028',
        price: 15,
        condition: 'good',
        overview: {
            description: '365-roomed complex built between 1906 & 1925 to house government offices, now housing 4 museums.',
            facilities: [1, 3, 5],
            surface: 60, //mp
            for: "sale",
            dates: [] //no available date cuz its for sale
        },
        reviews: [
            {
                title: 'Awesome place',
                description: 'Awesome place to sleep in while on a school trip',
                score: 4.5
            },
            {
                title: 'Decent place',
                description: 'Awesome place to sleep in while on a school trip. The teacher woke me up!',
                score: 3
            }
        ],
        contact: {
            website: {
                key: "palatulculturii.ro",
                http: "https://palatulculturii.ro/"
            },
            phoneNumber: '0232275979'
        },
        theft: 10, //cate cazuri au fost pe luna
        costOfLiving: 10, //cat iti trb sa traiesti pe luna
        anualTemp: 20
    },
    {
        id: 2,
        ownerId: 2,
        position: {
            lat: 47.161445,
            lng: 27.582023
        },
        title: 'Metropolitan Cathedral',
        imgSrc: 'https://d1bvpoagx8hqbg.cloudfront.net/originals/the-metropolitan-cathedral-ia-65e10ac69e76974c0b1133e182ed1f03.jpg',
        imgAlt: 'Metropolitan Cathedral',
        address: 'Bulevardul Ștefan cel Mare și Sfânt 16, Iași 700064',
        price: 10,
        condition: 'good',
        overview: {
            description: 'Majestic neoclassical church known for its soaring, domed towers, mosaics & 16th-century icons.',
            facilities: [2, 3, 4],
            surface: 60,
            for: "rent",
            dates: [{
                start: "20-09-22"
                , end: "25-10-22"
            }, {
                start: "20-09-22"
                , end: "25-10-22"
            }]
        },
        reviews: [
            {
                title: 'Awesome place',
                description: 'Awesome place to sleep in while on a school trip',
                score: 4.5
            },
            {
                title: 'Decent place',
                description: 'Awesome place to sleep in while on a school trip. The teacher woke me up!',
                score: 3
            }
        ],
        contact: {
            website: {
                key: "mmb.ro",
                http: "https://mmb.ro/"
            },
            phoneNumber: '0232215454'
        },
        theft: 10, //cate cazuri au fost pe luna
        costOfLiving: 10, //cat iti trb sa traiesti pe luna
        anualTemp: 20
    }
];

module.exports = locations;