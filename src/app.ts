import express, {NextFunction, Request, Response} from 'express';

const showPath = (req: Request, res: Response, next: NextFunction):any => {
    console.log('Request URL:', req.originalUrl);
    next();
}

const app = express();
app.use(express.json());
app.use(showPath);

app.get('/', (req, res) => {
    res.send('Hello World');
});

app.post('/api/products', (req, res):any => {
    res.status(201).json({
        message: 'Data received',
        data: req.body,
    });
});

app.all('/api/product/check', (req, res) => {
    if(req.method === 'POST') {
        res.send('You have made a POST request');
    } else if(req.method === 'GET') {
        res.send('You have made a GET request');
    } 
});

app.get('/api/interfaces', (req: Request, res: Response):any => {
    return res.send('Interfaces');
});

app.get('/api/json', (req: Request, res: Response):any => {
    return res.status(200).json({
        message: 'JSON response',
    });
});

app.get('/api/product/:id', (req: Request, res: Response):any => {
    return res.send(req.params);
});

app.get('/api/product/:id/review/:reviewId', (req: Request, res: Response):any => {
    return res.send(req.params);
});

const getUser = (req: Request, res: Response):any => {
    return res.send(req.params);
}

app.get('/api/user/:id', getUser)

const checkUser = (req: Request, res: Response, next: NextFunction):any => {
    if(req.params.id === '1') {
        next();
    } else {
        return res.status(401).json({
            message: 'Access denied',
        });
    }
}

app.get('/api/user/:id/access', checkUser, (req: Request, res: Response):any => {
    return res.json({"message": "Access granted"});
});




app.listen(3000, () => {
  console.log('Server is running on port 3000');
});

