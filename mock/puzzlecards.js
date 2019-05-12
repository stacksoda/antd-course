const random_jokes = [
    {
        setup: 'What is the object oriented way to get wealthy ?',
        punchline: 'Inheritance',
    },
    {
        setup: 'To understand what recursion is...',
        punchline: 'You must first understand what recursion is',
    },
    {
        setup: 'What do you call a factory that sells passable products',
        punchline: 'A satisfactory',
    },
];
const chartData = {
    result: [
        { genre: 'Sports', sold: 275 },
        { genre: 'Strategy', sold: 1150 },
        { genre: 'Action', sold: 120 },
        { genre: 'Shooter', sold: 350 },
        { genre: 'Other', sold: 150 },
    ]
}

let random_joke_call_count = 0;

export default {
    'get /dev/random_joke': function (req, res) {
        const responseObj = random_jokes[random_joke_call_count % random_jokes.length];
        random_joke_call_count += 1;
        setTimeout(() => {
            console.log('mock data ', responseObj);
            res.json(responseObj);
        }, 3000);
    },
    'get /api/cards/:id/statistic': function( req, res, next ) {
        res.json(chartData);
    }
};