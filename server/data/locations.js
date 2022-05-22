const locations = [
    {
        id: 1,
        position: {
            lat: 47.157214,
            lng: 27.586982
        },
        title: 'Palatul culturii',
        imgSrc: 'https://palatulculturii.ro/web/img/og_image.jpg',
        imgAlt: 'Palatul culturii',
        address: 'Bulevardul Ștefan cel Mare și Sfânt 1, Iași 700028',
        price: 15,
        time: 'night',
        overview: {
            description: '365-roomed complex built between 1906 & 1925 to house government offices, now housing 4 museums.'
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
        }
    },
    {
        id: 2,
        position: {
            lat: 47.161445, 
            lng: 27.582023
        },
        title: 'Metropolitan Cathedral',
        imgSrc: 'https://d1bvpoagx8hqbg.cloudfront.net/originals/the-metropolitan-cathedral-ia-65e10ac69e76974c0b1133e182ed1f03.jpg',
        imgAlt: 'Metropolitan Cathedral',
        address: 'Bulevardul Ștefan cel Mare și Sfânt 16, Iași 700064',
        price: 10,
        time: 'night',
        overview: {
            description: 'Majestic neoclassical church known for its soaring, domed towers, mosaics & 16th-century icons.'
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
        }

    }
];

module.exports = locations;