const users = [
    {
        id: 1,
        name: "mircea",
        password: "abc",
        admin:0,
        ownedApatments: [1, 2],
        rented: [{ id: 1, date: { start: "00-00-00", end: "00-00-00" } },
        { id: 2, date: { start: "00-00-00", end: "00-00-00" } }]
    },
    {
        id: 2,
        name: "bogdan",
        admin:1,
        password: "abc",
        ownedApatments: [1, 2],
        rented: [{ id: 1, date: { start: "00-00-00", end: "00-00-00" } },
        { id: 2, date: { start: "00-00-00", end: "00-00-00" } }]
    },
    {
        id: 2,
        name: "alessandro",
        admin:1,
        password: "abc",
        ownedApatments: [1, 2],
        rented: [{ id: 1, date: { start: "00-00-00", end: "00-00-00" } },
        { id: 2, date: { start: "00-00-00", end: "00-00-00" } }]
    }
]


module.exports = users;