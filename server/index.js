import express from 'express';
import bodyParse from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';

import postRoutes from './routes/posts.js'

const app = express();

app.use('/posts', postRoutes)

app.use(bodyParse.json({ limit: '30mb', extended: true }))
app.use(bodyParse.urlencoded({ limit: '30mb', extended: true }))
app.use(cors())

const CONNECTION_URL = 'mongodb+srv://farzin123:farzin123@cluster0.kfdyz.mongodb.net/<dbname>?retryWrites=true&w=majority'

const PORT = process.env.PORT || 5000;
mongoose.connect(CONNECTION_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => app.listen(PORT, () => console.log(`Server running on port ${PORT}`)))
    .catch((error) => console.log(error.message))

mongoose.set('useFindAndModify', false)